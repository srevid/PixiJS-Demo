const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const publicPath = './';
const publicDistPath = './dist';
const publicCSSPath = './css/';
const publicJSPath = './js/';
const publicAssetsPath = './assets/';

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: publicJSPath + '[name].js',
    path: path.resolve(__dirname, 'dist/prod'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
});