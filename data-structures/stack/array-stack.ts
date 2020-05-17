/**
 * @name ArrayStack 栈
 * @description 使用数组实现栈
 * 特性：栈是一种遵从后进先出（LIFO）原则的有序集合。
 * 新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。
 */
export default class ArrayStack<T> {
  items: Array<T>;

  constructor() {
    this.items = [];
  }

  // 入栈 O(1)
  push(element: T) {
    this.items.push(element);
  }

  // 出栈，返回出栈的元素 O(1)
  pop() {
    return this.items.pop();
  }

  // 获取栈顶元素 O(1)
  peek() {
    return this.items[this.items.length - 1];
  }

  // 获取栈里的元素的数量 O(1)
  size() {
    return this.items.length;
  }

  // 检查栈是否为空 O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // 清空栈 O(1)
  clear() {
    this.items = [];
  }

  // 打印栈
  toString() {
    return this.items.toString();
  }
}
