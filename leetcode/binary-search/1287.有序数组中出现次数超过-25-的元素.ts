/*
 * @lc app=leetcode.cn id=1287 lang=typescript
 *
 * [1287] 有序数组中出现次数超过25%的元素
 *
 * https://leetcode.cn/problems/element-appearing-more-than-25-in-sorted-array/description/
 *
 * algorithms
 * Easy (58.24%)
 * Likes:    106
 * Dislikes: 0
 * Total Accepted:    42.6K
 * Total Submissions: 72.2K
 * Testcase Example:  '[1,2,2,6,6,6,6,7,10]'
 *
 * 给你一个非递减的 有序 整数数组，已知这个数组中恰好有一个整数，它的出现次数超过数组元素总数的 25%。
 *
 * 请你找到并返回这个整数
 *
 *
 *
 * 示例：
 *
 *
 * 输入：arr = [1,2,2,6,6,6,6,7,10]
 * 输出：6
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 10^4
 * 0 <= arr[i] <= 10^5
 *
 *
 */

// @lc code=start
var findSpecialInteger = function (arr: number[]): number {
  const n = arr.length;
  let cnt = 0;
  let cur = -1;
  for (const num of arr) {
    if (cur !== num) {
      cur = num;
      cnt = 1;
    } else {
      cnt++;
      if (cnt > Math.floor(n / 4)) {
        break;
      }
    }
  }
  return cur;
};

var findSpecialInteger = function (arr: number[]): number {
  const n = arr.length;
  const span = Math.floor(n / 4);
  for (let i = 0; i < n; i += span) {
    const start = binarySearch(arr, arr[i]);
    const end = binarySearch(arr, arr[i] + 1);
    if (end - start > span) {
      return arr[i];
    }
  }
  return -1;

  function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let res = arr.length;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] >= target) {
        res = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return res;
  }
};
// @lc code=end
