/*
 * @lc app=leetcode.cn id=1202 lang=typescript
 *
 * [1202] 交换字符串中的元素
 *
 * https://leetcode-cn.com/problems/smallest-string-with-swaps/description/
 *
 * algorithms
 * Medium (39.40%)
 * Likes:    103
 * Dislikes: 0
 * Total Accepted:    6.4K
 * Total Submissions: 16.2K
 * Testcase Example:  '"dcab"\n[[0,3],[1,2]]'
 *
 * 给你一个字符串 s，以及该字符串中的一些「索引对」数组 pairs，其中 pairs[i] = [a, b] 表示字符串中的两个索引（编号从 0
 * 开始）。
 *
 * 你可以 任意多次交换 在 pairs 中任意一对索引处的字符。
 *
 * 返回在经过若干次交换后，s 可以变成的按字典序最小的字符串。
 *
 *
 *
 * 示例 1:
 *
 * 输入：s = "dcab", pairs = [[0,3],[1,2]]
 * 输出："bacd"
 * 解释：
 * 交换 s[0] 和 s[3], s = "bcad"
 * 交换 s[1] 和 s[2], s = "bacd"
 *
 *
 * 示例 2：
 *
 * 输入：s = "dcab", pairs = [[0,3],[1,2],[0,2]]
 * 输出："abcd"
 * 解释：
 * 交换 s[0] 和 s[3], s = "bcad"
 * 交换 s[0] 和 s[2], s = "acbd"
 * 交换 s[1] 和 s[2], s = "abcd"
 *
 * 示例 3：
 *
 * 输入：s = "cba", pairs = [[0,1],[1,2]]
 * 输出："abc"
 * 解释：
 * 交换 s[0] 和 s[1], s = "bca"
 * 交换 s[1] 和 s[2], s = "bac"
 * 交换 s[0] 和 s[1], s = "abc"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * 0 <= pairs.length <= 10^5
 * 0 <= pairs[i][0], pairs[i][1] < s.length
 * s 中只含有小写英文字母
 *
 *
 */

// @lc code=start
// union find
function smallestStringWithSwaps(s: string, pairs: number[][]): string {
  const fa: number[] = new Array(1000010).fill(0);
  const n = s.length;

  for (let i = 0; i < n; i++) {
    fa[i] = i;
  }

  for (let i = 0; i < pairs.length; i++) {
    const [x, y] = pairs[i];
    const ux = find(x);
    const uy = find(y);
    if (ux ^ uy) {
      fa[ux] = uy;
    }
  }

  const vec: string[][] = Array.from(new Array(n), () => new Array());
  for (let i = 0; i < n; i++) {
    fa[i] = find(i);
    vec[fa[i]].push(s[i]);
  }

  for (let i = 0; i < n; i++) {
    if (vec[i].length > 0) {
      vec[i].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    }
  }

  const p: number[] = new Array(n).fill(0);
  const ret: string[] = [];
  for (let i = 0; i < n; i++) {
    ret.push("1");
  }

  for (let i = 0; i < n; i++) {
    ret[i] = vec[fa[i]][p[fa[i]]];
    p[fa[i]]++;
  }

  return ret.join("");

  function find(x: number): number {
    return x === fa[x] ? x : (fa[x] = find(fa[x]));
  }
}
// @lc code=end
