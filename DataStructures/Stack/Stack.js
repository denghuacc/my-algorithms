/**
 * @name Stack 使用数组实现栈
 * @description 栈是一种遵从后进先出（LIFO）原则的有序集合。
 * 新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。
 */
class Stack {
  constructor() {
    this.array = []
  }

  // 入栈 O(1)
  push(element) {
    this.array.push(element)
  }

  // 出栈，返回出栈的元素 O(1)
  pop() {
    return this.array.pop()
  }

  // 返回栈顶元素 O(1)
  peek() {
    return this.array[this.array.length - 1]
  }

  // 返回栈里的元素个数 O(1)
  getSize() {
    return this.array.length
  }

  // 检查栈是否为空 O(1)
  isEmpty() {
    return this.array.length === 0
  }

  toString() {
    let str = 'Stack: [ '
    str += this.array.join(', ')
    str += ' ] top'
    return str
  }
}

module.exports = Stack
