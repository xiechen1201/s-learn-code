import { isObject } from "../utils";
import { mutableHandler } from "./mutableHandler";

function useReactive(target) {
  if (!isObject(target)) {
    return target;
  }
  return new Proxy(target, mutableHandler);
}

export { useReactive };
