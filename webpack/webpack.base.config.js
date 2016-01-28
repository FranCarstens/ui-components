var path = require('path');
var webpack = require('webpack');

config = {
    eslint: {
        configFile: '.eslintrc'
    },
    resolve: {
        alias: {
            'commonStyle': path.resolve(__dirname, '../src/common/style')
        }
    },
    module: {
        noParse: [],
        preLoaders: [
            {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules|bower_components/}
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: ['babel']
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.png|gif/, loader: "url-loader?limit=500000"
            },
            {
                test: /\.jpg/, loader: "url-loader?limit=500000"
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url?limit=500000'
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "../src/common/style")]
    }
};

module.exports = config;