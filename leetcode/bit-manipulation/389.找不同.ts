/*
 * @lc app=leetcode.cn id=389 lang=typescript
 *
 * [389] 找不同
 *
 * https://leetcode-cn.com/problems/find-the-difference/description/
 *
 * algorithms
 * Easy (64.18%)
 * Likes:    183
 * Dislikes: 0
 * Total Accepted:    48.9K
 * Total Submissions: 74K
 * Testcase Example:  '"abcd"\n"abcde"'
 *
 * 给定两个字符串 s 和 t，它们只包含小写字母。
 *
 * 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
 *
 * 请找出在 t 中被添加的字母。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abcd", t = "abcde"
 * 输出："e"
 * 解释：'e' 是那个被添加的字母。
 *
 *
 * 示例 2：
 *
 * 输入：s = "", t = "y"
 * 输出："y"
 *
 *
 * 示例 3：
 *
 * 输入：s = "a", t = "aa"
 * 输出："a"
 *
 *
 * 示例 4：
 *
 * 输入：s = "ae", t = "aea"
 * 输出："a"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 1000
 * t.length == s.length + 1
 * s 和 t 只包含小写字母
 *
 *
 */

// @lc code=start
// sort
var findTheDifference = function (s: string, t: string): string {
  s = s.split("").sort().join("");
  t = t.split("").sort().join("");

  for (let i = 0; i < t.length; i++) {
    if (s[i] !== t[i]) {
      return t[i];
    }
  }

  return "";
};

// hash table
var findTheDifference = function (s: string, t: string): string {
  const mapS: Map<string, number> = new Map();
  const mapT: Map<string, number> = new Map();
  for (let i = 0; i < t.length; i++) {
    const cs = s[i];
    const ct = t[i];
    if (cs) mapS.set(cs, (mapS.get(cs) ?? 0) + 1);
    mapT.set(ct, (mapT.get(ct) ?? 0) + 1);
  }

  for (let i = 0; i < t.length; i++) {
    const ct = t[i];
    if (!mapS.has(ct)) {
      return ct;
    } else {
      if (mapS.get(ct) !== mapT.get(ct)) {
        return ct;
      }
    }
  }

  return "";
};

// counting
var findTheDifference = function (s: string, t: string): string {
  const cnt: number[] = new Array(26).fill(0);
  for (const ch of s) {
    cnt[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  for (const ch of t) {
    cnt[ch.charCodeAt(0) - "a".charCodeAt(0)]--;
    if (cnt[ch.charCodeAt(0) - "a".charCodeAt(0)] < 0) {
      return ch;
    }
  }
  return "";
};

// sum
var findTheDifference = function (s: string, t: string): string {
  let as = 0;
  let at = 0;
  for (let i = 0; i < s.length; i++) {
    as += s[i].charCodeAt(0);
  }
  for (let i = 0; i < t.length; i++) {
    at += t[i].charCodeAt(0);
  }
  return String.fromCharCode(at - as);
};

// bit manipulation
var findTheDifference = function (s: string, t: string): string {
  let ret = 0;
  for (const ch of s) {
    ret ^= ch.charCodeAt(0);
  }
  for (const ch of t) {
    ret ^= ch.charCodeAt(0);
  }
  return String.fromCharCode(ret);
};
// @lc code=end
