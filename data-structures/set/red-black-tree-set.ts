import RedBlackTree from '../red-black-tree/red-black-tree'

/**
 * @name RedBlackTreeSet 集合
 * @description 使用 Red Black Tree 实现 ES6 的 Set 集合
 */
export default class RedBlackTreeSet<T> {
  rbt: RedBlackTree<T, T>

  constructor() {
    this.rbt = new RedBlackTree()
  }

  // 获取集合的元素个数 O(1)
  get size() {
    return this.rbt.size()
  }

  // 添加元素 O(log2(n))
  add(val: T) {
    this.rbt.add(val, val)
    return this
  }

  // 删除元素 O(log2(n))
  delete(val: T) {
    if (!this.has(val)) return false
    this.rbt.remove(val)
    return true
  }

  // 查询元素是否存在 O(log2(n))
  has(val: T) {
    return this.rbt.contains(val)
  }

  clear() {
    this.rbt = new RedBlackTree()
  }
}
