/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 *
 * https://leetcode.cn/problems/design-linked-list/description/
 *
 * algorithms
 * Medium (33.86%)
 * Likes:    585
 * Dislikes: 0
 * Total Accepted:    156K
 * Total Submissions: 457K
 * Testcase Example:  '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n' +
  '[[],[1],[3],[1,2],[1],[1],[1]]'
 *
 * 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next
 * 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
 * 
 * 在链表类中实现这些功能：
 * 
 * 
 * get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
 * addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index
 * 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
 * deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 * linkedList.get(1);            //返回2
 * linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 * linkedList.get(1);            //返回3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 所有val值都在 [1, 1000] 之内。
 * 操作次数将在  [1, 1000] 之内。
 * 请不要使用内置的 LinkedList 库。
 * 
 * 
 */

export {};

// @lc code=start
class LinkedListNode {
  val: number;
  next?: LinkedListNode;

  constructor(val: number, next?: LinkedListNode) {
    this.val = val;
    this.next = next;
  }
}

class MyLinkedList {
  head: LinkedListNode | undefined;
  size: number;

  constructor() {
    this.size = 0;
  }

  get(index: number): number {
    if (!this.head || index < 0 || index >= this.size) {
      return -1;
    }
    let cur = this.head;
    while (index > 0) {
      cur = cur.next!;
      index--;
    }
    return cur.val;
  }

  addAtHead(val: number): void {
    const node = new LinkedListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  addAtTail(val: number): void {
    const node = new LinkedListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index > this.size) return;
    if (index <= 0) {
      this.addAtHead(val);
      return;
    }
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    let cur = this.head!;
    while (index > 1) {
      cur = cur.next!;
      index--;
    }
    const node = new LinkedListNode(val);
    const next = cur.next;
    node.next = next;
    cur.next = node;
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (!this.head || index < 0 || index >= this.size) return;
    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let cur = this.head;
    while (index > 1) {
      cur = cur.next!;
      index--;
    }
    cur.next = cur.next?.next;
    this.size--;
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end
