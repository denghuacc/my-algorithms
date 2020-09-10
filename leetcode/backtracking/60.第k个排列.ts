/*
 * @lc app=leetcode.cn id=60 lang=typescript
 *
 * [60] 第k个排列
 *
 * https://leetcode-cn.com/problems/permutation-sequence/description/
 *
 * algorithms
 * Medium (44.11%)
 * Likes:    263
 * Dislikes: 0
 * Total Accepted:    36.9K
 * Total Submissions: 75.7K
 * Testcase Example:  '3\n3'
 *
 * 给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。
 *
 * 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
 *
 *
 * "123"
 * "132"
 * "213"
 * "231"
 * "312"
 * "321"
 *
 *
 * 给定 n 和 k，返回第 k 个排列。
 *
 * 说明：
 *
 *
 * 给定 n 的范围是 [1, 9]。
 * 给定 k 的范围是[1,  n!]。
 *
 *
 * 示例 1:
 *
 * 输入: n = 3, k = 3
 * 输出: "213"
 *
 *
 * 示例 2:
 *
 * 输入: n = 4, k = 9
 * 输出: "2314"
 *
 *
 */

// @lc code=start
// backtracking
var getPermutation = function (n: number, k: number): string {
  const ret: string[] = [];
  const used: Record<string, boolean> = {};
  dfs("");
  return ret[k - 1];

  function dfs(str: string) {
    if (str.length === n) {
      ret.push(str);
      return;
    }

    for (let i = 1; i <= n; i++) {
      if (used[i]) continue;

      str += String(i);
      used[i] = true;

      dfs(str);

      str = str.substr(0, str.length - 1);
      used[i] = false;
    }
  }
};
// @lc code=end
