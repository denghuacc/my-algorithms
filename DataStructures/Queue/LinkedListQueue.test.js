const LinkedListQueue = require('./LinkedListQueue')

let queue = new LinkedListQueue()

for (let i = 0; i < 5; i++) {
  queue.enqueue(i)
  console.log(queue.toString())
}

console.log(queue.toString()) // Queue: front [ 0, 1, 2, 3, 4 ]

queue.dequeue()
console.log(queue.toString()) // Queue: front [ 0, 1, 2, 3 ]

console.log('first element:', queue.getFront()) // 1
console.log('element size:', queue.getSize()) // 4
