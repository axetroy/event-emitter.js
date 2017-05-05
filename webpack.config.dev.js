/**
 * Created by axetroy on 2017/3/6.
 */

const webpack = require('webpack');
const path = require('path');

// webpack.config.js
module.exports = {
  entry: path.join(__dirname, 'example', 'index.js'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'example')
  }
};
