import observe from "./observe.js";

function defineReactiveData(data, key, value) {
  observe(value);

  Object.defineProperty(data, key, {
    get() {
      console.log("响应式获取：", key);
      return value;
    },
    set(newValue) {
      console.log("响应式设置：", key, newValue);
      observe(newValue);
      value = newValue;
    }
  });
}

export default defineReactiveData;
