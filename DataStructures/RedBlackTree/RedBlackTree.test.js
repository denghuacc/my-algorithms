const RedBlackTree = require('./RedBlackTree')

const rbTree = new RedBlackTree()

const testData = []
const n = 10000
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

for (let i = 0; i < n; i++) {
  if (rbTree.contains(testData[i])) {
    rbTree.set(testData[i], rbTree.get())
  } else {
    rbTree.add(testData[i], 1)
  }
}

console.log(rbTree.getSize())

console.log('Test Completed. No Error!')
