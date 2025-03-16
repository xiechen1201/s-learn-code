# 模块化ESM

ESM 是 JS 代码模块化的标准，使用各种 import/export 定义的。

## 启用

Node 支持 CommonJS 和 ESM 两个模块化。

可以通过 .mjs、值为 "type": "module" 的属性，或者 CLI --input-type=module 告诉 Node 将 JS 解析为 ESM。

反之，.cjs、值为 "type": "commonjs" 的属性，或者 CLI --input-type=commonjs 告诉 Node 将 JS 解析为 CommonJS。

如果代码缺少任何一种显式地的标记，Node 都检查模块源代码查找 ES 语法，如果发现这种语法则使用 ES 模块的形式运行代码，否则以 CommonJS 的形式运行模块。

## Package 包

### import

import 的语句指定符是 from 后面的字符串，例如 `import { seq } from "node:path"`

三种类型规格器：

- 相对路径

- 绝对路径

- 裸路径

    - 裸路径的解析由 Node 模块解析和加载算法处理

和 CommonJS 一样，包内的模块文件可以通过携带附加路径来访问。除非包的 package.json 包含 export 字段，这种情况包内的文件只能通过 export 中定义的路径来访问。

### 强制拓展名

使用 import 解析相对路径或绝对路径的时候，必须提供文件拓展名（./startup/index.js），这和浏览器环境中的行为是一致的。

### URLs

ESM 也可以解析 URL，特殊字符必须进行编码。

支持 file: node: data: 的 URL 方案，除非使用自定义的 HTTPS 加载起，否则 NodeJS 本身不支持 `https://example.com/app.js` 这样的指定符。

#### file: URLs 

如果解析模块的指定符有不同的查询参数，则会多次加载模块。

```js
import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
```

#### data: imports

支持使用以下 MIME 类型导入 data: URL

- text/javascript 解析为 ESM

- application/json 解析为 JSON

- application/wasm 解析为 Wasm

```js
import 'data:text/javascript,console.log("hello!");';
import _ from 'data:application/json,"world!"' with { type: 'json' };
```

#### node import

用于加载 Node 的内置模块

```js
import fs from 'node:fs/promises';
```

### import 导入属性

导入属性是模块导入语句的内联语法，可在模块指定符在外传递更多信息。

```js
import fooData from './foo.json' with { type: 'json' };

const { default: barData } =
  await import('./bar.json', { with: { type: 'json' } }); 
```

目前支持 type: json

## 内置模块

内置模块提供公共 API 的命名导出，也提供默认导出。

```js
import fs, { readFileSync } from 'node:fs';
```

## import() 表达式

CommonJS 和 ESM 都支持动态的 import()，在 CommonJS 中它可用于加载 ES 模块。

## import.meta

### import.meta.dirname（非标准）

### import.meta.filename（非标准）

### import.meta.url

返回模块文件的路径。

### import.meta.resolve(specifier)

## 和 CommonJS 的互操作性

**import 可以导入 ESM 或 CommonJS，import 只能在 ESM 中使用，但 CommonJS 支持使用 import() 加载 ESM。**

当导入 CommonJS 的时候，module.exports 对象作为默认导出提供。

CommonJS 目前只能加载同步的 ESM（也就是不使用顶层 await 的 ESM）（非标准）。

## CommonJS 命名空间

## ESM 和 CommonJS 的区别

- 没有 require、exports/module.exports

    - 在大多数情况下，ESM 的 import 可以加载 CommonJS

- 没有 __filename __dirname

    - 使用 import.meta 代替

## JSON 模块

JSON 文件也可以使用 import 导入

```js
import packageConfig from './package.json' with { type: 'json' };
```

## Wasm 模块

## 顶层 await

例如一个模块

```js
// a.mjs

export const five = await Promise.resolve(5);
```

```js
// b.mjs

import { five } from './a.mjs';
console.log(five); // Logs `5`
```

如果顶层 await 从未解析，node 的进程会以 13 的状态码退出。