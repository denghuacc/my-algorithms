// 并查集
// 使用树（数组模拟）实现并查集

export default class UnionFindTree {
  parent: number[];

  constructor(count: number) {
    this.parent = [];

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (let i = 0; i < count; i++) {
      this.parent[i] = i;
    }
  }

  size() {
    return this.parent.length;
  }

  // 查找元素 p 所对应的集合编号 O(1)
  private find(p: number) {
    if (p >= 0 && p < this.size()) {
      while (p !== this.parent[p]) {
        p = this.parent[p];
      }
      return p;
    }
  }

  // 查看元素 p 和元素 q 是否所属一个集合 O(1)
  isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  // 合并元素 p 和元素 q 所属的集合 O(N)
  unionElements(p: number, q: number) {
    const pRoot = this.find(p)!;
    const qRoot = this.find(q)!;

    if (pRoot === qRoot) return;

    this.parent[pRoot] = qRoot;
  }
}
