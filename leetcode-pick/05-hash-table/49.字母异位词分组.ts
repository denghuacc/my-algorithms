/*
 * @lc app=leetcode.cn id=49 lang=typescript
 *
 * [49] 字母异位词分组
 *
 * https://leetcode-cn.com/problems/group-anagrams/description/
 *
 * algorithms
 * Medium (53.39%)
 * Likes:    372
 * Dislikes: 0
 * Total Accepted:    82.3K
 * Total Submissions: 132.5K
 * Testcase Example:  '["eat","tea","tan","ate","nat","bat"]'
 *
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 *
 * 示例:
 *
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出:
 * [
 * ⁠ ["ate","eat","tea"],
 * ⁠ ["nat","tan"],
 * ⁠ ["bat"]
 * ]
 *
 * 说明：
 *
 *
 * 所有输入均为小写字母。
 * 不考虑答案输出的顺序。
 *
 *
 */

// @lc code=start
// hash table
var groupAnagrams = function (strs: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const str of strs) {
    const s = str.split("").sort().join(); // sort
    if (map.has(s)) {
      const val = map.get(s)!;
      val.push(str);
    } else {
      map.set(s, [str]);
    }
  }

  return [...map.values()];
};

// hash table 2
var groupAnagrams = function (strs: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const str of strs) {
    const arr: number[] = new Array(26).fill(0);

    for (let j = 0; j < str.length; j++) {
      arr[str.charCodeAt(j) - "a".charCodeAt(0)]++;
    }

    const key = arr.join();

    if (map.has(key)) {
      const val = map.get(key)!;
      val.push(str);
    } else {
      map.set(key, [str]);
    }
  }

  return [...map.values()];
};
// @lc code=end
