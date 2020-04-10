const LinkedListStack = require('./LinkedListStack')

describe('LinkedListStack', () => {
  test('push', () => {
    const stack = new LinkedListStack()
    stack.push(1)
    expect(stack.print()).toBe('Stack: top 1 -> null')
    stack.push(2)
    expect(stack.print()).toBe('Stack: top 2 -> 1 -> null')
  })

  test('pop', () => {
    const stack = new LinkedListStack()
    stack.push(1)
    stack.push(2)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })

  test('peep', () => {
    const stack = new LinkedListStack()
    stack.push(1)
    stack.push(2)
    expect(stack.peek()).toBe(2)
    stack.pop()
    expect(stack.peek()).toBe(1)
  })

  test('getSize', () => {
    const stack = new LinkedListStack()
    expect(stack.getSize()).toBe(0)
    stack.push(1)
    stack.push(2)
    expect(stack.getSize()).toBe(2)
    stack.pop()
    expect(stack.getSize()).toBe(1)
  })

  test('isEmpty', () => {
    const stack = new LinkedListStack()
    expect(stack.isEmpty()).toBe(true)
    stack.push(1)
    stack.push(2)
    expect(stack.isEmpty()).toBe(false)
    stack.pop()
    expect(stack.isEmpty()).toBe(false)
  })
})
