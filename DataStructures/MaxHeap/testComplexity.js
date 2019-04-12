const MaxHeap = require('./MaxHeap')

function testMaxHeap(testData, isHeapify) {
  const label = isHeapify ? 'with heapify' : 'without heapify'

  console.time(label)
  let maxHeap

  if (isHeapify) {
    maxHeap = new MaxHeap(testData)
  } else {
    maxHeap = new MaxHeap()
    testData.forEach(item => maxHeap.add(item))
  }

  let arr = []

  for (let i = 0; i < n; i++) {
    arr[i] = maxHeap.extractMax()
  }

  for (let i = 1; i < n; i++) {
    if (arr[i - 1] < arr[i]) {
      throw new Error('error')
    }
  }

  console.log('Test MaxHeap completed.')

  console.timeEnd(label)
}


// test
const n = 20000000;
let testData = []
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

testMaxHeap(testData, false)
testMaxHeap(testData, true)