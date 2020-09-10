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
// backtracking
var combinationSum2 = function (
  candidates: number[],
  target: number
): number[][] {
  const ret: number[][] = [];
  const len = candidates.length;
  if (len === 0) return ret;
  candidates.sort((a, b) => a - b);
  dfs(candidates, len, 0, target, [], ret);
  return ret;

  function dfs(
    candidates: number[],
    len: number,
    begin: number,
    residue: number,
    subset: number[],
    ret: number[][]
  ) {
    if (residue === 0) {
      ret.push(subset.slice());
      return;
    }

    for (let i = begin; i < len; i++) {
      if (residue - candidates[i] < 0) break;
      if (i > begin && candidates[i] === candidates[i - 1]) {
        continue;
      }
      subset.push(candidates[i]);
      dfs(candidates, len, i + 1, residue - candidates[i], subset, ret);
      subset.pop();
    }
  }
};

// recursive
var combinationSum2 = function (
  candidates: number[],
  target: number
): number[][] {
  const ret: number[][] = [];
  const freq: [number, number][] = []; // [数字，出现频率][]
  const subset: number[] = [];
  candidates.sort((a, b) => a - b);

  for (const num of candidates) {
    const size = freq.length;
    if (freq.length === 0 || num !== freq[size - 1][0]) {
      freq.push([num, 1]);
    } else {
      ++freq[size - 1][1];
    }
  }

  dfs(0, target);
  return ret;

  function dfs(pos: number, rest: number) {
    if (rest === 0) {
      ret.push(subset.slice());
      return;
    } 
    if (pos === freq.length || rest < freq[pos][0]) return;

    dfs(pos + 1, rest);

    const most = Math.min(Math.floor(rest / freq[pos][0]), freq[pos][1]);
    for (let i = 1; i <= most; i++) {
      subset.push(freq[pos][0]);
      dfs(pos + 1, rest - i * freq[pos][0]);
    }
    for (let i = 1; i <= most; i++) {
      subset.pop();
    }
  }
};
// @lc code=end
