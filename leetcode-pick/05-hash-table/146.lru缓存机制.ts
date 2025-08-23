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

/**
 * 双向链表节点
 * 用于LRU缓存中维护访问顺序
 */
class Node {
  key: number;
  value: number;
  prev!: Node; // 前驱节点
  next!: Node; // 后继节点

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

/**
 * LRU (Least Recently Used) 缓存机制
 * 核心思路：哈希表 + 双向链表，实现O(1)的get和put操作
 *
 * 设计思想：
 * - 哈希表：提供O(1)的查找和删除
 * - 双向链表：维护访问顺序，头部是最近访问的，尾部是最久未访问的
 * - 伪头尾节点：简化边界条件的处理
 *
 * 时间复杂度：get和put操作都是O(1)
 * 空间复杂度：O(capacity)
 */
class LRUCache {
  private capacity: number; // 缓存容量
  private size: number; // 当前缓存大小
  private cache: Map<number, Node>; // 哈希表，key到节点的映射
  private head: Node; // 伪头节点（最近访问）
  private tail: Node; // 伪尾节点（最久未访问）

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = new Map();

    // 创建伪头尾节点，简化链表操作
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取缓存值
   * @param key 要获取的键
   * @returns 如果存在返回对应值，否则返回-1
   */
  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) {
      return -1;
    }

    // 访问时将节点移动到头部（标记为最近使用）
    this.moveToHead(node);
    return node.value;
  }

  /**
   * 放入缓存
   * @param key 键
   * @param value 值
   */
  put(key: number, value: number): void {
    const existingNode = this.cache.get(key);

    if (!existingNode) {
      // 新键值对
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);
      this.size++;

      // 如果超出容量，删除最久未使用的节点（尾部节点）
      if (this.size > this.capacity) {
        const removedNode = this.removeTail();
        this.cache.delete(removedNode.key);
        this.size--;
      }
    } else {
      // 更新已存在的键值对
      existingNode.value = value;
      this.moveToHead(existingNode);
    }
  }

  /**
   * 将节点移动到头部
   * @param node 要移动的节点
   */
  private moveToHead(node: Node): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  /**
   * 从链表中移除节点
   * @param node 要移除的节点
   */
  private removeNode(node: Node): void {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * 在头部添加节点
   * @param node 要添加的节点
   */
  private addToHead(node: Node): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * 移除尾部节点
   * @returns 被移除的节点
   */
  private removeTail(): Node {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个支持O(1)时间复杂度的LRU缓存机制
   - 需要快速访问、插入、删除，并维护访问顺序

2. 算法分析：
   - 时间复杂度：get和put操作都是O(1)
   - 空间复杂度：O(capacity)，存储缓存数据
   - 算法类型：哈希表 + 双向链表的组合设计

3. 实现要点：
   - 核心数据结构：哈希表存储key到节点的映射，双向链表维护访问顺序
   - 哈希表作用：提供O(1)的查找、插入、删除操作
   - 双向链表作用：维护元素的访问顺序，支持O(1)的头尾操作
   - 伪头尾节点：简化边界条件处理，避免空指针判断

4. 关键操作：
   - get操作：查找节点，如果存在则移动到头部并返回值
   - put操作：如果key存在则更新并移动到头部，否则插入新节点
   - 容量控制：当超出容量时删除尾部最久未使用的节点
   - 节点移动：先删除节点，再添加到头部

5. 设计亮点：
   - 双向链表支持O(1)删除任意节点（已知节点指针）
   - 伪头尾节点消除边界情况，简化代码逻辑
   - 哈希表和链表的完美结合，各自发挥优势
   - 访问即更新：每次访问都会更新元素的位置

6. 常见错误：
   - 忘记更新链表指针导致内存泄漏或访问错误
   - 删除节点时没有同时更新哈希表
   - 边界条件处理不当（如容量为1的情况）
   - moveToHead操作的顺序错误

7. 扩展思考：
   - 可以扩展为LFU（最少使用频次）缓存
   - 支持过期时间的缓存机制
   - 线程安全的并发LRU缓存
   - 基于磁盘的大容量LRU缓存
*/
