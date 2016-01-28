var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var _ = require('lodash');

var config = require('./webpack.base.config');

_.extend(config, {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, '../demo/index.js')],
    output: {
        path: path.resolve(__dirname, '../demo'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'UI components',
            template: 'indexTemplate.html',
            filename: 'index.html',
            inject: true
        })
    ],
    devtool: 'eval-source-map',
    debug: true
});

module.exports = config;


