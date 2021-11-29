/*
 * @lc app=leetcode.cn id=786 lang=typescript
 *
 * [786] 第 K 个最小的素数分数
 *
 * https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/description/
 *
 * algorithms
 * Hard (57.83%)
 * Likes:    124
 * Dislikes: 0
 * Total Accepted:    7.5K
 * Total Submissions: 13.2K
 * Testcase Example:  '[1,2,3,5]\n3'
 *
 * 给你一个按递增顺序排序的数组 arr 和一个整数 k 。数组 arr 由 1 和若干 素数  组成，且其中所有整数互不相同。
 *
 * 对于每对满足 0 < i < j < arr.length 的 i 和 j ，可以得到分数 arr[i] / arr[j] 。
 *
 * 那么第 k 个最小的分数是多少呢?  以长度为 2 的整数数组返回你的答案, 这里 answer[0] == arr[i] 且 answer[1] ==
 * arr[j] 。
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [1,2,3,5], k = 3
 * 输出：[2,5]
 * 解释：已构造好的分数,排序后如下所示:
 * 1/5, 1/3, 2/5, 1/2, 3/5, 2/3
 * 很明显第三个最小的分数是 2/5
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr = [1,7], k = 1
 * 输出：[1,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 * arr[0] == 1
 * arr[i] 是一个 素数 ，i > 0
 * arr 中的所有数字 互不相同 ，且按 严格递增 排序
 * 1
 *
 *
 */

// @lc code=start
// sort
var kthSmallestPrimeFraction = function (arr: number[], k: number): number[] {
  const n = arr.length;
  const frac: number[][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      frac.push([arr[i], arr[j]]);
    }
  }
  // a/b < c/d => a * d < b * c
  frac.sort((a, b) => a[0] * b[1] - a[1] * b[0]);
  return frac[k - 1];
};

// binary search
var kthSmallestPrimeFraction = function (arr: number[], k: number): number[] {
  const n = arr.length;
  let left = 0.0,
    right = 1.0;
  while (true) {
    const mid = (left + right) / 2;
    let i = -1;
    let count = 0;
    // 记录最大的分数
    let x = 0;
    let y = 1;

    for (let j = 1; j < n; j++) {
      while (arr[i + 1] / arr[j] < mid) {
        i++;
        if (arr[i] * y > arr[j] * x) {
          x = arr[i];
          y = arr[j];
        }
      }
      count += i + 1;
    }

    if (count === k) {
      return [x, y];
    }
    if (count < k) {
      left = mid;
    } else {
      right = mid;
    }
  }
};
// @lc code=end
