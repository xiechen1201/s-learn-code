# 3、babel 的使用指南\_上

安装

```bash
$ npm install @babel/core @babel/cli @babel/preset-env --save-dev

$ npm install @babel/polyfill
```

babel7 之后包名都改了，之前是 babel-core

然后创建 babel 的配置文件 .babelrc（这是 babel6 的用法），babel7 是 babel.config.js

```js
{
    "presets": [
      [
        "@babel/preset-env",
        {
          // 要支持的浏览器的版本
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1"
          },
          "useBuiltIns": "usage",
          "corejs": "3.6.5"
        }
      ]
    ]
  }
```

然后我们新建一个 src/index.js 文件，写一些 ES6 的代码

然后运行 babel 进行编译：

```bash
$ npx babel src --out-dir dist
```

然后你会发现代码基本没有变化，可能是因为你要支持的浏览器版本太高，这些版本已经可以兼容你写的 ES6 代码了

如果我们把版本降低一些，就可以了：

```js
 "targets": {
          "ie": "7",
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        }
```

最后运行，查看效果

```bash
$ npx babel src --out-dir dist
```

以上是基本的配置，下面单独介绍这些工具：

babel 的工具：

- @babel/core

- @babel/cli

- @babel/preset-env

个人理解：preset-env 是 plugins 的集合，里面包含了大量的 plugins，这样我们就不用一个一个的导入插件了

```js
"scripts": {
    "build": "babel src --out-dir dist",
    "build:arrow": "babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions",
    "build:presets": "babel src --out-dir dist --presets=@babel/env"
  }
```

babel 的 preset 可以通过命令行参数的形式进行指定，也可以通过 babel 的配置文件进行指定