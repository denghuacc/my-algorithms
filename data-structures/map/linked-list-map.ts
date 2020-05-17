import { KVNode as Node } from "../models/linked-list-models";

/**
 * @name LinkedListMap 映射
 * @description 使用链表实现 ES6 映射 Map
 */
export default class LinkedListMap<K, V> {
  head: Node<K, V> | undefined;
  size: number = 0;

  constructor() {}

  // 设置值 O(N)
  set(key: K, val: V) {
    if (!this.has(key)) {
      const newNode = new Node(key, val, this.head);
      this.head = newNode;
      this.size++;
    } else {
      const node = this.getNode(key);
      node!.val = val;
    }
    return this;
  }

  // 获取值 O(N)
  get(key: K) {
    const node = this.getNode(key);
    return node?.val;
  }

  // 查询值 O(N)
  has(key: K) {
    return this.getNode(key) != null;
  }

  // 删除值 O(N)
  delete(key: K) {
    let current = this.head;
    let delNode;

    if (current == null) return false;

    if (current.key === key) {
      delNode = current;
      this.head = delNode.next;
      this.size--;
      return true;
    } else {
      while (current.next != null) {
        if (current.next.key === key) {
          delNode = current.next;
          const previous = current;
          previous.next = current.next.next;
          this.size--;
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  // 清空值 O(1)
  clear() {
    this.head = undefined;
    this.size = 0;
  }

  // 通过 key 获取对应的节点
  private getNode(key: K) {
    let current = this.head;
    while (current != null) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }
}
