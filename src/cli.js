#!/usr/bin/env node

const program = require('commander')
const utils = require('./utils')
const redirector = require('./redirector')

const { logger } = utils || {}

program
  .version('0.1.2')
  .usage('[options] <file ...>')
  .option('-p, --port <port>', 'server port', Number, 3000)
  .option('-u, --url <url>', 'redirect to url', String)
  .option('-c, --cookie', 'should use cookie')

function run() {
  program.parse(process.argv)

  const { url, port, cookie } = program || {}

  if (!url) {
    logger.error('missing redirect to url')
    return false
  }

  const options = {
    useCookie: !!cookie,
  }
  redirector(url, port, options)
  return true
}

run()
