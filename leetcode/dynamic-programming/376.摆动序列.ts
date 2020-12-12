/*
 * @lc app=leetcode.cn id=376 lang=typescript
 *
 * [376] 摆动序列
 *
 * https://leetcode-cn.com/problems/wiggle-subsequence/description/
 *
 * algorithms
 * Medium (43.58%)
 * Likes:    313
 * Dislikes: 0
 * Total Accepted:    34.4K
 * Total Submissions: 79K
 * Testcase Example:  '[1,7,4,9,2,5]'
 *
 * 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
 *
 * 例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。相反, [1,4,7,2,5] 和
 * [1,7,4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
 *
 * 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
 *
 * 示例 1:
 *
 * 输入: [1,7,4,9,2,5]
 * 输出: 6
 * 解释: 整个序列均为摆动序列。
 *
 *
 * 示例 2:
 *
 * 输入: [1,17,5,10,13,15,10,5,16,8]
 * 输出: 7
 * 解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
 *
 * 示例 3:
 *
 * 输入: [1,2,3,4,5,6,7,8,9]
 * 输出: 2
 *
 * 进阶:
 * 你能否用 O(n) 时间复杂度完成此题?
 *
 */

// @lc code=start
// dp1
var wiggleMaxLength = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return n;
  const up: number[] = new Array(n).fill(0);
  const down: number[] = new Array(n).fill(0);
  up[0] = down[0] = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up[i] = Math.max(up[i - 1], down[i - 1] + 1);
      down[i] = down[i - 1];
    } else if (nums[i] < nums[i - 1]) {
      down[i] = Math.max(down[i - 1], up[i - 1] + 1);
      up[i] = up[i - 1];
    } else {
      up[i] = up[i - 1];
      down[i] = down[i - 1];
    }
  }

  return Math.max(up[n - 1], down[n - 1]);
};

// dp2
var wiggleMaxLength = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return n;
  let up = 1;
  let down = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up = Math.max(up, down + 1);
    } else if (nums[i] < nums[i - 1]) {
      down = Math.max(down, up + 1);
    }
  }
  return Math.max(up, down);
};

// dp3
var wiggleMaxLength = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return n;
  let up = 1;
  let down = 1;
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      up = down + 1;
    } else if (nums[i] < nums[i - 1]) {
      down = up + 1;
    }
  }
  return Math.max(up, down);
};
// @lc code=end

// greedy
var wiggleMaxLength = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return n;
  let prevDiff = nums[1] - nums[0];
  let ret = prevDiff !== 0 ? 2 : 1;
  for (let i = 2; i < n; i++) {
    const diff = nums[i] - nums[i - 1];
    if ((diff > 0 && prevDiff <= 0) || (diff < 0 && prevDiff >= 0)) {
      ret++;
      prevDiff = diff;
    }
  }
  return ret;
};
