// 并查集
// 使用树（数组模拟）实现并查集
// 优化 count，基于节点的元素数量来进行优化

export default class UnionFindTreeCount {
  parent: number[]
  ct: number[]

  constructor(count: number) {
    this.parent = []
    this.ct = []

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (let i = 0; i < count; i++) {
      this.parent[i] = i
      this.ct[i] = i
    }
  }

  size() {
    return this.parent.length
  }

  // 查找元素 p 所对应的集合编号 O(1)
  private find(p: number) {
    if (p >= 0 && p < this.size()) {
      while (p !== this.parent[p]) {
        p = this.parent[p]
      }
      return p
    }
  }

  // 查看元素 p 和元素 q 是否所属一个集合 O(1)
  isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  // 合并元素 p 和元素 q 所属的集合 O(N)
  unionElements(p: number, q: number) {
    const pRoot = this.find(p)!
    const qRoot = this.find(q)!

    if (pRoot === qRoot) return

    // 根据两个元素所在树的元素个数不同判断合并方向
    // 将元素个数少的集合合并到元素个数多的集合上
    if (this.ct[pRoot] < this.ct[qRoot]) {
      this.parent[pRoot] = qRoot
      this.ct[qRoot] += this.ct[pRoot]
    } else {
      this.parent[qRoot] = pRoot
      this.ct[pRoot] += this.ct[qRoot]
    }
  }
}
