/*
 * @lc app=leetcode.cn id=1147 lang=typescript
 *
 * [1147] 段式回文
 *
 * https://leetcode.cn/problems/longest-chunked-palindrome-decomposition/description/
 *
 * algorithms
 * Hard (56.66%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    10.6K
 * Total Submissions: 18.1K
 * Testcase Example:  '"ghiabcdefhelloadamhelloabcdefghi"'
 *
 * 你会得到一个字符串 text 。你应该把它分成 k 个子字符串 (subtext1, subtext2，…， subtextk)
 * ，要求满足:
 *
 *
 * subtexti 是 非空 字符串
 * 所有子字符串的连接等于 text ( 即subtext1 + subtext2 + ... + subtextk == text )
 * 对于所有 i 的有效值( 即 1 <= i <= k ) ，subtexti == subtextk - i + 1 均成立
 *
 *
 * 返回k可能最大值。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：text = "ghiabcdefhelloadamhelloabcdefghi"
 * 输出：7
 * 解释：我们可以把字符串拆分成 "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)"。
 *
 *
 * 示例 2：
 *
 *
 * 输入：text = "merchant"
 * 输出：1
 * 解释：我们可以把字符串拆分成 "(merchant)"。
 *
 *
 * 示例 3：
 *
 *
 * 输入：text = "antaprezatepzapreanta"
 * 输出：11
 * 解释：我们可以把字符串拆分成 "(a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)"。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= text.length <= 1000
 * text 仅由小写英文字符组成
 *
 *
 */

// @lc code=start
// two pointers cv
function longestDecomposition(text: string): number {
  const n = text.length;
  let res = 0;
  let l = 0;
  let r = n - 1;
  while (l <= r) {
    let len = 1;
    while (l + len - 1 < r - len + 1) {
      if (judge(text, l, r - len + 1, len)) {
        res += 2;
        break;
      }
      len++;
    }
    if (l + len - 1 >= r - len + 1) {
      res++;
    }
    l += len;
    r -= len;
  }
  return res;

  function judge(text: string, l1: number, l2: number, len: number): boolean {
    while (len > 0) {
      if (text[l1] !== text[l2]) {
        return false;
      }
      l1++;
      l2++;
      len--;
    }
    return true;
  }
}
// @lc code=end
