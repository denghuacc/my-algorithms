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
  candidates.sort((a, b) => a - b); // 排序是剪枝的前提
  dfs(candidates, len, target, 0, [], ret);
  return ret;

  function dfs(
    candidates: number[],
    len: number,
    residue: number,
    begin: number,
    subset: number[],
    ret: number[][]
  ) {
    // 由于进入更深层的时候，小于 0 的部分被剪枝，因此递归终止条件值只判断等于 0 的情况
    if (residue === 0) {
      ret.push(subset.slice());
      return;
    }

    for (let i = begin; i < len; i++) {
      if (residue - candidates[i] < 0) break; // 剪枝
      subset.push(candidates[i]);
      dfs(candidates, len, residue - candidates[i], i, subset, ret);
      subset.pop();
    }
  }
};

// backtracking2
var combinationSum = function (
  candidates: number[],
  target: number
): number[][] {
  const ret: number[][] = [];
  dfs(target, [], 0);
  return ret;

  function dfs(target: number, subset: number[], idx: number) {
    if (idx === candidates.length) return;
    if (target === 0) {
      ret.push(subset);
      return;
    }
    // 直接跳过
    dfs(target, subset, idx + 1);

    // 选择当前数
    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...subset, candidates[idx]], idx);
    }
  }
};
// @lc code=end
