const ArraySet = require('./ArraySet')
const LinkedListSet = require('./LinkedListSet')
const BSTSet = require('./BSTSet')
const AVLSet = require('./AVLSet')

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
const n = 10000
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

const arrSet = new ArraySet()
const lSet = new LinkedListSet()
const bSet = new BSTSet()
const aSet = new AVLSet()
const originalSet = new Set() // ES6 原生 Set

testComplexity('ArraySet', arrSet, testData)
testComplexity('LinkedListSet', lSet, testData)
testComplexity('BSTSet', bSet, testData)
testComplexity('AVLSet', aSet, testData)
testComplexity('OriginalSet', originalSet, testData)
