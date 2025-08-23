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
/**
 * 解法一：排序 + 哈希表
 * 核心思路：字母异位词排序后必定相同，以排序后的字符串作为key分组
 *
 * 算法步骤：
 * 1. 遍历每个字符串
 * 2. 将字符串按字母排序作为key
 * 3. 将原字符串添加到对应key的数组中
 * 4. 返回所有分组结果
 *
 * 时间复杂度：O(n * k * log k)，n为字符串数量，k为字符串平均长度
 * 空间复杂度：O(n * k)，存储所有字符串
 */
var groupAnagrams = function (strs: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const str of strs) {
    // 将字符串排序作为分组的key
    const sortedStr = str.split("").sort().join("");

    if (map.has(sortedStr)) {
      // 如果key已存在，将当前字符串添加到对应数组中
      const group = map.get(sortedStr)!;
      group.push(str);
    } else {
      // 如果key不存在，创建新的分组
      map.set(sortedStr, [str]);
    }
  }

  // 返回所有分组
  return [...map.values()];
};

/**
 * 解法二：字符计数 + 哈希表（优化版本）
 * 核心思路：用字符频次数组作为key，避免排序操作
 *
 * 算法步骤：
 * 1. 为每个字符串创建长度为26的频次数组
 * 2. 统计每个字符出现的次数
 * 3. 将频次数组转为字符串作为key
 * 4. 按key分组字符串
 *
 * 时间复杂度：O(n * k)，n为字符串数量，k为字符串平均长度
 * 空间复杂度：O(n * k)
 */
var groupAnagrams = function (strs: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const str of strs) {
    // 创建长度为26的字符频次数组，对应a-z
    const charCount: number[] = new Array(26).fill(0);

    // 统计每个字符的出现次数
    for (let i = 0; i < str.length; i++) {
      const charIndex = str.charCodeAt(i) - "a".charCodeAt(0);
      charCount[charIndex]++;
    }

    // 将频次数组转为字符串作为key
    const key = charCount.join(",");

    if (map.has(key)) {
      const group = map.get(key)!;
      group.push(str);
    } else {
      map.set(key, [str]);
    }
  }

  return [...map.values()];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 需要将具有相同字符但顺序不同的字符串分组
   - 字母异位词的特点是包含相同的字符和频次

2. 算法分析：
   - 时间复杂度：
     * 解法一：O(n * k * log k)，排序每个字符串需要O(k log k)
     * 解法二：O(n * k)，只需遍历每个字符一次
   - 空间复杂度：O(n * k)，存储哈希表和结果数组
   - 算法类型：哈希表 + 字符串处理

3. 实现要点：
   - 解法一使用排序：简单直观，但时间复杂度较高
   - 解法二使用字符计数：更高效，避免了排序操作
   - 关键数据结构：Map用于分组，数组用于字符计数
   - 边界情况：空字符串、单字符、全部字符相同

4. 优化思路：
   - 字符计数比排序更高效，特别是字符串较长时
   - 可以进一步优化：用质数乘积作为key（但可能溢出）
   - 对于ASCII字符，可以用位运算进一步优化
   - 预处理：如果字符串很多，可以先按长度分组
*/
