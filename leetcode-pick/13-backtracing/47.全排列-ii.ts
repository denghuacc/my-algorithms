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
// backtracking
var permuteUnique = function (nums: number[]): number[][] {
  const ret: number[][] = [];
  const n = nums.length;
  if (n === 0) return ret;
  nums.sort((a, b) => a - b); // sort
  const used: boolean[] = new Array(n).fill(false); // 记录是否使用过
  const subset: number[] = [];

  dfs(subset, 0);
  return ret;

  function dfs(subset: number[], idx: number) {
    if (idx === n) {
      ret.push(subset.slice());
      return;
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue; // 去重
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      subset.push(nums[i]);
      used[i] = true;

      dfs(subset, idx + 1);

      used[i] = false;
      subset.pop();
    }
  }
};
// @lc code=end
