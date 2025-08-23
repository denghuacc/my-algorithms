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

/**
 * 暴力解法：对每个柱子，向左右扩展找到最大宽度
 * 时间复杂度：O(n²)，空间复杂度：O(1)
 */
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  if (len === 0) return 0;

  let ret = 0;
  for (let i = 0; i < len; i++) {
    const curHeight = heights[i];

    // 找左边最后一个大于等于当前高度的位置
    let left = i;
    while (left > 0 && heights[left - 1] >= curHeight) {
      left--;
    }

    // 找右边最后一个大于等于当前高度的位置
    let right = i;
    while (right < len - 1 && heights[right + 1] >= curHeight) {
      right++;
    }

    // 计算以当前高度为矩形高度的最大面积
    const width = right - left + 1;
    ret = Math.max(ret, width * curHeight);
  }

  return ret;
};

/**
 * 单调栈解法1：两次遍历分别找左右边界
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  const left: number[] = new Array(len); // left[i] 表示左边第一个小于 heights[i] 的位置
  const right: number[] = new Array(len); // right[i] 表示右边第一个小于 heights[i] 的位置

  // 第一次遍历：找每个位置左边第一个小于当前高度的位置
  const stack: number[] = [];
  for (let i = 0; i < len; i++) {
    // 维护递增的单调栈
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  // 第二次遍历：找每个位置右边第一个小于当前高度的位置
  stack.length = 0;
  for (let i = len - 1; i >= 0; i--) {
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    right[i] = stack.length ? stack[stack.length - 1] : len;
    stack.push(i);
  }

  // 计算最大面积
  let ret = 0;
  for (let i = 0; i < len; i++) {
    ret = Math.max(ret, (right[i] - left[i] - 1) * heights[i]);
  }
  return ret;
};

/**
 * 单调栈解法2：一次遍历同时处理左右边界
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var largestRectangleArea = function (heights: number[]): number {
  const len = heights.length;
  const left: number[] = new Array(len);
  const right: number[] = new Array(len).fill(len); // 默认右边界为len

  const stack: number[] = [];
  for (let i = 0; i < len; i++) {
    // 当前元素小于栈顶元素时，栈顶元素找到了右边界
    while (stack.length && heights[stack[stack.length - 1]] >= heights[i]) {
      const topIndex = stack[stack.length - 1];
      right[topIndex] = i; // 为栈顶元素设置右边界
      stack.pop();
    }

    // 为当前元素设置左边界
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

/*
解题思路详解：

1. 问题本质：
   - 在柱状图中找到能形成的最大矩形面积
   - 矩形的高度由最矮的柱子决定，宽度由连续的柱子数量决定
   - 核心是找到每个柱子能够扩展的最大宽度

2. 算法分析：
   暴力解法：
   - 时间复杂度：O(n²) - 对每个柱子都要向左右扩展
   - 空间复杂度：O(1)
   
   单调栈解法：
   - 时间复杂度：O(n) - 每个元素最多进栈出栈一次
   - 空间复杂度：O(n) - 栈空间和辅助数组
   - 算法类型：单调栈

3. 实现要点：
   - 对每个柱子，需要找到左边和右边第一个比它小的柱子位置
   - 这样就确定了以当前柱子高度为矩形高度时的最大宽度
   - 单调栈维护递增序列，当遇到更小元素时弹出并处理
   - 边界处理：左边界为-1，右边界为数组长度

4. 优化思路：
   - 方法1：两次遍历分别处理左右边界，逻辑清晰
   - 方法2：一次遍历同时处理，在弹栈时处理右边界，压栈时处理左边界
   - 核心优化：利用单调栈的性质，避免重复计算边界

5. 类似问题：
   - 84. 柱状图中最大的矩形
   - 85. 最大矩形（基于84题的思路）
   - 42. 接雨水（类似的单调栈应用）
*/
