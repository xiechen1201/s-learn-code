import observeArr from "./observeArr.js";

const ARR_METHODS = ["push", "pop", "shift", "unshift", "splice", "reverse"];

let oldArrProto = Array.prototype;
let newArrProto = Object.create(oldArrProto);

ARR_METHODS.forEach((methds) => {
  newArrProto[methds] = function () {
    let value = Array.from(arguments);
    oldArrProto[methds].apply(this, value);

    observeArr(value);
  };
});

export { newArrProto };
