/*
 * @lc app=leetcode.cn id=896 lang=typescript
 *
 * [896] 单调数列
 *
 * https://leetcode-cn.com/problems/monotonic-array/description/
 *
 * algorithms
 * Easy (54.07%)
 * Likes:    96
 * Dislikes: 0
 * Total Accepted:    31.4K
 * Total Submissions: 55.1K
 * Testcase Example:  '[1,2,2,3]'
 *
 * 如果数组是单调递增或单调递减的，那么它是单调的。
 *
 * 如果对于所有 i <= j，A[i] <= A[j]，那么数组 A 是单调递增的。 如果对于所有 i <= j，A[i]> = A[j]，那么数组 A
 * 是单调递减的。
 *
 * 当给定的数组 A 是单调数组时返回 true，否则返回 false。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：[1,2,2,3]
 * 输出：true
 *
 *
 * 示例 2：
 *
 * 输入：[6,5,4,4]
 * 输出：true
 *
 *
 * 示例 3：
 *
 * 输入：[1,3,2]
 * 输出：false
 *
 *
 * 示例 4：
 *
 * 输入：[1,2,4,5]
 * 输出：true
 *
 *
 * 示例 5：
 *
 * 输入：[1,1,1]
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= A.length <= 50000
 * -100000 <= A[i] <= 100000
 *
 *
 */

// 情况一：数组只有递增，inc 为 true, dec 为 false，返回 true；
// 情况二：数组只有递减，inc 为 false, dec 为 true，返回 true；
// 情况三：数组有递增又有递减，inc 为 false, dec 也为 false，返回 false。
// 情况四：数组的元素都是相同值时，inc 为 true, dec 也为 true，返回 true。

// @lc code=start
function isMonotonic(A: number[]): boolean {
  const n = A.length;
  let inc = true;
  let dec = true;

  for (let i = 0; i < n - 1; i++) {
    if (A[i] > A[i + 1]) {
      inc = false;
    }
    if (A[i] < A[i + 1]) {
      dec = false;
    }
  }

  return inc || dec;
}
// @lc code=end
