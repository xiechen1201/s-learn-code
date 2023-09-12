# 09 npm 的命令

```bash
$ 
```

## 安装

```bash
$ npm install packageName --save
$ npm install packageName --save-dev

# 精确版本安装
$ npm install packageName --save-exact
$ npm install packageName -E

# 安装指定版本
$ npm install packageName@版本号 --save-dev
```

## 查询

查询安装路径

```bash
# 查询 node_module 的安装路径
# -g 表示全局
$ npm root [-g]
```

查询包信息

```bash
$ npm view 包名 [子信息]
# view 的别名：v info show

# 例如
$ npm info vue
$ npm info vue version
```

查询目前已经安装的包

```bash
$ npm list [-g] [--depth=依赖深度]
# list 的别名： ls la ll
# --depth 选项表示查看依赖的深度
```

## 更新

检查哪些包需要更新

```bash
$ npm outdated
```

更新包

```bash
$ npm update [-g] [包名]
# update 的别名：up，upgrade
# 如果不加包名就是更新全部的包
```

更新 npm 本身：

npm 和 node 是绑定的，如果想单独更新 npm，可以直接安装 npm

```bash
$ npm i -g npm
```

## 卸载包

```bash
$ npm uninstall [-g] 包名
# uninstall 的别名：remove，rm，r, un, unlink
```

## npm 的配置

查看当前的生效配置内容：

```bash
$ npm config ls [-l --json]
```

获取某个配置项：

```bash
$ npm config get 配置项
$ npm config set 配置项=内容
$ npm config delete 配置项
```