/*
 * @lc app=leetcode.cn id=2799 lang=typescript
 *
 * [2799] 统计完全子数组的数目
 *
 * https://leetcode.cn/problems/count-complete-subarrays-in-an-array/description/
 *
 * algorithms
 * Medium (66.98%)
 * Likes:    74
 * Dislikes: 0
 * Total Accepted:    23.3K
 * Total Submissions: 32.6K
 * Testcase Example:  '[1,3,1,2,2]'
 *
 * 给你一个由 正 整数组成的数组 nums 。
 *
 * 如果数组中的某个子数组满足下述条件，则称之为 完全子数组 ：
 *
 *
 * 子数组中 不同 元素的数目等于整个数组不同元素的数目。
 *
 *
 * 返回数组中 完全子数组 的数目。
 *
 * 子数组 是数组中的一个连续非空序列。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,3,1,2,2]
 * 输出：4
 * 解释：完全子数组有：[1,3,1,2]、[1,3,1,2,2]、[3,1,2] 和 [3,1,2,2] 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [5,5,5,5]
 * 输出：10
 * 解释：数组仅由整数 5 组成，所以任意子数组都满足完全子数组的条件。子数组的总数为 10 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 2000
 *
 *
 */

// @lc code=start
function countCompleteSubarrays(nums: number[]): number {
  const n = nums.length;
  const cnt = new Map<number, number>();
  let res = 0;
  let right = 0;
  const dist = new Set(nums).size;

  for (let left = 0; left < n; left++) {
    if (left > 0) {
      const remove = nums[left - 1];
      cnt.set(remove, cnt.get(remove)! - 1);
      if (cnt.get(remove) === 0) {
        cnt.delete(remove);
      }
    }
    while (right < n && cnt.size < dist) {
      const add = nums[right];
      cnt.set(add, (cnt.get(add) ?? 0) + 1);
      right++;
    }
    if (cnt.size === dist) {
      res += n - right + 1;
    }
  }

  return res;
}
// @lc code=end
