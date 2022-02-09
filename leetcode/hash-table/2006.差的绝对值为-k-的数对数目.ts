/*
 * @lc app=leetcode.cn id=2006 lang=typescript
 *
 * [2006] 差的绝对值为 K 的数对数目
 *
 * https://leetcode-cn.com/problems/count-number-of-pairs-with-absolute-difference-k/description/
 *
 * algorithms
 * Easy (84.55%)
 * Likes:    26
 * Dislikes: 0
 * Total Accepted:    14.4K
 * Total Submissions: 16.6K
 * Testcase Example:  '[1,2,2,1]\n1'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回数对 (i, j) 的数目，满足 i < j 且 |nums[i] - nums[j]| == k
 * 。
 *
 * |x| 的值定义为：
 *
 *
 * 如果 x >= 0 ，那么值为 x 。
 * 如果 x < 0 ，那么值为 -x 。
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,2,1], k = 1
 * 输出：4
 * 解释：差的绝对值为 1 的数对为：
 * - [1,2,2,1]
 * - [1,2,2,1]
 * - [1,2,2,1]
 * - [1,2,2,1]
 *
 *
 * 示例 2：
 *
 * 输入：nums = [1,3], k = 3
 * 输出：0
 * 解释：没有任何数对差的绝对值为 3 。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [3,2,1,5,4], k = 2
 * 输出：3
 * 解释：差的绝对值为 2 的数对为：
 * - [3,2,1,5,4]
 * - [3,2,1,5,4]
 * - [3,2,1,5,4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * 1 <= nums[i] <= 100
 * 1 <= k <= 99
 *
 *
 */

// @lc code=start
var countKDifference = function (nums: number[], k: number): number {
  let res = 0;
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(nums[i] - nums[j]) === k) {
        res++;
      }
    }
  }
  return res;
};

// hash table
var countKDifference = function (nums: number[], k: number): number {
  let res = 0;
  const n = nums.length;
  const map = new Map<number, number>();
  for (let i = 0; i < n; i++) {
    res += (map.get(nums[i] + k) ?? 0) + (map.get(nums[i] - k) ?? 0);
    map.set(nums[i], (map.get(nums[i]) ?? 0) + 1);
  }
  return res;
};
// @lc code=end
