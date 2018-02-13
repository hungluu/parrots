const webpack = require('webpack')
const util = require('util')

const package = require('./package.json')
const packageName = package.name
const packageFile = packageName + '.js'
const packageFileMin = packageName + '.min.js'

module.exports = {
  entry: {
    [packageFile] : './index.js',
    [packageFileMin] : './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname,
        loader: 'babel-loader' // use .babelrc
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        //drop_console: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
        //side_effects: true
      },
      sourceMap: true,
      mangle: {
        toplevel: true,
        sort: true,
        eval: true,
        properties: true
      },
      output: {
        space_colon: false,
        comments: function(node, comment) {
          var text = comment.value
          var type = comment.type
          if (type == "comment2") {
            // multiline comment
            return /@copyright/i.test(text)
          }
        }
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      include: /\.min\.js$/,
      filename: "[file].map"
    }),
    new webpack.BannerPlugin(
      {
        banner: util.format('%s v%s | %s', package.name, package.version, package.author),
        entryOnly: true
      }
    )
  ]
}
