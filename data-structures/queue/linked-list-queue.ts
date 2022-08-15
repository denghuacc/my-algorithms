class LinkedListNode<T> {
  val: T;
  next?: LinkedListNode<T>;

  constructor(val: T, next?: LinkedListNode<T>) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @name LinkedListQueue 队列
 * @description 使用链表实现队列
 * 这里使用了表头 head 和表尾 tail 属性，入列和出列都是 O(1)
 */
export default class LinkedListQueue<T> {
  head: LinkedListNode<T> | undefined;
  tail: LinkedListNode<T> | undefined;
  count: number;

  constructor() {
    this.head = undefined; // 表头
    this.tail = undefined; // 表尾
    this.count = 0;
  }

  // 获取队列的元素数量 O(1)
  get size(): number {
    return this.count;
  }

  // 入列 O(1)
  enqueue(val: T): void {
    if (!this.tail) {
      this.tail = new LinkedListNode(val);
      this.head = this.tail;
    } else {
      this.tail.next = new LinkedListNode(val);
      this.tail = this.tail.next;
    }
    this.count++;
  }

  // 出列 O(1)
  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const delNode = this.head;
    this.head = this.head.next;
    delNode.next = undefined;

    if (!this.head) {
      this.tail = undefined;
    }
    this.count--;
    return delNode.val;
  }

  // 获取队列的第一个元素 O(1)
  peek(): T | undefined {
    return this.head?.val;
  }

  // 查询队列是否为空 O(1)
  isEmpty(): boolean {
    return this.size === 0;
  }

  // 清空队列 O(1)
  clear(): void {
    this.head = undefined; // 表头
    this.tail = undefined; // 表尾
    this.count = 0;
  }

  toString(): string {
    if (!this.head) return "";
    let cur = this.head,
      str = "Queue: head { ";

    // 遍历节点
    while (cur) {
      str += cur.val + " -> ";
      cur = cur.next!;
    }

    str += "undefined }";
    return str;
  }
}
