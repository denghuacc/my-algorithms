/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 *
 * https://leetcode-cn.com/problems/container-with-most-water/description/
 *
 * algorithms
 * Medium (51.85%)
 * Likes:    1258
 * Dislikes: 0
 * Total Accepted:    169.3K
 * Total Submissions: 271.6K
 * Testcase Example:  '[1,8,6,2,5,4,8,3,7]'
 *
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为
 * (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 *
 * 说明：你不能倾斜容器，且 n 的值至少为 2。
 *
 *
 *
 *
 *
 * 图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 *
 *
 *
 * 示例：
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 *
 */

// @lc code=start
// two pointers
var maxArea = function (height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left); // 高 * 宽
    max = Math.max(max, area);

    // 改变最短高度
    if (height[left] <= height[right]) {
      ++left;
    } else {
      --right;
    }
  }
  return max;
};

// brute force
var maxArea = function (height: number[]): number {
  let ret = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let max = Math.min(height[i], height[j]) * (j - i); // 高 * 宽
      if (max > ret) {
        ret = max;
      }
    }
  }

  return ret;
};
// @lc code=end
