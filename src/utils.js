const net = require('net')
const enums = require('./enums')

const { LIST_LOCAL_IP } = enums || {}

const checkPortIsBusy = port => new Promise((resolve, reject) => {
  const server = net.createServer()

  // tracking server error
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      resolve(false)
    } else {
      reject(error)
    }
  })

  // check when server is open
  server.once('listening', () => {
    server.close()
    resolve(true)
  })

  // start server
  server.listen(port)

  return true
})

const logger = {}

const logHandlers = Object.entries({
  info: console.log, // eslint-disable-line no-console
  error: console.error, // eslint-disable-line no-console
})

logHandlers.forEach(([type, handle]) => {
  logger[type] = (...rest) => {
    handle(`> [${type}]`, ...rest)
  }
})

const getHost = address => (LIST_LOCAL_IP.includes(address) ? 'localhost' : address)

module.exports = {
  checkPortIsBusy,
  logger,
  getHost,
}
