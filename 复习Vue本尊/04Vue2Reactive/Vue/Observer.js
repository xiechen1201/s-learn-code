import defineReactiveData from "./reactive.js";
import { newArrProto } from "./array.js";
import observeArr from "./observeArr.js";

class Observer {
  constructor(data) {
    if (Array.isArray(data)) {
      data.__proto__ = newArrProto;
      observeArr(data);
    } else {
      this.walk(data);
    }
  }

  walk(data) {
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = data[key];

      defineReactiveData(data, key, value);
    }
  }
}

export default Observer;
