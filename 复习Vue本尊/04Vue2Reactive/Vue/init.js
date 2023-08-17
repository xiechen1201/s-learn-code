import proxyData from "./proxy.js";
import observer from "./observe.js";

function initState(vm) {
  let options = vm.$options;

  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  data = vm.$data = typeof data === "function" ? data() : data;

  for (const key in data) {
    proxyData(vm, "$data", key);
  }

  observer(vm.$data);
}

export { initState };
