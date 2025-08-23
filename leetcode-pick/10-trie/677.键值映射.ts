/*
 * @lc app=leetcode.cn id=677 lang=typescript
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
 * 实现一个 MapSum 类里的两个方法，insert 和 sum。
 *
 * 对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。
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

export {};

// @lc code=start

/**
 * Trie 树节点类
 * 每个节点存储一个字符和对应的值，以及指向下一个节点的映射
 */
class TrieNode {
  value: number; // 当前节点对应的值（只有完整单词的结尾节点才有值）
  next: Map<string, TrieNode>; // 字符到下一个节点的映射

  constructor(value = 0) {
    this.value = value;
    this.next = new Map(); // 使用 Map 存储字符到子节点的映射
  }
}

/**
 * MapSum 类 - 实现键值映射和前缀求和功能
 * 使用 Trie 树数据结构来高效处理字符串前缀查询
 */
class MapSum {
  root: TrieNode; // Trie 树的根节点

  constructor() {
    this.root = new TrieNode(); // 初始化根节点
  }

  /**
   * 插入键值对到 Trie 树中
   * @param key - 要插入的键（字符串）
   * @param val - 对应的值（数字）
   */
  insert(key: string, val: number): void {
    let cur = this.root; // 从根节点开始遍历

    // 逐字符遍历键字符串
    for (let i = 0; i < key.length; i++) {
      const ch = key[i];

      // 如果当前字符不存在于当前节点的子节点中，创建新节点
      if (!cur.next.get(ch)) {
        cur.next.set(ch, new TrieNode());
      }

      // 移动到下一个节点
      cur = cur.next.get(ch)!;
    }

    // 在完整单词的结尾节点设置值（覆盖原有值）
    cur.value = val;
  }

  /**
   * 计算所有以给定前缀开头的键的值的总和
   * @param prefix - 前缀字符串
   * @returns 所有匹配前缀的键的值的总和
   */
  sum(prefix: string): number {
    let cur = this.root; // 从根节点开始遍历

    // 逐字符遍历前缀字符串
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];

      // 如果前缀中的某个字符不存在，说明没有匹配的键，返回 0
      if (!cur.next.get(ch)) {
        return 0;
      }

      // 移动到下一个节点
      cur = cur.next.get(ch)!;
    }

    // 从前缀的最后一个字符对应的节点开始，递归计算所有子节点的值之和
    return this.getSum(cur);
  }

  /**
   * 递归计算以给定节点为根的子树中所有值的总和
   * @param node - 当前节点
   * @returns 子树中所有值的总和
   */
  private getSum(node: TrieNode): number {
    let res = node.value; // 当前节点的值

    // 遍历所有子节点，递归计算它们的值之和
    for (const ch of node.next.keys()) {
      res += this.getSum(node.next.get(ch)!);
    }

    return res;
  }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 实现一个支持插入键值对和前缀求和的数据结构
   - 核心需求是高效地找到所有以指定前缀开头的键，并计算它们的值之和

2. 算法分析：
   - 时间复杂度：
     * insert: O(L)，其中 L 是键的长度
     * sum: O(L + K)，其中 L 是前缀长度，K 是以该前缀开头的键的总字符数
   - 空间复杂度：O(T)，其中 T 是所有键的总字符数
   - 算法类型：Trie 树（前缀树）

3. 实现要点：
   - 使用 Trie 树存储所有键值对，每个节点代表一个字符
   - 在完整单词的结尾节点存储对应的值
   - insert 操作：遍历键的每个字符，构建或更新 Trie 树路径
   - sum 操作：先找到前缀对应的节点，然后递归计算所有子节点的值之和

4. 优化思路：
   - 使用 Map 而不是数组来存储子节点，提高查找效率
   - 在 sum 操作中，如果前缀不存在，直接返回 0，避免不必要的计算
   - 递归计算子树和时，可以进一步优化为迭代方式以减少栈空间使用

5. 关键技巧：
   - Trie 树的路径表示完整的键
   - 前缀匹配只需要遍历到前缀的最后一个字符
   - 递归遍历子树可以找到所有以该前缀开头的键

6. 类似问题：
   - 208. 实现 Trie (前缀树)
   - 211. 添加与搜索单词 - 数据结构设计
   - 648. 单词替换
   - 677. 键值映射（本题）

7. 常见错误：
   - 忘记处理前缀不存在的情况
   - 在 insert 时没有正确设置结尾节点的值
   - 在 sum 时没有递归计算所有子节点的值
   - 使用数组而不是 Map 存储子节点，导致空间浪费
*/
