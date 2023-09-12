const path = require("path");
const glob = require("glob");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const setMAP = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  // 获取所有的入口文件
  const entryFiles = glob.sync(path.join(__dirname, "../src/pages/*/index.js"));
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
        template: path.join(__dirname, `../src/pages/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName, 'common'],
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

module.exports = {
  setMAP
};
