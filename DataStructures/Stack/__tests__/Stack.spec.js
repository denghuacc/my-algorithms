const Stack = require('../Stack')

describe('Stack', () => {
  test('push', () => {
    const stack = new Stack()
    stack.push(1)
    expect(stack.print()).toBe('Stack: [ 1 ] top')
    stack.push(2)
    expect(stack.print()).toBe('Stack: [ 1, 2 ] top')
  })

  test('pop', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
  })

  test('peep', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.peek()).toBe(2)
    stack.pop()
    expect(stack.peek()).toBe(1)
  })

  test('getSize', () => {
    const stack = new Stack()
    expect(stack.getSize()).toBe(0)
    stack.push(1)
    stack.push(2)
    expect(stack.getSize()).toBe(2)
    stack.pop()
    expect(stack.getSize()).toBe(1)
  })

  test('isEmpty', () => {
    const stack = new Stack()
    expect(stack.isEmpty()).toBe(true)
    stack.push(1)
    stack.push(2)
    expect(stack.isEmpty()).toBe(false)
    stack.pop()
    expect(stack.isEmpty()).toBe(false)
  })
})
