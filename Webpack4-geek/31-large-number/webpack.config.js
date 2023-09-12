const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "none",
  entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    library: "largeNumber",
    libraryTarget: "umd", // AMD、ESM、Script 的方式引入
    libraryExport: "default" // 导出的对象
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};
