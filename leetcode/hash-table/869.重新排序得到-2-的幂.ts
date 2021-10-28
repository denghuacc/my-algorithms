/*
 * @lc app=leetcode.cn id=869 lang=typescript
 *
 * [869] 重新排序得到 2 的幂
 *
 * https://leetcode-cn.com/problems/reordered-power-of-2/description/
 *
 * algorithms
 * Medium (61.39%)
 * Likes:    70
 * Dislikes: 0
 * Total Accepted:    10.9K
 * Total Submissions: 17.9K
 * Testcase Example:  '1'
 *
 * 给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。
 *
 * 如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：1
 * 输出：true
 *
 *
 * 示例 2：
 *
 * 输入：10
 * 输出：false
 *
 *
 * 示例 3：
 *
 * 输入：16
 * 输出：true
 *
 *
 * 示例 4：
 *
 * 输入：24
 * 输出：false
 *
 *
 * 示例 5：
 *
 * 输入：46
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= N <= 10^9
 *
 *
 */

// @lc code=start
// hash table
function reorderedPowerOf2(n: number): boolean {
  const powerOf2Digits: Set<string> = new Set();
  for (let i = 1; i <= 1e9; i <<= 1) {
    powerOf2Digits.add(countDigits(i));
  }
  return powerOf2Digits.has(countDigits(n));

  function countDigits(n: number): string {
    const cnt: number[] = new Array(10).fill(0);
    while (n) {
      cnt[n % 10]++;
      n = Math.floor(n / 10);
    }
    return cnt.join("");
  }
}
// @lc code=end
