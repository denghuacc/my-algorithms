/*
 * @lc app=leetcode.cn id=90 lang=typescript
 *
 * [90] 子集 II
 *
 * https://leetcode-cn.com/problems/subsets-ii/description/
 *
 * algorithms
 * Medium (60.64%)
 * Likes:    286
 * Dislikes: 0
 * Total Accepted:    43K
 * Total Submissions: 70.8K
 * Testcase Example:  '[1,2,2]'
 *
 * 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 *
 * 说明：解集不能包含重复的子集。
 *
 * 示例:
 *
 * 输入: [1,2,2]
 * 输出:
 * [
 * ⁠ [2],
 * ⁠ [1],
 * ⁠ [1,2,2],
 * ⁠ [2,2],
 * ⁠ [1,2],
 * ⁠ []
 * ]
 *
 */

// @lc code=start
// backtracking
function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const ret: number[][] = [[]];
  dfs([], 0);
  return ret;

  function dfs(subset: number[], idx: number) {
    for (let i = idx; i < nums.length; i++) {
      if (i > idx && nums[i] === nums[i - 1]) continue;
      subset.push(nums[i]);
      ret.push(subset.slice());
      dfs(subset, i + 1);
      subset.pop();
    }
  }
}
// @lc code=end
