/*
 * @lc app=leetcode.cn id=739 lang=typescript
 *
 * [739] 每日温度
 *
 * https://leetcode.cn/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (69.63%)
 * Likes:    1328
 * Dislikes: 0
 * Total Accepted:    366.6K
 * Total Submissions: 526.5K
 * Testcase Example:  '[73,74,75,71,69,72,76,73]'
 *
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i
 * 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: temperatures = [73,74,75,71,69,72,76,73]
 * 输出: [1,1,4,2,1,1,0,0]
 *
 *
 * 示例 2:
 *
 *
 * 输入: temperatures = [30,40,50,60]
 * 输出: [1,1,1,0]
 *
 *
 * 示例 3:
 *
 *
 * 输入: temperatures = [30,60,90]
 * 输出: [1,1,0]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= temperatures.length <= 10^5
 * 30 <= temperatures[i] <= 100
 *
 *
 */

// @lc code=start
var dailyTemperatures = function (temperatures: number[]): number[] {
  const res: number[] = [];
  const n = temperatures.length;
  for (let i = 0; i < n; i++) {
    const temperature = temperatures[i];
    let hasBigger = false;
    for (let j = i + 1; j < n; j++) {
      const nextTemperature = temperatures[j];
      if (nextTemperature > temperature) {
        res.push(j - i);
        hasBigger = true;
        break;
      }
    }
    if (!hasBigger) res.push(0);
  }
  return res;
};

// stack
var dailyTemperatures = function (temperatures: number[]): number[] {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack.at(-1)!]) {
      const prev = stack.pop()!;
      res[prev] = i - prev;
    }
    stack.push(i);
  }

  return res;
};
// @lc code=end
