/*
 * @lc app=leetcode.cn id=680 lang=typescript
 *
 * [680] 验证回文串 II
 *
 * https://leetcode.cn/problems/valid-palindrome-ii/description/
 *
 * algorithms
 * Easy (40.06%)
 * Likes:    543
 * Dislikes: 0
 * Total Accepted:    121.2K
 * Total Submissions: 302.6K
 * Testcase Example:  '"aba"'
 *
 * 给你一个字符串 s，最多 可以从中删除一个字符。
 *
 * 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aba"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abca"
 * 输出：true
 * 解释：你可以删除字符 'c' 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "abc"
 * 输出：false
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 由小写英文字母组成
 *
 *
 */

export {};

// @lc code=start
/**
 * 验证回文串 II - 双指针解法
 *
 * 问题：给定一个字符串，最多可以删除一个字符，判断是否能成为回文串
 * 核心思路：使用双指针从两端向中间，遇到不匹配时尝试删除左边或右边的字符
 *
 * 时间复杂度: O(n) - 最多遍历字符串两次
 * 空间复杂度: O(1) - 只使用常数额外空间
 */
function validPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  // 双指针从两端向中间移动
  while (left < right) {
    if (s[left] === s[right]) {
      // 字符匹配，继续向中间移动
      left++;
      right--;
    } else {
      // 字符不匹配，尝试删除左边或右边的字符
      // 删除左边字符：检查 s[left+1:right+1] 是否为回文
      // 删除右边字符：检查 s[left:right] 是否为回文
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
  }

  // 整个字符串本身就是回文串
  return true;

  /**
   * 辅助函数：判断指定范围内的子串是否为回文串
   * @param s 字符串
   * @param left 左边界（包含）
   * @param right 右边界（包含）
   * @returns 是否为回文串
   */
  function isPalindrome(s: string, left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断在最多删除一个字符的前提下，字符串是否能成为回文串
   - 回文串：正着读和倒着读完全相同的字符串
   - 相比于普通回文串判断，多了一次"容错"机会

2. 算法分析：
   - 时间复杂度：O(n) - 主循环O(n)，辅助函数最多调用一次也是O(n)
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：双指针 + 贪心策略

3. 实现要点：
   - 双指针策略：从字符串两端向中间靠拢
   - 贪心选择：遇到不匹配时，尝试删除左边或右边的字符
   - 分支处理：两种删除方案只要有一种成功即可

4. 算法步骤：
   - 初始化：设置左右指针在字符串两端
   - 比较字符：如果相等则向中间移动，继续比较
   - 处理冲突：如果不相等，尝试跳过左边或右边的字符
   - 验证结果：检查跳过字符后的子串是否为回文

5. 关键洞察：
   - 最多删除一个字符：遇到第一个不匹配就必须做出选择
   - 贪心策略：不需要枚举所有删除可能，只需要考虑冲突位置
   - 早期终止：一旦找到有效方案就可以立即返回

6. 边界情况：
   - 空字符串和单字符：天然是回文串
   - 已经是回文串：不需要删除任何字符
   - 无法通过删除一个字符变成回文：两种尝试都失败

7. 与相关问题的关系：
   - 125. 验证回文串：基础版本，不允许删除字符
   - 647. 回文子串：统计所有回文子串的数量
   - 5. 最长回文子串：找到最长的回文子串
   - 这道题是回文串问题的进阶版本，增加了删除操作的约束

8. 优化思考：
   - 当前解法已经是最优的O(n)时间复杂度
   - 空间复杂度也是最优的O(1)
   - 代码简洁易懂，面试中推荐使用
*/
