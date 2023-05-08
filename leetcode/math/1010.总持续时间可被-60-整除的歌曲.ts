/*
 * @lc app=leetcode.cn id=1010 lang=typescript
 *
 * [1010] 总持续时间可被 60 整除的歌曲
 *
 * https://leetcode.cn/problems/pairs-of-songs-with-total-durations-divisible-by-60/description/
 *
 * algorithms
 * Medium (46.23%)
 * Likes:    270
 * Dislikes: 0
 * Total Accepted:    39.9K
 * Total Submissions: 80.4K
 * Testcase Example:  '[30,20,150,100,40]'
 *
 * 在歌曲列表中，第 i 首歌曲的持续时间为 time[i] 秒。
 *
 * 返回其总持续时间（以秒为单位）可被 60 整除的歌曲对的数量。形式上，我们希望下标数字 i 和 j 满足  i < j 且有 (time[i] +
 * time[j]) % 60 == 0。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：time = [30,20,150,100,40]
 * 输出：3
 * 解释：这三对的总持续时间可被 60 整除：
 * (time[0] = 30, time[2] = 150): 总持续时间 180
 * (time[1] = 20, time[3] = 100): 总持续时间 120
 * (time[1] = 20, time[4] = 40): 总持续时间 60
 *
 *
 * 示例 2：
 *
 *
 * 输入：time = [60,60,60]
 * 输出：3
 * 解释：所有三对的总持续时间都是 120，可以被 60 整除。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= time.length <= 6 * 10^4
 * 1 <= time[i] <= 500
 *
 *
 */

// @lc code=start
var numPairsDivisibleBy60 = function (time: number[]): number {
  const n = time.length;
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((time[i] + time[j]) % 60 === 0) {
        res++;
      }
    }
  }
  return res;
};

// math
var numPairsDivisibleBy60 = function (time: number[]): number {
  const cnt = new Array(60).fill(0);
  for (const t of time) {
    cnt[t % 60]++;
  }
  let res = 0;
  for (let i = 1; i < 30; i++) {
    res += cnt[i] * cnt[60 - i];
  }
  res += (cnt[0] * (cnt[0] - 1)) / 2 + (cnt[30] * (cnt[30] - 1)) / 2;
  return res;
};
// @lc code=end
