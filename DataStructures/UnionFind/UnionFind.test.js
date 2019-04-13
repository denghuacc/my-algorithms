const UnionFind1 = require('./UnionFind1')
const UnionFind2 = require('./UnionFind2')
const UnionFind3 = require('./UnionFind3')
const UnionFind4 = require('./UnionFind4')
const UnionFind5 = require('./UnionFind5')
const UnionFind6 = require('./UnionFind6')

function testUF(name, uf, n) {
  const size = uf.getSize()

  const label = name

  console.time(label)

  for (let i = 0; i < size; i++) {
    const r1 = Math.min(Math.floor(Math.random() * size), size)
    const r2 = Math.min(Math.floor(Math.random() * size), size)
    uf.unionElements(r1, r2)
  }

  for (let i = 0; i < size; i++) {
    const r1 = Math.min(Math.floor(Math.random() * size), size)
    const r2 = Math.min(Math.floor(Math.random() * size), size)
    uf.isConnected(r1, r2)
  }

  console.timeEnd(label)
}

// test
const size = 10000000
const n = 10000000

// 使用数组实现并查集
// const uf1 = new UnionFind1(size)

// 使用树实现并查集，为优化
// const uf2 = new UnionFind2(size)

// 使用树实现并查集，优化 size
const uf3 = new UnionFind3(size)

// 使用树实现并查集，优化 rank
const uf4 = new UnionFind4(size)

// 使用树实现并查集，优化 rank 和 使用非递归路径压缩 => 性能最好
const uf5 = new UnionFind5(size)

// 使用树实现并查集，优化 rank 和 使用递归路径压缩
const uf6 = new UnionFind6(size)

// testUF('UnionFind1', uf1, n)
// testUF('UnionFind2', uf2, n)
testUF('UnionFind3', uf3, n)
testUF('UnionFind4', uf4, n)
testUF('UnionFind5', uf5, n)
testUF('UnionFind6', uf6, n)
