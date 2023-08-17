const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');

const baseConfig = require('./webpack.prod');

const prodConfig = {
    mode: 'production',
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
    moudle: [
        {
            test: /\.css$/,
            use: 'ignore-loader',
        },
        {
            test: /\.less$/,
            use: 'ignore-loader',
        },
    ],
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@17.0.2/umd/react.development.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry:
            'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
};

module.exports = merge(prodConfig, baseConfig);
