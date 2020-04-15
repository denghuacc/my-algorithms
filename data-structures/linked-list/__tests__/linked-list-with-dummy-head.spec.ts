import LinkedListWithDummyHead from '../linked-list-with-dummy-head'

describe('LinkedListWithDummyHead', () => {
  test('getSize', () => {
    const linkedList = new LinkedListWithDummyHead()
    expect(linkedList.getSize()).toBe(0)
    linkedList.addFirst(1)
    expect(linkedList.getSize()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getSize()).toBe(2)
    linkedList.removeFirst()
    expect(linkedList.getSize()).toBe(1)
  })

  test('isEmpty', () => {
    const linkedList = new LinkedListWithDummyHead()
    expect(linkedList.isEmpty()).toBe(true)
    linkedList.addFirst(1)
    expect(linkedList.isEmpty()).toBe(false)
    linkedList.removeFirst()
    expect(linkedList.isEmpty()).toBe(true)
  })

  test('addFirst', () => {
    const linkedList = new LinkedListWithDummyHead()
    expect(linkedList.print()).toBe('undefined')
    linkedList.addFirst(1)
    expect(linkedList.print()).toBe('1 -> undefined')
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> undefined')
  })

  test('addLast', () => {
    const linkedList = new LinkedListWithDummyHead()
    expect(linkedList.print()).toBe('undefined')
    linkedList.addLast(1)
    expect(linkedList.print()).toBe('1 -> undefined')
    linkedList.addLast(2)
    expect(linkedList.print()).toBe('1 -> 2 -> undefined')
  })

  test('getFirst', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    expect(linkedList.getFirst()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getFirst()).toBe(2)
    linkedList.addLast(3)
    expect(linkedList.getFirst()).toBe(2)
  })

  test('getLast', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    expect(linkedList.getLast()).toBe(1)
    linkedList.addFirst(2)
    expect(linkedList.getLast()).toBe(1)
    linkedList.addLast(3)
    expect(linkedList.getLast()).toBe(3)
  })

  test('set', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> undefined')
    linkedList.set(0, 3)
    expect(linkedList.print()).toBe('3 -> 1 -> undefined')
    linkedList.set(1, 5)
    expect(linkedList.print()).toBe('3 -> 5 -> undefined')
    // TODO test error
    // linkedList.set(2, 7)
    // expect(linkedList).toThrow()
  })

  test('contains', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.contains(1)).toBe(true)
    expect(linkedList.contains(2)).toBe(true)
    expect(linkedList.contains(3)).toBe(false)
  })

  test('removeFirst', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> undefined')
    linkedList.removeFirst()
    expect(linkedList.print()).toBe('1 -> undefined')
    linkedList.removeFirst()
    expect(linkedList.print()).toBe('undefined')
  })

  test('removeLast', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    expect(linkedList.print()).toBe('2 -> 1 -> undefined')
    linkedList.removeLast()
    expect(linkedList.print()).toBe('2 -> undefined')
    linkedList.removeLast()
    expect(linkedList.print()).toBe('undefined')
  })

  test('removeVal', () => {
    const linkedList = new LinkedListWithDummyHead()
    linkedList.addFirst(1)
    linkedList.addFirst(2)
    linkedList.addFirst(3)
    expect(linkedList.print()).toBe('3 -> 2 -> 1 -> undefined')
    linkedList.removeVal(2)
    expect(linkedList.print()).toBe('3 -> 1 -> undefined')
    linkedList.removeVal(3)
    expect(linkedList.print()).toBe('1 -> undefined')
  })
})
