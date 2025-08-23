/*
 * @lc app=leetcode.cn id=648 lang=typescript
 *
 * [648] 单词替换
 *
 * https://leetcode.cn/problems/replace-words/description/
 *
 * algorithms
 * Medium (64.39%)
 * Likes:    238
 * Dislikes: 0
 * Total Accepted:    55.5K
 * Total Submissions: 86.1K
 * Testcase Example:  '["cat","bat","rat"]\n"the cattle was rattled by the battery"'
 *
 * 在英语中，我们有一个叫做 词根(root) 的概念，可以词根后面添加其他一些词组成另一个较长的单词——我们称这个词为
 * 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。
 *
 * 现在，给定一个由许多词根组成的词典 dictionary 和一个用空格分隔单词形成的句子
 * sentence。你需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。
 *
 * 你需要输出替换之后的句子。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by
 * the battery"
 * 输出："the cat was rat by the bat"
 *
 *
 * 示例 2：
 *
 *
 * 输入：dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
 * 输出："a a b c"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= dictionary.length <= 1000
 * 1 <= dictionary[i].length <= 100
 * dictionary[i] 仅由小写字母组成。
 * 1 <= sentence.length <= 10^6
 * sentence 仅由小写字母和空格组成。
 * sentence 中单词的总量在范围 [1, 1000] 内。
 * sentence 中每个单词的长度在范围 [1, 1000] 内。
 * sentence 中单词之间由一个空格隔开。
 * sentence 没有前导或尾随空格。
 *
 *
 *
 *
 */

export {};

// @lc code=start

/**
 * 方法一：API 解法（使用 startsWith）
 * 核心思想：对每个单词，从最短的词根开始检查，找到第一个匹配的词根进行替换
 * 时间复杂度：O(n * m * k)，其中 n 是句子中单词数，m 是词典大小，k 是平均单词长度
 * 空间复杂度：O(n)
 */
function replaceWordsAPI(dictionary: string[], sentence: string): string {
  const words = sentence.split(" "); // 将句子分割成单词数组
  const n = words.length;

  // 按长度排序词典，确保优先使用最短的词根
  dictionary.sort((a, b) => a.length - b.length);

  const resArr: string[] = new Array(n); // 存储替换后的单词

  // 遍历每个单词
  for (let i = 0; i < n; i++) {
    const word = words[i];

    // 遍历词典，找到第一个匹配的词根
    for (const dic of dictionary) {
      if (word.startsWith(dic)) {
        resArr[i] = dic; // 用词根替换单词
        break;
      }
    }

    // 如果没有找到匹配的词根，保持原单词不变
    if (!resArr[i]) {
      resArr[i] = word;
    }
  }

  return resArr.join(" "); // 将单词数组重新组合成句子
}

/**
 * 方法二：哈希表解法
 * 核心思想：使用 Set 存储词典，对每个单词的前缀进行检查
 * 时间复杂度：O(n * k²)，其中 n 是句子中单词数，k 是平均单词长度
 * 空间复杂度：O(m + n)，其中 m 是词典大小
 */
function replaceWordsHash(dictionary: string[], sentence: string): string {
  const dictionarySet: Set<string> = new Set(dictionary); // 将词典转换为 Set 提高查找效率
  const words = sentence.split(" "); // 将句子分割成单词数组
  const n = words.length;

  // 遍历每个单词
  for (let i = 0; i < n; i++) {
    const word = words[i];

    // 检查单词的所有可能前缀
    for (let j = 1; j <= word.length; j++) {
      const prefix = word.slice(0, j); // 获取前缀
      if (dictionarySet.has(prefix)) {
        words[i] = prefix; // 用最短的词根替换单词
        break; // 找到第一个匹配的词根就停止
      }
    }
  }

  return words.join(" "); // 将单词数组重新组合成句子
}

/**
 * Trie 树节点类
 * 用于构建词根 Trie 树
 */
class TrieNode {
  isEnd: boolean; // 标记是否为词根结尾
  children: Map<string, TrieNode>; // 字符到子节点的映射

  constructor() {
    this.isEnd = false;
    this.children = new Map();
  }
}

/**
 * 主解法：Trie 树解法（最优解法）
 * 核心思想：构建词根的 Trie 树，对每个单词在 Trie 树中查找最短匹配的词根
 * 时间复杂度：O(Σd + n * k)，其中 Σd 是所有词根的总长度，n 是句子中单词数，k 是平均单词长度
 * 空间复杂度：O(Σd + n)
 */
function replaceWords(dictionary: string[], sentence: string): string {
  // 构建 Trie 树
  const root = new TrieNode();

  // 将所有词根插入 Trie 树
  for (const word of dictionary) {
    let node = root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true; // 标记词根结尾
  }

  // 分割句子并处理每个单词
  const words = sentence.split(" ");
  const result: string[] = [];

  for (const word of words) {
    let node = root;
    let prefix = "";
    let found = false;

    // 在 Trie 树中查找最短匹配的词根
    for (const char of word) {
      if (!node.children.has(char)) {
        break; // 如果字符不存在，停止查找
      }

      node = node.children.get(char)!;
      prefix += char;

      // 如果找到词根结尾，使用该词根替换
      if (node.isEnd) {
        result.push(prefix);
        found = true;
        break;
      }
    }

    // 如果没有找到匹配的词根，保持原单词不变
    if (!found) {
      result.push(word);
    }
  }

  return result.join(" ");
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将句子中的继承词替换为对应的最短词根
   - 核心是高效地查找每个单词的最短匹配词根
   - 需要处理多个词根可能匹配同一个单词的情况

2. 算法分析：
   - 方法一（API 解法）：
     * 时间复杂度：O(n * m * k)，其中 n 是句子中单词数，m 是词典大小，k 是平均单词长度
     * 空间复杂度：O(n)
   - 方法二（哈希表解法）：
     * 时间复杂度：O(n * k²)，其中 n 是句子中单词数，k 是平均单词长度
     * 空间复杂度：O(m + n)，其中 m 是词典大小
   - 方法三（Trie 树解法）：
     * 时间复杂度：O(Σd + n * k)，其中 Σd 是所有词根的总长度
     * 空间复杂度：O(Σd + n)
   - 算法类型：字符串处理、Trie 树、哈希表

3. 实现要点：
   - 方法一：使用 startsWith API 检查前缀匹配，按长度排序确保优先使用最短词根
   - 方法二：使用 Set 存储词典，检查单词的所有可能前缀
   - 方法三：构建 Trie 树存储词根，在 Trie 树中查找最短匹配路径

4. 核心思想：
   - 前缀匹配：词根必须是单词的前缀
   - 最短优先：当多个词根匹配时，选择最短的词根
   - 高效查找：使用合适的数据结构提高查找效率

5. 关键技巧：
   - 按长度排序词典，确保优先使用最短词根
   - 使用 Set 提高词典查找效率
   - 使用 Trie 树进行前缀匹配，避免重复计算
   - 在 Trie 树中标记词根结尾，确保找到完整词根

6. 示例分析：
   - 输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
   - 处理过程：
     * "cattle" -> 匹配 "cat" -> 替换为 "cat"
     * "rattled" -> 匹配 "rat" -> 替换为 "rat"
     * "battery" -> 匹配 "bat" -> 替换为 "bat"
   - 输出："the cat was rat by the bat"

7. 优化思路：
   - Trie 树方法在词典较大时效率最高
   - 哈希表方法在词典较小时更简单高效
   - API 方法代码最简洁，适合快速实现

8. 类似问题：
   - 208. 实现 Trie (前缀树)
   - 677. 键值映射
   - 820. 单词的压缩编码
   - 648. 单词替换（本题）

9. 常见错误：
   - 没有按长度排序词典，导致使用了较长的词根
   - 没有正确处理没有匹配词根的情况
   - 在 Trie 树方法中没有正确标记词根结尾
   - 忘记处理空字符串或边界情况

10. 边界情况：
    - 空词典：返回原句子
    - 空句子：返回空字符串
    - 词典中有空字符串：需要特殊处理
    - 单词长度小于所有词根：保持原单词不变
    - 多个词根长度相同：按字典序选择

11. 性能对比：
    - 小规模数据：三种方法性能相近
    - 大规模数据：Trie 树方法最优
    - 词典很大：Trie 树方法优势明显
    - 单词很长：哈希表方法可能更好
*/
