/*
 * @lc app=leetcode.cn id=438 lang=typescript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Easy (34.77%)
 * Likes:    316
 * Dislikes: 0
 * Total Accepted:    31.5K
 * Total Submissions: 69.7K
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 *
 * 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。
 *
 * 说明：
 *
 *
 * 字母异位词指字母相同，但排列不同的字符串。
 * 不考虑答案输出的顺序。
 *
 *
 * 示例 1:
 *
 *
 * 输入:
 * s: "cbaebabacd" p: "abc"
 *
 * 输出:
 * [0, 6]
 *
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 *
 *
 * 示例 2:
 *
 *
 * 输入:
 * s: "abab" p: "ab"
 *
 * 输出:
 * [0, 1, 2]
 *
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
 *
 *
 */

export {};

// @lc code=start
/**
 * 找到字符串中所有字母异位词 - 滑动窗口解法
 *
 * 问题：在字符串s中找到所有p的字母异位词的起始索引
 * 字母异位词：字母相同但排列不同的字符串
 *
 * 核心思路：使用固定长度的滑动窗口，检查每个窗口是否与p构成异位词
 * 时间复杂度: O(|s| + |p|) - 每个字符最多访问两次
 * 空间复杂度: O(|p|) - 存储p中字符的频次
 */
function findAnagrams(s: string, p: string): number[] {
  const window: Map<string, number> = new Map(); // 滑动窗口内字符频次
  const needs: Map<string, number> = new Map(); // 目标字符串字符频次

  // 统计目标字符串p中各字符的频次
  for (const ch of p) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  const result: number[] = [];
  let left = 0; // 左指针
  let right = 0; // 右指针
  let match = 0; // 已完全匹配的字符种类数

  while (right < s.length) {
    // 扩展窗口：右指针字符加入窗口
    const rightChar = s[right];
    if (needs.has(rightChar)) {
      window.set(rightChar, (window.get(rightChar) ?? 0) + 1);
      // 当某个字符的频次达到需求时，匹配数+1
      if (window.get(rightChar) === needs.get(rightChar)) {
        match++;
      }
    }
    right++;

    // 收缩窗口：当窗口包含所有需要的字符时
    while (match === needs.size) {
      // 检查窗口长度是否等于目标字符串长度
      if (right - left === p.length) {
        result.push(left); // 找到一个异位词，记录起始位置
      }

      // 左指针字符移出窗口
      const leftChar = s[left];
      if (needs.has(leftChar)) {
        window.set(leftChar, window.get(leftChar)! - 1);
        // 当某个字符的频次不足时，匹配数-1
        if (window.get(leftChar)! < needs.get(leftChar)!) {
          match--;
        }
      }
      left++;
    }
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到字符串s中所有与字符串p构成字母异位词的子串
   - 字母异位词：字母相同但排列不同的字符串（如"abc"和"bca"）
   - 需要返回所有异位词子串的起始索引

2. 算法分析：
   - 时间复杂度：O(|s| + |p|) - 每个字符最多被访问两次
   - 空间复杂度：O(|p|) - 存储目标字符串的字符频次
   - 算法类型：滑动窗口 + 字符频次匹配

3. 实现要点：
   - 固定窗口长度：异位词长度必须与目标字符串相同
   - 字符频次匹配：窗口内字符频次必须完全等于目标字符串
   - match计数器：记录已完全匹配的字符种类数，提高效率

4. 算法步骤：
   - 预处理：统计目标字符串p的字符频次
   - 扩展窗口：右指针移动，加入新字符并更新频次
   - 检查匹配：当窗口包含所有字符且长度正确时，找到一个异位词
   - 收缩窗口：左指针移动，移除字符并更新频次

5. 关键观察：
   - 异位词判断：两个字符串的字符频次完全相同
   - 滑动窗口：避免重复计算，在O(n)时间内解决问题
   - 匹配优化：使用match计数器而不是每次比较所有字符频次

6. 相关问题：
   - 567. 字符串的排列：判断是否存在异位词子串
   - 76. 最小覆盖子串：寻找包含所有字符的最小子串
   - 这些问题都可以用相同的滑动窗口模板解决
*/
