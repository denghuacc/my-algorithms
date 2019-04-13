/**
 * @name UnionFind2 并查集
 * @deprecated 第二版
 * 使用树(森林)实现并查集 => 使用数组模拟树
 */
class UnionFind2 {
  constructor(size) {
    this.parent = []

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (let i = 0; i < size; i++) {
      this.parent[i] = i
    }
  }

  getSize() {
    return this.parent.length
  }

  // 查找元素 p 所对应的集合编号
  // O(h) 复杂度
  _find(p) {
    if (p < 0 && p >= id.length) {
      throw new Error('p is out of bound.')
    }
    while (p != this.parent[p]) {
      p = this.parent[p]
    }
    return p
  }

  // 查看元素 p 和元素 q 是否所属一个集合
  // O(h) 复杂度，h 为树的高度
  isConnected(p, q) {
    return this._find(p) === this._find(q)
  }

  // 合并元素 p 和元素 q 所属的集合
  // O(n) 复杂度，h 为树的高度
  unionElements(p, q) {
    const pRoot = this._find(p)
    const qRoot = this._find(q)

    if (pRoot === qRoot) {
      return
    }

    // p 元素的根节点指向 q 元素的根节点
    this.parent[pRoot] = qRoot
  }
}

module.exports = UnionFind2
