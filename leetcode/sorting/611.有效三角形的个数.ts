/*
 * @lc app=leetcode.cn id=611 lang=typescript
 *
 * [611] 有效三角形的个数
 *
 * https://leetcode-cn.com/problems/valid-triangle-number/description/
 *
 * algorithms
 * Medium (48.67%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    21.6K
 * Total Submissions: 42.7K
 * Testcase Example:  '[2,2,3,4]'
 *
 * 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
 *
 * 示例 1:
 *
 *
 * 输入: [2,2,3,4]
 * 输出: 3
 * 解释:
 * 有效的组合是:
 * 2,3,4 (使用第一个 2)
 * 2,3,4 (使用第二个 2)
 * 2,2,3
 *
 *
 * 注意:
 *
 *
 * 数组长度不超过1000。
 * 数组里整数的范围为 [0, 1000]。
 *
 *
 */

// @lc code=start
// three traverse
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  let ret = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] > nums[k]) {
          ret++;
        }
      }
    }
  }
  return ret;
};

// sorting + binary search
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  let ret = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let l = j + 1;
      let r = n - 1;
      let k = j;
      while (l <= r) {
        const mid = Math.floor((r - l) / 2) + l;
        if (nums[i] + nums[j] > nums[mid]) {
          l = mid + 1;
          k = mid;
        } else {
          r = mid - 1;
        }
      }
      ret += k - j;
    }
  }
  return ret;
};

// sorting + two pointers
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  let ret = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    let k = i;
    for (let j = i + 1; j < n; j++) {
      while (k + 1 < n && nums[k + 1] < nums[i] + nums[j]) {
        k++;
      }
      ret += Math.max(k - j, 0);
    }
  }
  return ret;
};
// @lc code=end
