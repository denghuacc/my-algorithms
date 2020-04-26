// 并查集
// 使用数组实现并查集

export default class UnionFindArray {
  id: number[]

  constructor(count: number) {
    this.id = []

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (let i = 0; i < count; i++) {
      this.id[i] = i
    }
  }

  size() {
    return this.id.length
  }

  // 查找元素 p 所对应的集合编号 O(1)
  private find(p: number) {
    if (p >= 0 && p < this.size()) {
      return this.id[p]
    }
  }

  // 查看元素 p 和元素 q 是否所属一个集合 O(1)
  isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  // 合并元素 p 和元素 q 所属的集合 O(N)
  unionElements(p: number, q: number) {
    const pId = this.find(p)
    const qId = this.find(q)

    if (pId === qId) return

    for (let i = 0; i < this.size(); i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId!
      }
    }
  }
}
