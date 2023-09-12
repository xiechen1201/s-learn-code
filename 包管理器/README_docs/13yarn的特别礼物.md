# 13 yarn 的特别礼物

1、yarn check

验证 packages.json 和 yarn.lock 文件的一致性

2、yarn audit

可以检查安装的包有哪些已知漏洞，以表格的形式展现

- info 信息级别

- low 低级别

- moderate 中等级别

- high 高级别

- critical 最高级别

3、yarn why packageName

打印出为什么安装某个包，哪些包用到它

4、yarn create

```bash
$ yarn global add create-react-app
$ create-react-app my-app
```

```bash
# 等同于上面的两条命令
$ yarn create react-app my-app
```