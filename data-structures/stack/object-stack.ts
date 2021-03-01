/**
 * @name ObjectStack 栈
 * @description 使用对象实现栈
 */
export default class ObjectStack<T> {
  items: Record<string, T>;
  count: number;

  constructor() {
    this.items = {};
    this.count = 0;
  }

  // 获取栈里的元素的数量 O(1)
  get size(): number {
    return this.count;
  }

  // 入栈 O(1)
  push(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  // 出栈，返回出栈的元素 O(1)
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // 获取栈顶元素 O(1)
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  // 检查栈是否为空 O(1)
  isEmpty(): boolean {
    return this.size === 0;
  }

  // 清空栈 O(1)
  clear(): void {
    this.items = {};
    this.count = 0;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `Stack { ${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    objString += " }";
    return objString;
  }
}
