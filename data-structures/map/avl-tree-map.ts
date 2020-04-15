import AVLTree from '../avl-tree/avl-tree'

/**
 * @name AVLMap 映射
 * @description 使用 AVLTree 实现 ES6 映射 Map
 */
export default class AVLMap<K, V> {
  avl: AVLTree<K, V>

  constructor() {
    this.avl = new AVLTree()
  }

  // 查询元素数量 n(1)
  get size() {
    return this.avl.getSize()
  }

  // 设置值 n(log2(n))
  set(key: K, val: V) {
    if (!this.has(key)) {
      this.avl.add(key, val)
    }
    this.avl.set(key, val)
    return this
  }

  // 获取值 n(log2(n))
  get(key: K) {
    const val = this.avl.get(key)
    return val == null ? undefined : val
  }

  // 查询值 n(log2(n))
  has(key: K) {
    return this.avl.contains(key)
  }

  // 删除值 n(log2(n))
  delete(key: K) {
    const val = this.avl.remove(key)
    return val == null ? false : true
  }

  // 删除值 n(log2(n))
  clear() {
    this.avl = new AVLTree()
  }
}
