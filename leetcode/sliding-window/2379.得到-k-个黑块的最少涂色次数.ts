/*
 * @lc app=leetcode.cn id=2379 lang=typescript
 *
 * [2379] 得到 K 个黑块的最少涂色次数
 *
 * https://leetcode.cn/problems/minimum-recolors-to-get-k-consecutive-black-blocks/description/
 *
 * algorithms
 * Easy (59.38%)
 * Likes:    52
 * Dislikes: 0
 * Total Accepted:    17K
 * Total Submissions: 27K
 * Testcase Example:  '"WBBWWBBWBW"\n7'
 *
 * 给你一个长度为 n 下标从 0 开始的字符串 blocks ，blocks[i] 要么是 'W' 要么是 'B' ，表示第 i 块的颜色。字符 'W'
 * 和 'B' 分别表示白色和黑色。
 *
 * 给你一个整数 k ，表示想要 连续 黑色块的数目。
 *
 * 每一次操作中，你可以选择一个白色块将它 涂成 黑色块。
 *
 * 请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：blocks = "WBBWWBBWBW", k = 7
 * 输出：3
 * 解释：
 * 一种得到 7 个连续黑色块的方法是把第 0 ，3 和 4 个块涂成黑色。
 * 得到 blocks = "BBBBBBBWBW" 。
 * 可以证明无法用少于 3 次操作得到 7 个连续的黑块。
 * 所以我们返回 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：blocks = "WBWBBBW", k = 2
 * 输出：0
 * 解释：
 * 不需要任何操作，因为已经有 2 个连续的黑块。
 * 所以我们返回 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == blocks.length
 * 1 <= n <= 100
 * blocks[i] 要么是 'W' ，要么是 'B' 。
 * 1 <= k <= n
 *
 *
 */

// @lc code=start
var minimumRecolors = function (blocks: string, k: number): number {
  const n = blocks.length;
  const sum = new Array(n + 1).fill(0);
  let res = 0;
  for (let i = 0; i < n; i++) {
    if (blocks[i] === "W") {
      res++;
      sum[i + 1] = sum[i] + 1;
    } else {
      sum[i + 1] = sum[i];
    }
  }
  for (let i = k; i <= n; i++) {
    res = Math.min(res, sum[i] - sum[i - k]);
  }
  return res;
};

var minimumRecolors = function (blocks: string, k: number): number {
  const n = blocks.length;
  let count = 0;
  for (let i = 0; i < k; i++) {
    if (blocks[i] === "W") {
      count++;
    }
  }
  let res = count;
  for (let i = k; i < n; i++) {
    if (blocks[i] === "W") {
      count++;
    }
    if (blocks[i - k] === "W") {
      count--;
    }
    res = Math.min(res, count);
  }
  return res;
};

var minimumRecolors = function (blocks: string, k: number): number {
  const n = blocks.length;
  let count = 0;
  let res = 0;
  for (let i = 0; i < n; i++) {
    if (i < k) {
      if (blocks[i] === "W") {
        count++;
        res++;
      }
    } else {
      if (blocks[i] === "W") {
        count++;
      }
      if (blocks[i - k] === "W") {
        count--;
      }
      res = Math.min(res, count);
    }
  }
  return res;
};
// @lc code=end
