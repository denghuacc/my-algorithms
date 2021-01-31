/*
 * @lc app=leetcode.cn id=839 lang=typescript
 *
 * [839] 相似字符串组
 *
 * https://leetcode-cn.com/problems/similar-string-groups/description/
 *
 * algorithms
 * Hard (37.16%)
 * Likes:    68
 * Dislikes: 0
 * Total Accepted:    5.3K
 * Total Submissions: 12.3K
 * Testcase Example:  '["tars","rats","arts","star"]'
 *
 * 如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y
 * 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。
 *
 * 例如，"tars" 和 "rats" 是相似的 (交换 0 与 2 的位置)； "rats" 和 "arts" 也是相似的，但是 "star" 不与
 * "tars"，"rats"，或 "arts" 相似。
 *
 * 总之，它们通过相似性形成了两个关联组：{"tars", "rats", "arts"} 和 {"star"}。注意，"tars" 和 "arts"
 * 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。
 *
 * 给你一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个字母异位词。请问 strs 中有多少个相似字符串组？
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["tars","rats","arts","star"]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["omv","ovm"]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * sum(strs[i].length)
 * strs[i] 只包含小写字母。
 * strs 中的所有单词都具有相同的长度，且是彼此的字母异位词。
 *
 *
 *
 *
 * 备注：
 *
 * 字母异位词（anagram），一种把某个字符串的字母的位置（顺序）加以改换所形成的新词。
 *
 */

// @lc code=start
// union find
function numSimilarGroups(strs: string[]): number {
  const n = strs.length;
  const m = strs[0].length;
  const f: number[] = new Array(n).fill(0).map((_, index) => index);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const fi = find(i);
      const fj = find(j);
      if (fi === fj) {
        continue;
      }
      if (check(strs[i], strs[j], m)) {
        f[fi] = fj;
      }
    }
  }

  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (f[i] === i) {
      ret++;
    }
  }
  return ret;

  function find(x: number): number {
    return f[x] === x ? x : (f[x] = find(f[x]));
  }

  function check(a: string, b: string, len: number): boolean {
    let num = 0;
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        num++;
        if (num > 2) {
          return false;
        }
      }
    }
    return true;
  }
}
// @lc code=end
