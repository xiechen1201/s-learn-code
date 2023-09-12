const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// webpack 运行在 Node 的环境下， 所以需要使用 CommonJS 的模块化
module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    search: "./src/search.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[hash:8].js"
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        // use: ["style-loader", "css-loader", "less-loader"]
        // style-loader 和 MiniCssExtractPlugin.loader 是互斥的
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]"
            }
          }
        ]
      },
      /*   {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 小于 10k 就是 base64 的转换
              limit: 10240
            }
          }
        ]
      }, */
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 把 css 抽取为一个单独的文件
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    })
  ]
};
