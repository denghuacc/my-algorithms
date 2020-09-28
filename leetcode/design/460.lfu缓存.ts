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
// two map
class LFUCache {
  size: number;
  values: Map<number, number>;
  times: Map<number, number>;
  constructor(capacity: number) {
    this.size = capacity;
    this.values = new Map();
    this.times = new Map();
  }

  get(key: number): number {
    if (this.values.has(key)) {
      let val = this.values.get(key)!;
      let time = this.times.get(key) || 0;
      this.values.delete(key);
      this.times.delete(key);
      this.values.set(key, val);
      this.times.set(key, time + 1);
      return val;
    }

    return -1;
  }

  put(key: number, value: number): void {
    let time = 1;
    let min = Math.min(...this.times.values());
    if (this.values.has(key)) {
      time = (this.times.get(key) ?? 0) + 1;
      this.values.delete(key);
      this.values.delete(key);
    }
    this.values.set(key, value);
    this.times.set(key, time);
    if (this.size < this.values.size) {
      let keys = this.values.keys();
      let delKey = keys.next().value;
      while (delKey && this.times.get(delKey) !== min) {
        delKey = keys.next().value;
      }
      this.values.delete(delKey);
      this.times.delete(delKey);
    }
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
