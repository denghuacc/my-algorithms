/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (65.67%)
 * Likes:    756
 * Dislikes: 0
 * Total Accepted:    143.2K
 * Total Submissions: 187.8K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 *
 * 示例:
 *
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 *
 */

// @lc code=start
// backtracking
var permute = function (nums: number[]): number[][] {
  const ret: number[][] = [];
  const output = nums.slice();
  const len = nums.length;

  backtrack(len, output, ret, 0);
  return ret;

  function backtrack(
    len: number,
    output: number[],
    ret: number[][],
    first: number
  ) {
    if (first === len) ret.push(output.slice());

    for (let i = first; i < len; i++) {
      swap(output, first, i);
      backtrack(len, output, ret, first + 1);
      swap(output, first, i);
    }
  }

  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
// @lc code=end
