var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
// const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('./src/main.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      '@src': resolve('src'),
      '@styles': resolve('src/assets/styles'),
      '@images': resolve('src/assets/images'),
      '@components': resolve('src/components'),
      '@webModule': resolve('src/web_modules'),
      '@services': resolve('src/services'),
      '@mixins': resolve('src/mixins'),
      '@pages': resolve('src/pages'),
      '@store': resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new TsConfigPathsPlugin()
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      Link: ['react-router-dom', 'Link'],
      Route: ['react-router-dom', 'Route'],
    })
  ]
}
