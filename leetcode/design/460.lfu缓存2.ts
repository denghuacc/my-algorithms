/*
 * @lc app=leetcode.cn id=460 lang=typescript
 *
 * [460] LFU缓存
 *
 * https://leetcode-cn.com/problems/lfu-cache/description/
 *
 * algorithms
 * Hard (25.22%)
 * Likes:    234
 * Dislikes: 0
 * Total Accepted:    15.5K
 * Total Submissions: 37K
 * Testcase Example:  '["LFUCache","put","put","get","put","get","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]'
 *
 * 请你为 最不经常使用（LFU）缓存算法设计并实现数据结构。它应该支持以下操作：get 和 put。
 * 
 * 
 * get(key) - 如果键存在于缓存中，则获取键的值（总是正数），否则返回 -1。
 * put(key, value) -
 * 如果键已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量时，则应该在插入新项之前，使最不经常使用的项无效。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除最久未使用的键。
 * 
 * 
 * 「项的使用次数」就是自插入该项以来对其调用 get 和 put 函数的次数之和。使用次数会在对应项被移除后置为 0 。
 * 
 * 
 * 
 * 进阶：
 * 你是否可以在 O(1) 时间复杂度内执行两项操作？
 * 
 * 
 * 
 * 示例：
 * 
 * LFUCache cache = new LFUCache( 2 // capacity (缓存容量) );
 * 
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // 返回 1
 * cache.put(3, 3);    // 去除 key 2
 * cache.get(2);       // 返回 -1 (未找到key 2)
 * cache.get(3);       // 返回 3
 * cache.put(4, 4);    // 去除 key 1
 * cache.get(1);       // 返回 -1 (未找到 key 1)
 * cache.get(3);       // 返回 3
 * cache.get(4);       // 返回 4
 * 
 */

export {};

// @lc code=start
class Node {
  freq = 1;
  prev!: Node;
  next!: Node;
  doublyLinkedList!: DoublyLinkedList;

  constructor(public key: number, public value: number) {}
}

class DoublyLinkedList {
  freq: number;
  prev!: DoublyLinkedList; // 双向链表的前继链表 prev.freq < this.freq
  next!: DoublyLinkedList; // 双向链表的后继链表 next.freq > this.freq
  head: Node;
  tail: Node;

  constructor(freq: number) {
    this.freq = freq;
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeNode(node: Node) {
    node.prev && (node.prev.next = node.next);
    node.next && (node.next.prev = node.prev);
  }

  addNode(node: Node) {
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
    node.prev = this.head;
    node.doublyLinkedList = this;
  }
}

// two DoublyLinkedList O(1)
class LFUCache {
  capacity: number;
  cache: Map<number, Node>;
  firstLinkedList: DoublyLinkedList; // firstLinkedList.next 是频次最大的双向链表
  // lastLinkedList.prev 是频次最小的双向链表，
  // 满了之后删除 lastLinkedList.prev.tail.prev 这个 Node 即为频次最小且访问最早的 Node
  lastLinkedList: DoublyLinkedList;
  size: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.firstLinkedList = new DoublyLinkedList(Infinity);
    this.lastLinkedList = new DoublyLinkedList(Infinity);
    this.firstLinkedList.next = this.lastLinkedList;
    this.lastLinkedList.prev = this.firstLinkedList;
    this.size = 0;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.freqInc(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.capacity === 0) return;
    const node = this.cache.get(key);
    if (node) {
      node.value = value;
      this.freqInc(node);
    } else {
      if (this.lastLinkedList.prev) {
        if (this.size === this.capacity) {
          this.cache.delete(this.lastLinkedList.prev.tail.prev.key);
          this.lastLinkedList.removeNode(this.lastLinkedList.prev.tail.prev);
          this.size--;
          if (
            this.lastLinkedList.prev.head.next === this.lastLinkedList.prev.tail
          ) {
            this.removeDoublyLinkedList(this.lastLinkedList.prev);
          }
        }
        const newNode = new Node(key, value);
        this.cache.set(key, newNode);
        if (this.lastLinkedList.prev.freq !== 1) {
          const newDoublyLinkedList = new DoublyLinkedList(1);
          this.addDoublyLinkedList(
            newDoublyLinkedList,
            this.lastLinkedList.prev
          );
          newDoublyLinkedList.addNode(newNode);
        } else {
          this.lastLinkedList.prev.addNode(newNode);
        }
        this.size++;
      }
    }
  }

  private freqInc(node: Node) {
    let linkedList = node.doublyLinkedList;
    let preLinkedList = linkedList.prev;
    linkedList.removeNode(node);
    if (linkedList.head.next === linkedList.tail) {
      this.removeDoublyLinkedList(linkedList);
    }
    node.freq++;
    if (preLinkedList.freq !== node.freq) {
      const newDoublyLinkedList = new DoublyLinkedList(node.freq);
      this.addDoublyLinkedList(newDoublyLinkedList, preLinkedList);
      newDoublyLinkedList.addNode(node);
    } else {
      preLinkedList.addNode(node);
    }
  }

  private addDoublyLinkedList(
    newDoublyLinkedList: DoublyLinkedList,
    preLinkedList: DoublyLinkedList
  ) {
    newDoublyLinkedList.next = preLinkedList.next;
    newDoublyLinkedList.next &&
      (newDoublyLinkedList.next.prev = newDoublyLinkedList);
    newDoublyLinkedList.prev = preLinkedList;
    preLinkedList.next = newDoublyLinkedList;
  }

  private removeDoublyLinkedList(doublyLinkedList: DoublyLinkedList) {
    doublyLinkedList.prev &&
      (doublyLinkedList.prev.next = doublyLinkedList.next);
    doublyLinkedList.next &&
      (doublyLinkedList.next.prev = doublyLinkedList.prev);
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
