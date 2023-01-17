/*
 * @lc app=leetcode.cn id=1814 lang=typescript
 *
 * [1814] 统计一个数组中好对子的数目
 *
 * https://leetcode.cn/problems/count-nice-pairs-in-an-array/description/
 *
 * algorithms
 * Medium (37.15%)
 * Likes:    50
 * Dislikes: 0
 * Total Accepted:    10.1K
 * Total Submissions: 23K
 * Testcase Example:  '[42,11,1,97]'
 *
 * 给你一个数组 nums ，数组中只包含非负整数。定义 rev(x) 的值为将整数 x 各个数字位反转得到的结果。比方说 rev(123) = 321 ，
 * rev(120) = 21 。我们称满足下面条件的下标对 (i, j) 是 好的 ：
 *
 *
 * 0 <= i < j < nums.length
 * nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
 *
 *
 * 请你返回好下标对的数目。由于结果可能会很大，请将结果对 10^9 + 7 取余 后返回。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [42,11,1,97]
 * 输出：2
 * 解释：两个坐标对为：
 * ⁠- (0,3)：42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121 。
 * ⁠- (1,2)：11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [13,10,35,24,76]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 0 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
var countNicePairs = function (nums: number[]): number {
  const MOD = 1e9 + 7;
  const counts: Map<number, number> = new Map();
  for (const num of nums) {
    // nums[i]+rev(nums[j])=nums[j]+rev(nums[i])
    // -> nums[i]-rev(nums[i]) = nums[j]-rev(nums[j])
    const diff = num - reverse(num);
    counts.set(diff, (counts.get(diff) ?? 0) + 1);
  }
  let res = 0;
  for (const count of counts.values()) {
    res = (res + Math.floor((count * (count - 1)) / 2)) % MOD;
  }
  return res;

  function reverse(num: number): number {
    let rev = "";
    while (num > 0) {
      rev += num % 10;
      num = Math.floor(num / 10);
    }
    return Number(rev);
  }
};

var countNicePairs = function (nums: number[]): number {
  const MOD = 1e9 + 7;
  let res = 0;
  const counts: Map<number, number> = new Map();
  for (const num of nums) {
    const diff = num - reverse(num);
    res = (res + (counts.get(diff) ?? 0)) % MOD;
    counts.set(diff, (counts.get(diff) ?? 0) + 1);
  }
  return res;

  function reverse(num: number): number {
    let rev = 0;
    while (num > 0) {
      rev = rev * 10 + (num % 10);
      num = Math.floor(num / 10);
    }
    return rev;
  }
};
// @lc code=end
