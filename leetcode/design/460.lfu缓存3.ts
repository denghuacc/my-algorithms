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

  constructor(public key: number, public value: number) {}
}

// one DoublyLinkedList O(N)
class LFUCache {
  capacity: number;
  cache: Map<number, Node>;
  size: number;
  head: Node;
  tail: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;
    node.freq += 1;
    this.moveToNewPosition(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.capacity === 0) return;
    const node = this.cache.get(key);
    if (node) {
      node.value = value;
      node.freq += 1;
      this.moveToNewPosition(node);
    } else {
      if (this.size === this.capacity) {
        this.cache.delete(this.head.next.key);
        this.removeNode(this.head.next);
        this.size--;
      }
      const newNode = new Node(key, value);
      this.addNode(newNode);
      this.cache.set(key, newNode);
      this.size++;
    }
  }

  private moveToNewPosition(node: Node) {
    let nextNode = node.next;
    this.removeNode(node);

    while (nextNode.freq <= node.freq && nextNode !== this.tail) {
      nextNode = nextNode.next;
    }

    nextNode.prev.next = node;
    node.prev = nextNode.prev;
    node.next = nextNode;
    nextNode.prev = node;
  }

  private addNode(node: Node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.moveToNewPosition(node);
  }

  private removeNode(node: Node) {
    node.prev && (node.prev.next = node.next);
    node.next && (node.next.prev = node.prev);
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
