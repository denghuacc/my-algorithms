/*
 * @lc app=leetcode.cn id=45 lang=typescript
 *
 * [45] 跳跃游戏 II
 *
 * https://leetcode-cn.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Hard (28.33%)
 * Likes:    601
 * Dislikes: 0
 * Total Accepted:    66.6K
 * Total Submissions: 181.3K
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给定一个非负整数数组，你最初位于数组的第一个位置。
 *
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 *
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
 *
 * 示例:
 *
 * 输入: [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 * 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 *
 * 说明:
 *
 * 假设你总是可以到达数组的最后一个位置。
 *
 */

// @lc code=start
// greedy
var jump = function (nums: number[]): number {
  let position = nums.length - 1;
  let steps = 0;
  while (position > 0) {
    for (let i = 0; i < position; i++) {
      if (i + nums[i] >= position) {
        position = i;
        steps++;
        break;
      }
    }
  }
  return steps;
};

var jump = function (nums: number[]): number {
  const len = nums.length;
  let end = 0;
  let maxPosition = 0;
  let steps = 0;
  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i]);
    if (i === end) {
      end = maxPosition;
      steps++;
    }
  }
  return steps;
};
// @lc code=end
