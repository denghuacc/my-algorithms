import AVLTree from "../avl-tree/avl-tree";

/**
 * @name AVLSet 集合
 * @description 使用 AVLTree 实现 ES6 的 Set 集合
 */
export default class AVLSet<T> {
  avl: AVLTree<T, T>;

  constructor() {
    this.avl = new AVLTree();
  }

  // 获取集合的元素个数 O(1)
  get size(): number {
    return this.avl.size;
  }

  // 添加元素 O(logN)
  add(val: T): this {
    this.avl.add(val, val);
    return this;
  }

  // 删除元素 O(logN)
  delete(val: T): boolean {
    if (!this.has(val)) return false;
    this.avl.remove(val);
    return true;
  }

  // 查询元素是否存在 O(logN)
  has(val: T): boolean {
    return this.avl.contains(val);
  }

  // 清除元素 O(1)
  clear(): void {
    this.avl = new AVLTree();
  }
}
