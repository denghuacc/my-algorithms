/*
 * @lc app=leetcode.cn id=845 lang=typescript
 *
 * [845] 数组中的最长山脉
 *
 * https://leetcode-cn.com/problems/longest-mountain-in-array/description/
 *
 * algorithms
 * Medium (36.54%)
 * Likes:    92
 * Dislikes: 0
 * Total Accepted:    9.4K
 * Total Submissions: 24.6K
 * Testcase Example:  '[2,1,4,7,3,2,5]'
 *
 * 我们把数组 A 中符合下列属性的任意连续子数组 B 称为 “山脉”：
 *
 *
 * B.length >= 3
 * 存在 0 < i < B.length - 1 使得 B[0] < B[1] < ... B[i-1] < B[i] > B[i+1] > ... >
 * B[B.length - 1]
 *
 *
 * （注意：B 可以是 A 的任意子数组，包括整个数组 A。）
 *
 * 给出一个整数数组 A，返回最长 “山脉” 的长度。
 *
 * 如果不含有 “山脉” 则返回 0。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[2,1,4,7,3,2,5]
 * 输出：5
 * 解释：最长的 “山脉” 是 [1,4,7,3,2]，长度为 5。
 *
 *
 * 示例 2：
 *
 * 输入：[2,2,2]
 * 输出：0
 * 解释：不含 “山脉”。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= A.length <= 10000
 * 0 <= A[i] <= 10000
 *
 *
 */

// @lc code=start
// dp -> enumerate peak
var longestMountain = function (A: number[]): number {
  const n = A.length;
  if (n === 0) return 0;

  // left half of mount
  const left: number[] = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    left[i] = A[i - 1] < A[i] ? left[i - 1] + 1 : 0;
  }

  // right half of mount
  const right: number[] = new Array(n).fill(0);
  for (let i = n - 2; i >= 0; i--) {
    right[i] = A[i + 1] < A[i] ? right[i + 1] + 1 : 0;
  }

  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (left[i] > 0 && right[i] > 0) {
      ret = Math.max(ret, left[i] + right[i] + 1);
    }
  }
  return ret;
};

// two pointers -> enumerate mountain bottom
var longestMountain = function (A: number[]): number {
  const n = A.length;
  let ret = 0;
  let left = 0;

  while (left + 2 < n) {
    let right = left + 1;
    if (A[left] < A[left + 1]) {
      // A[right] < A[right + 1] left half of mount
      while (right + 1 < n && A[right] < A[right + 1]) {
        right++;
      }
      if (right < n - 1 && A[right] > A[right + 1]) {
        // A[right] > A[right + 1] right half of mount
        while (right + 1 < n && A[right] > A[right + 1]) {
          right++;
        }
        ret = Math.max(ret, right - left + 1);
      } else {
        right++;
      }
    }
    left = right;
  }

  return ret;
};
// @lc code=end
