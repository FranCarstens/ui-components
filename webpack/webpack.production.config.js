var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var _ = require('lodash');

_.extend(config, {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        Table: [path.resolve(__dirname, '../src/table/index.js')],
        Pager: [path.resolve(__dirname, '../src/pager/index.js')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'LMUI.[name].js',
        libraryTarget: 'umd',
        library: ['LMUI', '[name]']
    },
    externals: [
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },

        {
            'lodash': {
                root: '_',
                commonjs2: 'lodash',
                commonjs: 'lodash',
                amd: 'lodash'
            }
        }
    ],
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })]
});

module.exports = config;