import { reactive } from "./reactive";
import Watcher from "./Watcher";

class Vue {
  constructor(options) {
    // 这里是 Vue 类的入口
    const { data, watch } = options;

    this.$data = data();
    this.init(this, watch);
  }

  init(vm, watch) {
    // 这里主要处理一些初始化的数据
    this.initData(vm);

    const watcherIns = this.initWatcher(vm, watch);
    this.$watch = watcherIns.invoke.bind(watcherIns);
  }

  initData(vm) {
    // 处理 data() 中的响应式数据
    reactive(
      vm,
      (key, value) => {},
      (key, newVal, oldVal) => {
        this.$watch(key, newVal, oldVal);
      }
    );
  }

  initWatcher(vm, watch) {
    // 处理 watch 中的监听数据

    const watcherIns = new Watcher();

    for (const key in watch) {
      watcherIns.addWatcher(vm, watch, key);
    }

    return watcherIns;
  }
}

export default Vue;
