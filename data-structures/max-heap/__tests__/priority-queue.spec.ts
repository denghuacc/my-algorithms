import PriorityQueue from '../priority-queue'

describe('PriorityQueue', () => {
  test('enqueue', () => {
    const queue = new PriorityQueue()
    queue.enqueue(1)
    expect(queue.print()).toBe('PriorityQueue: front [ 1 ]')
    queue.enqueue(5)
    expect(queue.print()).toBe('PriorityQueue: front [ 5, 1 ]')
    queue.enqueue(3)
    expect(queue.print()).toBe('PriorityQueue: front [ 5, 1, 3 ]')
  })

  test('dequeue', () => {
    const queue = new PriorityQueue()
    queue.enqueue(1)
    queue.enqueue(5)
    queue.enqueue(3)
    expect(queue.print()).toBe('PriorityQueue: front [ 5, 1, 3 ]')
    expect(queue.dequeue()).toBe(5)
    expect(queue.print()).toBe('PriorityQueue: front [ 3, 1 ]')
    expect(queue.dequeue()).toBe(3)
    expect(queue.print()).toBe('PriorityQueue: front [ 1 ]')
    expect(queue.dequeue()).toBe(1)
  })

  test('getFront', () => {
    const queue = new PriorityQueue()
    queue.enqueue(1)
    queue.enqueue(5)
    queue.enqueue(3)
    expect(queue.getFront()).toBe(5)
    expect(queue.print()).toBe('PriorityQueue: front [ 5, 1, 3 ]')
    queue.dequeue()
    expect(queue.getFront()).toBe(3)
    expect(queue.print()).toBe('PriorityQueue: front [ 3, 1 ]')
  })

  test('getSize', () => {
    const queue = new PriorityQueue()
    expect(queue.getSize()).toBe(0)
    queue.enqueue(1)
    queue.enqueue(5)
    queue.enqueue(3)
    expect(queue.getSize()).toBe(3)
    queue.dequeue()
    expect(queue.getSize()).toBe(2)
  })

  test('isEmpty', () => {
    const queue = new PriorityQueue()
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue(1)
    queue.enqueue(5)
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(false)
  })
})
