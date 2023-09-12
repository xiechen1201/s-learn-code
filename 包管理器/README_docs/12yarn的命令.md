# 12 yarn 的命令

1、初始化

```bash
$ yarn init [--yes/-y]
```

2、安装

```bash
# 添加指定的包
$ yarn [global] add packageName [--dev/-D] [--exact/-E]

# 安装 package.json 中所以的依赖
$ yarn install [--production/--prod]
```

3、运行本地的 CLI

运行脚本：

```bash
$ yarn run 命令
```

> start、stop、test 可以省略 run

运行本地安装的 CLI：yarn run CLI 名

4、查询

```bash
# 查询 bin 目录
$ yarn [global] bin

# 查询包信息
$ yarn info packageName [子字段]

# 查看已经安装的依赖
# yarn list 比 npm list 更加的丰富
$ yarn [global] list [--depth=依赖深度]
```

5、更新

```bash
# 列举需要更新的包
$ yarn outdated

# 更新包
$ yarn [global] upgrade [packageName]
```

6、卸载

```bash
$ yarn remove packageName
```
