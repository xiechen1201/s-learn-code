# npm常用命令

```bash
# 查看命令列表
npm help

# 查看 npm 注册表中的内容
npm search <package_name>

# 查看已经安装的软件包
npm ls
```

## npm init

用于设置新的或者现有的 npm 软件包。

```bash
npm init <initializer>
```

别名：

- create

initializer 是一个名为 create-initializer 的 npm 软件包，npm 会自动安装它并运行它。

## npx

从本地或者远程 npm 注册表安装并执行软件包。