const webpack = require('webpack')

const package = require('./package.json')
const packageName = package.name
const packageFile = packageName + '.js'
const packageFileMin = packageName + '.min.js'

module.exports = {
  entry: {
    packageFile : './entry.js',
    packageFileMin : './entry.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
}
