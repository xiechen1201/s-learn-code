const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const glob = require("glob");

const setMAP = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  // 获取所有的入口文件
  const entryFiles = glob.sync(path.join(__dirname, "./src/pages/*/index.js"));
  // 得到一个数组：
  /* 
    [
      /Users/xiechen/Documents/code-personal/learn-to-code/Webpack4/24/src/index/index.js,
      /Users/xiechen/Documents/code-personal/learn-to-code/Webpack4/24/src/search/index.js,
    ]
  
  */
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/pages\/(.*?)\//);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      new HTMLWebpackPlugin({
        template: path.join(__dirname, `src/pages/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugin
  };
};

const { entry, htmlWebpackPlugin } = setMAP();

module.exports = {
  mode: "development",
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
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
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  // 全部浏览器的最后 2 个版本
                  // 使用人数 >1% 的浏览器
                  // ios7 以上的浏览器
                  browsers: ["last 2 version", ">1%", "ios 7"]
                })
              ]
            }
          },
          {
            loader: "px2rem-loader",
            options: {
              // rem 相对于 px 转换的单位，1rem 就是 75px，对应的就是 750px de 设计稿
              remUnit: 75,
              // px 转换为 rem 后的小数点位数
              remPrecesion: 8
            }
          }
        ]
      },
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ].concat(htmlWebpackPlugin)
};
