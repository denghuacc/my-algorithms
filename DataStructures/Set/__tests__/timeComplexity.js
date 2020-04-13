const ObjectSet = require('../ObjectSet')
const ArraySet = require('../ArraySet')
const LinkedListSet = require('../LinkedListSet')
const BSTSet = require('../BSTSet')
const AVLSet = require('../AVLSet')
const RBTSet = require('../RedBlackTreeSet')

function testComplexity(name, set, testData) {
  const label = name
  console.time(label)

  for (let item of testData) {
    set.add(item)
  }

  console.timeEnd(label)
}

// test
const testData = []
const n = 20000
for (let i = 0; i < n; i++) {
  testData.push(
    Math.min(Math.floor(Math.random() * n), Number.MAX_SAFE_INTEGER)
  )
}

const objectSet = new ObjectSet()
const arrSet = new ArraySet()
const lSet = new LinkedListSet()
const bSet = new BSTSet()
const aSet = new AVLSet()
const rSet = new RBTSet()
const originalSet = new Set() // ES6 原生 Set

testComplexity('ObjectSet', arrSet, testData)
testComplexity('ArraySet', arrSet, testData)
testComplexity('LinkedListSet', lSet, testData)
testComplexity('BSTSet', bSet, testData)
testComplexity('AVLSet', aSet, testData)
testComplexity('RedBlackSet', rSet, testData)
testComplexity('OriginalSet', originalSet, testData)

// 当前测试 add 的结论：
// ES6 原生的 Set 性能最好
// 链表实现的 Set 性能最差 O(n)
// 对象和数组实现的 Set 性也很差 O(n)
// 树实现的性能很好 n(log2(n))，其中 BST 不用平衡二叉树，较 AVL Tree 和 Red Black Tree 性能好点
