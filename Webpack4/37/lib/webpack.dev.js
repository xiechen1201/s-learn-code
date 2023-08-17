const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.prod');

const devConfig = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(devConfig, baseConfig);
