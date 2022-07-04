/*
 * @lc app=leetcode.cn id=1200 lang=typescript
 *
 * [1200] 最小绝对差
 *
 * https://leetcode.cn/problems/minimum-absolute-difference/description/
 *
 * algorithms
 * Easy (71.61%)
 * Likes:    89
 * Dislikes: 0
 * Total Accepted:    30.4K
 * Total Submissions: 42.5K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 给你个整数数组 arr，其中每个元素都 不相同。
 *
 * 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [4,2,1,3]
 * 输出：[[1,2],[2,3],[3,4]]
 *
 *
 * 示例 2：
 *
 * 输入：arr = [1,3,6,10,15]
 * 输出：[[1,3]]
 *
 *
 * 示例 3：
 *
 * 输入：arr = [3,8,-10,23,19,-4,-14,27]
 * 输出：[[-14,-10],[19,23],[23,27]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= arr.length <= 10^5
 * -10^6 <= arr[i] <= 10^6
 *
 *
 */

// @lc code=start
function minimumAbsDifference(arr: number[]): number[][] {
  const n = arr.length;
  arr.sort((a, b) => a - b);
  let res: number[][] = [];
  let minDiff = Infinity;
  for (let i = 0; i < n; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff < minDiff) {
      res = [[arr[i - 1], arr[i]]];
      minDiff = diff;
    } else if (diff === minDiff) {
      res.push([arr[i - 1], arr[i]]);
    }
  }
  return res;
}
// @lc code=end
