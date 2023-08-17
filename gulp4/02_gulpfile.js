const gulp = require("gulp");
const cssMin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");

// css 文件处理
const cssHandler = () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssMin())
    .pipe(gulp.dest("./dist/css/"));
};

// sass 文件的处理
const sassHandler = () => {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssMin())
    .pipe(gulp.dest("./dist/sass/"));
};

// js 文件的处理
const jsHandler = () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"));
};

// html 文件的处理
const htmlHandler = () => {
  return gulp
    .src("./src/pages/*.html")
    .pipe(
      htmlmin({
        // 表示移除空格
        collapseWhitespace: true,
        // 表示移除空的属性（仅系统属性）
        removeEmptyAttributes: true,
        // 移除布尔属性的值，例如 checked="checked"
        collapseBooleanAttributes: true,
        // 移除属性上的双引号
        removeAttributeQuotes: true,
        // 压缩内嵌 css 代码（只能进行压缩，无法进行添加前缀）
        minifyCSS: true,
        // 压缩内嵌 JS 代码（只能进行压缩，无法进行语法转换）
        minifyJS: true,
        // 移除 style 和 link 标签的 type 属性
        removeStyleLinkTypeAttributes: true
      })
    )
    .pipe(gulp.dest("./dist/pages/"));
};

// 图片的处理
const imageHandler = () => {
  return gulp.src("./src/images/**").pipe(gulp.dest("./dist/images/"));
};


/* module.exports.cssHandler = cssHandler;
module.exports.sassHandler = sassHandler;
module.exports.jsHandler = jsHandler;
module.exports.htmlHandler = htmlHandler;
module.exports.imageHandler = imageHandler; */

// 方式一
/* gulp.task("default",()=>{

}) */

// 方式二
module.exports.default = gulp.series(
  cssHandler,
  sassHandler,
  jsHandler,
  htmlHandler,
  imageHandler
);
