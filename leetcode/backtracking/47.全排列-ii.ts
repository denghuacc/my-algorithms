/*
 * @lc app=leetcode.cn id=47 lang=typescript
 *
 * [47] 全排列 II
 *
 * https://leetcode-cn.com/problems/permutations-ii/description/
 *
 * algorithms
 * Medium (50.13%)
 * Likes:    320
 * Dislikes: 0
 * Total Accepted:    65.9K
 * Total Submissions: 111.4K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个可包含重复数字的序列，返回所有不重复的全排列。
 *
 * 示例:
 *
 * 输入: [1,1,2]
 * 输出:
 * [
 * ⁠ [1,1,2],
 * ⁠ [1,2,1],
 * ⁠ [2,1,1]
 * ]
 *
 */

// @lc code=start
var permuteUnique = function (nums: number[]): number[][] {
  const len = nums.length;
  const ret: number[][] = [];
  if (len === 0) return ret;
  nums.sort((a, b) => a - b);
  const used: boolean[] = new Array(len).fill(false);
  const path: number[] = [];

  dfs(nums, len, 0, used, path, ret);
  return ret;

  function dfs(
    nums: number[],
    len: number,
    depth: number,
    used: boolean[],
    path: number[],
    ret: number[][]
  ) {
    if (depth === len) {
      ret.push(path.slice());
      return;
    }

    for (let i = 0; i < len; ++i) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      path.push(nums[i]);
      used[i] = true;
      dfs(nums, len, depth + 1, used, path, ret);
      used[i] = false;
      path.pop();
    }
  }
};
// @lc code=end
