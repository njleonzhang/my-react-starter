require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var detect = require('detect-port')
var clearConsole = require('react-dev-utils/clearConsole')
var getProcessForPort = require('react-dev-utils/getProcessForPort')
var prompt = require('prompt')
var chalk = require('chalk')

var DEFAULT_PORT = process.env.PORT || config.dev.port
var isInteractive = process.stdout.isTTY
var server
var readyPromise

function run(port) {
  // default port where dev server listens for incoming traffic
  // automatically open browser, if not set will be false
  var autoOpenBrowser = !!config.dev.autoOpenBrowser
  // Define HTTP proxies to your custom API backend
  // https://githubc.om/chimurai/http-proxy-middleware
  var proxyTable = config.dev.proxyTable

  var app = express()
  var compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
  })

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  app.use(staticPath, express.static('./static'))

  var uri = 'http://0.0.0.0:' + port

  var _resolve
  readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    _resolve()
  })

  server = app.listen(port)
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port)
    return
  }

  if (isInteractive) {
    clearConsole()
    var existingProcess = getProcessForPort(DEFAULT_PORT);

    console.log(chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.' +
      ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')))

    var question = '\nWould you like to run the app on another port instead?(Y/n)'

    prompt.start()

    prompt.get({
      description: question,
      name: 'shouldChange',
      type: 'string',
      require: true,
      default: 'Y'
    }, function (error,result) {
      if (result.shouldChange.toUpperCase() === 'Y' || result.shouldChange.toUpperCase() === 'YES') {
        run(port)
      }
    })
  } else {
    console.log(chalk.red('Something is already running on port ' + DEFAULT_PORT + '.'));
  }
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
