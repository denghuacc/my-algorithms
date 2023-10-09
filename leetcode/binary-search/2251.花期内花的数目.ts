/*
 * @lc app=leetcode.cn id=2251 lang=typescript
 *
 * [2251] 花期内花的数目
 *
 * https://leetcode.cn/problems/number-of-flowers-in-full-bloom/description/
 *
 * algorithms
 * Hard (49.45%)
 * Likes:    90
 * Dislikes: 0
 * Total Accepted:    10.5K
 * Total Submissions: 20.6K
 * Testcase Example:  '[[1,6],[3,7],[9,12],[4,13]]\n[2,3,7,11]'
 *
 * 给你一个下标从 0 开始的二维整数数组 flowers ，其中 flowers[i] = [starti, endi] 表示第 i 朵花的 花期 从
 * starti 到 endi （都 包含）。同时给你一个下标从 0 开始大小为 n 的整数数组 people ，people[i] 是第 i
 * 个人来看花的时间。
 *
 * 请你返回一个大小为 n 的整数数组 answer ，其中 answer[i]是第 i 个人到达时在花期内花的 数目 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：flowers = [[1,6],[3,7],[9,12],[4,13]], people = [2,3,7,11]
 * 输出：[1,2,2,2]
 * 解释：上图展示了每朵花的花期时间，和每个人的到达时间。
 * 对每个人，我们返回他们到达时在花期内花的数目。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：flowers = [[1,10],[3,3]], people = [3,3,2]
 * 输出：[2,2,1]
 * 解释：上图展示了每朵花的花期时间，和每个人的到达时间。
 * 对每个人，我们返回他们到达时在花期内花的数目。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= flowers.length <= 5 * 10^4
 * flowers[i].length == 2
 * 1 <= starti <= endi <= 10^9
 * 1 <= people.length <= 5 * 10^4
 * 1 <= people[i] <= 10^9
 *
 *
 */

// @lc code=start
function fullBloomFlowers(flowers: number[][], people: number[]): number[] {
  const starts = flowers.map((flower) => flower[0]);
  const ends = flowers.map((flower) => flower[1]);
  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);
  const n = people.length;
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const p = people[i];
    res[i] = binarySearch(starts, p + 1) - binarySearch(ends, p);
  }
  return res;

  function binarySearch(arr: number[], target: number) {
    let res = arr.length;
    let left = 0;
    let right = arr.length - 1;
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
}
// @lc code=end
