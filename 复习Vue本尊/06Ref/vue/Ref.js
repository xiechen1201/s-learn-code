import { update } from "./render.js";

class Ref {
  constructor(initialValue) {
    this.deps = new Set();
    this._defaultValue = initialValue;
    this._value = initialValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    console.log("数据劫持！！！");
    this._value = newValue;
    update(this);
  }

  $reset() {
    this._value = this._defaultValue;
    update(this)
  }
}

export default Ref;
