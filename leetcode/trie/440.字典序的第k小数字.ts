/*
 * @lc app=leetcode.cn id=440 lang=typescript
 *
 * [440] 字典序的第K小数字
 *
 * https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/description/
 *
 * algorithms
 * Hard (39.82%)
 * Likes:    317
 * Dislikes: 0
 * Total Accepted:    22.1K
 * Total Submissions: 55.6K
 * Testcase Example:  '13\n2'
 *
 * 给定整数 n 和 k，返回  [1, n] 中字典序第 k 小的数字。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = 13, k = 2
 * 输出: 10
 * 解释: 字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。
 *
 *
 * 示例 2:
 *
 *
 * 输入: n = 1, k = 1
 * 输出: 1
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= k <= n <= 10^9
 *
 *
 */

// @lc code=start
function findKthNumber(n: number, k: number): number {
  let cur = 1;
  k--;
  while (k > 0) {
    const steps = getSteps(cur, n);
    if (steps <= k) {
      k -= steps;
      cur++;
    } else {
      cur *= 10;
      k--;
    }
  }
  return cur;

  function getSteps(cur: number, n: number): number {
    let steps = 0;
    let first = cur;
    let last = cur;
    while (first <= n) {
      steps += Math.min(last, n) - first + 1;
      first *= 10;
      last = last * 10 + 9;
    }
    return steps;
  }
}
// @lc code=end
