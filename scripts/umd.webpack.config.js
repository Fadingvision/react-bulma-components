// @flow

const path = require('path');
const webpack = require('webpack'); // eslint-disable-line

const LIBRARY_NAME = 'react-bulma';
const baseConfig = {
  entry: {
    'react-bulma': path.join(__dirname, '../src/index.js'),
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: LIBRARY_NAME,
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    'react-transition-group/TransitionGroup',
    {
      react: {
        root: 'React',
        commonjs2: './react',
        commonjs: ['./react'],
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: './react-dom',
        commonjs: ['./react-dom'],
        amd: 'react-dom',
      },
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [],
};

let config;

if (process.env.NODE_ENV === 'production') {
  config = Object.assign({}, baseConfig, {
    plugins: baseConfig.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ]),
  });
}

module.exports = config;
