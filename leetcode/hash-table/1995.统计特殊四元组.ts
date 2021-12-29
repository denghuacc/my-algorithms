/*
 * @lc app=leetcode.cn id=1995 lang=typescript
 *
 * [1995] 统计特殊四元组
 *
 * https://leetcode-cn.com/problems/count-special-quadruplets/description/
 *
 * algorithms
 * Easy (56.63%)
 * Likes:    36
 * Dislikes: 0
 * Total Accepted:    11.1K
 * Total Submissions: 18.1K
 * Testcase Example:  '[1,2,3,6]'
 *
 * 给你一个 下标从 0 开始 的整数数组 nums ，返回满足下述条件的 不同 四元组 (a, b, c, d) 的 数目 ：
 *
 *
 * nums[a] + nums[b] + nums[c] == nums[d] ，且
 * a < b < c < d
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,3,6]
 * 输出：1
 * 解释：满足要求的唯一一个四元组是 (0, 1, 2, 3) 因为 1 + 2 + 3 == 6 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [3,3,6,4,5]
 * 输出：0
 * 解释：[3,3,6,4,5] 中不存在满足要求的四元组。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1,1,1,3,5]
 * 输出：4
 * 解释：满足要求的 4 个四元组如下：
 * - (0, 1, 2, 3): 1 + 1 + 1 == 3
 * - (0, 1, 3, 4): 1 + 1 + 3 == 5
 * - (0, 2, 3, 4): 1 + 1 + 3 == 5
 * - (1, 2, 3, 4): 1 + 1 + 3 == 5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 4 <= nums.length <= 50
 * 1 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
function countQuadruplets(nums: number[]): number {
  let res = 0;
  const n = nums.length;
  const map: Map<number, number> = new Map();
  // nums[a] + nums[b] = nums[d] − nums[c]
  for (let b = n - 3; b >= 1; b--) {
    for (let d = b + 2; d < n; d++) {
      map.set(nums[d] - nums[b + 1], (map.get(nums[d] - nums[b + 1]) ?? 0) + 1); // c = b + 1
    }
    for (let a = 0; a < b; a++) {
      res += map.get(nums[a] + nums[b]) ?? 0;
    }
  }
  return res;
}
// @lc code=end
