const gulp = require("gulp");
const cssMin = require("gulp-cssmin");

// gulp3 的写法：
/* 
  // 1、创建任务
  gulp.task("cssHandler", function () {
  // 2、选择源文件
  // 3、进行压缩
  // 4、放到 dist/css 目录下
  // 5、运行命令 gulp cssHandler 执行任务
  return gulp.src("./src/css/*.css").pipe(cssMin()).pipe(gulp.dest("./dist/css/"));
  // return 表示任务结束
}); */

// gulp4 的写法：
/* const cssHandler = () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(cssMin())
    .pipe(gulp.dest("./dist/css/"));
};

module.exports.cssHandler = cssHandler; */
