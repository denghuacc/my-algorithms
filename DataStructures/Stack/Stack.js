/**
 * @name Stack 栈 -> 使用数组实现栈
 * @description
 * 特性：栈是一种遵从后进先出（LIFO）原则的有序集合。
 * 新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。
 */
class Stack {
  constructor() {
    this.array = []
  }

  // 入栈 O(1)
  push(val) {
    this.array.push(val)
  }

  // 出栈，返回出栈的元素 O(1)
  pop() {
    return this.array.pop()
  }

  // 获取栈顶元素 O(1)
  peek() {
    return this.array[this.array.length - 1]
  }

  // 获取栈里的元素的数量 O(1)
  getSize() {
    return this.array.length
  }

  // 检查栈是否为空 O(1)
  isEmpty() {
    return this.array.length === 0
  }

  // 打印栈
  print() {
    let str = 'Stack: [ '
    str += this.array.join(', ')
    str += ' ] top'
    return str
  }
}

module.exports = Stack
