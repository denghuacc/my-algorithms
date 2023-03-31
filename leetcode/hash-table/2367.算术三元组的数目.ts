/*
 * @lc app=leetcode.cn id=2367 lang=typescript
 *
 * [2367] 算术三元组的数目
 *
 * https://leetcode.cn/problems/number-of-arithmetic-triplets/description/
 *
 * algorithms
 * Easy (83.78%)
 * Likes:    46
 * Dislikes: 0
 * Total Accepted:    23.8K
 * Total Submissions: 28.1K
 * Testcase Example:  '[0,1,4,6,7,10]\n3'
 *
 * 给你一个下标从 0 开始、严格递增 的整数数组 nums 和一个正整数 diff 。如果满足下述全部条件，则三元组 (i, j, k) 就是一个
 * 算术三元组 ：
 *
 *
 * i < j < k ，
 * nums[j] - nums[i] == diff 且
 * nums[k] - nums[j] == diff
 *
 *
 * 返回不同 算术三元组 的数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [0,1,4,6,7,10], diff = 3
 * 输出：2
 * 解释：
 * (1, 2, 4) 是算术三元组：7 - 4 == 3 且 4 - 1 == 3 。
 * (2, 4, 5) 是算术三元组：10 - 7 == 3 且 7 - 4 == 3 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [4,5,6,7,8,9], diff = 2
 * 输出：2
 * 解释：
 * (0, 2, 4) 是算术三元组：8 - 6 == 2 且 6 - 4 == 2 。
 * (1, 3, 5) 是算术三元组：9 - 7 == 2 且 7 - 5 == 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 200
 * 0 <= nums[i] <= 200
 * 1 <= diff <= 50
 * nums 严格 递增
 *
 *
 */

// @lc code=start
var arithmeticTriplets = function (nums: number[], diff: number): number {
  let res = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[j] - nums[i] !== diff) {
        continue;
      }
      for (let k = j + 1; k < n; k++) {
        if (nums[k] - nums[j] === diff) {
          res++;
        }
      }
    }
  }
  return res;
};

var arithmeticTriplets = function (nums: number[], diff: number): number {
  const set: Set<number> = new Set();
  for (const num of nums) {
    set.add(num);
  }
  let res = 0;
  for (const num of nums) {
    if (set.has(num + diff) && set.has(num + 2 * diff)) {
      res++;
    }
  }
  return res;
};
// @lc code=end
