/*
 * @lc app=leetcode.cn id=976 lang=typescript
 *
 * [976] 三角形的最大周长
 *
 * https://leetcode-cn.com/problems/largest-perimeter-triangle/description/
 *
 * algorithms
 * Easy (56.00%)
 * Likes:    95
 * Dislikes: 0
 * Total Accepted:    25.6K
 * Total Submissions: 44.7K
 * Testcase Example:  '[2,1,2]'
 *
 * 给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。
 *
 * 如果不能形成任何面积不为零的三角形，返回 0。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：[2,1,2]
 * 输出：5
 *
 *
 * 示例 2：
 *
 * 输入：[1,2,1]
 * 输出：0
 *
 *
 * 示例 3：
 *
 * 输入：[3,2,3,4]
 * 输出：10
 *
 *
 * 示例 4：
 *
 * 输入：[3,6,2,3]
 * 输出：8
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= A.length <= 10000
 * 1 <= A[i] <= 10^6
 *
 *
 */

// @lc code=start
function largestPerimeter(A: number[]): number {
  A.sort((a, b) => a - b);
  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i - 2] + A[i - 1] > A[i]) {
      return A[i - 2] + A[i - 1] + A[i];
    }
  }
  return 0;
}
// @lc code=end
