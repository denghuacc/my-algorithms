import LinkedList from "./linked-list";

/**
 * @name ScoredLinkedList 链表 -> 排序单向链表（升序）
 * @description
 * 链表的元素按顺序进行排序，即添加元素的时候需要插入到链表的合适的位置
 * 所以不能使用 addFirst 和 addLast 来添加元素了，新增 push 方法添加元素
 * 也不能使用 set 方法修改元素的值，因为会把排序弄乱
 */
export default class ScoredLinkedList<T> extends LinkedList<T> {
  constructor() {
    super();
  }

  // 添加元素 O(N)
  // 不能使用 addFirst 和 addLast 来添加元素
  push(key: T): void {
    if (this.isEmpty()) {
      super.addFirst(key);
    } else {
      const index = this.getIndex(key);
      super.add(index, key);
    }
  }

  // 获取需要插入的值 key 所在的合适索引位置 O(N)
  private getIndex(key: T): number {
    let current = this.head;
    let i = 0;
    for (; i < this.size && current; i++) {
      if (key < current.key) {
        return i;
      }
      current = current.next;
    }
    return i;
  }

  toString(): string {
    if (this.isEmpty()) return "";

    let current = this.head;
    let str = "Sorted Linked List { ";

    // 遍历节点
    while (current) {
      str += current.key + " -> ";
      current = current.next;
    }

    str += "undefined }";
    return str;
  }
}
