# 15 nvm

nvm 不是包管理，它是用于管理多个 node 版本的工具。

在实际的开发中，经常需要使用多个版本的 node，比如 0.10.x，0.12.x，4.x，5.x，6，在这个场景下，nvm 就可以派上用场了。

详见：https://github.com/nvm-sh/nvm

安装完成后，可以在命令行管理 Node 的版本。

```bash
# 查看本机的系统架构
$ nvm arch

# 查看本机已安装的 Node 版本
$ nvm list

# 查看 Node 所有的可用版本
$ nvm list available

# 设置 nvm 下载 node 和 npm 的时候使用指定的镜像源
$ nvm node_mirror https://npm.taobao.org/mirrors/node/
$ nvm npm_mirror https://npm.taobao.org/mirrors/node/

# 安装指定的 Node 版本
$ nvm install 8.5.4

# 使用 Node 的某个版本
$ nvm use 8.5.4

# 查看 nvm 下载 node 的位置
$ nvm root

# 删除某个 Node 版本
$ nvm uninstall 8.5.4
```

切换 Node 后，每个版本都对应了一个 npm 的版本