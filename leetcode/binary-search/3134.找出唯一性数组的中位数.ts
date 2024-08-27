/*
 * @lc app=leetcode.cn id=3134 lang=typescript
 *
 * [3134] 找出唯一性数组的中位数
 *
 * https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/description/
 *
 * algorithms
 * Hard (41.18%)
 * Likes:    22
 * Dislikes: 0
 * Total Accepted:    4.2K
 * Total Submissions: 8.6K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums 。数组 nums 的 唯一性数组 是一个按元素从小到大排序的数组，包含了 nums 的所有非空子数组中不同元素的个数。
 *
 * 换句话说，这是由所有 0 <= i <= j < nums.length 的 distinct(nums[i..j]) 组成的递增数组。
 *
 * 其中，distinct(nums[i..j]) 表示从下标 i 到下标 j 的子数组中不同元素的数量。
 *
 * 返回 nums 唯一性数组 的 中位数 。
 *
 * 注意，数组的 中位数 定义为有序数组的中间元素。如果有两个中间元素，则取值较小的那个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 *
 * 输出：1
 *
 * 解释：
 *
 * nums 的唯一性数组为 [distinct(nums[0..0]), distinct(nums[1..1]),
 * distinct(nums[2..2]), distinct(nums[0..1]), distinct(nums[1..2]),
 * distinct(nums[0..2])]，即 [1, 1, 1, 2, 2, 3] 。唯一性数组的中位数为 1 ，因此答案是 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,3,4,5]
 *
 * 输出：2
 *
 * 解释：
 *
 * nums 的唯一性数组为 [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3] 。唯一性数组的中位数为 2
 * ，因此答案是 2 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [4,3,5,4]
 *
 * 输出：2
 *
 * 解释：
 *
 * nums 的唯一性数组为 [1, 1, 1, 1, 2, 2, 2, 3, 3, 3] 。唯一性数组的中位数为 2 ，因此答案是 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
// binary search cv
function medianOfUniquenessArray(nums: number[]): number {
  const n = nums.length;
  const median = Math.floor(((n * (n + 1)) / 2 + 1) / 2);

  let res = 0;
  let low = 1;
  let high = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (check(mid)) {
      res = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return res;

  // 检测数组中不同元素数目小于等于 t 的连续子数组数目是否大于等于 median
  function check(t: number): boolean {
    const cnt: Map<number, number> = new Map();
    let total = 0;
    for (let i = 0, j = 0; i < n; i++) {
      cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
      while (cnt.size > t) {
        cnt.set(nums[j], cnt.get(nums[j])! - 1);
        if (cnt.get(nums[j]) === 0) {
          cnt.delete(nums[j]);
        }
        j++;
      }
      total += i - j + 1;
    }
    return total >= median;
  }
}

// @lc code=end
