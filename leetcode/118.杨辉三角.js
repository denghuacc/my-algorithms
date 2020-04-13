/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 *
 * https://leetcode-cn.com/problems/pascals-triangle/description/
 *
 * algorithms
 * Easy (59.32%)
 * Likes:    277
 * Dislikes: 0
 * Total Accepted:    70.5K
 * Total Submissions: 106.6K
 * Testcase Example:  '5'
 *
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 *
 *
 *
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 *
 * 示例:
 *
 * 输入: 5
 * 输出:
 * [
 * ⁠    [1],
 * ⁠   [1,1],
 * ⁠  [1,2,1],
 * ⁠ [1,3,3,1],
 * ⁠[1,4,6,4,1]
 * ]
 *
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let ret = []
  if (numRows <= 0) return ret
  let i = 0,
    j = 0
  for (let i = 0; i < numRows; i++) {
    const subArr = []
    for (let j = 0; j <= i; j++) {
      if (j > 0 && j < i) {
        subArr.push(ret[i - 1][j - 1] + ret[i - 1][j])
      } else {
        subArr.push(1)
      }
    }
    ret.push(subArr)
  }
  return ret
}
// @lc code=end
