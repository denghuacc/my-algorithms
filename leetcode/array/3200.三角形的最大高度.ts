/*
 * @lc app=leetcode.cn id=3200 lang=typescript
 *
 * [3200] 三角形的最大高度
 *
 * https://leetcode.cn/problems/maximum-height-of-a-triangle/description/
 *
 * algorithms
 * Easy (51.97%)
 * Likes:    18
 * Dislikes: 0
 * Total Accepted:    12.6K
 * Total Submissions: 20.4K
 * Testcase Example:  '2\n4'
 *
 * 给你两个整数 red 和 blue，分别表示红色球和蓝色球的数量。你需要使用这些球来组成一个三角形，满足第 1 行有 1 个球，第 2 行有 2
 * 个球，第 3 行有 3 个球，依此类推。
 *
 * 每一行的球必须是 相同 颜色，且相邻行的颜色必须 不同。
 *
 * 返回可以实现的三角形的 最大 高度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： red = 2, blue = 4
 *
 * 输出： 3
 *
 * 解释：
 *
 *
 *
 * 上图显示了唯一可能的排列方式。
 *
 *
 * 示例 2：
 *
 *
 * 输入： red = 2, blue = 1
 *
 * 输出： 2
 *
 * 解释：
 *
 *
 * 上图显示了唯一可能的排列方式。
 *
 *
 * 示例 3：
 *
 *
 * 输入： red = 1, blue = 1
 *
 * 输出： 1
 *
 *
 * 示例 4：
 *
 *
 * 输入： red = 10, blue = 1
 *
 * 输出： 2
 *
 * 解释：
 *
 *
 * 上图显示了唯一可能的排列方式。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= red, blue <= 100
 *
 *
 */

// @lc code=start
function maxHeightOfTriangle(red: number, blue: number): number {
  return Math.max(maxHeight(red, blue), maxHeight(blue, red));

  function maxHeight(odd: number, even: number): number {
    let i = 0;
    while (odd > i || even > i) {
      i++;
      if (i % 2 === 1) {
        if (odd < i) {
          i--;
          break;
        } else {
          odd -= i;
        }
      } else {
        if (even < i) {
          i--;
          break;
        } else {
          even -= i;
        }
      }
    }
    return i;
  }
}
// @lc code=end
