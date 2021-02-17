/**
 * @name ArraySet 集合
 * @description 使用数组实现 ES6 的 Set 集合
 */
export default class ArraySet<T> {
  array: T[];

  constructor() {
    this.array = [];
  }

  // 获取集合的元素数量 O(1)
  get size(): number {
    return this.array.length;
  }

  // 添加元素 O(N)
  add(val: T): this {
    if (!this.has(val)) {
      this.array.push(val);
    }
    return this;
  }

  // 删除元素 O(N^2)
  delete(val: T): boolean {
    const index = this.array.indexOf(val);
    if (index > -1) {
      this.array.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  // 查询元素是否存在 O(N)
  has(val: T): boolean {
    return this.array.includes(val);
  }

  // 清除元素 O(1)
  clear(): void {
    this.array.length = 0;
  }
}
