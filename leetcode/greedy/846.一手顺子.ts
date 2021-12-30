/*
 * @lc app=leetcode.cn id=846 lang=typescript
 *
 * [846] 一手顺子
 *
 * https://leetcode-cn.com/problems/hand-of-straights/description/
 *
 * algorithms
 * Medium (51.61%)
 * Likes:    140
 * Dislikes: 0
 * Total Accepted:    13K
 * Total Submissions: 24K
 * Testcase Example:  '[1,2,3,6,2,3,4,7,8]\n3'
 *
 * Alice 手中有一把牌，她想要重新排列这些牌，分成若干组，使每一组的牌数都是 groupSize ，并且由 groupSize 张连续的牌组成。
 *
 * 给你一个整数数组 hand 其中 hand[i] 是写在第 i 张牌，和一个整数 groupSize 。如果她可能重新排列这些牌，返回 true
 * ；否则，返回 false 。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
 * 输出：true
 * 解释：Alice 手中的牌可以被重新排列为 [1,2,3]，[2,3,4]，[6,7,8]。
 *
 * 示例 2：
 *
 *
 * 输入：hand = [1,2,3,4,5], groupSize = 4
 * 输出：false
 * 解释：Alice 手中的牌无法被重新排列成几个大小为 4 的组。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= hand.length <= 10^4
 * 0 <= hand[i] <= 10^9
 * 1 <= groupSize <= hand.length
 *
 *
 *
 *
 * 注意：此题目与 1296
 * 重复：https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/
 *
 */

// the same as 1296
// @lc code=start
// greedy
function isNStraightHand(hand: number[], groupSize: number): boolean {
  const n = hand.length;
  if (n % groupSize !== 0) {
    return false;
  }
  hand.sort((a, b) => a - b);
  const map: Map<number, number> = new Map();
  for (const num of hand) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  for (const x of hand) {
    if (!map.has(x)) {
      continue;
    }
    for (let y = 0; y < groupSize; y++) {
      const m = x + y;
      if (!map.has(m)) {
        return false;
      }
      map.set(m, map.get(m)! - 1);
      if (map.get(m)! === 0) {
        map.delete(m);
      }
    }
  }
  return true;
}
// @lc code=end
