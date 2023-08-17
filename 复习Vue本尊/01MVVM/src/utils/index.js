function isObject(val) {
  return typeof val === "object" && val !== null;
}

function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

function isEqual(newVal, oldValue) {
  return newVal === oldValue;
}

function randomNum() {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}

function checkType(str) {
  const reg_check_str = /^[\'\"](.*?)[\'\"]/;
  const reg_str = /(\'|\")/g;

  if (reg_check_str.test(str)) {
    return str.replace(reg_str, "");
  }

  switch (str) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      break;
  }

  return Number(str);
}

export { isObject, hasOwnProperty, isEqual, randomNum, checkType };
