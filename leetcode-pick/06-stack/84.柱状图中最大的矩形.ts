/*
 * @lc app=leetcode.cn id=84 lang=typescript
 *
 * [84] 柱状图中最大的矩形
 *
 * https://leetcode-cn.com/problems/largest-rectangle-in-histogram/description/
 *
 * algorithms
 * Hard (36.07%)
 * Likes:    769
 * Dislikes: 0
 * Total Accepted:    67.8K
 * Total Submissions: 165.3K
 * Testcase Example:  '[2,1,5,6,2,3]'
 *
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 *
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 *
 *
 *
 *
 *
 * 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
 *
 *
 *
 *
 *
 * 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
 *
 *
 *
 * 示例:
 *
 * 输入: [2,1,5,6,2,3]
 * 输出: 10
 *
 */

// @lc code=start
// brute force
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  if (len === 0) return 0;

  let ret = 0;
  for (let i = 0; i < len; i++) {
    // 找左边最后 1 个大于等于 heights[i] 的索引
    let left = i;
    const curHeight = heights[i];
    while (left > 0 && heights[left - 1] >= curHeight) {
      left--;
    }

    // 找右边最后 1 个大于等于 heights[i] 的索引
    let right = i;
    while (right < len - 1 && heights[right + 1] >= curHeight) {
      right++;
    }

    const width = right - left + 1;
    ret = Math.max(ret, width * curHeight);
  }

  return ret;
};

// stack
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  const left: number[] = new Array(len);
  const right: number[] = new Array(len);

  const stack: number[] = [];
  for (let i = 0; i < len; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  stack.length = 0;
  for (let i = len - 1; i >= 0; i--) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    right[i] = stack.length ? stack[stack.length - 1] : len;
    stack.push(i);
  }

  let ret = 0;
  for (let i = 0; i < len; i++) {
    ret = Math.max(ret, (right[i] - left[i] - 1) * heights[i]);
  }
  return ret;
};

// stack2
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  const left: number[] = new Array(len);
  const right: number[] = new Array(len).fill(len);

  const stack: number[] = [];
  for (let i = 0; i < len; i++) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      right[stack[stack.length - 1]] = i;
      stack.pop();
    }
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  let ret = 0;
  for (let i = 0; i < len; i++) {
    ret = Math.max(ret, (right[i] - left[i] - 1) * heights[i]);
  }
  return ret;
};
// @lc code=end
