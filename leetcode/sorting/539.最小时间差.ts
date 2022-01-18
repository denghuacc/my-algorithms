/*
 * @lc app=leetcode.cn id=539 lang=typescript
 *
 * [539] 最小时间差
 *
 * https://leetcode-cn.com/problems/minimum-time-difference/description/
 *
 * algorithms
 * Medium (64.01%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    23K
 * Total Submissions: 36K
 * Testcase Example:  '["23:59","00:00"]'
 *
 * 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：timePoints = ["23:59","00:00"]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：timePoints = ["00:00","23:59","00:00"]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * timePoints[i] 格式为 "HH:MM"
 *
 *
 */

// @lc code=start
function findMinDifference(timePoints: string[]): number {
  const n = timePoints.length;
  const maxLen = 24 * 60;
  // has some time point
  if (n > maxLen) {
    return 0;
  }
  timePoints.sort();
  let min = Infinity;
  for (let i = 0; i < n - 1; i++) {
    const diff = getDiff(timePoints[i], timePoints[i + 1]);
    min = Math.min(min, diff);
  }
  const diffOfFirstAndLast = maxLen - getDiff(timePoints[0], timePoints[n - 1]);

  return Math.min(min, diffOfFirstAndLast);

  function getDiff(time1: string, time2: string): number {
    const [h1, m1] = time1.split(":").map((s) => parseInt(s));
    const [h2, m2] = time2.split(":").map((s) => parseInt(s));
    const diff = (h2 - h1) * 60 + m2 - m1;
    return Math.abs(diff);
  }
}
// @lc code=end
