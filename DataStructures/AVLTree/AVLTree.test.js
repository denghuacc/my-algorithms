const AVLTree = require('./AVLTree')

const avl = new AVLTree()

const n = 10000

const map = new Map()

// 生成随机数
for (let i = 0; i < n; i++) {
  const random = Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE)

  if (map.has(random)) {
    map.set(random, map.get(random) + 1)
  } else {
    map.set(random, 1)
  }
}

for (let item of map.entries()) {
  avl.add(item[0], item[1])
}

console.log(avl.getSize())
console.log(avl.isBST())
console.log(avl.isBalanced())

for (let item of map.keys()) {
  avl.remove(item)
  if (!avl.isBST() || !avl.isBalanced()) {
    throw new Error('error')
  }
}

console.log('Test Completed. No Error!')
