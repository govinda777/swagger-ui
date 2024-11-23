const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/swagger-ui/',
    clean: true
  },
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
    },
  },
});