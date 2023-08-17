# gulp

gulp 进行全局安装。

gulp 的主流版本就是

- gulp@3，gulp 3.9.1

- gulp@4，gulp cli 2.3.0

gulpfile.js 文件是 gulp 打包的入口文件。

gulpfile.js 书写打包流程。

项目内需要再次进行安装 gulp，以本地模块的形式，为了给你提供本地引用 gulp 的 api。

## gulp 常用的 API

- gulp.task(taskName, [deps], fn)

  说明：创建一个基于流的任务

  ```js
  gulp.task("htmlHandler", function () {
    // 找到 html 源文件，进行压缩打包，放入指定目录
  });
  ```

- gulp.src(globs[, options])

  说明：获取源文件，返回一个 stream

  ```js
  gulp.src("src/pages/*.html"); // 寻找全部文件
  gulp.src("src/pages/index.html"); // 寻找 index 文件
  gulp.src("src/pages/**"); // 寻找 pages 下的所有文件
  gulp.src("src/**/*"); // 寻找所有目录下的所有文件
  ```

- gulp.dest(path[, options])

  说明：将 stream 放入到指定的目录

  ```js
  gulp.dest("./dist"); // 放入到 dist 目录下
  ```

- gulp.watch(path [, opts], tasks)

  说明：监视目录下的文件，当文件变化时，重新执行任务

  ```js
  // 监听 page 下的文件，变化的时候重新执行 htmlHandler 任务
  gulp.watch("src/pages/*.html", ["htmlHandler"]);
  ```

- gulp.series(tasks1, tasks2, ...)

  说明：逐个执行多个任务，前一个任务执行完成后，继续执行任务 2

- gulp.parallel(tasks1, tasks2, ...)

  说明：同时开始多个任务

- gulp.pipe(tasks1, tasks2, ...)

  说明：管道函数，所有的 gulp API 都是基于流，接受当前流进入下一个流的管道函数

  ```js
  gulp.src("./page/*").pipe(压缩任务).pipe(转码).pipe(gulp.dest("./dist"));
  ```

案例：打包一个 CSS 任务

## gulp 常用的插件

### CSS 文件的处理

插件就是用来执行各种各样的任务

- gulp-cssmin，用于压缩 CSS 文件

- gulp-autoprefixer，自动添加浏览器前缀

- gulp-sass，用于编译 SASS 文件

  很容易报错，这是因为 gulp-sass 需要依赖 node-sass，node-sass 很难下载成功，因为之前都是在一个地方下载，后来 node-sass 自己有一个单独的下载地址，如果你不进行 node-sass 的下载地址配置，就很容易失败

  解决：给 node-sass 配置一个下载地址，下载其他依赖还是统一的地址

  设置 node-sass 的地址为淘宝镜像源

### JS 文件的处理

- gulp-uglify，用于压缩 JS 文件

  不能写 ES6 的语法

- gulp-babel，用于将 ES6 语法转换为 ES5 语法

  gulp-babel@7，大部分使用在 gulp@3 里

  gulp-babel@8，大部分使用在 gulp@4 里

  还需要依赖另外两个包：babel-core、babel-preset-env

### HTML 文件的处理

- gulp-htmlmin，用于压缩 HTML 文件

### 资源文件的处理

在开发环境的时候，不需要我们压缩，直接使用线上的地址，或者 UI 给我们的时候已经进行了压缩，再压缩就失真了

- gulp-imagemin，用于压缩图片，无损压缩，压缩程度最高 7 级，1024k 变为 1023 , 一般不用，直接复制到 dist 文件夹下面即可

## 配置默认任务

默认任务就是把所有的任务都执行掉

使用 gulp.series() 或者 gulp.parallel() 把任务组合起来

这两个方法的返回值不是流，而是一个函数

返回值可以直接被当作任务函数使用

## 配置删除任务

我们进行 gulp 任务的时候，不会进行输出文件夹的清理，之后把任务进行处理，然后把结果放到输出目录中

所以我们需要每次打包之前都删除输出目录，防止一些无用的文件

- del，删除文件目录，导入就得到一个函数

## 启动服务

开发环境如何启动一个服务器？用于模拟线上环境

gulp 是基于 node 环境的工具，node 是一个可以做服务器的语言，gulp 可以启动一个基于 node 的服务器

指定 dist 为根目录，如果指定 src 为根目录，sass 文件还没进行处理，浏览器无法解析

- gulp-webserver，启动一个基于 node 的服务器

这个时候，你手动的修改 dist 下文件的内容，浏览器会自动刷新

## 创建一个监控任务

```js
const watchHandler = () => {
  gulp.watch("./src/css/*.css", cssHandler);
};
```

## gulp 打包组件

场景：写网站的时候，很多页面部分都是可以复用的，比如头部，底部，侧边栏，这些部分都是可以复用的，我们就可以把这部分抽离出来，单独作为一个组件，然后其他页面引用这个组件

把重复的位置单独拿出来，写成一个 html 片段，可以包含 css 和 js

- gulp-file-include，可以包含 html 片段，css 片段，js 片段