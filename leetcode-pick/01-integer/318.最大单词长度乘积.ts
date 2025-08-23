/*
 * @lc app=leetcode.cn id=318 lang=typescript
 *
 * [318] 最大单词长度乘积
 *
 * https://leetcode-cn.com/problems/maximum-product-of-word-lengths/description/
 *
 * algorithms
 * Medium (68.92%)
 * Likes:    224
 * Dislikes: 0
 * Total Accepted:    26.5K
 * Total Submissions: 37.3K
 * Testcase Example:  '["abcw","baz","foo","bar","xtfn","abcdef"]'
 *
 * 给定一个字符串数组 words，找到 length(word[i]) * length(word[j])
 * 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
 * 输出: 16
 * 解释: 这两个单词为 "abcw", "xtfn"。
 *
 * 示例 2:
 *
 *
 * 输入: ["a","ab","abc","d","cd","bcd","abcd"]
 * 输出: 4
 * 解释: 这两个单词为 "ab", "cd"。
 *
 * 示例 3:
 *
 *
 * 输入: ["a","aa","aaa","aaaa"]
 * 输出: 0
 * 解释: 不存在这样的两个单词。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 * words[i] 仅包含小写字母
 *
 *
 */

export {};

// @lc code=start
/**
 * 最大单词长度乘积 - 位运算解法
 *
 * 核心思想：
 * 使用位运算来高效判断两个单词是否包含公共字母
 * 每个单词用一个32位整数表示，每一位代表一个字母是否出现
 *
 * 算法步骤：
 * 1. 为每个单词创建位掩码，表示该单词包含的字母
 * 2. 遍历所有单词对，检查它们的位掩码是否有交集
 * 3. 如果没有交集，计算长度乘积并更新最大值
 *
 * 时间复杂度：O(n² + L)，其中 n 是单词数量，L 是所有单词的总长度
 * 空间复杂度：O(n)，用于存储位掩码数组
 */
function maxProduct(words: string[]): number {
  const n = words.length;
  // 存储每个单词的位掩码
  const masks: number[] = new Array(n).fill(0);
  let max = 0;

  // 第一步：为每个单词创建位掩码
  for (let i = 0; i < n; i++) {
    for (const c of words[i]) {
      // 将字符转换为0-25的数字，然后设置对应的位
      masks[i] |= 1 << (c.charCodeAt(0) - "a".charCodeAt(0));
    }
  }

  // 第二步：遍历所有单词对，检查是否有公共字母
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 使用位运算AND检查是否有交集，如果结果为0则无公共字母
      if ((masks[i] & masks[j]) === 0) {
        max = Math.max(max, words[i].length * words[j].length);
      }
    }
  }

  return max;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到两个没有公共字母的单词，使它们的长度乘积最大
   - 关键是如何高效判断两个单词是否包含公共字母

2. 算法分析：
   - 时间复杂度：O(n² + L)，其中 n 是单词数量，L 是所有单词的总长度
   - 空间复杂度：O(n)，用于存储位掩码数组
   - 算法类型：位运算 + 暴力枚举

3. 实现要点：
   - 位掩码：每个单词用一个32位整数表示，第i位表示字母'a'+i是否出现
   - 交集检测：使用位运算AND操作，结果为0表示无公共字母
   - 优化：预处理所有单词的位掩码，避免重复计算

4. 优化思路：
   - 位运算比字符比较更高效
   - 可以进一步优化：按长度排序，提前剪枝
   - 对于大量重复单词，可以使用Set去重

5. 示例分析：
   - "abcw" -> 位掩码：...000111 (a,b,c,w对应位为1)
   - "xtfn" -> 位掩码：...111000 (x,t,f,n对应位为1)
   - 两者AND结果为0，无公共字母，乘积为4*4=16

6. 边界情况：
   - 空数组返回0
   - 所有单词都有公共字母时返回0
   - 单个单词时返回0

7. 类似问题：
   - 可以使用相同思路解决字符串交集问题
   - 位运算技巧在字符串处理中很常见
*/
