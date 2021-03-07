import { Node } from "../models/linked-list-models";
import LinkedList from "./linked-list";

/**
 * @name CircularLinkedList 链表 -> 单向循环链表
 * @description
 * 单项循环列表的最后一个元素不是指向 undefined 而是指向 head
 * 注意 while 遍历时设置边界条件，避免死循环
 */
export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor() {
    super();
  }

  // 在链表的 index 位置添加值 O(N)
  protected add(index: number, key: T): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new Node(key);

      if (index === 0) {
        if (!this.head) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = this.head;
          const lastNode = this.get(this.size - 1)!;
          this.head = node;
          lastNode.next = this.head;
        }
      } else {
        const previous = this.get(index - 1);
        if (previous) {
          node.next = previous.next;
          previous.next = node;
        }
      }
      this.count++;
      return true;
    }
    return false;
  }

  // 设置链表第 index 个位置的值 O(N)
  set(index: number, key: T): boolean {
    if (index >= 0 && index < this.count) {
      const node = this.get(index);
      if (node) {
        node.key = key;
        return true;
      }
    }
    return false;
  }

  // 查找链表中是否有某个值 O(N)
  contains(key: T): boolean {
    let current = this.head;

    while (current && current.next) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
      if (current.key !== key && current.next == this.head) break; // 边界
    }

    return false;
  }

  // 删除链表第 index 个位置的值，返回删除的元素 O(N)
  protected remove(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        if (this.size === 1) {
          this.head = undefined;
        } else {
          const delNode = this.head;
          current = this.get(this.size - 1)!; // last node
          this.head = this.head?.next;
          current.next = this.head; // update new head
          current = delNode;
        }
      } else {
        const previous = this.get(index - 1);
        if (previous && previous.next) {
          current = previous.next;
          previous.next = current.next;
        }
      }
      this.count--;
      return current?.key;
    }
    return undefined;
  }

  // 从链表中删除某个元素 key 只删除前面的第一个值 O(N)
  removeKey(key: T): boolean {
    let delNode: Node<T> | undefined;

    if (!this.head) {
      return false;
    } else {
      if (this.head.key === key) {
        delNode = this.head;
        const lastNode = this.get(this.size - 1)!;
        this.head = delNode.next;
        lastNode.next = this.head; // update last node
      } else {
        let current = this.head;
        while (current.next) {
          if (current.next.key === key) {
            delNode = current.next;
            const previous = current;
            previous.next = current.next.next;
            break;
          }
          current = current.next;
          if (current == this.head) break; // 边界
        }
      }
    }

    if (!delNode?.key) {
      return false;
    } else {
      this.count--;
      return true;
    }
  }

  toString(): string {
    if (this.isEmpty()) return "";

    let current = this.head;
    let str = "Circular Linked List { ";

    // 遍历节点
    while (current) {
      str += current.key + " -> ";
      current = current.next;
      if (current == this.head) break;
    }

    str += "head }";
    return str;
  }
}
