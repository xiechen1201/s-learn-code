// const distance = require("./distance.mjs");
// console.log(distance);
/* 
    [Module: null prototype] { 
        distance: [Function: distance] 
    }
*/

const { distance } = require("./point.mjs");
console.log(distance);
/* 
    [Module: null prototype] { 
        __esModule: true, 
        default: [class Point] 
    }
*/

console.log(require.resolve("./point.mjs"));
// /Users/xiechen/Documents/code-personal/s-learn-code/nodejs/01/code/demo2/point.mjs

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
