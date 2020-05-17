import AVLTree from "../avl-tree/avl-tree";

/**
 * @name AVLMap 映射
 * @description 使用 AVLTree 实现 ES6 映射 Map
 */
export default class AVLMap<K, V> {
  avl: AVLTree<K, V>;

  constructor() {
    this.avl = new AVLTree();
  }

  // 查询元素数量 O(1)
  get size() {
    return this.avl.size();
  }

  // 设置值 O(logN)
  set(key: K, val: V) {
    if (!this.has(key)) {
      this.avl.add(key, val);
    }
    this.avl.set(key, val);
    return this;
  }

  // 获取值 O(logN)
  get(key: K) {
    const val = this.avl.get(key);
    return val == null ? undefined : val;
  }

  // 查询值 O(logN)
  has(key: K) {
    return this.avl.contains(key);
  }

  // 删除值 O(logN)
  delete(key: K) {
    const val = this.avl.remove(key);
    return val == null ? false : true;
  }

  // 删除值 O(logN)
  clear() {
    this.avl = new AVLTree();
  }
}
