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

/**
 * 暴力解法：对每个元素向右遍历查找第一个更大的元素
 * 时间复杂度：O(n²)，空间复杂度：O(1)
 */
var dailyTemperatures = function (temperatures: number[]): number[] {
  const res: number[] = [];
  const n = temperatures.length;

  // 对每个位置的温度进行处理
  for (let i = 0; i < n; i++) {
    const temperature = temperatures[i];
    let hasBigger = false;

    // 向右查找第一个更高的温度
    for (let j = i + 1; j < n; j++) {
      const nextTemperature = temperatures[j];
      if (nextTemperature > temperature) {
        res.push(j - i); // 记录距离
        hasBigger = true;
        break;
      }
    }

    // 如果没有找到更高的温度，则记录0
    if (!hasBigger) res.push(0);
  }
  return res;
};

/**
 * 单调栈解法：维护一个递减的单调栈
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var dailyTemperatures = function (temperatures: number[]): number[] {
  const n = temperatures.length;
  const res = new Array(n).fill(0); // 结果数组，默认值为0
  const stack: number[] = []; // 单调栈，存储下标

  for (let i = 0; i < n; i++) {
    // 当栈不为空且当前温度大于栈顶对应的温度时
    // 说明找到了栈顶元素的下一个更高温度
    while (stack.length && temperatures[i] > temperatures[stack.at(-1)!]) {
      const prev = stack.pop()!; // 弹出栈顶下标
      res[prev] = i - prev; // 记录距离
    }

    // 将当前下标入栈
    stack.push(i);
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 对于每个位置，找到右边第一个比当前元素大的元素位置
   - 这是典型的"下一个更大元素"问题

2. 算法分析：
   暴力解法：
   - 时间复杂度：O(n²) - 对每个元素都要遍历其右边所有元素
   - 空间复杂度：O(1) - 只使用常数额外空间
   
   单调栈解法：
   - 时间复杂度：O(n) - 每个元素最多进栈出栈一次
   - 空间复杂度：O(n) - 栈的空间
   - 算法类型：单调栈

3. 实现要点：
   - 核心思想：维护一个递减的单调栈，存储数组下标
   - 当遇到更大的元素时，栈中所有小于当前元素的位置都找到了答案
   - 栈中存储的是还没有找到下一个更大元素的位置
   - 栈顶永远是当前还未匹配的最小温度位置

4. 优化思路：
   - 单调栈将时间复杂度从O(n²)优化到O(n)
   - 核心是"谁需要当前元素"而不是"当前元素需要谁"的思维转换
   - 通过栈的特性，实现了高效的回溯匹配
*/
