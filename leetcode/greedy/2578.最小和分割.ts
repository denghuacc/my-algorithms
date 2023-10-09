/*
 * @lc app=leetcode.cn id=2578 lang=typescript
 *
 * [2578] 最小和分割
 *
 * https://leetcode.cn/problems/split-with-minimum-sum/description/
 *
 * algorithms
 * Easy (75.96%)
 * Likes:    36
 * Dislikes: 0
 * Total Accepted:    13.8K
 * Total Submissions: 17K
 * Testcase Example:  '4325'
 *
 * 给你一个正整数 num ，请你将它分割成两个非负整数 num1 和 num2 ，满足：
 *
 *
 * num1 和 num2 直接连起来，得到 num 各数位的一个排列。
 *
 *
 * 换句话说，num1 和 num2 中所有数字出现的次数之和等于 num 中所有数字出现的次数。
 *
 *
 * num1 和 num2 可以包含前导 0 。
 *
 *
 * 请你返回 num1 和 num2 可以得到的和的 最小 值。
 *
 * 注意：
 *
 *
 * num 保证没有前导 0 。
 * num1 和 num2 中数位顺序可以与 num 中数位顺序不同。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 4325
 * 输出：59
 * 解释：我们可以将 4325 分割成 num1 = 24 和 num2 = 35 ，和为 59 ，59 是最小和。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 687
 * 输出：75
 * 解释：我们可以将 687 分割成 num1 = 68 和 num2 = 7 ，和为最优值 75 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 10 <= num <= 10^9
 *
 *
 */

// @lc code=start
var splitNum = function (num: number): number {
  const arr = num
    .toString()
    .split("")
    .sort((a, b) => Number(a) - Number(b));
  let a = "";
  let b = "";
  for (let i = 0; i < arr.length; i++) {
    i % 2 === 0 ? (a += arr[i]) : (b += arr[i]);
  }
  return Number(a) + Number(b);
};

var splitNum = function (num: number): number {
  const arr = num
    .toString()
    .split("")
    .map(Number)
    .sort((a, b) => a - b);
  let a = 0;
  let b = 0;
  for (let i = 0; i < arr.length; i++) {
    i % 2 === 0 ? (a = a * 10 + arr[i]) : (b = b * 10 + arr[i]);
  }
  return a + b;
};
// @lc code=end
