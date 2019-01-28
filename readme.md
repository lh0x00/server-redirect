# server-redirect

## About

[![npm version][npm-version-image]][npm-url]
[![npm downloads][npm-downloads-image]][npm-url]
[![github issues][github-issues-image]][github-issues-url]

a tool help to setup server redirect support expose by localtunnel

## Installation

```bash
$ npm install -g server-redirect
// or yarn
$ yarn global add server-redirect
```


## Usage

```bash
redirector [options]

options:
-p, --port <port> server port, not required and default is 3000
-u, --url <url> redirect to url, required
-c, --cookie should use cookie, not required, default is false
-e, --expose should expose, not required, default is false
-s, --subdomain <subdomain> subdomain on the expose server, only use when expose is true
```

## Examples

**Default**

```bash
redirector -u <url>
```

**Specify a port in local**

```bash
redirector -u <url> -p 4001
```

**Use cookie**

```bash
redirector -u <url> -c
```

**Expose server**

```bash
# Random subdomain
redirector -u <url> -e

# Set subdomain
redirector -u <url> -e -s do-something-great
```

**Full options**
```bash
redirector -u <url> -p 4001 -c -e -s do-something-great
```


[npm-url]: https://npmjs.org/package/server-redirect
[npm-version-image]: https://badge.fury.io/js/server-redirect.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/server-redirect.svg
[github-issues-image]: https://img.shields.io/github/issues/lamhieu-vk/server-redirect.svg
[github-issues-url]: https://github.com/lamhieu-vk/server-redirect/issues
