/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (65.02%)
 * Likes:    294
 * Dislikes: 0
 * Total Accepted:    57.5K
 * Total Submissions: 77.8K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 *
 * 示例:
 *
 * 输入: n = 4, k = 2
 * 输出:
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 */

// @lc code=start
// backtracking
var combine = function (n: number, k: number): number[][] {
  const ret: number[][] = [];
  backtrack(1, []);
  return ret;

  function backtrack(first: number, cur: number[]) {
    if (cur.length === k) {
      ret.push(cur.slice());
    }

    for (let i = first; i < n + 1; ++i) {
      cur.push(i);
      backtrack(i + 1, cur);
      cur.pop();
    }
  }
};

// 二进制排序
var combine = function (n: number, k: number): number[][] {
  const nums: number[] = [];
  for (let i = 1; i < k + 1; ++i) {
    nums.push(i);
  }
  nums.push(n + 1);

  let j = 0;
  const ret: number[][] = [];
  while (j < k) {
    ret.push(nums.slice(0, k));
    j = 0;
    while (j < k && nums[j + 1] === nums[j] + 1) {
      nums[j] = j + 1;
      j++;
    }
    nums[j]++;
  }

  return ret;
};
// @lc code=end
