/*
 * @lc app=leetcode.cn id=677 lang=javascript
 *
 * [677] 键值映射
 *
 * https://leetcode-cn.com/problems/map-sum-pairs/description/
 *
 * algorithms
 * Medium (55.96%)
 * Total Accepted:    1.8K
 * Total Submissions: 3.1K
 * Testcase Example:  '["MapSum", "insert", "sum", "insert", "sum"]\n[[], ["apple",3], ["ap"], ["app",2], ["ap"]]'
 *
 * 实现一个 MapSum 类里的两个方法，insert 和 sum。
 *
 * 对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。
 *
 * 对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。
 *
 * 示例 1:
 *
 * 输入: insert("apple", 3), 输出: Null
 * 输入: sum("ap"), 输出: 3
 * 输入: insert("app", 2), 输出: Null
 * 输入: sum("ap"), 输出: 5
 *
 *
 */

// @lc code=start
class Node {
  constructor(value = 0) {
    this.value = value
    this.next = new Map() // 映射
  }
}

/**
 * Initialize your data structure here.
 */
var MapSum = function () {
  this.root = new Node()
}

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  let cur = this.root
  for (let i = 0; i < key.length; i++) {
    const c = key[i]
    if (!cur.next.get(c)) {
      cur.next.set(c, new Node())
    }
    cur = cur.next.get(c)
  }
  cur.value = val
}

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
  let cur = this.root
  for (let i = 0; i < prefix.length; i++) {
    const c = prefix[i]
    if (!cur.next.get(c)) {
      return 0
    }
    cur = cur.next.get(c)
  }
  return _sum(cur)

  function _sum(node) {
    let res = node.value
    for (let c of node.next.keys()) {
      res += _sum(node.next.get(c))
    }

    return res
  }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
// @lc code=end
