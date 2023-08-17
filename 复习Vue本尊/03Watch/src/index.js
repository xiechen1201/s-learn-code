import Vue from "../Vue";

const vm = new Vue({
  data() {
    return {
      result: 0
    };
  },
  watch: {
    // 监听 data 中的 result
    result(newVal, oldVal) {
      console.log("watch result:", newVal, oldVal);
    }
  }
});

console.log(vm);

vm.result = 100;
vm.result = 200;

console.log(vm.result);
