'use strict'; // eslint-disable-line

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var rootPath = path.resolve(__dirname, '..'); // 项目根目录
var paths = {
  srcPath: path.join(rootPath, '../src'),
  htmlPath: path.join(rootPath, '../examples/index.html')
}
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/dev-server',
    path.join(rootPath, './src/app.js')
  ],
  output: {
    path: path.join(rootPath, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: paths.srcPath,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'example.html',
      template: paths.htmlPath,
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
