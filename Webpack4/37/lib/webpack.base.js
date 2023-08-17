const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const { setMAP } = require('../build/glob');

const { entry, htmlWebpackPlugin } = setMAP();

module.exports = {
    stats: 'errors-only',
    entry,
    module: {
        rules: [
            // 'eslint-loader'
            { test: /\.js$/, use: ['babel-loader'] },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    // 全部浏览器的最后 2 个版本
                                    // 使用人数 >1% 的浏览器
                                    // ios7 以上的浏览器
                                    browsers: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            // rem 相对于 px 转换的单位，1rem 就是 75px，对应的就是 750px de 设计稿
                            remUnit: 75,
                            // px 转换为 rem 后的小数点位数
                            remPrecesion: 8,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ].concat(
        htmlWebpackPlugin,
    ),
};
