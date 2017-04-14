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
          presets: ['react', 'es2015']
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
