const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.less$/,
        // use: ["style-loader", "css-loader?modules", "less-loader"]
        use: [MiniCssExtractPlugin.loader, "css-loader?modules", "less-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:5].css"
    })
  ]
};
