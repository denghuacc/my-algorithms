import LinkedList from "../linked-list/linked-list";

/**
 * @name LinkedListStack 栈
 * @description 使用链表来实现栈
 */
export default class LinkedListStack<T> {
  list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList();
  }

  // 获取栈的元素的数量 O(1)
  get size(): number {
    return this.list.size;
  }

  // 入栈 O(1)
  push(element: T): void {
    this.list.addFirst(element);
  }

  // 出栈，返回出栈的元素 O(1)
  pop(): T | undefined {
    return this.list.removeFirst();
  }

  // 获取栈顶的元素 O(1)
  peek(): T | undefined {
    return this.list.getFirst();
  }

  // 查询栈是否为空 O(1)
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  // 清空栈 O(1)
  clear(): void {
    this.list = new LinkedList();
  }

  // 打印栈
  toString(): string {
    let str = this.list.toString();
    str = str.replace("Linked List", "Linked List Stock").replace("{", "Top {");
    return str;
  }
}
