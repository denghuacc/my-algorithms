/**
 * @name ObjectSet 集合
 * @description 使用对象实现 ES6 集合
 */
export default class ObjectSet<T extends string | number | symbol> {
  items: Record<T, T>;

  constructor() {
    this.items = {} as Record<T, T>;
  }

  // 获取集合的元素数量 O(1)
  get size(): number {
    return Object.keys(this.items).length;
  }

  // 添加元素 O(N)
  add(val: T): this {
    if (!this.has(val)) {
      this.items[val] = val;
    }
    return this;
  }

  //  删除元素 O(N)
  delete(val: T): boolean {
    if (this.has(val)) {
      delete this.items[val];
      return true;
    }
    return false;
  }

  //  查询元素 O(N)
  has(val: T): boolean {
    return Object.hasOwn(this.items, val);
  }

  // 清除元素 O(1)
  clear(): void {
    this.items = {} as Record<T, T>;
  }
}
