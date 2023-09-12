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
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  }
};
