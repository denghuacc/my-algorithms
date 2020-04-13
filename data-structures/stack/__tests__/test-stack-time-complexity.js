const Stack = require('../stack')
const LinkedListStack = require('../linked-list-stack')

/**
 * 测试栈的时间复杂度方法，主要测试出栈和入栈
 * 使用数组实现的栈入栈和出栈时间复杂都都是 O(1)
 * 使用链表实现的栈入栈和出栈时间复杂都都是 O(1)
 * 两者时间复杂度都为 O(1)，差别不大
 */
function testTimeComplexity(name, stack, opCount) {
  const label = `${name}, time`

  console.time(label)

  for (let i = 0; i < opCount; i++) {
    stack.push(Math.min(Math.floor(Math.random() * opCount), Number.MAX_VALUE)) // 入栈
  }

  for (let i = 0; i < opCount; i++) {
    stack.pop() // 出栈
  }

  console.timeEnd(label)
}

// const opCount = 100000 // 10 万级别个数
const opCount = 10000000 // 1000 万级别个数

const stack = new Stack()
testTimeComplexity('stack', stack, opCount)

const linkedListStack = new LinkedListStack()
testTimeComplexity('linkedListStack', linkedListStack, opCount)
// LinkedListStack 包含更多的 new 操作
