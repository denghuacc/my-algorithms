/*
 * @lc app=leetcode.cn id=1550 lang=typescript
 *
 * [1550] 存在连续三个奇数的数组
 *
 * https://leetcode.cn/problems/three-consecutive-odds/description/
 *
 * algorithms
 * Easy (65.71%)
 * Likes:    40
 * Dislikes: 0
 * Total Accepted:    38.8K
 * Total Submissions: 58.6K
 * Testcase Example:  '[2,6,4,1]'
 *
 * 给你一个整数数组 arr，请你判断数组中是否存在连续三个元素都是奇数的情况：如果存在，请返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [2,6,4,1]
 * 输出：false
 * 解释：不存在连续三个元素都是奇数的情况。
 *
 *
 * 示例 2：
 *
 * 输入：arr = [1,2,34,3,4,5,7,23,12]
 * 输出：true
 * 解释：存在连续三个元素都是奇数的情况，即 [5,7,23] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 1000
 * 1 <= arr[i] <= 1000
 *
 *
 */

// @lc code=start
var threeConsecutiveOdds = function (arr: number[]): boolean {
  const n = arr.length;
  for (let i = 1; i < n - 1; i++) {
    if (arr[i - 1] % 2 === 1 && arr[i] % 2 === 1 && arr[i + 1] % 2 === 1) {
      return true;
    }
  }
  return false;
};

var threeConsecutiveOdds = function (arr: number[]): boolean {
  const n = arr.length;
  for (let i = 1; i < n - 1; i++) {
    if (arr[i - 1] & 1 & (arr[i] & 1) & (arr[i + 1] & 1) & 1) {
      return true;
    }
  }
  return false;
};

// sliding window
var threeConsecutiveOdds = function (arr: number[]): boolean {
  const n = arr.length;
  let right = 0;
  let left = 0;
  while (right < n) {
    if ((arr[right] & 1) === 0) {
      left = right + 1;
    }
    if (right - left + 1 === 3) {
      return true;
    }
    right++;
  }
  return false;
};

// counting
var threeConsecutiveOdds = function (arr: number[]): boolean {
  let cnt = 0;
  for (const num of arr) {
    if (num & 1) {
      cnt++;
      if (cnt === 3) {
        return true;
      }
    } else {
      cnt = 0;
    }
  }
  return false;
};
// @lc code=end
