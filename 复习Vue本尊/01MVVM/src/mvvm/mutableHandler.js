import { hasOwnProperty, isEqual, isObject } from "../utils";
import { useReactive } from "./reactive";
import { update } from "./render";

function createGetter(target, key) {
  const res = Reflect.get(target, key);

  if (isObject(res)) {
    return useReactive(res);
  }

  return res;
}

function createSetter(target, key, newValue) {
  const isKeyExist = hasOwnProperty(target, key);
  const oldValue = target[key];
  const res = Reflect.set(target, key, newValue);

  if (!isKeyExist) {
    console.log(">>>响应式新增属性：", key, newValue);
  } else if (!isEqual(newValue, oldValue)) {
    console.log(">>>响应式更改属性：", key, newValue);
    update(key, newValue);
  }

  return res;
}

export const mutableHandler = {
  get: createGetter,
  set: createSetter
};
