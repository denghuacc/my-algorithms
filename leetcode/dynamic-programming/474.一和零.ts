/*
 * @lc app=leetcode.cn id=474 lang=typescript
 *
 * [474] 一和零
 *
 * https://leetcode-cn.com/problems/ones-and-zeroes/description/
 *
 * algorithms
 * Medium (56.89%)
 * Likes:    411
 * Dislikes: 0
 * Total Accepted:    43.7K
 * Total Submissions: 76.4K
 * Testcase Example:  '["10","0001","111001","1","0"]\n5\n3'
 *
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 *
 *
 * 请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。
 *
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
 * 输出：4
 * 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
 * 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1
 * ，大于 n 的值 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["10", "0", "1"], m = 1, n = 1
 * 输出：2
 * 解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * strs[i] 仅由 '0' 和 '1' 组成
 * 1
 *
 *
 */

// @lc code=start
// dp
var findMaxForm = function (strs: string[], m: number, n: number): number {
  const length = strs.length;

  // dp[i][j][k] -> 表示在前 i 个字符串中，使用 j 个 0 和 k 个 1 的情况下最多可以得到的字符串数量
  const dp: number[][][] = Array.from(new Array(length + 1), () =>
    Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
  );

  for (let i = 1; i <= length; i++) {
    const zonesOnes = getZonesOnes(strs[i - 1]);
    const [zones, ones] = zonesOnes;
    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        dp[i][j][k] = dp[i - 1][j][k];
        if (j >= zones && k >= ones) {
          dp[i][j][k] = Math.max(
            dp[i][j][k],
            dp[i - 1][j - zones][k - ones] + 1
          );
        }
      }
    }
  }

  return dp[length][m][n];

  function getZonesOnes(str: string): number[] {
    const zonesOnes: [number, number] = [0, 0];
    const length = str.length;
    for (let i = 0; i < length; i++) {
      zonesOnes[getCharCode(str[i])]++;
    }
    return zonesOnes;
  }

  function getCharCode(char: string): number {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  }
};
// @lc code=end

// dp2
var findMaxForm = function (strs: string[], m: number, n: number): number {
  const length = strs.length;
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i < length; i++) {
    const zonesOnes = getZonesOnes(strs[i]);
    const [zones, ones] = zonesOnes;
    for (let j = m; j >= zones; j--) {
      for (let k = n; k >= ones; k--) {
        dp[j][k] = Math.max(dp[j][k], dp[j - zones][k - ones] + 1);
      }
    }
  }

  return dp[m][n];

  function getZonesOnes(str: string): number[] {
    const zonesOnes: [number, number] = [0, 0];
    const length = str.length;
    for (let i = 0; i < length; i++) {
      zonesOnes[getCharCode(str[i])]++;
    }
    return zonesOnes;
  }

  function getCharCode(char: string): number {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  }
};
