/*
 * @lc app=leetcode.cn id=728 lang=typescript
 *
 * [728] 自除数
 *
 * https://leetcode-cn.com/problems/self-dividing-numbers/description/
 *
 * algorithms
 * Easy (74.80%)
 * Likes:    174
 * Dislikes: 0
 * Total Accepted:    44.8K
 * Total Submissions: 58.5K
 * Testcase Example:  '1\n22'
 *
 * 自除数 是指可以被它包含的每一位数整除的数。
 *
 *
 * 例如，128 是一个 自除数 ，因为 128 % 1 == 0，128 % 2 == 0，128 % 8 == 0。
 *
 *
 * 自除数 不允许包含 0 。
 *
 * 给定两个整数 left 和 right ，返回一个列表，列表的元素是范围 [left, right] 内所有的 自除数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：left = 1, right = 22
 * 输出：[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
 *
 *
 * 示例 2:
 *
 *
 * 输入：left = 47, right = 85
 * 输出：[48,55,66,77]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= left <= right <= 10^4
 *
 *
 */

// @lc code=start
var selfDividingNumbers = function (left: number, right: number): number[] {
  const res: number[] = [];
  for (let i = left; i <= right; i++) {
    if (
      i
        .toString()
        .split("")
        .every((v) => i % +v === 0)
    ) {
      res.push(i);
    }
  }
  return res;
};

var selfDividingNumbers = function (left: number, right: number): number[] {
  let res: number[] = [];
  for (let i = left; i <= right; i++) {
    if (isSelfDividing(i)) {
      res.push(i);
    }
  }
  return res;

  function isSelfDividing(num: number): boolean {
    let digit = num;
    while (digit > 0) {
      const d = digit % 10;
      if (d === 0 || num % d !== 0) {
        return false;
      }
      digit = Math.floor(digit / 10);
    }
    return true;
  }
};
// @lc code=end
