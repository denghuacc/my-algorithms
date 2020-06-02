// 手动实现深拷贝 cloneDeep

{
  // 深拷贝 无缓存
  function deepClone(obj) {
    if (obj == null || typeof obj !== "object") {
      return obj;
    }

    let ret = new obj.constructor();

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        ret[key] = deepClone(obj[key]);
      }
    }

    return ret;
  }
}

{
  // 深拷贝 使用缓存
  function deepClone(obj, hash = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    if (hash.has(obj)) {
      return hash.get(obj);
    }

    let t = new obj.constructor();
    hash.set(obj, t);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        t[key] = deepClone(obj[key], hash);
      }
    }
    return t;
  }
}
