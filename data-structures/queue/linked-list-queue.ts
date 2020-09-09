import { Node } from "../models/linked-list-models";

/**
 * @name LinkedListQueue 队列
 * @description 使用链表实现队列
 * 这里使用了表头 head 和表尾 tail 属性，入列和出列都是 O(1)
 */
export default class LinkedListQueue<T> {
  head: Node<T> | undefined;
  tail: Node<T> | undefined;
  count: number;

  constructor() {
    this.head = undefined; // 表头
    this.tail = undefined; // 表尾
    this.count = 0;
  }

  // 入列 O(1)
  enqueue(key: T): void {
    if (this.tail == undefined) {
      this.tail = new Node(key);
      this.head = this.tail;
    } else {
      this.tail.next = new Node(key);
      this.tail = this.tail.next;
    }
    this.count++;
  }

  // 出列 O(1)
  dequeue(): T | undefined {
    if (this.head == null) {
      return undefined;
    }

    const delNode = this.head;
    this.head = this.head.next;
    delNode.next = undefined;

    if (this.head == null) {
      this.tail = undefined;
    }
    this.count--;
    return delNode.key;
  }

  // 获取队列的第一个元素 O(1)
  peek(): T | undefined {
    return this.head?.key;
  }

  // 获取队列的元素数量 O(1)
  size(): number {
    return this.count;
  }

  // 查询队列是否为空 O(1)
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // 清空队列 O(1)
  clear(): void {
    this.head = undefined; // 表头
    this.tail = undefined; // 表尾
    this.count = 0;
  }

  toString(): string {
    if (this.head == null) return "";
    let cur = this.head,
      str = "Queue: head { ";

    // 遍历节点
    while (cur != null) {
      str += cur.key + " -> ";
      cur = cur.next!;
    }

    str += "undefined }";
    return str;
  }
}
