/**
 * 
给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

示例 1：
输入: s1 = "abc", s2 = "bca"
输出: true 

示例 2：
输入: s1 = "abc", s2 = "bad"
输出: false

说明：
0 <= len(s1) <= 100
0 <= len(s2) <= 100

说明：

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/check-permutation-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// sorting
var CheckPermutation = function (s1: string, s2: string): boolean {
  const sortedS1 = s1.split("").sort().join("");
  const sortedS2 = s2.split("").sort().join("");
  return sortedS1 === sortedS2;
};

// hash table
var CheckPermutation = function (s1: string, s2: string): boolean {
  const map: Map<string, number> = new Map();
  for (const ch of s1) {
    map.set(ch, (map.get(ch) ?? 0) + 1);
  }
  for (const ch of s2) {
    if (map.has(ch)) {
      map.set(ch, (map.get(ch) ?? 0) - 1);
      if (map.get(ch)! < 0) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};
