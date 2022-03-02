/*
 * @lc app=leetcode.cn id=564 lang=typescript
 *
 * [564] 寻找最近的回文数
 *
 * https://leetcode-cn.com/problems/find-the-closest-palindrome/description/
 *
 * algorithms
 * Hard (18.55%)
 * Likes:    151
 * Dislikes: 0
 * Total Accepted:    8.8K
 * Total Submissions: 36.3K
 * Testcase Example:  '"123"'
 *
 * 给定一个表示整数的字符串 n ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。
 *
 * “最近的”定义为两个整数差的绝对值最小。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = "123"
 * 输出: "121"
 *
 *
 * 示例 2:
 *
 *
 * 输入: n = "1"
 * 输出: "0"
 * 解释: 0 和 2是最近的回文，但我们返回最小的，也就是 0。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= n.length <= 18
 * n 只由数字组成
 * n 不含前导 0
 * n 代表在 [1, 10^18 - 1] 范围内的整数
 *
 *
 */

// @lc code=start
// string
function nearestPalindromic(n: string): string {
  const len = n.length;
  const m = BigInt(n);
  if (m < 10n || m === BigInt(10 ** (len - 1))) return String(m - 1n); // 10 < 或 10,100...10000
  if (m + 1n === BigInt(10 ** len)) return String(m + 2n); // 9,99...9999
  if (m - 1n === BigInt(10 ** (len - 1))) return String(m - 2n); // 11,101...10001
  const pre = n.slice(0, (len + 1) >>> 1); // 取一半，长度为奇数，多取 1 位
  let minDiff = Number.MAX_SAFE_INTEGER;
  let res = "";
  for (let i = -1; i <= 1; i++) {
    // 枚举 -1 +0 +1 三种情况，找最接近原数的拼接结果
    const newPre = String((Number(pre) | 0) + i); // ↓ 长度为奇数，翻转少翻 1 位
    const newStr =
      newPre +
      (len & 1 ? newPre.slice(0, -1) : newPre).split("").reverse().join("");
    const diff = Math.abs(Number(n) - Number(newStr)); // 与原数的差绝对值
    if (diff && diff < minDiff) {
      // 差不能为 0 ，即找不能与原数一样，差绝对值最小的
      minDiff = diff;
      res = newStr;
    }
  }
  return res;
}
// @lc code=end
