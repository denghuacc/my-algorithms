/*
 * @lc app=leetcode.cn id=953 lang=typescript
 *
 * [953] 验证外星语词典
 *
 * https://leetcode.cn/problems/verifying-an-alien-dictionary/description/
 *
 * algorithms
 * Easy (55.40%)
 * Likes:    153
 * Dislikes: 0
 * Total Accepted:    26.9K
 * Total Submissions: 47.1K
 * Testcase Example:  '["hello","leetcode"]\n"hlabcdefgijkmnopqrstuvwxyz"'
 *
 * 某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。
 *
 * 给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回
 * false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
 * 输出：true
 * 解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。
 *
 * 示例 2：
 *
 *
 * 输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
 * 输出：false
 * 解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。
 *
 * 示例 3：
 *
 *
 * 输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
 * 输出：false
 * 解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，然后根据词典编纂规则 "apple" > "app"，因为 'l' > '∅'，其中
 * '∅' 是空白字符，定义为比任何其他字符都小（更多信息）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * order.length == 26
 * 在 words[i] 和 order 中的所有字符都是英文小写字母。
 *
 *
 */

// @lc code=start
/**
 * 验证外星语词典
 * 核心思路：将外星语字母表映射为索引，然后按照字典序规则比较相邻单词
 *
 * 算法步骤：
 * 1. 建立外星语字母到索引的映射关系
 * 2. 依次比较相邻的两个单词
 * 3. 逐字符比较，找到第一个不同的字符
 * 4. 如果前面的字符索引更大，则违反字典序
 * 5. 如果所有字符都相同，检查长度关系
 *
 * 时间复杂度：O(n * m)，n为单词数量，m为单词平均长度
 * 空间复杂度：O(1)，只需要常数额外空间（字母表固定26个字母）
 */
function isAlienSorted(words: string[], order: string): boolean {
  // 建立外星语字母到索引的映射
  const charToIndex: Map<string, number> = new Map();
  for (let i = 0; i < order.length; i++) {
    charToIndex.set(order[i], i);
  }

  const n = words.length;

  // 依次比较相邻的两个单词
  for (let i = 0; i < n - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    let isValidOrder = false;

    // 逐字符比较两个单词
    const minLength = Math.min(word1.length, word2.length);
    for (let j = 0; j < minLength; j++) {
      const index1 = charToIndex.get(word1[j])!;
      const index2 = charToIndex.get(word2[j])!;

      if (index1 < index2) {
        // 找到第一个字符使得word1 < word2，符合字典序
        isValidOrder = true;
        break;
      } else if (index1 > index2) {
        // 找到第一个字符使得word1 > word2，违反字典序
        return false;
      }
      // 如果字符相同，继续比较下一个字符
    }

    // 如果前缀完全相同，检查长度关系
    // 短单词应该排在长单词前面
    if (!isValidOrder && word1.length > word2.length) {
      return false;
    }
  }

  return true;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 验证单词列表是否按照自定义字母表的字典序排列
   - 需要理解字典序的比较规则：逐字符比较，遇到不同字符时按字母表顺序判断

2. 算法分析：
   - 时间复杂度：O(n * m)，n为单词数量，m为单词平均长度
   - 空间复杂度：O(1)，哈希表存储固定26个字母的映射
   - 算法类型：哈希表 + 字符串比较

3. 实现要点：
   - 关键数据结构：Map存储字符到索引的映射关系
   - 比较策略：只需比较相邻单词，如果相邻都符合则整体符合
   - 字符比较：找到第一个不同字符，根据索引大小判断顺序
   - 长度处理：前缀相同时，短单词应排在长单词前面

4. 边界情况：
   - 单词完全相同：继续比较下一对
   - 一个单词是另一个的前缀：短的应该在前面
   - 单个单词：直接返回true
   - 空单词列表：直接返回true

5. 优化思路：
   - 可以用数组代替Map，因为字母固定26个
   - 提前终止：一旦发现违反顺序的情况立即返回false
   - 字符预处理：将字符转为索引避免重复查找
*/
