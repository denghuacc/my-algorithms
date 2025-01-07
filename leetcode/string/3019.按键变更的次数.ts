/*
 * @lc app=leetcode.cn id=3019 lang=typescript
 *
 * [3019] 按键变更的次数
 *
 * https://leetcode.cn/problems/number-of-changing-keys/description/
 *
 * algorithms
 * Easy (76.50%)
 * Likes:    16
 * Dislikes: 0
 * Total Accepted:    18.1K
 * Total Submissions: 21.7K
 * Testcase Example:  '"aAbBcC"'
 *
 * 给你一个下标从 0 开始的字符串 s ，该字符串由用户输入。按键变更的定义是：使用与上次使用的按键不同的键。例如 s = "ab" 表示按键变更一次，而
 * s = "bBBb" 不存在按键变更。
 *
 * 返回用户输入过程中按键变更的次数。
 *
 * 注意：shift 或 caps lock 等修饰键不计入按键变更，也就是说，如果用户先输入字母 'a' 然后输入字母 'A' ，不算作按键变更。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aAbBcC"
 * 输出：2
 * 解释：
 * 从 s[0] = 'a' 到 s[1] = 'A'，不存在按键变更，因为不计入 caps lock 或 shift 。
 * 从 s[1] = 'A' 到 s[2] = 'b'，按键变更。
 * 从 s[2] = 'b' 到 s[3] = 'B'，不存在按键变更，因为不计入 caps lock 或 shift 。
 * 从 s[3] = 'B' 到 s[4] = 'c'，按键变更。
 * 从 s[4] = 'c' 到 s[5] = 'C'，不存在按键变更，因为不计入 caps lock 或 shift 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "AaAaAaaA"
 * 输出：0
 * 解释： 不存在按键变更，因为这个过程中只按下字母 'a' 和 'A' ，不需要进行按键变更。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s 仅由英文大写字母和小写字母组成。
 *
 *
 */

// @lc code=start
var countKeyChanges = function (s: string): number {
  let cnt = 0;
  const n = s.length;
  for (let i = 1; i < n; i++) {
    if (change(s[i - 1], s[i])) {
      cnt++;
    }
  }
  return cnt;

  function change(a: string, b: string): boolean {
    return !(a === b || Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === 32);
  }
};

var countKeyChanges = function (s: string): number {
  let cnt = 0;
  const n = s.length;
  for (let i = 1; i < n; i++) {
    if (s[i].toUpperCase() !== s[i - 1].toUpperCase()) {
      cnt++;
    }
  }
  return cnt;
};
// @lc code=end
