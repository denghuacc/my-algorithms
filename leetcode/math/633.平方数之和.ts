/*
 * @lc app=leetcode.cn id=633 lang=typescript
 *
 * [633] 平方数之和
 *
 * https://leetcode-cn.com/problems/sum-of-square-numbers/description/
 *
 * algorithms
 * Easy (28.74%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    25.9K
 * Total Submissions: 76.8K
 * Testcase Example:  '5'
 *
 * 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a^2 + b^2 = c。
 *
 * 示例1:
 *
 *
 * 输入: 5
 * 输出: True
 * 解释: 1 * 1 + 2 * 2 = 5
 *
 *
 *
 *
 * 示例2:
 *
 *
 * 输入: 3
 * 输出: False
 *
 *
 */

// @lc code=start
// binary search
var judgeSquareSum = function (c: number): boolean {
  for (let a = 0; a * a <= c; a++) {
    const b = c - a * a;
    if (binarySearch(0, b, b)) {
      return true;
    }
  }
  return false;

  function binarySearch(start: number, end: number, n: number): boolean {
    if (start > end) return false;

    const mid = start + Math.floor((end - start) / 2);

    if (mid * mid === n) {
      return true;
    } else if (mid * mid > n) {
      return binarySearch(start, mid - 1, n);
    } else if (mid * mid < n) {
      return binarySearch(mid + 1, end, n);
    }

    return false;
  }
};

// two pointers
var judgeSquareSum = function (c: number): boolean {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));

  while (left <= right) {
    const sum = left * left + right * right;
    if (sum === c) {
      return true;
    } else if (sum > c) {
      right--;
    } else {
      left++;
    }
  }

  return false;
};

// API
var judgeSquareSum = function (c: number): boolean {
  for (let a = 0; a * a <= c; a++) {
    const b = Math.sqrt(c - a * a);
    if (Number.isInteger(b)) {
      return true;
    }
  }
  return false;
};

// Math 费马平方和定理
// 一个非负整数 c 能够表示为两个整数的平方和
// 当且仅当 c 的所有形如 4k+3 的质因子的幂次均为偶数
var judgeSquareSum = function (c: number): boolean {
  for (let i = 2; i * i <= c; i++) {
    let count = 0;
    if (c % i === 0) {
      while (c % i === 0) {
        count++;
        c = Math.floor(c / i);
      }
      if (i % 4 === 3 && count % 2 !== 0) {
        return false;
      }
    }
  }
  return c % 4 !== 3;
};
// @lc code=end
