const ObjectMap = require('./ObjectMap')
const LinkedListMap = require('./LinkedListMap')
const BSTMap = require('./BSTMap')
const AVLMap = require('./AVLMap')

function testComplexity(name, map, testData) {
  const label = `${name}:`
  console.time(label)

  for (let i = 0; i < n; i++) {
    if (map.contains(testData[i])) {
      map.set(testData[i], map.get(testData[i]) + 1)
    } else {
      map.add(testData[i], 1)
    }
  }

  console.timeEnd(label)
}

// test

const testData = []
const n = 10000
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

const oMap = new ObjectMap()
const lMap = new LinkedListMap()
const bMap = new BSTMap()
const aMap = new AVLMap()
const originalMap = new Map() // ES6 原生 Map
originalMap.contains = new Map().has // 原生返回覆盖自定义方法
originalMap.add = new Map().set // 原生返回覆盖自定义方法

testComplexity('ObjectMap', oMap, testData)
testComplexity('LinkedListMap', lMap, testData)
testComplexity('BSTMap', bMap, testData)
testComplexity('AVLMap', aMap, testData)
testComplexity('OriginalMap', originalMap, testData)
