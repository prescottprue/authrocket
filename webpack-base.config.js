'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')
var config = require('./config.json')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/ ] }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`${config.library.file}.js v ${pkg.version} | (c) Prescott Prue `, { raw: false, entryOnly: true })
  ],
  output: {
    library: config.library.export,
    libraryTarget: 'umd',
    publicPath: `/${config.folders.dist}/`
  },
  resolve: {
    extensions: ['', '.js']
  }
}
