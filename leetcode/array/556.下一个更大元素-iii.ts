/*
 * @lc app=leetcode.cn id=556 lang=typescript
 *
 * [556] 下一个更大元素 III
 *
 * https://leetcode.cn/problems/next-greater-element-iii/description/
 *
 * algorithms
 * Medium (33.58%)
 * Likes:    251
 * Dislikes: 0
 * Total Accepted:    26.3K
 * Total Submissions: 75K
 * Testcase Example:  '12'
 *
 * 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
 *
 * 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：21
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 21
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

export {};

// @lc code=start
// the same as leetcode 31 下一个排列
function nextGreaterElement(n: number): number {
  const nums = Array.from(n.toString()).map((i) => Number(i));
  let i = nums.length - 2;
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }

  if (i < 0) {
    return -1;
  }

  let j = nums.length - 1;
  while (j >= 0 && nums[j] <= nums[i]) {
    j--;
  }
  swap(nums, i, j);
  reverse(nums, i + 1);
  const res = Number(nums.join(""));
  return res > 2 ** 31 - 1 ? -1 : res;

  function swap(nums: number[], i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  function reverse(nums: number[], start: number) {
    let i = start;
    let j = nums.length - 1;
    while (i < j) {
      swap(nums, i, j);
      i++;
      j--;
    }
  }
}
// @lc code=end
