const path = require("path");

// webpack 运行在 Node 的环境下， 所以需要使用 CommonJS 的模块化
module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  mode: "production",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      /*  {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader"
      }, */
      {
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
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: "file-loader"
      }
    ]
  }
};
