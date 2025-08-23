/*
 * @lc app=leetcode.cn id=820 lang=typescript
 *
 * [820] 单词的压缩编码
 *
 * https://leetcode.cn/problems/short-encoding-of-words/description/
 *
 * algorithms
 * Medium (51.78%)
 * Likes:    294
 * Dislikes: 0
 * Total Accepted:    66.1K
 * Total Submissions: 127.7K
 * Testcase Example:  '["time","me","bell"]'
 *
 * 单词数组 words 的 有效编码 由任意助记字符串 s 和下标数组 indices 组成，且满足：
 *
 *
 * words.length == indices.length
 * 助记字符串 s 以 '#' 字符结尾
 * 对于每个下标 indices[i] ，s 的一个从 indices[i] 开始、到下一个 '#' 字符结束（但不包括 '#'）的 子字符串 恰好与
 * words[i] 相等
 *
 *
 * 给你一个单词数组 words ，返回成功对 words 进行编码的最小助记字符串 s 的长度 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["time", "me", "bell"]
 * 输出：10
 * 解释：一组有效编码为 s = "time#bell#" 和 indices = [0, 2, 5] 。
 * words[0] = "time" ，s 开始于 indices[0] = 0 到下一个 '#' 结束的子字符串，如加粗部分所示
 * "time#bell#"
 * words[1] = "me" ，s 开始于 indices[1]  = 2 到下一个 '#' 结束的子字符串，如加粗部分所示 "time#bell#"
 * words[2] = "bell" ，s 开始于 indices[2] = 5 到下一个 '#' 结束的子字符串，如加粗部分所示
 * "time#bell#"
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["t"]
 * 输出：2
 * 解释：一组有效编码为 s = "t#" 和 indices = [0] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * words[i] 仅由小写字母组成
 *
 *
 */

export {};

// @lc code=start

/**
 * Trie 树节点类
 * 用于构建后缀 Trie 树
 */
class TrieNode {
  count: number; // 子节点数量，用于判断是否为叶子节点
  next: Map<string, TrieNode>; // 字符到子节点的映射

  constructor() {
    this.count = 0;
    this.next = new Map();
  }

  /**
   * 获取或创建子节点
   * @param ch - 字符
   * @returns 对应的子节点
   */
  get(ch: string): TrieNode {
    if (!this.next.has(ch)) {
      this.next.set(ch, new TrieNode());
      this.count++; // 增加子节点计数
    }
    return this.next.get(ch)!;
  }
}

/**
 * 主解法：Trie 树解法
 * 核心思想：构建单词的反向 Trie 树，叶子节点对应的单词不能被其他单词包含
 * 时间复杂度：O(Σw)，其中 Σw 是所有单词的总长度
 * 空间复杂度：O(Σw)
 */
function minimumLengthEncoding(words: string[]): number {
  const trie = new TrieNode(); // 创建 Trie 树根节点
  const nodes: Map<TrieNode, number> = new Map(); // 存储节点到单词索引的映射

  // 构建反向 Trie 树（从单词末尾开始构建）
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let cur = trie;

    // 从单词末尾开始，反向构建 Trie 树
    for (let j = word.length - 1; j >= 0; j--) {
      cur = cur.get(word[j]);
    }

    // 记录单词末尾对应的节点
    nodes.set(cur, i);
  }

  // 计算所有叶子节点对应单词的长度
  let res = 0;
  for (const node of nodes.keys()) {
    // 如果节点没有子节点（count === 0），说明是叶子节点
    // 叶子节点对应的单词不能被其他单词包含，必须单独编码
    if (node.count === 0) {
      res += words[nodes.get(node)!].length + 1; // +1 是因为要加 '#'
    }
  }

  return res;
}

/**
 * 方法一：哈希表解法（备用方案）
 * 核心思想：如果一个单词是另一个单词的后缀，那么它可以被压缩编码
 * 时间复杂度：O(Σw²)，其中 Σw 是所有单词的总长度
 * 空间复杂度：O(Σw)
 */
function minimumLengthEncodingHash(words: string[]): number {
  // 将所有单词加入集合中
  const good: Set<string> = new Set(words);

  // 遍历每个单词，删除所有可能的后缀
  for (const word of words) {
    // 从索引1开始，因为索引0是单词本身，不需要删除
    for (let i = 1; i < word.length; i++) {
      // 删除当前单词的所有后缀
      good.delete(word.substring(i));
    }
  }

  // 计算剩余单词的总长度（每个单词后面都要加一个'#'）
  let res = 0;
  for (const word of good) {
    res += word.length + 1; // +1 是因为每个单词后面都要加 '#'
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 寻找最小长度的字符串编码，使得所有单词都能在该字符串中找到
   - 如果一个单词是另一个单词的后缀，那么它可以被压缩编码
   - 核心是识别哪些单词是其他单词的后缀，这些单词可以被省略

2. 算法分析：
   - 方法一（哈希表）：
     * 时间复杂度：O(Σw²)，其中 Σw 是所有单词的总长度
     * 空间复杂度：O(Σw)
   - 方法二（Trie 树）：
     * 时间复杂度：O(Σw)
     * 空间复杂度：O(Σw)
   - 算法类型：字符串处理、Trie 树、哈希表

3. 实现要点：
   - 方法一：使用哈希表存储所有单词，然后删除所有可能的后缀
   - 方法二：构建反向 Trie 树，叶子节点对应的单词必须单独编码
   - 关键观察：如果一个单词是另一个单词的后缀，那么它可以被包含在编码中

4. 核心思想：
   - 压缩编码的关键是识别后缀关系
   - 如果一个单词是另一个单词的后缀，那么它不需要单独编码
   - 只有那些不是任何其他单词后缀的单词才需要单独编码

5. 关键技巧：
   - 方法一：从每个单词的所有后缀中删除，剩下的就是必须单独编码的单词
   - 方法二：反向构建 Trie 树，叶子节点对应的单词不能被其他单词包含
   - 使用 count 字段判断节点是否为叶子节点

6. 示例分析：
   - 输入：["time", "me", "bell"]
   - 方法一：删除 "me"（因为它是 "time" 的后缀），剩下 ["time", "bell"]
   - 方法二：构建反向 Trie 树，"me" 是 "time" 的后缀，所以 "me" 对应的节点不是叶子节点
   - 结果：需要编码 "time#bell#"，长度为 10

7. 优化思路：
   - Trie 树方法比哈希表方法更高效
   - 可以进一步优化 Trie 树的存储结构
   - 对于大规模数据，Trie 树的优势更明显

8. 类似问题：
   - 208. 实现 Trie (前缀树)
   - 648. 单词替换
   - 677. 键值映射
   - 820. 单词的压缩编码（本题）

9. 常见错误：
   - 忘记处理单词本身（不删除索引0的子串）
   - 没有正确识别后缀关系
   - 在 Trie 树方法中没有正确判断叶子节点
   - 忘记每个单词后面都要加 '#' 字符

10. 边界情况：
    - 空数组：返回 0
    - 单个单词：返回单词长度 + 1
    - 所有单词都是其他单词的后缀：返回 0
    - 没有后缀关系的单词：返回所有单词长度之和 + 单词个数
*/
