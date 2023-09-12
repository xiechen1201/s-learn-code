# 07 npm 脚本

开发的时候会反复的使用很多 CLI 命令，比如启动本地服务器、打包、测试、代码格式化等等。

命令太多，用法也不一样，非常难记忆

于是 npm 支持了脚本，在 package.json 文件中配置 script 用来配置脚本

```json
// package.json
"script":{
    "start": "node ./index.js",
    "dev": "webpack-dev-server --config ./build/webpack.config.js",
    "build": "webpack --config ./build/webpack.config.js"
}
```

不再需要使用 `webpack-dev-server --config ./build/webpack.config.js` 启动本地服务器，直接使用 `npm run dev` 即可

总结：把平时用的 CLI 进行配置，然后使用 npm run 执行

script 可以配置任何电脑可以运行的 CLI，最后使用统一的命令

省略 npx，相当于启动一个命令行窗口，把 node_modules/.bin 执行文件运行

