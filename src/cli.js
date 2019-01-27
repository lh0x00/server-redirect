#!/usr/bin/env node

const program = require('commander')
const utils = require('./utils')
const redirector = require('./redirector')

const { logger } = utils || {}

program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-p, --port <port>', 'Server port', parseInt, 3000)
  .option('-u, --url <url>', 'Redirect to url', String)
  .option('-c, --cookie', 'Use cookie')

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
