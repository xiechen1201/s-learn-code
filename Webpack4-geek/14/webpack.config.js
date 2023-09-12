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
        // loader 的执行是链式调用的，也是从右到左的，也就是先被 css-laoder 进行处理，再交给 style-loader 进行处理
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        // loader 的执行是链式调用的，也是从右到左的，也就是先被 css-laoder 进行处理，再交给 style-loader 进行处理
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  }
};
