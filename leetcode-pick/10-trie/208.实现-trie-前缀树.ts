/*
 * @lc app=leetcode.cn id=208 lang=typescript
 *
 * [208] 实现 Trie (前缀树)
 *
 * https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (54.21%)
 * Total Accepted:    5.2K
 * Total Submissions: 9.2K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
 *
 * 示例:
 *
 * Trie trie = new Trie();
 *
 * trie.insert("apple");
 * trie.search("apple");   // 返回 true
 * trie.search("app");     // 返回 false
 * trie.startsWith("app"); // 返回 true
 * trie.insert("app");
 * trie.search("app");     // 返回 true
 *
 * 说明:
 *
 *
 * 你可以假设所有的输入都是由小写字母 a-z 构成的。
 * 保证所有输入均为非空字符串。
 *
 *
 */

export {};

// @lc code=start

/**
 * Trie 节点类
 * 每个节点包含：
 * - isWord: 标记该节点是否是一个完整单词的结尾
 * - next: 存储子节点的映射，键为字符，值为对应的子节点
 */
class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;

  constructor(isWord = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

/**
 * Trie (前缀树) 类
 * 实现字符串的插入、查找和前缀匹配功能
 */
class Trie {
  root: TrieNode;

  constructor() {
    // 初始化根节点，根节点不存储任何字符
    this.root = new TrieNode();
  }

  /**
   * 插入单词到 Trie 中
   * @param word 要插入的单词
   */
  insert(word: string): void {
    let cur = this.root;

    // 遍历单词的每个字符
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];

      // 如果当前字符不存在于当前节点的子节点中，创建新的子节点
      if (!cur.next.get(ch)) {
        cur.next.set(ch, new TrieNode());
      }

      // 移动到下一个节点
      cur = cur.next.get(ch)!;
    }

    // 标记最后一个节点为单词结尾
    if (!cur.isWord) {
      cur.isWord = true;
    }
  }

  /**
   * 查找单词是否存在于 Trie 中
   * @param word 要查找的单词
   * @returns 如果单词存在返回 true，否则返回 false
   */
  search(word: string): boolean {
    let cur = this.root;

    // 遍历单词的每个字符
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];

      // 如果当前字符不存在于当前节点的子节点中，返回 false
      if (!cur.next.get(ch)) {
        return false;
      }

      // 移动到下一个节点
      cur = cur.next.get(ch)!;
    }

    // 检查最后一个节点是否标记为单词结尾
    return cur.isWord;
  }

  /**
   * 检查是否有以给定前缀开头的单词
   * @param prefix 要检查的前缀
   * @returns 如果存在以该前缀开头的单词返回 true，否则返回 false
   */
  startsWith(prefix: string): boolean {
    let cur = this.root;

    // 遍历前缀的每个字符
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];

      // 如果当前字符不存在于当前节点的子节点中，返回 false
      if (!cur.next.get(ch)) {
        return false;
      }

      // 移动到下一个节点
      cur = cur.next.get(ch)!;
    }

    // 如果能够遍历完整个前缀，说明存在以该前缀开头的单词
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 实现一个 Trie（前缀树）数据结构
   - 支持插入单词、查找完整单词、查找前缀三种操作
   - 核心是构建一个多叉树结构来存储字符串集合

2. 算法分析：
   - 时间复杂度：
     * insert: O(m)，其中 m 是单词长度
     * search: O(m)，其中 m 是单词长度
     * startsWith: O(m)，其中 m 是前缀长度
   - 空间复杂度：O(ALPHABET_SIZE × N × M)
     * N 是插入的单词数量
     * M 是单词的平均长度
     * ALPHABET_SIZE 是字符集大小（这里是 26）
   - 算法类型：树形数据结构

3. 实现要点：
   - TrieNode 类设计：
     * isWord 字段标记节点是否为单词结尾
     * next 字段使用 Map 存储子节点，提高查找效率
   - 三个核心操作：
     * insert: 逐字符构建路径，最后标记单词结尾
     * search: 逐字符查找路径，检查最后节点是否为单词结尾
     * startsWith: 逐字符查找路径，只要能走完前缀即可

4. 优化思路：
   - 使用 Map 而不是数组存储子节点，避免空间浪费
   - 在 insert 中检查 isWord 避免重复标记
   - 代码结构清晰，易于理解和维护

5. 数据结构特点：
   - 共享前缀：多个单词可以共享相同的前缀路径
   - 快速前缀匹配：O(m) 时间复杂度完成前缀查找
   - 空间效率：相比哈希表，Trie 在存储大量有共同前缀的单词时更节省空间

6. 应用场景：
   - 自动补全功能
   - 拼写检查
   - IP 路由表
   - 字典实现
   - 字符串前缀匹配

7. 边界情况处理：
   - 空字符串：题目保证输入非空，无需特殊处理
   - 重复插入：通过检查 isWord 避免重复标记
   - 字符集限制：只处理小写字母 a-z

8. 类似问题：
   - 211. 添加与搜索单词 - 数据结构设计
   - 212. 单词搜索 II - Trie + DFS
   - 648. 单词替换 - Trie 查找
   - 677. 键值映射 - Trie 带权值
*/
