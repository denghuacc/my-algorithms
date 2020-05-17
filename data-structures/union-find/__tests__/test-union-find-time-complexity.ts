import UnionFindArray from "../union-find-array";
import UnionFindTree from "../union-find-tree";
import UnionFindTreeCount from "../union-find-tree-count";
import UnionFindTreeRank from "../union-find-tree-rank";
import UnionFindTreeRankIterative from "../union-find-tree-rank-iterative";
import UnionFindTreeRankRecursive from "../union-find-tree-rank-recursive";

function testUF(name: string, uf: any, n: number) {
  const size = uf.size();

  const label = name;

  console.time(label);

  for (let i = 0; i < size; i++) {
    const r1 = Math.min(Math.floor(Math.random() * size), size);
    const r2 = Math.min(Math.floor(Math.random() * size), size);
    uf.unionElements(r1, r2);
  }

  for (let i = 0; i < size; i++) {
    const r1 = Math.min(Math.floor(Math.random() * size), size);
    const r2 = Math.min(Math.floor(Math.random() * size), size);
    uf.isConnected(r1, r2);
  }

  console.timeEnd(label);
}

// test
const size = 10000000;
const n = 10000000;

// 使用数组实现并查集，性能差
// const ufArray = new UnionFindArray(size)

// 使用树实现并查集，性能超差
// const ufTree = new UnionFindTree(size)

// 使用树实现并查集，优化 size
const ufTreeCount = new UnionFindTreeCount(size);

// 使用树实现并查集，优化 rank
const ufTreeRank = new UnionFindTreeRank(size);

// 使用树实现并查集，优化 rank 和 使用非递归路径压缩，性能最好
const ufTreeRankIterative = new UnionFindTreeRankIterative(size);

// 使用树实现并查集，优化 rank 和 使用递归路径压缩
const ufTreeRankRecursive = new UnionFindTreeRankRecursive(size);

// testUF('UnionFindArray', ufArray, n)
// testUF('UnionFindTree', ufTree, n)
testUF("UnionFindTreeCount", ufTreeCount, n);
testUF("UnionFindTreeRank", ufTreeRank, n);
testUF("UnionFindTreeRankIterative", ufTreeRankIterative, n);
testUF("UnionFindTreeRankRecursive", ufTreeRankRecursive, n);
