const LinkedList = require('./LinkedList')

describe('LinkedList', () => {
  test('getSize', () => {
    const linkedList = new LinkedList()
    expect(linkedList.getSize()).toBe(0)
    linkedList.addFirst(1)
    expect(linkedList.getSize()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getSize()).toBe(2)
    linkedList.removeFirst()
    expect(linkedList.getSize()).toBe(1)
  })

  test('isEmpty', () => {
    const linkedList = new LinkedList()
    expect(linkedList.isEmpty()).toBe(true)
    linkedList.addFirst(1)
    expect(linkedList.isEmpty()).toBe(false)
    linkedList.removeFirst()
    expect(linkedList.isEmpty()).toBe(true)
  })

  test('addFirst', () => {
    const linkedList = new LinkedList()
    expect(linkedList.print()).toBe('null')
    linkedList.addFirst(1)
    expect(linkedList.print()).toBe('1 -> null')
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> null')
  })

  test('addLast', () => {
    const linkedList = new LinkedList()
    expect(linkedList.print()).toBe('null')
    linkedList.addLast(1)
    expect(linkedList.print()).toBe('1 -> null')
    linkedList.addLast(2)
    expect(linkedList.print()).toBe('1 -> 2 -> null')
  })

  test('getFirst', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    expect(linkedList.getFirst()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getFirst()).toBe(2)
    linkedList.addLast(3)
    expect(linkedList.getFirst()).toBe(2)
  })

  test('getLast', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    expect(linkedList.getLast()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getLast()).toBe(1)
    linkedList.addLast(3)
    expect(linkedList.getLast()).toBe(3)
  })

  test('set', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> null')
    linkedList.set(0, 3)
    expect(linkedList.print()).toBe('3 -> 1 -> null')
    linkedList.set(1, 5)
    expect(linkedList.print()).toBe('3 -> 5 -> null')
    // TODO test error
    // linkedList.set(2, 7)
    // expect(linkedList).toThrow()
  })

  test('contains', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.contains(1)).toBe(true)
    expect(linkedList.contains(2)).toBe(true)
    expect(linkedList.contains(3)).toBe(false)
  })

  test('removeFirst', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> null')
    linkedList.removeFirst()
    expect(linkedList.print()).toBe('1 -> null')
    linkedList.removeFirst()
    expect(linkedList.print()).toBe('null')
  })

  test('removeLast', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> null')
    linkedList.removeLast()
    expect(linkedList.print()).toBe('2 -> null')
    linkedList.removeLast()
    expect(linkedList.print()).toBe('null')
  })

  test('removeVal', () => {
    const linkedList = new LinkedList()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    linkedList.addFirst(3)
    expect(linkedList.print()).toBe('3 -> 2 -> 1 -> null')
    linkedList.removeVal(2)
    expect(linkedList.print()).toBe('3 -> 1 -> null')
    linkedList.removeVal(3)
    expect(linkedList.print()).toBe('1 -> null')
  })
})
