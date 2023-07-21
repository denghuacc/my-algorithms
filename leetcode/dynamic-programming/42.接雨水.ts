/*
 * @lc app=leetcode.cn id=42 lang=typescript
 *
 * [42] 接雨水
 *
 * https://leetcode-cn.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (40.77%)
 * Likes:    1380
 * Dislikes: 0
 * Total Accepted:    112.6K
 * Total Submissions: 219.2K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 *
 *
 * 上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢
 * Marcos 贡献此图。
 *
 * 示例:
 *
 * 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出: 6
 *
 */

// @lc code=start
// brute force timeout
var trap = function (height: number[]): number {
  let ret = 0;
  const size = height.length;

  for (let i = 1; i < size - 1; i++) {
    let maxLeft = 0;
    let maxRight = 0;

    for (let j = i; j >= 0; j--) {
      maxLeft = Math.max(maxLeft, height[j]);
    }

    for (let j = i; j < size; j++) {
      maxRight = Math.max(maxRight, height[j]);
    }

    ret += Math.min(maxLeft, maxRight) - height[i];
  }

  return ret;
};

// dp
var trap = function (height: number[]): number {
  let ret = 0;
  const size = height.length;
  if (size === 0) return 0;

  const leftMax: number[] = new Array(size);
  const rightMax: number[] = new Array(size);

  leftMax[0] = height[0];
  for (let i = 1; i < size; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }

  rightMax[size - 1] = height[size - 1];
  for (let i = size - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }

  for (let i = 1; i < size - 1; i++) {
    ret += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return ret;
};

// stack
var trap = function (height: number[]): number {
  let ret = 0;
  let cur = 0;
  const stack: number[] = [];

  while (cur < height.length) {
    while (stack.length && height[cur] > height[stack[stack.length - 1]]) {
      const top = stack[stack.length - 1];
      stack.pop();
      if (!stack.length) break;
      const distance = cur - stack[stack.length - 1] - 1;
      const boundedHeight =
        Math.min(height[cur], height[stack[stack.length - 1]]) - height[top];
      ret += distance * boundedHeight;
    }
    stack.push(cur++);
  }
  return ret;
};

// two pointers
var trap = function (height: number[]): number {
  let ret = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax
        ? (leftMax = height[left])
        : (ret += leftMax - height[left]);
      ++left;
    } else {
      height[right] >= rightMax
        ? (rightMax = height[right])
        : (ret += rightMax - height[right]);
      --right;
    }
  }
  return ret;
};
// @lc code=end
