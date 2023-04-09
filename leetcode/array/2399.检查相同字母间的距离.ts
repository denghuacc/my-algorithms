/*
 * @lc app=leetcode.cn id=2399 lang=typescript
 *
 * [2399] 检查相同字母间的距离
 *
 * https://leetcode.cn/problems/check-distances-between-same-letters/description/
 *
 * algorithms
 * Easy (72.10%)
 * Likes:    38
 * Dislikes: 0
 * Total Accepted:    19.9K
 * Total Submissions: 26.6K
 * Testcase Example:  '"abaccb"\n[1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'
 *
 * 给你一个下标从 0 开始的字符串 s ，该字符串仅由小写英文字母组成，s 中的每个字母都 恰好 出现 两次 。另给你一个下标从 0 开始、长度为 26
 * 的的整数数组 distance 。
 *
 * 字母表中的每个字母按从 0 到 25 依次编号（即，'a' -> 0, 'b' -> 1, 'c' -> 2, ... , 'z' -> 25）。
 *
 * 在一个 匀整 字符串中，第 i 个字母的两次出现之间的字母数量是 distance[i] 。如果第 i 个字母没有在 s 中出现，那么
 * distance[i] 可以 忽略 。
 *
 * 如果 s 是一个 匀整 字符串，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abaccb", distance =
 * [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 * 输出：true
 * 解释：
 * - 'a' 在下标 0 和下标 2 处出现，所以满足 distance[0] = 1 。
 * - 'b' 在下标 1 和下标 5 处出现，所以满足 distance[1] = 3 。
 * - 'c' 在下标 3 和下标 4 处出现，所以满足 distance[2] = 0 。
 * 注意 distance[3] = 5 ，但是由于 'd' 没有在 s 中出现，可以忽略。
 * 因为 s 是一个匀整字符串，返回 true 。
 *
 *
 * 示例 2：
 *
 * 输入：s = "aa", distance =
 * [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 * 输出：false
 * 解释：
 * - 'a' 在下标 0 和 1 处出现，所以两次出现之间的字母数量为 0 。
 * 但是 distance[0] = 1 ，s 不是一个匀整字符串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= s.length <= 52
 * s 仅由小写英文字母组成
 * s 中的每个字母恰好出现两次
 * distance.length == 26
 * 0 <= distance[i] <= 50
 *
 *
 */

// @lc code=start
var checkDistances = function (s: string, distance: number[]): boolean {
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const idx = ch.charCodeAt(0) - "a".charCodeAt(0);
    if (map.has(idx)) {
      const arr = map.get(idx)!;
      arr.push(i);
    } else {
      map.set(idx, [i]);
    }
  }
  for (let i = 0; i < distance.length; i++) {
    if (!map.has(i)) {
      continue;
    }
    const [start, end] = map.get(i)!;
    if (end - start - 1 !== distance[i]) {
      return false;
    }
  }
  return true;
};

var checkDistances = function (s: string, distance: number[]): boolean {
  const firstIndexes = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    const idx = s[i].charCodeAt(0) - "a".charCodeAt(0);
    if (firstIndexes[idx] !== 0 && i - firstIndexes[idx] !== distance[idx]) {
      return false;
    }
    firstIndexes[idx] = i + 1;
  }
  return true;
};
// @lc code=end
