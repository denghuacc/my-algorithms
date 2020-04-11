const BST = require('./BSTMap')
const AVLTree = require('../AVLTree/AVLTree')
const RBTree = require('./RedBlackTree')

function testTree(name, tree, TestData) {
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
const n = 10000

for (let i = 0; i < n; i++) {
  testData.push(
    Math.min(Math.floor(Math.random() * n), Number.MAX_SAFE_INTEGER)
  )
}

testData.sort((a, b) => a - b) // 数组排序，BST 退化成链表，AVL 和 RBT 可以自平衡，不会退化

const bst = new BST()
const avl = new AVLTree()
const rbt = new RBTree()

testTree('BST', bst, testData)
testTree('AVLTree', avl, testData)
testTree('RBTree', rbt, testData)

// 1. 对于完全随机的数据，普通的二分搜索树很好用！
// 缺点：极端情况下退化成链表（或者高度不平衡）
