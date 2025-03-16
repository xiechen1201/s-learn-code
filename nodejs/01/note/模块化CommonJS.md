# 模块化CommonJS

CommonJS 是 Node 最原始的模块化方案，Node 还支持 ESM 的模块化。

Node 中每个单独的「文件」都被看作是一个「模块」！

```js
// foo.js
const circle = require('./circle.js');
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
```

```js
// circle.js
const { PI } = Math;

// 导出 area 和 circumference 两个函数
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;
```

模块内的变量都是私有的，因为 Node 将模块封装在一个函数中。

```js
(function (exports, require, module, __filename, __dirname) {
  // 模块的原始代码在这里运行
});
```

`module.exports` 是一个对象，`exports` 是一个指向 `module.exports` 的引用。

## 启用

因为 NodeJS 支持两个模块化，默认情况下符合下面的条件都视为 CommonJS：

- 文件拓展名为 .cjs

- 当 .js 文件当前目录（或者上级目录）最近的 package.json 中包含 "type": "commonjs" 字段时

- 当 .js 文件...中不包含 "type" 字段，或者任何上级都没有 package.json 文件时

    - 即使所有的模块都是 CommonJS 也应该有 "type" 字段，可以让构建工具更容量理解包文件；

- 文件拓展名不是 .mjs、.cjs、.json、.node 或者 .js 的文件

## 访问主模块

当使用 Node 运行文件的时候，第一个加载的 CommonJS 模块会被设为`require.main`，也就是主模块。

每个模块都有一个`module`对象，里面记录的模块的一些信息。

当`require.main === module`时，说明当前模块是入口文件。

但是如果入口是 ESM，`require.main` 则为`undefined`。

## 软件包管理器提示

`require()` 函数的语义被设计得足够通用，以支持合理的目录结构。

例如想要加载 /usr/lib/node/<some-package>/<some-version> 路径中的包。

- ​foo@1.2.3: /usr/lib/node/foo/1.2.3

- ​bar@4.3.2: /usr/lib/node/bar/4.3.2

软件包直接可以相互依赖，例如安装了 foo 包，foo 包可能又依赖特定版本的 bar 包，bar 包可能还有依赖，某些情况下这些依赖关系就会产生循环依赖关系。

由于 Node 加载模块的时候使用的是「绝对路径」，然后在 node_modules 中查找他们的依赖关系，因此可以使用下面的架构来解决这种情况：

- `/usr/lib/node/foo/1.2.3/`: foo 包的内容，版本为 1.2.3

- `/usr/lib/node/bar/4.3.2/`: foo 依赖的 bar 软件包的内容

- `/usr/lib/node/foo/1.2.3/node_modules/bar` -> `/usr/lib/node/bar/4.3.2` 通过符号连接

- `/usr/lib/node/bar/4.3.2/node_modules/baz` -> `/usr/lib/node/baz/2.1.0` 通过符号连接

所以即使遇到循环或者出现依赖冲突，每个模块都能获得他可以使用的依赖版本。

当 foo 加载 bar 的时候，将被符号连接到 `/usr/lib/node/bar/4.3.2` 的版本，当 bar 加载 baz 的时候，将被符号连接到 `/usr/lib/node/baz/2.1.0` 的版本。

## 使用 require() 加载 ESM 模块（实验性，需要 Node v20）

require() 仅支持符合以下要求的 ESM 模块：

- 模块完成同步。不包含顶层的 await

- 满足以下条件之一：

    - 文件拓展名是 .mjs

    - 文件拓展名为 .js，最近的 package.json 中包含 "type": "module" 字段

    - 文件拓展名为 .js，最近的 package.json 中没有 "type": "commonjs" 字段，且模块包含 ESM 模块语法

如果加载的 ESM 模块符合上面的要求，require() 可以加载它并返回命名空间对象。这种情况下，和动态的 import() 类似，但是同步运行并直接返回命名空间对象。

```js
// main.js

const distance = require("./distance.mjs");
console.log(distance);
/* 
    [Module: null prototype] { 
        distance: [Function: distance] 
    }
*/
```

如果 ESM 模块有默认导出，则命名空间对象会多一个 __esModule: true 属性。

```js
// main.js

const point = require("./point.mjs");
console.log(point);
/* 
    [Module: null prototype] { 
        __esModule: true, 
        default: [class Point] 
    }
*/
```

当 ESM 模块同时包含命名导出和默认导出的时候，require() 的结果是命名空间对象，它将默认导出放在 default 属性中，和 import() 结果类似。

```js
const point = require("./point.mjs");
console.log(point);
/* [Module: null prototype] {
  __esModule: true,
  default: [class Point],
  distance: [Function: distance]
} */
```

```js
// point.mjs
export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
```

如果要定义 require() 直接返回的内容，可以使用 "module.exports" 字符串重命名。

```js
const point = require("./point.mjs");
console.log(point);
/* [class Point] */
```

```js
// point.mjs
...
export { Point as 'module.exports' } 
```

当使用 "module.exports" 字符串重命名后，CommonJS 无法再加载命名导出，此时需要在默认导出上挂在一个属性作为命名导出：

```js
// main.js

const { distance } = require("./point.mjs");
console.log(distance); // [Function: distance]
```

```diff
// point.mjs

export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
++    static distance = distance;
}

export function distance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export { Point as 'module.exports' } 
```

## 一起来

要获取使用 require()  加载模块的确切文件名，使用 require.resolve() 方法:

```js
// main.js

console.log(require.resolve("./point.mjs"));
// /Users/xiechen/Documents/code-personal/s-learn-code/nodejs/01/code/demo2/point.mjs
```

## 缓存

模块在首次加载后会被缓存，当其他模块加载这个模块的时候，会直接从缓存中获取。

只要不修改 require.cache 中的内容，模块就会一直被缓存，例如多次调用 require("foo")，foo 内的代码也不会被多次执行。

```js
console.log(require.cache);
/* 
    [Object: null prototype] {
        '/Users/xiechen/Documents/code-personal/s-learn-code/nodejs/01/code/demo2/main.js': {
            ...
        },
        '/Users/xiechen/Documents/code-personal/s-learn-code/nodejs/01/code/demo2/point.mjs': {
            ...
        }
    }
*/
```

如果想让模块多次执行，可以导出一个函数，然后在需要的时候调用。

模块的名称是区分大小写的，因此 require("foo") 和 require("FOO") 是两个不同的模块。

## 内置模块

Node 提供了很多内置的模块，位于 lib/ 目录中。

内置模块可以使用 node: 作为前缀，**这种情况下可以绕过 require 的缓存**。

```js
require("node:fs");
```

如果使用 node: 作为模块的前缀，那么这个模块会被优先加载，即便是存在同名的文件。

使用 .builtinModules 属性可以返回所有的内置模块。

```js
console.log(require('node:module').builtinModules);

/* 
    [
    '_http_agent',         '_http_client',        '_http_common',
    '_http_incoming',      '_http_outgoing',      '_http_server',
    '_stream_duplex',      '_stream_passthrough', '_stream_readable',
    '_stream_transform',   '_stream_wrap',        '_stream_writable',
    '_tls_common',         '_tls_wrap',           'assert',
    'assert/strict',       'async_hooks',         'buffer',
    'child_process',       'cluster',             'console',
    'constants',           'crypto',              'dgram',
    'diagnostics_channel', 'dns',                 'dns/promises',
    'domain',              'events',              'fs',
    'fs/promises',         'http',                'http2',
    'https',               'inspector',           'inspector/promises',
    'module',              'net',                 'os',
    'path',                'path/posix',          'path/win32',
    'perf_hooks',          'process',             'punycode',
    'querystring',         'readline',            'readline/promises',
    'repl',                'stream',              'stream/consumers',
    'stream/promises',     'stream/web',          'string_decoder',
    'sys',                 'timers',              'timers/promises',
    'tls',                 'trace_events',        'tty',
    'url',                 'util',                'util/types',
    'v8',                  'vm',                  'wasi',
    'worker_threads',      'zlib'
    ]
*/
```

除了哪些必须使用 node: 的前缀，所列出的模块都可以不带 node: 前缀。

## 强制使用 node: 前缀的模块

某些模块必须使用 node: 前缀，这是为了防止新引入的内置模块和已经使用该名称的用户自定义包发生冲突，目前必须使用 node: 前缀的模块有：

- node:sea

- node:sqlite

- node:test

- node:test/reporters

## 周期

当存在循环 require() 调用的时候，模块会在返回时可能没有执行完成。

示例详见 code/demo03

- 当 main.js 加载 a.js 时, a.js 反过来加载 b.js

- 此时，b.js 会尝试加载 a.js

- 为了防止出现无限循环，a.js 导出对象的未完成副本将返回给 b.js 模块。

- 然后，b.js 将完成加载，并将其 exports 对象提供给 a.js 模块。

```
main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a.done = true, b.done = true
```

## 文件模块

如果加载文件的时候找不到准确的文件名，Node 会尝试添加文件拓展名 .js、.json、.node。

如果要加载不同的拓展名文件，需要将全名传递给 require()，例如 require("./foo.mjs")。

- 以 / 开头的是文件的绝对路径

- 以 ./ 开头的是 require() 文件的相对路径

- 如果没有 / ./ 或者 ../ 开头，则模式必须是内置模块或者 node_modules 下的模块

## 文件夹作为模块

文件目录下创建一个 package.json 文件，使用 main 属性指定模块入口，package.json 文件示例如下：

```json
{ 
    "name" : "some-library",
    "main" : "./lib/some-library.js" 
} 
```

require('./example') ==> ./c/lib/some-library.js

如果目录没有 package.json 文件或者  package.json 文件没有 main 属性，那么将从目录中加载 index.js 或者 index.node 文件。

- require('./example')

    - ==> ./example/index.js
    
    - ==> ./example/index.node

## 从 node_modules 中加载

如果 require() 的模块标识符不是 Node 内置模块，并且不是 / ./ ../ 开头的路径，那么 Node 将从当前模块的目录开始，并添加 /node_modules 尝试从这个目录加载模块。

如果当前目录找不到，则会向上查找，以此类推，直到文件系统的根目录：

例如 require('bar.js')

- /home/ry/projects/node_modules/bar.js

- /home/ry/node_modules/bar.js

- /home/node_modules/bar.js

- /node_modules/bar.js

也可以通过在模块名称后面添加路径后缀，可以要求使用模块特定的子模块，例如 require('example-module/path/to/file')，将解析相对于 example-module 的 path/to/file，后缀路径和上面的模块解析流程一样。

## 从全局文件夹加载

## 模块封装器

在执行模块化代码之前，Node 会使用一个函数包装器对其进行包装，看起来像是：

```js
(function(exports, require, module, __filename, __dirname) {
    // Module code actually lives in here
}); 
```

通过这样，Node 实现了：

- var、const、let 定义的都是局部变量，而不是全局的；

- 可以直接使用 __filename、__dirname 变量；

## 模块范围

### __dirname

返回当前「模块」的「目录名」,和 __filename 类似,和 paht.dirname() 相同。

```js
console.log(__dirname);
// Prints: /Users/mjr
console.log(path.dirname(__filename));
// Prints: /Users/mjr
```

### __filename

返回当前「模块」的「文件名」。

返回模块文件的绝对路径，已解析符号连接。

```js
console.log(__filename);
// Prints: /Users/mjr/example.js
console.log(__dirname);
// Prints: /Users/mjr
```

### exports

对 module.exports 的引用

### module

对当前模块的引用

### require()

用于导入模块、JSON 和本地文件。

### require.cache

模块在需要的时候会缓存在这个对象中，键是模块的文件名，值是模块的导出对象。

从该对象删除键值后，再一次 require() 时会重新加载模块。

### require.main

代表 Node 进程启动时候加载入口文件的 Module 对象，如果程序入口点不是 CommonJS 模块，则为 undefined。

### require.resolve(request [, options])

用于查找模块的位置，但是不加载模块，只返回解析后的文件名。

- request 要解析的模块路径；

- options

    - paths 指定查找的起点

```js
const localPath = require.resolve('./my-module');
console.log(localPath); // '/project/src/my-module.js'
```

```js
const path = require.resolve('my-package', {
  paths: [path.join(__dirname, 'src')] 
});
console.log(path); // '/project/src/node_modules/my-package/index.js'
```

### require.resolve.paths(request)

返回 Node.js 在解析指定模块时会搜索的​路径数组，帮助理解模块查找逻辑。

```js
console.log(require.resolve.paths('example.js'));
```

## module 对象

module 对象表示当前模块的对象引用。

### module.children

### module.exports

exports 是 module.exports 的快捷方式 `module.exports.f = ...` ==> `exports.f = ...`

不过需要注意，如果给 exports 赋值了新的值，则不再与 module.exports 绑定。

### module.filename

### module.id

### module.isPreloading