/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 *
 * https://leetcode-cn.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (34.22%)
 * Likes:    343
 * Dislikes: 0
 * Total Accepted:    112.8K
 * Total Submissions: 299.9K
 * Testcase Example:  '4'
 *
 * 实现 int sqrt(int x) 函数。
 *
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 *
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 *
 * 示例 1:
 *
 * 输入: 4
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842...,
 * 由于返回类型是整数，小数部分将被舍去。
 *
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  return Math.floor(Math.sqrt(x))
}

var mySqrt = function (x) {
  let r = 0
  while (!(r * r <= x && (r + 1) * (r + 1) > x)) {
    r++
  }
  return r
}

// 二分法
var mySqrt = function (x) {
  if (x === 0 || x === 1) return x
  let l = 0,
    r = Math.floor(x / 2)
  while (l <= r) {
    m = Math.floor((l + r) / 2)
    let s = m * m
    if (s === x) {
      return m
    } else if (s < x) {
      l = m + 1
    } else {
      r = m - 1
    }
  }
  return r
}
// @lc code=end
