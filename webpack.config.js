var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    app: './src/app.js'
  },

  output: {
    filename: 'public/build/bundle.js',
    sourceMapFilename: 'public/build/bundle.map'
  },

  devtool: '#source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loaders: ['style', 'css', 'sass']
      },
    ]
  }

}
