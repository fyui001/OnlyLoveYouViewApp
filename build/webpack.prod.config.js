'use strict'

const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '..', 'prod')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
})
