const express = require('express')
const proxy = require('http-proxy-middleware')
const cors = require('cors')
const utils = require('./utils')

const { checkPortIsBusy, logger, getHost } = utils || {}

const app = express()

async function redirector(url, port, options) {
  const shouldStartServer = await checkPortIsBusy(port)
    .then((isReady) => {
      if (!isReady) {
        logger.error(`port ${port} is busy, please choose other port!`)
        return false
      }

      return true
    })
    .catch((error) => {
      logger.error('have an error when starting server!')
      logger.error(error)
      return false
    })

  if (!shouldStartServer) {
    return false
  }

  const {
    useCookie,
  } = options || {}

  app
    .use(cors())
    .use(proxy({
      target: url,
      changeOrigin: true,
      logLevel: 'silent',
      cookieDomainRewrite: useCookie,
    }))

  const server = app.listen(port, (error) => {
    if (error) {
      logger.error(error)
      return false
    }

    const info = server.address()
    const { address } = info || {}
    const host = getHost(address)
    logger.info(`running at http://${host}:${port}`)
    return true
  })

  process.on('SIGINT', () => {
    console.log('\n') // eslint-disable-line no-console
    server.close()
    logger.info(['redirect server stopped'].join('\n'))
    process.exit(1)
  })

  return server
}

module.exports = redirector
