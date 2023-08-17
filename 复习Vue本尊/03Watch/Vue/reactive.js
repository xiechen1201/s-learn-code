function reactive(vm, __get__, __set__) {
  const _data = vm.$data;

  for (const key in _data) {
    Object.defineProperty(vm, key, {
      get() {
        __get__(key, _data[key]);
        return _data[key];
      },
      set(newVal) {
        const oldVal = _data[key];
        _data[key] = newVal;

        __set__(key, newVal, oldVal);
      }
    });
  }
}

export { reactive };
