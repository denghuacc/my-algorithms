/*
 * @lc app=leetcode.cn id=1935 lang=typescript
 *
 * [1935] 可以输入的最大单词数
 *
 * https://leetcode.cn/problems/maximum-number-of-words-you-can-type/description/
 *
 * algorithms
 * Easy (72.52%)
 * Likes:    29
 * Dislikes: 0
 * Total Accepted:    21.3K
 * Total Submissions: 28.5K
 * Testcase Example:  '"hello world"\n"ad"'
 *
 * 键盘出现了一些故障，有些字母键无法正常工作。而键盘上所有其他键都能够正常工作。
 *
 * 给你一个由若干单词组成的字符串 text ，单词间由单个空格组成（不含前导和尾随空格）；另有一个字符串 brokenLetters
 * ，由所有已损坏的不同字母键组成，返回你可以使用此键盘完全输入的 text 中单词的数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：text = "hello world", brokenLetters = "ad"
 * 输出：1
 * 解释：无法输入 "world" ，因为字母键 'd' 已损坏。
 *
 *
 * 示例 2：
 *
 * 输入：text = "leet code", brokenLetters = "lt"
 * 输出：1
 * 解释：无法输入 "leet" ，因为字母键 'l' 和 't' 已损坏。
 *
 *
 * 示例 3：
 *
 * 输入：text = "leet code", brokenLetters = "e"
 * 输出：0
 * 解释：无法输入任何单词，因为字母键 'e' 已损坏。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= text.length <= 10^4
 * 0 <= brokenLetters.length <= 26
 * text 由若干用单个空格分隔的单词组成，且不含任何前导和尾随空格
 * 每个单词仅由小写英文字母组成
 * brokenLetters 由 互不相同 的小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 计算可以完全输入的单词数
 *
 * @param text - 由若干单词组成的字符串，单词间用空格分隔
 * @param brokenLetters - 所有损坏的不同字母键
 * @returns 可以完全输入的单词数量
 *
 * @example
 * ```typescript
 * canBeTypedWords("hello world", "ad"); // 1
 * canBeTypedWords("leet code", "lt"); // 1
 * canBeTypedWords("leet code", "e"); // 0
 * ```
 */
function canBeTypedWords(text: string, brokenLetters: string): number {
  // 将所有单词分割出来
  const words = text.split(" ");
  // 将损坏的字母放入Set，便于O(1)判断
  const brokenSet = new Set(brokenLetters);
  let count = 0;
  // 遍历每个单词，判断是否包含损坏字母
  for (const word of words) {
    let canType = true;
    for (const ch of word) {
      if (brokenSet.has(ch)) {
        canType = false;
        break;
      }
    }
    if (canType) count++;
  }
  return count;
}

/*
解题思路详解：

1. 问题本质：
  - 给定一组损坏的字母，统计文本中可以完全输入的单词数
  - 只要单词中包含任意一个损坏字母，该单词就无法完整输入

2. 算法分析：
  - 时间复杂度：O(N)，N为text总长度（每个字母最多遍历一次）
  - 空间复杂度：O(1)，最多26个字母的Set
  - 算法类型：哈希表+字符串遍历

3. 实现要点：
  - 用Set存储损坏字母，判断是否包含时O(1)
  - 遍历每个单词，遇到损坏字母立即跳出
  - 统计所有可以完整输入的单词数量

4. 示例分析：
  - 示例1：text = "hello world", brokenLetters = "ad"
    - "hello" 不含a/d，可输入
    - "world" 含d，不能输入
    - 返回1
  - 示例2：text = "leet code", brokenLetters = "lt"
    - "leet" 含l/t，不能输入
    - "code" 可输入
    - 返回1
  - 示例3：text = "leet code", brokenLetters = "e"
    - 所有单词都含e，返回0

5. 边界情况：
  - brokenLetters为空：所有单词都可输入
  - text只有一个单词：直接判断即可
  - 所有单词都被损坏字母覆盖：返回0

6. 常见错误：
  - 忽略了Set判断的效率优势
  - 没有及时break导致多余遍历

7. 优化要点：
  - 用Set代替includes提升效率
  - 只要发现损坏字母立即break

8. 扩展思考：
  - 如果损坏字母很多，可以用位运算进一步优化
  - 如果需要返回所有可输入单词内容，可用数组收集
*/
// @lc code=end
