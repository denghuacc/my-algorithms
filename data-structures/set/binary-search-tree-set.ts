import BST from "../binary-search-tree/binary-search-tree";

/**
 * @name BSTSet 集合
 * @description 使用二分搜索树实现实现 ES6 的 Set 集合
 */
export default class BSTSet<T> {
  bst: BST<T>;

  constructor() {
    this.bst = new BST();
  }

  // 获取集合的元素数量 O(1)
  get size(): number {
    return this.bst.size;
  }

  // 添加元素 O(logN)
  add(val: T): this {
    this.bst.add(val);
    return this;
  }

  // 删除元素 O(logN)
  delete(val: T): boolean {
    if (!this.has(val)) return false;
    this.bst.remove(val);
    return true;
  }

  // 查询元素是否存在 O(logN)
  has(val: T): boolean {
    return this.bst.contains(val);
  }

  // 清除元素 O(1)
  clear(): void {
    this.bst = new BST();
  }
}
