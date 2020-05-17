/**
 * @name MapSet 集合
 * @description 使用 ES6 的 Map 实现 ES6 集合，比较接近原生结构（key 和 value 相同）
 * ES6 增加了原生的 Set 数据结构
 * 特性：它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */
export default class MapSet<T> {
  map: Map<T, T>;

  constructor() {
    this.map = new Map();
  }

  // 获取集合的元素数量 O(1)
  get size() {
    return this.map.size;
  }

  // 添加元素 O(N)
  add(val: T) {
    if (!this.has(val)) {
      this.map.set(val, val);
    }
    return this;
  }

  //  删除元素 O(N)
  delete(val: T) {
    if (this.has(val)) {
      this.map.delete(val);
      return true;
    }
    return false;
  }

  //  查询元素 O(N)
  has(val: T) {
    return this.map.has(val);
  }

  // 清除元素 O(1)
  clear() {
    this.map.clear();
  }
}
