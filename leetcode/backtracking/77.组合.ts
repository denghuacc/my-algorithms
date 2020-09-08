/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (65.02%)
 * Likes:    294
 * Dislikes: 0
 * Total Accepted:    57.5K
 * Total Submissions: 77.8K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 *
 * 示例:
 *
 * 输入: n = 4, k = 2
 * 输出:
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 */

// @lc code=start
// backtracking
var combine = function (n: number, k: number): number[][] {
  const ret: number[][] = [];
  backtrack(1, []);
  return ret;

  function backtrack(cur: number, subset: number[]) {
    if (subset.length === k) {
      ret.push(subset.slice());
      return;
    }

    for (let i = cur; i < n + 1; i++) {
      subset.push(i);
      backtrack(i + 1, subset);
      subset.pop();
    }
  }
};

// backtracking2
var combine = function (n: number, k: number): number[][] {
  const ret: number[][] = [];
  dfs(1, n, k, []);
  return ret;

  function dfs(cur: number, n: number, k: number, subset: number[]) {
    // 剪枝：subset 长度加上区间 [cur, n] 的长度小于 k
    // 不可能构造出长度为 k 的 subset
    if (subset.length + (n - cur + 1) < k) return;

    // 记录合法的答案
    if (subset.length === k) {
      ret.push(subset.slice());
      return;
    }

    dfs(cur + 1, n, k, [...subset, cur]); // 考虑选择当前位置
    dfs(cur + 1, n, k, subset); // 考虑不选择当前位置
  }
};

// 二进制排序
var combine = function (n: number, k: number): number[][] {
  const ret: number[][] = [];
  const subset: number[] = [];

  // 初始化
  // 将 subset 中 [0, k - 1] 每个位置 i 设置为 i + 1，即 [0, k - 1] 存 [1, k]
  // 末尾加一位 n + 1 作为哨兵
  for (let i = 1; i < k + 1; i++) {
    subset.push(i);
  }
  subset.push(n + 1);

  let j = 0;
  while (j < k) {
    ret.push(subset.slice(0, k));
    j = 0;

    // 寻找第一个 subset[j] + 1 != subset[j + 1] 的位置 t
    // 我们需要把 [0, t - 1] 区间内的每个位置重置成 [1, t]
    while (j < k && subset[j + 1] === subset[j] + 1) {
      subset[j] = j + 1;
      j++;
    }
    subset[j]++; // j 是第一个 subset[j] + 1 != subset[j + 1] 的位置
  }

  return ret;
};
// @lc code=end
