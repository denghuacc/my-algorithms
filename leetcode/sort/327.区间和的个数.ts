/*
 * @lc app=leetcode.cn id=327 lang=typescript
 *
 * [327] 区间和的个数
 *
 * https://leetcode-cn.com/problems/count-of-range-sum/description/
 *
 * algorithms
 * Hard (37.66%)
 * Likes:    144
 * Dislikes: 0
 * Total Accepted:    6.5K
 * Total Submissions: 17.2K
 * Testcase Example:  '[-2,5,-1]\n-2\n2'
 *
 * 给定一个整数数组 nums，返回区间和在 [lower, upper] 之间的个数，包含 lower 和 upper。
 * 区间和 S(i, j) 表示在 nums 中，位置从 i 到 j 的元素之和，包含 i 和 j (i ≤ j)。
 *
 * 说明:
 * 最直观的算法复杂度是 O(n^2) ，请在此基础上优化你的算法。
 *
 * 示例:
 *
 * 输入: nums = [-2,5,-1], lower = -2, upper = 2,
 * 输出: 3
 * 解释: 3个区间分别是: [0,0], [2,2], [0,2]，它们表示的和分别为: -2, -1, 2。
 *
 *
 */

// @lc code=start
// merge sorting
function countRangeSum(nums: number[], lower: number, upper: number): number {
  let s = 0;
  const sum = [0]; // prefix sum
  for (const num of nums) {
    s += num;
    sum.push(s);
  }
  return countRangeSumRecursive(sum, 0, sum.length - 1);

  function countRangeSumRecursive(
    sum: number[],
    left: number,
    right: number
  ): number {
    if (left === right) {
      return 0;
    } else {
      const mid = Math.floor((left + right) / 2);
      const n1 = countRangeSumRecursive(sum, left, mid);
      const n2 = countRangeSumRecursive(sum, mid + 1, right);
      let ret = n1 + n2;

      // counting the number of pairs
      let i = left;
      let l = mid + 1;
      let r = mid + 1;
      while (i <= mid) {
        while (l <= right && sum[l] - sum[i] < lower) l++;
        while (r <= right && sum[r] - sum[i] <= upper) r++;
        ret += r - l;
        i++;
      }

      // merge the two sorted array
      const sorted: number[] = new Array(right - left + 1);
      let p = 0;
      let p1 = left;
      let p2 = mid + 1;
      while (p1 <= mid || p2 <= right) {
        if (p1 > mid) {
          sorted[p++] = sum[p2++];
        } else if (p2 > right) {
          sorted[p++] = sum[p1++];
        } else {
          if (sum[p1] < sum[p2]) {
            sorted[p++] = sum[p1++];
          } else {
            sorted[p++] = sum[p2++];
          }
        }
      }
      for (let i = 0; i < sorted.length; i++) {
        sum[left + i] = sorted[i];
      }
      return ret;
    }
  }
}
// @lc code=end
