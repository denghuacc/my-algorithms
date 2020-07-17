/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU缓存机制
 *
 * https://leetcode-cn.com/problems/lru-cache/description/
 *
 * algorithms
 * Hard (38.10%)
 * Likes:    752
 * Dislikes: 0
 * Total Accepted:    80.2K
 * Total Submissions: 160.9K
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。
 * 
 * 获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
 * 写入数据 put(key, value) -
 * 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 * 
 * 
 * 
 * 进阶:
 * 
 * 你是否可以在 O(1) 时间复杂度内完成这两种操作？
 * 
 * 
 * 
 * 示例:
 * 
 * LRUCache cache = new LRUCache( 2 // 缓存容量 );
 * 
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // 返回  1
 * cache.put(3, 3);    // 该操作会使得关键字 2 作废
 * cache.get(2);       // 返回 -1 (未找到)
 * cache.put(4, 4);    // 该操作会使得关键字 1 作废
 * cache.get(1);       // 返回 -1 (未找到)
 * cache.get(3);       // 返回  3
 * cache.get(4);       // 返回  4
 * 
 * 
 */

export {};

// @lc code=start

class Node {
  key: number;
  value: number;
  prev!: Node;
  next!: Node;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

// one DoublyLinkedList O(1)
class LRUCache {
  capacity: number;
  size: number;
  cache: Map<number, Node>;
  head: Node;
  tail: Node;

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key);
    if (!node) {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);
      this.size++;
      if (this.size > this.capacity) {
        this.tail = this.removeTail();
        this.cache.delete(this.tail.key);
        this.size--;
      }
    } else {
      node.value = value;
      this.moveToHead(node);
    }
  }

  private moveToHead(node: Node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeNode(node: Node) {
    node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev; // why judge
  }

  private addToHead(node: Node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  private removeTail(): Node {
    const ret = this.tail.prev;
    this.removeNode(this.tail);
    return ret;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
