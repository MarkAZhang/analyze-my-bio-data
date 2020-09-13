var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js')

var APP_DIR = path.resolve(__dirname, 'frontend');
var BUILD_DIR = path.resolve(__dirname, 'static');

var config = merge(commonConfig, {
  mode: 'development',
  entry: ['babel-polyfill', APP_DIR + '/index.jsx'],
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
  },
  devtool: 'cheap-eval-source-map',
});

module.exports = config
