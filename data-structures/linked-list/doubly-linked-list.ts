import LinkedList from "./linked-list";

class DoublyLinkedListNode<T> {
  val: T;
  next?: DoublyLinkedListNode<T>;
  prev?: DoublyLinkedListNode<T>;

  constructor(
    val: T,
    next?: DoublyLinkedListNode<T>,
    prev?: DoublyLinkedListNode<T>
  ) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

/**
 * @name DoublyLinkedList 链表 -> 双向链表
 * @description 双向链表需要在增加和删除元素的时候额外维护节点的 prev 指向和 tail 属性
 */
export default class DoublyLinkedList<T> extends LinkedList<T> {
  head: DoublyLinkedListNode<T> | undefined = undefined;
  tail: DoublyLinkedListNode<T> | undefined; // 表尾

  constructor() {
    super();
  }

  // 在链表的 index 位置添加值 O(N)
  protected add(index: number, val: T): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyLinkedListNode(val);
      let current = this.head;

      if (index === 0) {
        if (!this.head || !this.tail) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail!;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.get(index - 1);
        if (previous && previous.next) {
          current = previous.next;
          node.next = current;
          previous.next = node;

          current.prev = node;
          node.prev = previous;
        }
      }
      this.count++;
      return true;
    }
    return false;
  }

  // 删除链表第 index 个位置的值，返回删除的元素 O(N)
  protected remove(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      if (!this.head || !this.tail) return undefined;

      let current: DoublyLinkedListNode<T> | undefined = this.head;
      if (index === 0) {
        this.head = this.head.next!;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev!;
        this.tail.next = undefined;
      } else {
        current = this.get(index);
        if (current) {
          const previous = current.prev!;
          previous.next = current.next;
          current.next!.prev = previous;
        }
      }
      this.count--;
      return current!.val;
    }
    return undefined;
  }

  // 从链表中删除某个元素 val 只删除前面的第一个值 O(N)
  removeKey(val: T): boolean {
    let delNode: DoublyLinkedListNode<T> | undefined;

    if (!this.head || !this.tail) return false;

    if (this.head.val === val) {
      delNode = this.head;
      this.head = delNode.next;
      if (this.count === 1) {
        this.tail = undefined;
      } else {
        this.head!.prev = undefined;
      }
    } else if (this.tail.val == val) {
      delNode = this.tail;
      this.tail = delNode.prev;
      if (this.count === 1) {
        this.head = undefined;
      } else {
        this.tail!.next = undefined;
      }
    } else {
      let current = this.head;
      while (current.next) {
        if (current.next.val === val) {
          delNode = current.next;
          const previous = current;
          const next = current.next.next;
          previous.next = next;
          if (next) next.prev = previous;
          break;
        }
        current = current.next;
      }
    }

    if (!delNode?.val) {
      return false;
    } else {
      this.count--;
      return true;
    }
  }

  toString(): string {
    if (!this.head || !this.tail) return "";

    let current = this.head;
    let str = "Doubly Linked List { undefined <- ";

    // 遍历节点
    while (current) {
      str += current.val + (!current.next ? " -> " : " <-> ");
      current = current.next!;
    }

    str += "undefined }";
    return str;
  }
}
