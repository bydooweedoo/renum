'use strict';

var webpack = require('webpack');

var env = process.env.NODE_ENV;
var config = {
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        library: 'renum',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};

if (env !== 'test') {
    // config.output.externals = {
    //     ramda: 'R'
    // };
    config.plugins.push(new webpack.IgnorePlugin(/^(ramda)$/));
}

if (env === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
        }
    }));
}

module.exports = config;
