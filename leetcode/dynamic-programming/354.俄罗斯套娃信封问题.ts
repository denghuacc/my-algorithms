/*
 * @lc app=leetcode.cn id=354 lang=typescript
 *
 * [354] 俄罗斯套娃信封问题
 *
 * https://leetcode-cn.com/problems/russian-doll-envelopes/description/
 *
 * algorithms
 * Hard (30.15%)
 * Likes:    165
 * Dislikes: 0
 * Total Accepted:    13.1K
 * Total Submissions: 36.3K
 * Testcase Example:  '[[5,4],[6,4],[6,7],[2,3]]'
 *
 * 给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h)
 * 出现。当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
 *
 * 请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
 *
 * 说明:
 * 不允许旋转信封。
 *
 * 示例:
 *
 * 输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
 * 输出: 3
 * 解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
 *
 *
 */

// @lc code=start
// dp
function maxEnvelopes(envelopes: number[][]): number {
  const n = envelopes.length;

  // 排序 -> w 不同 w 升序，w 相同 h 降序（取大值）
  envelopes.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));

  const heights: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    heights[i] = envelopes[i][1]; // 取高度 h
  }

  return lengthOfLIS(heights); // 转化为求最长递增子序列的长度

  // leetcode 300
  function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;

    const dp: number[] = new Array(nums.length);
    dp[0] = 1;
    let len = 1;

    for (let i = 1; i < dp.length; i++) {
      let maxVal = 0;
      for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
          maxVal = Math.max(maxVal, dp[j]);
        }
      }
      dp[i] = maxVal + 1;
      len = Math.max(len, dp[i]);
    }

    return len;
  }
}
// @lc code=end
