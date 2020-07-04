/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (61.77%)
 * Likes:    693
 * Dislikes: 0
 * Total Accepted:    97.6K
 * Total Submissions: 141.6K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的数字可以无限制重复被选取。
 *
 * 说明：
 *
 *
 * 所有数字（包括 target）都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: candidates = [2,3,6,7], target = 7,
 * 所求解集为:
 * [
 * ⁠ [7],
 * ⁠ [2,2,3]
 * ]
 *
 *
 * 示例 2:
 *
 * 输入: candidates = [2,3,5], target = 8,
 * 所求解集为:
 * [
 * [2,2,2,2],
 * [2,3,3],
 * [3,5]
 * ]
 *
 */

// @lc code=start
// backtracking
var combinationSum = function (
  candidates: number[],
  target: number
): number[][] {
  const ret: number[][] = [];
  const len = candidates.length;
  candidates.sort((a, b) => a - b);
  backtrack(candidates, len, target, 0, [], ret);
  return ret;

  function backtrack(
    candidates: number[],
    len: number,
    residue: number,
    begin: number,
    path: number[],
    ret: number[][]
  ) {
    if (residue === 0) {
      ret.push(path.slice());
      return;
    }

    for (let i = begin; i < len; i++) {
      if (residue - candidates[i] < 0) break;
      path.push(candidates[i]);
      backtrack(candidates, len, residue - candidates[i], i, path, ret);
      path.pop();
    }
  }
};
// @lc code=end
