import { isFunction } from "./utils";
import { observer } from "./ovserver/index";

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    },
  });
}

export function initState(vm) {
  const opts = vm.$options;
  /*   if(opts.props) {
      initProps()
  } */
  if (opts.data) {
    initData(vm);
  }
  /* if(opts.computed) {

  }
  if(opts.watch) {

  } */
}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = isFunction(data) ? data.call(vm) : data;
  console.log('vm---', vm);
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  observer(data);
}
