/*
 * @lc app=leetcode.cn id=1748 lang=typescript
 *
 * [1748] 唯一元素的和
 *
 * https://leetcode-cn.com/problems/sum-of-unique-elements/description/
 *
 * algorithms
 * Easy (74.41%)
 * Likes:    22
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 21.6K
 * Testcase Example:  '[1,2,3,2]'
 *
 * 给你一个整数数组 nums 。数组中唯一元素是那些只出现 恰好一次 的元素。
 *
 * 请你返回 nums 中唯一元素的 和 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,3,2]
 * 输出：4
 * 解释：唯一元素为 [1,3] ，和为 4 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [1,1,1,1,1]
 * 输出：0
 * 解释：没有唯一元素，和为 0 。
 *
 *
 * 示例 3 ：
 *
 * 输入：nums = [1,2,3,4,5]
 * 输出：15
 * 解释：唯一元素为 [1,2,3,4,5] ，和为 15 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
var sumOfUnique = function (nums: number[]): number {
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  let sum = 0;
  for (const [key, value] of map.entries()) {
    if (value === 1) {
      sum += key;
    }
  }
  return sum;
};

var sumOfUnique = function (nums: number[]): number {
  let sum = 0;
  const map = new Map<number, number>();
  for (const num of nums) {
    if (!map.has(num)) {
      sum += num;
      map.set(num, 1);
    } else if (map.get(num) === 1) {
      sum -= num;
      map.set(num, 2);
    }
  }
  return sum;
};
// @lc code=end
