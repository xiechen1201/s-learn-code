"use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
const sayHi = () => {
  console.log("Hello, Babel!");
};
sayHi();
Promise.resolve().finally();