/*
 * @lc app=leetcode.cn id=1296 lang=typescript
 *
 * [1296] 划分数组为连续数字的集合
 *
 * https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/description/
 *
 * algorithms
 * Medium (46.04%)
 * Likes:    67
 * Dislikes: 0
 * Total Accepted:    8.4K
 * Total Submissions: 18.2K
 * Testcase Example:  '[1,2,3,3,4,4,5,6]\n4'
 *
 * 给你一个整数数组 nums 和一个正整数 k，请你判断是否可以把这个数组划分成一些由 k 个连续数字组成的集合。
 * 如果可以，请返回 true；否则，返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,3,4,4,5,6], k = 4
 * 输出：true
 * 解释：数组可以分成 [1,2,3,4] 和 [3,4,5,6]。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
 * 输出：true
 * 解释：数组可以分成 [1,2,3] , [2,3,4] , [3,4,5] 和 [9,10,11]。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [3,3,2,2,1,1], k = 3
 * 输出：true
 *
 *
 * 示例 4：
 *
 *
 * 输入：nums = [1,2,3,4], k = 3
 * 输出：false
 * 解释：数组不能分成几个大小为 3 的子数组。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 *
 *
 *
 *
 * 注意：此题目与 846 重复：https://leetcode-cn.com/problems/nums-of-straights/
 *
 */

// the same as 846
// @lc code=start
// greedy
function isPossibleDivide(nums: number[], k: number): boolean {
  const n = nums.length;
  if (n % k !== 0) {
    return false;
  }
  nums.sort((a, b) => a - b);
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  for (const x of nums) {
    if (!map.has(x)) {
      continue;
    }
    for (let y = 0; y < k; y++) {
      const m = x + y;
      if (!map.has(m)) {
        return false;
      }
      map.set(m, map.get(m)! - 1);
      if (map.get(m)! === 0) {
        map.delete(m);
      }
    }
  }
  return true;
}
// @lc code=end
