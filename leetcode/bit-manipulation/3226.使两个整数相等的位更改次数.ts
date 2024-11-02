/*
 * @lc app=leetcode.cn id=3226 lang=typescript
 *
 * [3226] 使两个整数相等的位更改次数
 *
 * https://leetcode.cn/problems/number-of-bit-changes-to-make-two-integers-equal/description/
 *
 * algorithms
 * Easy (64.27%)
 * Likes:    31
 * Dislikes: 0
 * Total Accepted:    16.8K
 * Total Submissions: 22.8K
 * Testcase Example:  '13\n4'
 *
 * 给你两个正整数 n 和 k。
 *
 * 你可以选择 n 的 二进制表示 中任意一个值为 1 的位，并将其改为 0。
 *
 * 返回使得 n 等于 k 所需要的更改次数。如果无法实现，返回 -1。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： n = 13, k = 4
 *
 * 输出： 2
 *
 * 解释：
 * 最初，n 和 k 的二进制表示分别为 n = (1101)2 和 k = (0100)2，
 *
 * 我们可以改变 n 的第一位和第四位。结果整数为 n = (0100)2 = k。
 *
 *
 * 示例 2：
 *
 *
 * 输入： n = 21, k = 21
 *
 * 输出： 0
 *
 * 解释：
 * n 和 k 已经相等，因此不需要更改。
 *
 *
 * 示例 3：
 *
 *
 * 输入： n = 14, k = 13
 *
 * 输出： -1
 *
 * 解释：
 * 无法使 n 等于 k。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n, k <= 10^6
 *
 *
 */

export {};

// @lc code=start
var minChanges = function (n: number, k: number): number {
  let nStr = changeArr(n);
  let kStr = changeArr(k);
  if (nStr === kStr) {
    return 0;
  }
  const nLen = nStr.length;
  const kLen = kStr.length;
  const len = Math.max(nLen, kLen);
  nStr = nStr.padStart(len, "0");
  kStr = kStr.padStart(len, "0");

  let res = 0;
  for (let i = 0; i < len; i++) {
    if (nStr[i] === "1" && kStr[i] === "0") {
      res++;
    } else if (nStr[i] === "0" && kStr[i] === "1") {
      return -1;
    }
  }
  return res;

  function changeArr(num: number): string {
    let str = "";
    while (num) {
      const r = num % 2;
      str = String(r) + str;
      num = Math.floor(num / 2);
    }
    return str;
  }
};
var minChanges = function (n: number, k: number): number {
  let res = 0;
  while (n > 0 || k > 0) {
    if ((n & 1) === 0 && (k & 1) === 1) {
      return -1;
    }
    if ((n & 1) === 1 && (k & 1) === 0) {
      res++;
    }
    n >>= 1;
    k >>= 1;
  }
  return res;
};
// @lc code=end
