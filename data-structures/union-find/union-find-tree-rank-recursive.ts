// 并查集
// 使用树（数组模拟）实现并查集
// 修改成基于树的 Rank（不仅仅指树的高度）的优化
// 使用递归，性能较差
// 不需要维护 rank，因为 rank 不仅仅指树的高度

export default class UnionFindTreeRankRecursive {
  parent: number[];
  rank: number[];

  constructor(count: number) {
    this.parent = [];
    this.rank = [];

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (let i = 0; i < count; i++) {
      this.parent[i] = i;
      this.rank[i] = i;
    }
  }

  size() {
    return this.parent.length;
  }

  // 查找元素 p 所对应的集合编号 O(1)
  private find(p: number) {
    if (p >= 0 && p < this.size()) {
      if (p !== this.parent[p]) {
        this.parent[p] = this.find(this.parent[p])!; // 递归
      }
      return this.parent[p];
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

    // 根据两个元素所在树的 rank 不同判断合并方向
    // 将 rank 低的集合合并到 rank 高的集合上
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[qRoot] < this.rank[pRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[qRoot] += 1;
    }
  }
}
