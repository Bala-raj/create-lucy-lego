const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    dev: "./src/TodoApp/index.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: "bundle.[name].js",
    publicPath: '../dist/dev',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  devServer: {
    contentBase:[
      path.join(__dirname, 'public'),
      // path.join(__dirname, 'dist'),
    ],
    port: 3000,
    hotOnly: true,
    publicPath: '/dist/dev',
    hot: true,
    writeToDisk: true,
    open:true,
  },
});
