import BST from '../binary-search-tree-map'
import AVLTree from '../../avl-tree/avl-tree'
import RBTree from '../red-black-tree'

function testTree(name: string, tree: any, TestData: Array<number>) {
  const label = name
  console.time(label)

  for (let item of TestData) {
    if (tree.contains(item)) {
      tree.set(item, tree.get(item) + 1)
    } else {
      tree.add(item, 1)
    }
  }

  for (let item of TestData) {
    tree.contains(item)
  }

  console.timeEnd(label)
}

const testData = []
const n = 30000

for (let i = 0; i < n; i++) {
  testData.push(
    Math.min(Math.floor(Math.random() * n), Number.MAX_SAFE_INTEGER)
  )
  // testData.push(i)
}

// testData.sort((a, b) => a - b) // 数组排序

const bst = new BST()
const avl = new AVLTree()
const rbt = new RBTree()

testTree('BST', bst, testData)
testTree('AVLTree', avl, testData)
testTree('RBTree', rbt, testData)

// 3. 红黑树牺牲了平衡性（2logn 的高度）
// 统计性能更优 （综合增删改查所有的操作）
