/**
 * @name UnionFind3 并查集
 * @deprecated 第三版
 * 基于第二版；优化 size；基于节点的元素数量来进行优化
 */
class UnionFind3 {
  constructor(size) {
    this.parent = []
    this.sz = [] // this.sz[i] 表示以 i 为根的集合中的元素个数

    // 初始化, 每一个节点指向自己, 没有合并的元素
    // 每一个节点的没有子节点，只有它本身为 1
    for (let i = 0; i < size; i++) {
      this.parent[i] = i
      this.sz[i] = 1
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

    // 根据两个元素所在树的元素个数不同判断合并方向
    // 将元素个数少的集合合并到元素个数多的集合上
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.parent[pRoot] = qRoot
      this.sz[qRoot] += this.sz[pRoot]
    } else {
      // this.sz[qRoot] <= this.sz[qRoot]
      this.parent[qRoot] = pRoot
      this.sz[pRoot] += this.sz[qRoot]
    }
  }
}

module.exports = UnionFind3
