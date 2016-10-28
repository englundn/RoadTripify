//This file configures webpack to run on the production files
var path = require('path');
var webpack = require('webpack');
var page = require('./page.json');

module.exports = {
  cache: true,
  entry: page,
  output: { 
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
