const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: "./src/aw-mfe/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/prod'),
    filename: "bundle.prod.js",
    publicPath: '../dist/prod'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'react-router-dom': 'ReactRouterDom',
  },
  devServer: {
    contentBase:[
      path.join(__dirname, 'dist/prod'),
    ],
    port: 3001,
    publicPath: '/dist/prod',
    writeToDisk: true,
  },
});
