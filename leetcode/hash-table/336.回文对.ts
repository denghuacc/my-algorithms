/*
 * @lc app=leetcode.cn id=336 lang=typescript
 *
 * [336] 回文对
 *
 * https://leetcode-cn.com/problems/palindrome-pairs/description/
 *
 * algorithms
 * Hard (34.50%)
 * Likes:    83
 * Dislikes: 0
 * Total Accepted:    5.6K
 * Total Submissions: 15.6K
 * Testcase Example:  '["abcd","dcba","lls","s","sssll"]'
 *
 * 给定一组唯一的单词， 找出所有不同 的索引对(i, j)，使得列表中的两个单词， words[i] + words[j] ，可拼接成回文串。
 *
 * 示例 1:
 *
 * 输入: ["abcd","dcba","lls","s","sssll"]
 * 输出: [[0,1],[1,0],[3,2],[2,4]]
 * 解释: 可拼接成的回文串为 ["dcbaabcd","abcddcba","slls","llssssll"]
 *
 *
 * 示例 2:
 *
 * 输入: ["bat","tab","cat"]
 * 输出: [[0,1],[1,0]]
 * 解释: 可拼接成的回文串为 ["battab","tabbat"]
 *
 */

// @lc code=start
// hash table
function palindromePairs(words: string[]): number[][] {
  const wordsRev: string[] = []; // 反转单词组
  const map: Map<string, number> = new Map(); // 反转单词 -> 索引
  const n = words.length;
  const ret: number[][] = [];

  for (const word of words) {
    wordsRev.push(word.split("").reverse().join(""));
  }

  for (let i = 0; i < n; i++) {
    map.set(wordsRev[i], i);
  }

  for (let i = 0; i < n; i++) {
    const word = words[i];
    const m = word.length;
    if (m === 0) continue;

    for (let j = 0; j <= m; j++) {
      if (isPalindrome(word, j, m - 1)) {
        const leftId = findWord(word, 0, j - 1);
        if (leftId !== -1 && leftId !== i) {
          ret.push([i, leftId]);
        }
      }

      if (j !== 0 && isPalindrome(word, 0, j - 1)) {
        const rightId = findWord(word, j, m - 1);
        if (rightId !== -1 && rightId !== i) {
          ret.push([rightId, i]);
        }
      }
    }
  }

  return ret;

  function isPalindrome(str: string, left: number, right: number): boolean {
    const len = right - left + 1;
    for (let i = 0; i < Math.floor(len / 2); i++) {
      if (str[left + 1] !== str[right - i]) {
        return false;
      }
    }
    return true;
  }

  function findWord(str: string, left: number, right: number): number {
    return map.get(str.substring(left, right + 1)) ?? -1;
  }
}
// @lc code=end
