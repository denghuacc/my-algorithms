/*
 * @lc app=leetcode.cn id=646 lang=typescript
 *
 * [646] 最长数对链
 *
 * https://leetcode-cn.com/problems/maximum-length-of-pair-chain/description/
 *
 * algorithms
 * Medium (55.74%)
 * Likes:    108
 * Dislikes: 0
 * Total Accepted:    10.6K
 * Total Submissions: 18.9K
 * Testcase Example:  '[[1,2], [2,3], [3,4]]'
 *
 * 给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。
 *
 * 现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。
 *
 * 给定一个对数集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。
 *
 * 示例 :
 *
 *
 * 输入: [[1,2], [2,3], [3,4]]
 * 输出: 2
 * 解释: 最长的数对链是 [1,2] -> [3,4]
 *
 *
 * 注意：
 *
 *
 * 给出数对的个数在 [1, 1000] 范围内。
 *
 *
 */

// @lc code=start
// dp
var findLongestChain = function (pairs: number[][]): number {
  const n = pairs.length;
  pairs.sort((a, b) => a[0] - b[0]);

  // dp[i] -> 以 pairs[i] 结尾的最长链的长度
  const dp: number[] = new Array(n).fill(1);

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (pairs[i][1] < pairs[j][0]) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
  }

  let ret = 0;
  for (const x of dp) {
    if (x > ret) ret = x;
  }
  return ret;
};

// greedy
var findLongestChain = function (pairs: number[][]): number {
  pairs.sort((a, b) => a[1] - b[1]);
  let cur = -Infinity;
  let ret = 0;

  for (const pair of pairs) {
    if (cur < pair[0]) {
      cur = pair[1];
      ret++;
    }
  }

  return ret;
};
// @lc code=end
