const loaderUtils = require("loader-utils");

module.exports = function (sourceCode) {
    console.log(sourceCode);

    const options = loaderUtils.getOptions(this);
    console.log(options);

    return sourceCode.replace("变量", options.changeVar);
};
