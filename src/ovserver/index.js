import { isObject } from "../utils";

class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, val) {
  observer(val);
  Object.defineProperty(data, key, {
    get() {
      return val;
    },
    set(newVal) {
      observer(newVal);
      val = newVal;
    },
  });
}

export function observer(data) {
  if (!isObject(data)) {
    return;
  }
  return new Observer(data);
}
