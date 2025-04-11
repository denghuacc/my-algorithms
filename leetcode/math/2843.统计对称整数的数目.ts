/*
 * @lc app=leetcode.cn id=2843 lang=typescript
 *
 * [2843] 统计对称整数的数目
 *
 * https://leetcode.cn/problems/count-symmetric-integers/description/
 *
 * algorithms
 * Easy (71.73%)
 * Likes:    24
 * Dislikes: 0
 * Total Accepted:    13.3K
 * Total Submissions: 17.8K
 * Testcase Example:  '1\n100'
 *
 * 给你两个正整数 low 和 high 。
 *
 * 对于一个由 2 * n 位数字组成的整数 x ，如果其前 n 位数字之和与后 n 位数字之和相等，则认为这个数字是一个对称整数。
 *
 * 返回在 [low, high] 范围内的 对称整数的数目 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：low = 1, high = 100
 * 输出：9
 * 解释：在 1 到 100 范围内共有 9 个对称整数：11、22、33、44、55、66、77、88 和 99 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：low = 1200, high = 1230
 * 输出：4
 * 解释：在 1200 到 1230 范围内共有 4 个对称整数：1203、1212、1221 和 1230 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= low <= high <= 10^4
 *
 *
 */

// @lc code=start
var countSymmetricIntegers = function (low: number, high: number): number {
  let cnt = 0;
  for (let i = low; i <= high; i++) {
    if (check(i)) {
      cnt++;
    }
  }
  return cnt;

  function check(num: number): boolean {
    const str = String(num);
    const n = str.length;
    if (n % 2) {
      return false;
    }
    let left = 0;
    let right = 0;
    for (let i = 0, j = n - 1; i < j; i++, j--) {
      left += Number(str[i]);
      right += Number(str[j]);
    }
    return left === right;
  }
};

var countSymmetricIntegers = function (low: number, high: number): number {
  let cnt = 0;
  for (let i = low; i <= high; i++) {
    if (i < 100 && i % 11 === 0) {
      cnt++;
    } else if (i >= 1000 && i <= 9999) {
      const leftSum = Math.floor(i / 1000) + Math.floor((i % 1000) / 100);
      const right = Math.floor((i % 100) / 10) + (i % 10);
      if (leftSum === right) {
        cnt++;
      }
    }
  }
  return cnt;
};
// @lc code=end
