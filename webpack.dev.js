const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const publicPath = './';
const publicDistPath = './dist';
const publicCSSPath = './css/';
const publicJSPath = './js/';
const publicAssetsPath = './assets/';

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: publicJSPath + '[name].js',
    path: path.resolve(__dirname, 'dist/dev'),
  },
  devtool: 'inline-source-map',
  watchOptions:
  {
    //Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other changes made during this time period into one rebuild. Pass a value in milliseconds
    aggregateTimeout: 300,
    //For some systems, watching many files can result in a lot of CPU or memory usage. It is possible to exclude a huge folder like node_modules using a regular expression
    ignored: /node_modules/,
    //Turn on polling by passing true, or specifying a poll interval in milliseconds
    poll: 1000
  },
  devServer: {
    contentBase: './dist/dev',
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }
});