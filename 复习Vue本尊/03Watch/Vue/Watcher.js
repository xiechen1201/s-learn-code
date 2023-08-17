class Watcher {
  constructor() {
    this.watchers = [];
  }

  addWatcher(vm, watcher, key) {
    this._addWatchProp({ key, fn: watcher[key].bind(vm) });
  }

  invoke(key, newVal, oldVal) {
    // 用 addWatcher 保存的值去遍历对比
    this.watchers.map((item) => {
      if (item.key === key) {
        // 调用 result() 传入新值、旧值
        item.fn(newVal, oldVal);
      }
    });
  }

  _addWatchProp(watchProp) {
    this.watchers.push(watchProp);
  }
}

export default Watcher;
