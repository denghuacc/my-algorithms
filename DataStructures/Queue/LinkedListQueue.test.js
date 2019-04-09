const LinkedListQueue = require('./LinkedListQueue')

let queue = new LinkedListQueue()

for (let i = 0; i < 10; i++) {
  queue.enqueue(i)
  console.log(queue.toString())

  if (i % 3 === 2) {
    queue.dequeue()
    console.log(queue.toString())
  }
}
