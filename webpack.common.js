const path = require('path');
var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const publicPath = './';
const publicDistPath = './dist';
const publicCSSPath = './css/';
const publicJSPath = './js/';
const publicAssetsPath = './assets/';

module.exports = {
  entry: {
    app: './src/index.js',
  },
  //webpack can compile for multiple environments or targets.
  target: ['web', 'es5'],
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      hash: true,
      minify: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env']
            ],
            plugins:[
              ['@babel/plugin-transform-classes']
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          //Choose between style-loader or MiniCssExtractPlugin

          //style-loader adds the CSS to the DOM so that the styles are active and visible on the page.
          // "style-loader",

          // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../css', //Specifies a custom public path for the external resources like images, files, etc inside CSS
            },
          },

          //The css-loader interprets @import and url() like import/require() and will resolve them.
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
    ],
  }
};