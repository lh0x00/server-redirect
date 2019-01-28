#!/usr/bin/env node

const program = require('commander')
const utils = require('./utils')
const redirector = require('./redirector')
const exposer = require('./exposer')

const { logger } = utils || {}

program
  .version('0.1.2')
  .usage('[options] <file ...>')
  .option('-p, --port <port>', 'server port', Number, 3000)
  .option('-u, --url <url>', 'redirect to url', String)
  .option('-c, --cookie', 'should use cookie')
  .option('-e, --expose', 'should expose')
  .option('-s, --subdomain <subdomain>', 'subdomain on the expose server', String)

async function main() {
  program.parse(process.argv)

  const {
    url, port, cookie, expose, subdomain,
  } = program || {}

  if (!url) {
    logger.error('missing redirect to url')
    return false
  }

  const options = {
    useCookie: !!cookie,
  }

  const server = await redirector(url, port, options)

  const shouldExpose = !!(server && expose)
  if (shouldExpose) {
    const config = subdomain ? { subdomain } : {}
    await exposer(port, config)
  }

  return true
}

main()
