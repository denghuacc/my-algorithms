const MaxHeap = require('./MaxHeap')

const maxHeap = new MaxHeap()

const n = 100000

for (let i = 0; i < n; i++) {
  maxHeap.add(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
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
