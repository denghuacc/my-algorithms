/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (52.95%)
 * Likes:    274
 * Dislikes: 0
 * Total Accepted:    59.7K
 * Total Submissions: 96.8K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用一次。
 *
 * 说明：
 *
 *
 * 所有数字（包括目标数）都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 所求解集为:
 * [
 * ⁠ [1, 7],
 * ⁠ [1, 2, 5],
 * ⁠ [2, 6],
 * ⁠ [1, 1, 6]
 * ]
 *
 *
 * 示例 2:
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 所求解集为:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (
  candidates: number[],
  target: number
): number[][] {
  const ret: number[][] = [];
  const len = candidates.length;
  if (len === 0) return ret;
  candidates.sort((a, b) => a - b);
  backtrack(candidates, len, 0, target, [], ret);
  return ret;

  function backtrack(
    candidates: number[],
    len: number,
    begin: number,
    residue: number,
    path: number[],
    ret: number[][]
  ) {
    if (residue === 0) {
      ret.push(path.slice());
      return;
    }

    for (let i = begin; i < len; i++) {
      if (residue - candidates[i] < 0) break;
      if (i > begin && candidates[i] === candidates[i - 1]) {
        continue;
      }
      path.push(candidates[i]);
      backtrack(candidates, len, i + 1, residue - candidates[i], path, ret);
      path.pop();
    }
  }
};
// @lc code=end
