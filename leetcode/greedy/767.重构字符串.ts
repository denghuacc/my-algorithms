/*
 * @lc app=leetcode.cn id=767 lang=typescript
 *
 * [767] 重构字符串
 *
 * https://leetcode-cn.com/problems/reorganize-string/description/
 *
 * algorithms
 * Medium (44.18%)
 * Likes:    162
 * Dislikes: 0
 * Total Accepted:    13.6K
 * Total Submissions: 30.9K
 * Testcase Example:  '"aab"'
 *
 * 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
 *
 * 若可行，输出任意可行的结果。若不可行，返回空字符串。
 *
 * 示例 1:
 *
 *
 * 输入: S = "aab"
 * 输出: "aba"
 *
 *
 * 示例 2:
 *
 *
 * 输入: S = "aaab"
 * 输出: ""
 *
 *
 * 注意:
 *
 *
 * S 只包含小写字母并且长度在[1, 500]区间内。
 *
 *
 */

// @lc code=start
// greedy
function reorganizeString(S: string): string {
  const length = S.length;
  if (length < 2) return S;
  const counts: number[] = new Array(26).fill(0);
  let maxCount = 0;

  for (let i = 0; i < length; i++) {
    const c = S[i];
    counts[getIdx(c)]++;
    maxCount = Math.max(maxCount, counts[getIdx(c)]);
  }

  if (maxCount > Math.floor((length + 1) / 2)) return "";
  const newStrArr: string[] = new Array(length);
  let eventIdx = 0;
  let oddIdx = 1;
  const halfLength = Math.floor(length / 2);

  for (let i = 0; i < 26; i++) {
    const c = getAlpha(i);
    while (counts[i] > 0 && counts[i] <= halfLength && oddIdx < length) {
      newStrArr[oddIdx] = c;
      counts[i]--;
      oddIdx += 2;
    }
    while (counts[i] > 0) {
      newStrArr[eventIdx] = c;
      counts[i]--;
      eventIdx += 2;
    }
  }

  return newStrArr.join("");

  function getIdx(c: string) {
    return c.charCodeAt(0) - "a".charCodeAt(0);
  }

  function getAlpha(idx: number) {
    return String.fromCharCode(idx + "a".charCodeAt(0));
  }
}
// @lc code=end
