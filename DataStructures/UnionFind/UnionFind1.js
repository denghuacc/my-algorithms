/**
 * @name UnionFind1 并查集
 * @deprecated 第一版
 * 使用数组实现并查集
 */
class UnionFind1 {
  constructor(size) {
    this.id = []

    // 初始化, 每一个 id[i] 指向自己, 没有合并的元素
    for (let i = 0; i < size; i++) {
      this.id[i] = i
    }
  }

  getSize() {
    return this.id.length
  }

  // 查找元素 p 所对应的集合编号
  // O(1) 复杂度
  _find(p) {
    if (p < 0 && p >= id.length) {
      throw new Error('p is out of bound.')
    }
    return this.id[p]
  }

  // 查看元素 p 和元素 q 是否所属一个集合
  // O(1) 复杂度
  isConnected(p, q) {
    return this._find(p) === this._find(q)
  }

  // 合并元素 p 和元素 q 所属的集合
  // O(n) 复杂度
  unionElements(p, q) {
    const pId = this._find(p)
    const qId = this._find(q)

    if (pId === qId) {
      return
    }

    // 合并过程需要遍历一遍所有元素, 将两个元素的所属集合编号合并
    for (let i = 0; i < this.getSize(); i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId
      }
    }
  }
}

module.exports = UnionFind1
