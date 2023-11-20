/*
 * @lc app=leetcode.cn id=2342 lang=typescript
 *
 * [2342] 数位和相等数对的最大和
 *
 * https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits/description/
 *
 * algorithms
 * Medium (53.82%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    28.1K
 * Total Submissions: 45.6K
 * Testcase Example:  '[18,43,36,13,7]'
 *
 * 给你一个下标从 0 开始的数组 nums ，数组中的元素都是 正 整数。请你选出两个下标 i 和 j（i != j），且 nums[i] 的数位和 与
 * nums[j] 的数位和相等。
 *
 * 请你找出所有满足条件的下标 i 和 j ，找出并返回 nums[i] + nums[j] 可以得到的 最大值 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [18,43,36,13,7]
 * 输出：54
 * 解释：满足条件的数对 (i, j) 为：
 * - (0, 2) ，两个数字的数位和都是 9 ，相加得到 18 + 36 = 54 。
 * - (1, 4) ，两个数字的数位和都是 7 ，相加得到 43 + 7 = 50 。
 * 所以可以获得的最大和是 54 。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [10,12,19,14]
 * 输出：-1
 * 解释：不存在满足条件的数对，返回 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
function maximumSum(nums: number[]): number {
  const map = new Map<number, [number, number[]]>();
  for (const num of nums) {
    const sum = getSum(num);
    if (!map.has(sum)) {
      map.set(sum, [1, [num]]);
    } else {
      let [cnt, arr] = map.get(sum)!;
      if (arr.length < 2) {
        if (num >= arr[0]) {
          arr = [num, arr[0]];
        } else {
          arr = [arr[0], num];
        }
      } else {
        if (num >= arr[0]) {
          arr = [num, arr[0]];
        } else if (num < arr[0] && num > arr[1]) {
          arr = [arr[0], num];
        }
      }
      map.set(sum, [cnt + 1, arr]);
    }
  }
  let maxPairSum = 0;
  for (const [cnt, [a, b]] of map.values()) {
    if (cnt >= 2) {
      maxPairSum = Math.max(maxPairSum, a + b);
    }
  }
  return maxPairSum === 0 ? -1 : maxPairSum;

  function getSum(num: number): number {
    let sum = 0;
    while (num) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }
}
// @lc code=end
