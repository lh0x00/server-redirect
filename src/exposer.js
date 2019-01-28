const localtunnel = require('localtunnel')
const utils = require('./utils')

const { logger } = utils || {}

const register = (...rest) => new Promise((resolve, reject) => {
  localtunnel(...rest, (error, info) => {
    if (error) {
      reject(error)
    } else {
      resolve(info)
    }
  })
})

async function exposer(port, options) {
  const result = await register(port, options || {})
    .then((info) => {
      const { url } = info || {}
      logger.info(`expose server at ${url}`)
      return true
    })
    .catch((error) => {
      logger.error(error)
      return false
    })
  return result
}

module.exports = exposer
