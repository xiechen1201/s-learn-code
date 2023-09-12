# 14 cnpm 包管理

过去 npm 没有提供 registry 的功能，所以淘宝提供了一个 cnpm 的包管理器。

cnpm 支持和 npm 几乎所有的命令。

如果 npm 已经支持修改 registry，那么 cnpm 用处就不大了。

```bash
# 安装
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

剩下的命令和 npm 几乎一致！