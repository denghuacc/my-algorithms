/*
 * @lc app=leetcode.cn id=670 lang=swift
 *
 * [670] 最大交换
 *
 * https://leetcode.cn/problems/maximum-swap/description/
 *
 * algorithms
 * Medium (48.04%)
 * Likes:    433
 * Dislikes: 0
 * Total Accepted:    76K
 * Total Submissions: 156.7K
 * Testcase Example:  '2736'
 *
 * 给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
 *
 * 示例 1 :
 *
 *
 * 输入: 2736
 * 输出: 7236
 * 解释: 交换数字2和数字7。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: 9973
 * 输出: 9973
 * 解释: 不需要交换。
 *
 *
 * 注意:
 *
 *
 * 给定数字的范围是 [0, 10^8]
 *
 *
 */

// @lc code=start
class Solution {
  func maximumSwap(_ num: Int) -> Int {
    var numStrArr = String(num).map { String($0) }
    let n = numStrArr.count
    var maxIdx = n - 1
    var idx1 = -1
    var idx2 = -1
    for i in (0..<n).reversed() {
      if numStrArr[i] > numStrArr[maxIdx] {
        maxIdx = i
      } else if numStrArr[i] < numStrArr[maxIdx] {
        idx1 = i
        idx2 = maxIdx
      }
    }
    if idx1 == -1 {
      return num
    }
    numStrArr.swapAt(idx1, idx2)
    return Int(numStrArr.joined())!
  }
}
// @lc code=end
