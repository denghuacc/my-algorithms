/*
 * @lc app=leetcode.cn id=659 lang=typescript
 *
 * [659] 分割数组为连续子序列
 *
 * https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/description/
 *
 * algorithms
 * Medium (53.29%)
 * Likes:    233
 * Dislikes: 0
 * Total Accepted:    20K
 * Total Submissions: 37.6K
 * Testcase Example:  '[1,2,3,3,4,5]'
 *
 * 给你一个按升序排序的整数数组 num（可能包含重复数字），请你将它们分割成一个或多个子序列，其中每个子序列都由连续整数组成且长度至少为 3 。
 *
 * 如果可以完成上述分割，则返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入: [1,2,3,3,4,5]
 * 输出: True
 * 解释:
 * 你可以分割出这样两个连续子序列 :
 * 1, 2, 3
 * 3, 4, 5
 *
 *
 *
 *
 * 示例 2：
 *
 * 输入: [1,2,3,3,4,4,5,5]
 * 输出: True
 * 解释:
 * 你可以分割出这样两个连续子序列 :
 * 1, 2, 3, 4, 5
 * 3, 4, 5
 *
 *
 *
 *
 * 示例 3：
 *
 * 输入: [1,2,3,4,4,5]
 * 输出: False
 *
 *
 *
 *
 * 提示：
 *
 *
 * 输入的数组长度范围为 [1, 10000]
 *
 *
 *
 *
 */

// @lc code=start
// greedy
function isPossible(nums: number[]): boolean {
  const countMap: Map<number, number> = new Map();
  const endMap: Map<number, number> = new Map();
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) ?? 0) + 1);
  }
  for (const num of nums) {
    const count = countMap.get(num) ?? 0;
    if (count > 0) {
      const preEndCount = endMap.get(num - 1) ?? 0;
      if (preEndCount > 0) {
        countMap.set(num, count - 1);
        endMap.set(num - 1, preEndCount - 1);
        endMap.set(num, (endMap.get(num) ?? 0) + 1);
      } else {
        const count1 = countMap.get(num + 1) ?? 0;
        const count2 = countMap.get(num + 2) ?? 0;
        if (count1 > 0 && count2 > 0) {
          countMap.set(num, count - 1);
          countMap.set(num + 1, count1 - 1);
          countMap.set(num + 2, count2 - 1);
          endMap.set(num + 2, (endMap.get(num + 2) ?? 0) + 1);
        } else {
          return false;
        }
      }
    }
  }
  return true;
}
// @lc code=end
