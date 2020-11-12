/*
 * @lc app=leetcode.cn id=922 lang=typescript
 *
 * [922] 按奇偶排序数组 II
 *
 * https://leetcode-cn.com/problems/sort-array-by-parity-ii/description/
 *
 * algorithms
 * Easy (68.47%)
 * Likes:    143
 * Dislikes: 0
 * Total Accepted:    45.5K
 * Total Submissions: 65.6K
 * Testcase Example:  '[4,2,5,7]'
 *
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
 *
 * 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
 *
 * 你可以返回任何满足上述条件的数组作为答案。
 *
 *
 *
 * 示例：
 *
 * 输入：[4,2,5,7]
 * 输出：[4,5,2,7]
 * 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= A.length <= 20000
 * A.length % 2 == 0
 * 0 <= A[i] <= 1000
 *
 *
 *
 *
 */

// @lc code=start
// two points
var sortArrayByParityII = function (A: number[]): number[] {
  const n = A.length;
  let j = 1; // odd point

  // even point
  for (let i = 0; i < n; i += 2) {
    // num & 1 === num % 2
    if (A[i] & 1) {
      while (A[j] & 1) j += 2;
      [A[i], A[j]] = [A[j], A[i]]; // swap
    }
  }
  return A;
};

// two traverse
var sortArrayByParityII = function (A: number[]): number[] {
  const n = A.length;
  const ret: number[] = new Array(n);

  // even index
  let i = 0;
  for (const a of A) {
    if (!(a & 1)) {
      ret[i] = a;
      i += 2;
    }
  }

  // odd index
  i = 1;
  for (const a of A) {
    if (a & 1) {
      ret[i] = a;
      i += 2;
    }
  }

  return ret;
};
// @lc code=end
