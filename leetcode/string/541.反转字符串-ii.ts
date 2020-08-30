/*
 * @lc app=leetcode.cn id=541 lang=typescript
 *
 * [541] 反转字符串 II
 *
 * https://leetcode-cn.com/problems/reverse-string-ii/description/
 *
 * algorithms
 * Easy (54.96%)
 * Likes:    88
 * Dislikes: 0
 * Total Accepted:    20.1K
 * Total Submissions: 36.5K
 * Testcase Example:  '"abcdefg"\n2'
 *
 * 给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
 *
 *
 * 如果剩余字符少于 k 个，则将剩余字符全部反转。
 * 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 *
 *
 *
 *
 * 示例:
 *
 * 输入: s = "abcdefg", k = 2
 * 输出: "bacdfeg"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 该字符串只包含小写英文字母。
 * 给定字符串的长度和 k 在 [1, 10000] 范围内。
 *
 *
 */

// @lc code=start
function reverseStr(s: string, k: number): string {
  const arr = s.split("");
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (i === 0 || i % (2 * k) === 0) {
      reverse(arr, i, Math.min(i + k - 1, n - 1));
    }
  }

  return arr.join("");

  // 反转 arr[i:j] 元素
  function reverse(arr: string[], i: number, j: number) {
    if (i > j) [i, j] = [j, i];
    while (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
}
// @lc code=end
