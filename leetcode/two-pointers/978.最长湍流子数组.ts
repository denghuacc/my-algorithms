/*
 * @lc app=leetcode.cn id=978 lang=typescript
 *
 * [978] 最长湍流子数组
 *
 * https://leetcode-cn.com/problems/longest-turbulent-subarray/description/
 *
 * algorithms
 * Medium (44.26%)
 * Likes:    94
 * Dislikes: 0
 * Total Accepted:    17K
 * Total Submissions: 38.4K
 * Testcase Example:  '[9,4,2,10,7,8,8,1,9]'
 *
 * 当 A 的子数组 A[i], A[i+1], ..., A[j] 满足下列条件时，我们称其为湍流子数组：
 *
 *
 * 若 i <= k < j，当 k 为奇数时， A[k] > A[k+1]，且当 k 为偶数时，A[k] < A[k+1]；
 * 或 若 i <= k < j，当 k 为偶数时，A[k] > A[k+1] ，且当 k 为奇数时， A[k] < A[k+1]。
 *
 *
 * 也就是说，如果比较符号在子数组中的每个相邻元素对之间翻转，则该子数组是湍流子数组。
 *
 * 返回 A 的最大湍流子数组的长度。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[9,4,2,10,7,8,8,1,9]
 * 输出：5
 * 解释：(A[1] > A[2] < A[3] > A[4] < A[5])
 *
 *
 * 示例 2：
 *
 * 输入：[4,8,12,16]
 * 输出：2
 *
 *
 * 示例 3：
 *
 * 输入：[100]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= A.length <= 40000
 * 0 <= A[i] <= 10^9
 *
 *
 */

// @lc code=start
// two pointers
var maxTurbulenceSize = function (arr: number[]): number {
  const n = arr.length;
  let ret = 1;
  let left = 0;
  let right = 0;

  while (right < n - 1) {
    if (left === right) {
      if (arr[left] === arr[left + 1]) {
        left++;
      }
      right++;
    } else {
      if (arr[right - 1] < arr[right] && arr[right] > arr[right + 1]) {
        right++;
      } else if (arr[right - 1] > arr[right] && arr[right] < arr[right + 1]) {
        right++;
      } else {
        left = right;
      }
    }
    ret = Math.max(ret, right - left + 1);
  }

  return ret;
};

// dp
var maxTurbulenceSize = function (arr: number[]): number {
  const n = arr.length;
  let ret = 1;
  let dp0 = 1;
  let dp1 = 1;

  for (let i = 1; i < n; i++) {
    if (arr[i - 1] > arr[i]) {
      dp0 = dp1 + 1;
      dp1 = 1;
    } else if (arr[i - 1] < arr[i]) {
      dp1 = dp0 + 1;
      dp0 = 1;
    } else {
      dp0 = 1;
      dp1 = 1;
    }
    ret = Math.max(ret, dp0);
    ret = Math.max(ret, dp1);
  }

  return ret;
};
// @lc code=end
