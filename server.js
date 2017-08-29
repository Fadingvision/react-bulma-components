const webpack = require("webpack");
const path = require("path");
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require("./scripts/module.webpack.config.js");

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  },
  historyApiFallback: true,
  hot: true,
  overlay: true,
}).listen(9999, "0.0.0.0", function(err) {
  console.log(err || "Starting server on http://localhost:9000");
});

