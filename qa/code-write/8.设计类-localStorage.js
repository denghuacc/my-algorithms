// 模拟实现一个 `localStorage`

class LocalStorage {
  constructor() {
    this.valuesMap = new Map();
  }
  getItem(key) {
    const stringKey = String(key);
    if (this.valuesMap.has(key)) {
      return String(this.valuesMap.get(stringKey));
    }
    return null;
  }

  setItem(key, val) {
    this.valuesMap.set(String(key), String(val));
  }

  removeItem(key) {
    this.valuesMap.delete(key);
  }

  clear() {
    this.valuesMap.clear();
  }

  key(i) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    }
    var arr = Array.from(this.valuesMap.keys());
    return arr[i];
  }

  get length() {
    return this.valuesMap.size;
  }
}

const instance = new LocalStorage();

global.localStorage = new Proxy(instance, {
  set: function (obj, prop, value) {
    if (LocalStorage.prototype.hasOwnProperty(prop)) {
      instance[prop] = value;
    } else {
      instance.setItem(prop, value);
    }
    return true;
  },
  get: function (target, name) {
    if (LocalStorage.prototype.hasOwnProperty(name)) {
      return instance[name];
    }
    if (valuesMap.has(name)) {
      return instance.getItem(name);
    }
  },
});
