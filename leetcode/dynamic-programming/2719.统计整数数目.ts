/*
 * @lc app=leetcode.cn id=2719 lang=typescript
 *
 * [2719] 统计整数数目
 *
 * https://leetcode.cn/problems/count-of-integers/description/
 *
 * algorithms
 * Hard (54.40%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    5.6K
 * Total Submissions: 10.3K
 * Testcase Example:  '"1"\n"12"\n1\n8'
 *
 * 给你两个数字字符串 num1 和 num2 ，以及两个整数 max_sum 和 min_sum 。如果一个整数 x
 * 满足以下条件，我们称它是一个好整数：
 *
 *
 * num1 <= x <= num2
 * min_sum <= digit_sum(x) <= max_sum.
 *
 *
 * 请你返回好整数的数目。答案可能很大，请返回答案对 10^9 + 7 取余后的结果。
 *
 * 注意，digit_sum(x) 表示 x 各位数字之和。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num1 = "1", num2 = "12", min_num = 1, max_num = 8
 * 输出：11
 * 解释：总共有 11 个整数的数位和在 1 到 8 之间，分别是 1,2,3,4,5,6,7,8,10,11 和 12 。所以我们返回 11 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num1 = "1", num2 = "5", min_num = 1, max_num = 5
 * 输出：5
 * 解释：数位和在 1 到 5 之间的 5 个整数分别为 1,2,3,4 和 5 。所以我们返回 5 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num1 <= num2 <= 10^22
 * 1 <= min_sum <= max_sum <= 400
 *
 *
 */

// @lc code=start
// dp cv
function count(
  num1: string,
  num2: string,
  min_sum: number,
  max_sum: number
): number {
  const N = 23;
  const M = 401;
  const MOD = 1e9 + 7;
  const d = new Array(N).fill(null).map(() => new Array(M).fill(-1));
  return (get(num2) - get(sub(num1)) + MOD) % MOD;

  function dfs(num: string, i: number, j: number, limit: boolean) {
    if (j > max_sum) {
      return 0;
    }
    if (i === -1) {
      return j >= min_sum ? 1 : 0;
    }
    if (!limit && d[i][j] !== -1) {
      return d[i][j];
    }

    let res = 0;
    const up = limit ? num.charCodeAt(i) - "0".charCodeAt(0) : 9;
    for (let x = 0; x <= up; x++) {
      res = (res + dfs(num, i - 1, j + x, limit && x === up)) % MOD;
    }

    if (!limit) {
      d[i][j] = res;
    }
    return res;
  }

  function get(num: string) {
    num = num.split("").reverse().join("");
    return dfs(num, num.length - 1, 0, true);
  }

  // 求解 num - 1，先把最后一个非 0 字符减去 1，再把后面的 0 字符变为 9
  function sub(num: string) {
    let i = num.length - 1;
    const arr = num.split("");
    while (arr[i] === "0") {
      i--;
    }
    arr[i] = String.fromCharCode(arr[i].charCodeAt(0) - 1);
    i++;
    while (i < num.length) {
      arr[i] = "9";
      i++;
    }
    return arr.join("");
  }
}
// @lc code=end
