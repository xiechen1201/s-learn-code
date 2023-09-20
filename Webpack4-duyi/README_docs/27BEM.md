# 27 BEM & CSS in js

## BEM

主要是为了解决类名冲突的问题

在 BEM 中不建议使用嵌套选择器

本章和 Webpack 没有关系，就是一种命名规范

```css
.xxx .xxx .xxx {
}
```

## css in js

这种方式非常的激进

```js
const styles = {
  backgroundColor: "red",
  color: "white",
  width: "100px"
};
```
