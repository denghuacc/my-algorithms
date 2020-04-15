import LinkedListMap from '../linked-list-map'
import BSTMap from '../binary-search-tree-map'
import AVLMap from '../avl-tree-map'

function testComplexity(name: string, map: any, testData: Array<number>) {
  const label = name
  console.time(label)

  for (let i = 0; i < n; i++) {
    if (map.has(testData[i])) {
      map.set(testData[i], map.get(testData[i]) + 1)
    } else {
      map.set(testData[i], 1)
    }
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

const lMap = new LinkedListMap()
const bMap = new BSTMap()
const aMap = new AVLMap()
const originalMap = new Map() // ES6 原生 Map

testComplexity('LinkedListMap', lMap, testData)
testComplexity('BSTMap', bMap, testData)
testComplexity('AVLMap', aMap, testData)
testComplexity('OriginalMap', originalMap, testData)

// 当前测试 set 的结论：
// ES6 原生的 Map 性能最好 O(1)
// 链表实现的 Map 性能最差 O(n)
// 树实现的性能很好 n(log2(n))，其中 BST 不用平衡二叉树，较 AVL Tree 和 Red Black Tree 性能好点
