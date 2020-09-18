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
  dfs([], n, 1, k);
  return ret;

  function dfs(subset: number[], residue: number, idx: number, k: number) {
    if (residue < 0) return;

    if (k === 0) {
      if (residue === 0) {
        ret.push(subset.slice());
        return;
      }
      return;
    }

    for (let i = idx; i <= 9; i++) {
      subset.push(i);
      dfs(subset, residue - i, i + 1, k - 1);
      subset.pop();
    }
  }
};
// @lc code=end

// backtracking + optimize
var combinationSum3 = function (k: number, n: number): number[][] {
  const ret: number[][] = [];

  // 排除一些边界条件
  if (k <= 0 || n <= 0 || k >= n) return ret;
  if (n > ((19 - k) * k) / 2) return ret;

  dfs([], k, n, 1);
  return ret;

  function dfs(subset: number[], k: number, residue: number, start: number) {
    // if (residue < 0) return;
    if (10 - start < k) return;

    if (k === 0) {
      if (residue === 0) {
        ret.push(subset.slice());
        return;
      }
      return;
    }

    // 10 - k 是起点上限
    for (let i = start; i <= 10 - k; i++) {
      if (residue - i < 0) break; // 剪枝

      subset.push(i);
      dfs(subset, k - 1, residue - i, i + 1);
      subset.pop();
    }
  }
};

// bit manipulation enumeration
var combinationSum3 = function (k: number, n: number): number[][] {
  const ret: number[][] = [];
  let subset: number[] = [];

  for (let i = 0; i < 1 << 9; i++) {
    if (check(i, k, n)) {
      ret.push(subset);
    }
  }

  return ret;

  function check(mask: number, k: number, n: number): boolean {
    subset = [];
    for (let i = 0; i < 9; i++) {
      if ((1 << i) & mask) {
        subset.push(i + 1);
      }
    }
    return (
      subset.length === k && subset.reduce((acc, val) => acc + val, 0) === n
    );
  }
};

// combination enumeration
var combinationSum3 = function (k: number, n: number): number[][] {
  const ret: number[][] = [];
  let subset: number[] = [];
  dfs(1, 9);
  return ret;

  function dfs(cur: number, len: number): void {
    if (subset.length + (len - cur + 1) < k || subset.length > k) {
      return;
    }
    if (
      subset.length === k &&
      subset.reduce((acc, val) => acc + val, 0) === n
    ) {
      ret.push(subset.slice());
      return;
    }
    subset.push(cur);
    dfs(cur + 1, len);
    subset.pop();
    dfs(cur + 1, len);
  }
};
