import { KVNode as Node } from "../models/linked-list-models";

/**
 * @name LinkedListMap 映射
 * @description 使用链表实现 ES6 映射 Map
 */
export default class LinkedListMap<K, V> {
  head: Node<K, V> | undefined;
  private count: number;

  constructor() {
    this.count = 0;
  }

  get size() {
    return this.count;
  }

  // 设置值 O(N)
  set(key: K, val: V): this {
    if (!this.has(key)) {
      const newNode = new Node(key, val, this.head);
      this.head = newNode;
      this.count++;
    } else {
      const node = this.getNode(key);
      node!.val = val;
    }
    return this;
  }

  // 获取值 O(N)
  get(key: K): V | undefined {
    const node = this.getNode(key);
    return node?.val;
  }

  // 查询值 O(N)
  has(key: K): boolean {
    return !!this.getNode(key);
  }

  // 删除值 O(N)
  delete(key: K): boolean {
    let current = this.head;
    let delNode;

    if (!current) return false;

    if (current.key === key) {
      delNode = current;
      this.head = delNode.next;
      this.count--;
      return true;
    } else {
      while (current.next) {
        if (current.next.key === key) {
          delNode = current.next;
          const previous = current;
          previous.next = current.next.next;
          this.count--;
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  // 清空值 O(1)
  clear(): void {
    this.head = undefined;
    this.count = 0;
  }

  // 通过 key 获取对应的节点
  private getNode(key: K): Node<K, V> | undefined {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }
}
