# 模块化Package

软件包是由 package.json 文件描述的文件夹树。

## 确定模块系统

当以下内容作为 Nodejs 的初始输入传递，或被 `import` 语句或 `import()` 表达式引用时，Node.js 会将其视为 ES 模块：

- .mjs 文件

- 最近的父级包含一个 type: module 的字段，文件拓展名为 .js

- 代码中包含只能作为 ESM 并成功解析的语法（import、export、import.meta）

以下内容被加载的时候被视为 CommonJS：

- .cjs 文件

- 最近的父级包含一个 type: commonjs 的字段，文件拓展名为 .js

- .js 文件，且没有 type 字段

推荐始终确定模块化语法，并在 package.json 中设置 type 字段。

## 语法检测（实验性）

## 模块加载器

- CommonJS

    - 处理 require()

    - 完全同步

    - 支持文件夹作为模块

    - 自动补全拓展名

    - .json 视为 JSON 文本文件

    - 只有 ESM 不包含顶层 await 的时候才能从 CommonJS 加载 ESM

- ESM

    - 异步的

    - 处理 import 和 import()

    - 不支持文件夹作为模块

    - 不会补全拓展名

    - 可以加载 JSON 模块，但是需要导入类型属性

    - 可以加载 CommonJS 模块

## package.json 和文件拓展名

package.json 中的 type 字段定义了 Node 如何解析 .js 文件，如果没有这个属性，那么 .js 文件会被看作是 CommonJS。

"type" 不仅适用于初始化入口 node my-app.js，也适用于 import 和 import() 引用的文件。

```js
// my-app.js，由于同一文件夹下存在 package.json 文件，且其中包含 "type": "module"，因此被视为 ES 模块。

import './startup/init.js';
// 由于 ./startup 目录中没有 package.json 文件，因此该文件继承上一级目录的 "type" 值，被加载为 ES 模块。

import 'commonjs-package';
// 由于 ./node_modules/commonjs-package/package.json 文件**没有 "type" 字段**或**包含 "type": "commonjs"**，因此被加载为 CommonJS 模块。

import './node_modules/commonjs-package/index.js';
// 由于 ./node_modules/commonjs-package/package.json 文件**没有 "type" 字段**或**包含 "type": "commonjs"**，因此被加载为 CommonJS 模块。
```

以 .mjs 结尾的文件总是作为 ESM，和最近的 package.json 文件无关。

以 .cjs 结尾的文件总是作为 CommonJS，和最近的 package.json 文件无关。

.mjs 和 .cjs 可用于在同一个软件包中混合使用类型：

- 在 type: module 的情况下，加载 .cjs 的文件被视为 CommonJS 

- 在 type: commonjs 的情况下，加载 .mjs 的文件被视为 ESM 

## --input-type

## 确定软件包管理器

## 软件包入口点

在软件包的 package.json 中，有两个字段可以作为软件包的入口点：

- main

- export

它们同时适用于 ESM 和 CommonJS。

所有的版本都支持 main，但是功能有限，只能定义包的主入口点。

exports 是 main 的替代方案，允许定义多个入口点，支持不同环境的入口解析。

对于当前支持的 Node 版本新的软件包，建议使用 export。对于 Node v10 及以下的软件包，需要使用 main 字段。

如果同时存在 export 和 mian，那么 export 优先级更高。

如果一个包添加了 `"exports"` 字段，使用者就不能再直接访问未公开的文件，比如 `package.json`（比如 `require('your-package/package.json')` 这种用法就会失效）。这样可能会导致原有的代码无法正常运行。

为了 export 的引入不具有破坏性，请确保导出之前支持每个入口点：

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/index": "./lib/index.js",
    "./lib/index.js": "./lib/index.js",
    "./feature": "./feature/index.js",
    "./feature/index": "./feature/index.js",
    "./feature/index.js": "./feature/index.js",
    "./package.json": "./package.json"
  }
}
```

还可以使用导出模式导出带有或者不带子路径的整个文件夹：

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/*": "./lib/*.js",
    "./lib/*.js": "./lib/*.js",
    "./feature": "./feature/index.js",
    "./feature/*": "./feature/*.js",
    "./feature/*.js": "./feature/*.js",
    "./package.json": "./package.json"
  }
}
```

## 入口和出口

编写新的软件包的时候，推荐使用 exports

## 子路径

使用 exports 的时候，可以将 . 视为 主入口

./xxx 视为子路径

使用为定义的子路径则会报错

## 子路径导入

除了 exports 还有一个 imports 字段，用于创建包内导入规范的私有映射。

简化内部模块导入：避免写复杂的相对路径，例如 import '../../../utils.js'

```json
{
  "name": "my-package",
  "type": "module",
  "imports": {
    "#utils": "./src/utils.js",
    "#config": "./config/index.js"
  }
}
```

```js
import { helper } from "#utils";
import config from "#config";
```

## 有条件出口

条件导出提供一种根据特定条件映射不同路径的方法，CommonJS 和 ESM 都支持条件导出。

```json
// package.json

{
  "exports": {
    "import": "./index-module.js",
    "require": "./index-require.cjs"
  },
  "type": "module"
}
```

Node 提供了以下条件，并按照具体到不具体排序：

- node-addons

- node

- import

- require

- module-sync

- default

在 exports 对象中，键的顺讯非常重要，上面的优先于下面的。

## 嵌套条件

## 社区条件定义

- types 用于 TS

- browser 任何忘了浏览器环境

- development

- production

## package.json 字段定义

- name

- main

- packageManager

- type

- exports

- imports