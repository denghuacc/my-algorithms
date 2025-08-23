/*
 * @lc app=leetcode.cn id=125 lang=typescript
 *
 * [125] 验证回文串
 *
 * https://leetcode-cn.com/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (37.71%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    106.9K
 * Total Submissions: 243.5K
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 *
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 *
 * 示例 1:
 *
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: "race a car"
 * 输出: false
 *
 *
 */

export {};

// @lc code=start
/**
 * 验证回文串 - 双指针解法
 *
 * 算法思路：
 * 1. 首先预处理字符串：去除非字母数字字符，转为小写
 * 2. 使用双指针从两端向中间比较
 * 3. 如果字符不匹配则返回false，否则继续
 * 4. 全部匹配完成则为回文串
 *
 * 时间复杂度: O(n) - 需要遍历整个字符串
 * 空间复杂度: O(n) - replace操作会创建新字符串
 */
function isPalindrome(s: string): boolean {
  // 预处理：去除非字母数字字符并转为小写
  s = s.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();

  let left = 0;
  let right = s.length - 1;

  // 双指针从两端向中间靠拢
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断一个字符串是否为回文串（忽略大小写和非字母数字字符）
   - 回文串：正着读和倒着读都一样的字符串

2. 算法分析：
   - 时间复杂度：O(n) - 预处理和双指针遍历都是线性时间
   - 空间复杂度：O(n) - replace方法会创建新字符串
   - 算法类型：双指针技巧

3. 实现要点：
   - 预处理：使用正则表达式去除非字母数字字符
   - 双指针：从字符串两端向中间靠拢比较
   - 边界条件：空字符串和单字符都是回文串

4. 优化思路：
   - 可以边比较边跳过非字母数字字符，避免预处理步骤
   - 这样可以将空间复杂度优化到O(1)
   - 但代码会稍微复杂一些，需要额外的字符判断逻辑
*/
