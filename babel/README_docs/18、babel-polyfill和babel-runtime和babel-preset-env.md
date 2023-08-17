# 6、babel-polyfill 和 babel-runtime 和 babel-preset-env

- babel-polyfill

  垫片，主要是填补一些低版本浏览器不支持的对象

- babel-runtime

  babel-runtime 主要是对 babel-polyfill 进行拆分，将一些不经常使用的垫片进行拆分，只保留经常使用的垫片，这样在打包的时候，打包出来的文件就会小很多

- babel-preset-env

  主要是一些插件的合集

  babel-preset-env 主要是根据不同的浏览器环境，来设置不同的 babel 编译配置，比如：

  ```js
  {
      "presets": [
          [
              "env",
              {
                  "targets": {
                      "browsers": [
                          "> 1%",
                          "last 2 versions",
                          "not ie <= 8"
                      ]
                  }
              }
          ]
      ]
  }
  ```
