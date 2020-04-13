const LinkedListQueue = require('../linked-list-queue')

describe('LinkedListQueue', () => {
  test('enqueue', () => {
    const queue = new LinkedListQueue()
    queue.enqueue(1)
    expect(queue.print()).toBe('Queue: front 1 -> null tail')
    queue.enqueue(2)
    expect(queue.print()).toBe('Queue: front 1 -> 2 -> null tail')
  })

  test('dequeue', () => {
    const queue = new LinkedListQueue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
  })

  test('getFront', () => {
    const queue = new LinkedListQueue()
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.getFront()).toBe(1)
    queue.dequeue()
    expect(queue.getFront()).toBe(2)
  })

  test('getSize', () => {
    const queue = new LinkedListQueue()
    expect(queue.getSize()).toBe(0)
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.getSize()).toBe(2)
    queue.dequeue()
    expect(queue.getSize()).toBe(1)
  })

  test('isEmpty', () => {
    const queue = new LinkedListQueue()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(false)
  })
})
