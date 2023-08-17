# 4、babel 的使用指南\_下

1、安装

```bash
$ npm install @babel/core @babel/cli @babel/preset-env --save-dev
```

2、配置 babel 的配置文件

当运行 babel 的时候，babel 查找自己的配置文件，然后根据配置执行构建

现在 env preset 只会为目标浏览器中没有的功能加载转换插件。

## polyfill

@babel/polyfill 提供了 es6 标准库的垫片，然后我们可以使用例如 Promise、Map 等 ES6 的构造函数。

