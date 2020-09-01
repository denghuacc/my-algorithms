/*
 * @lc app=leetcode.cn id=216 lang=typescript
 *
 * [216] 组合总和 III
 *
 * https://leetcode-cn.com/problems/combination-sum-iii/description/
 *
 * algorithms
 * Medium (71.58%)
 * Likes:    144
 * Dislikes: 0
 * Total Accepted:    26.5K
 * Total Submissions: 37K
 * Testcase Example:  '3\n7'
 *
 * 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
 *
 * 说明：
 *
 *
 * 所有数字都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: k = 3, n = 7
 * 输出: [[1,2,4]]
 *
 *
 * 示例 2:
 *
 * 输入: k = 3, n = 9
 * 输出: [[1,2,6], [1,3,5], [2,3,4]]
 *
 *
 */

// @lc code=start
// backtracking
var combinationSum3 = function (k: number, n: number): number[][] {
  const ret: number[][] = [];
  const path: number[] = [];
  dfs(k, n, 1, path, ret);
  return ret;

  function dfs(
    k: number,
    residue: number,
    start: number,
    path: number[],
    ret: number[][]
  ) {
    if (residue < 0) return;

    if (k === 0) {
      if (residue === 0) {
        ret.push(path.slice());
        return;
      }
      return;
    }

    for (let i = start; i <= 9; i++) {
      path.push(i);
      dfs(k - 1, residue - i, i + 1, path, ret);
      path.pop();
    }
  }
};

// backtracking + optimize
var combinationSum3 = function (k: number, n: number): number[][] {
  const ret: number[][] = [];

  // 排除一些边界条件
  if (k <= 0 || n <= 0 || k >= n) return ret;
  if (n > ((19 - k) * k) / 2) return ret;

  const path: number[] = [];
  dfs(k, n, 1, path, ret);
  return ret;

  function dfs(
    k: number,
    residue: number,
    start: number,
    path: number[],
    ret: number[][]
  ) {
    // if (residue < 0) return;
    if (10 - start < k) return;

    if (k === 0) {
      if (residue === 0) {
        ret.push(path.slice());
        return;
      }
      return;
    }

    // 10 - k 是起点上限
    for (let i = start; i <= 10 - k; i++) {
      if (residue - i < 0) break; // 剪枝

      path.push(i);
      dfs(k - 1, residue - i, i + 1, path, ret);
      path.pop();
    }
  }
};
// @lc code=end
