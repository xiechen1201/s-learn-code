const babel = require("@babel/core");

const code = `
const sayHi = () => {
    console.log("Hello, Babel!");
};
sayHi();`;

const result = babel.transform(code, {});

console.log(result.code);
