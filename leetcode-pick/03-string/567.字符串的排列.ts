/*
 * @lc app=leetcode.cn id=567 lang=typescript
 *
 * [567] 字符串的排列
 *
 * https://leetcode-cn.com/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (31.59%)
 * Likes:    154
 * Dislikes: 0
 * Total Accepted:    34.2K
 * Total Submissions: 93.7K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
 *
 * 换句话说，第一个字符串的排列之一是第二个字符串的子串。
 *
 * 示例1:
 *
 *
 * 输入: s1 = "ab" s2 = "eidbaooo"
 * 输出: True
 * 解释: s2 包含 s1 的排列之一 ("ba").
 *
 *
 *
 *
 * 示例2:
 *
 *
 * 输入: s1= "ab" s2 = "eidboaoo"
 * 输出: False
 *
 *
 *
 *
 * 注意：
 *
 *
 * 输入的字符串只包含小写字母
 * 两个字符串的长度都在 [1, 10,000] 之间
 *
 *
 */

export {};

// @lc code=start
/**
 * 字符串的排列 - 滑动窗口解法
 *
 * 问题：判断s2是否包含s1的排列（即s1的字母异位词）
 * 排列：字母相同但顺序可能不同的字符串
 *
 * 核心思路：使用滑动窗口检查s2中是否存在与s1长度相同且字符频次完全匹配的子串
 * 时间复杂度: O(|s1| + |s2|) - 每个字符最多被访问两次
 * 空间复杂度: O(|s1|) - 存储s1中字符的频次
 */
function checkInclusion(s1: string, s2: string): boolean {
  const needs: Map<string, number> = new Map(); // s1中字符的频次
  const window: Map<string, number> = new Map(); // 滑动窗口中字符的频次

  // 统计目标字符串s1中各字符的频次
  for (const ch of s1) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let left = 0; // 左指针
  let right = 0; // 右指针
  let match = 0; // 已完全匹配的字符种类数

  while (right < s2.length) {
    // 扩展窗口：右指针字符加入窗口
    const rightChar = s2[right];
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
      // 检查窗口长度是否等于s1长度
      if (right - left === s1.length) {
        return true; // 找到s1的一个排列
      }

      // 左指针字符移出窗口
      const leftChar = s2[left];
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

  return false; // 未找到s1的排列
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断字符串s2是否包含字符串s1的排列（异位词）
   - 排列/异位词：相同字母不同排列的字符串
   - 实质上是在s2中寻找长度为len(s1)且字符频次完全相同的子串

2. 算法分析：
   - 时间复杂度：O(|s1| + |s2|) - 每个字符最多被访问两次
   - 空间复杂度：O(|s1|) - 存储字符频次的HashMap
   - 算法类型：滑动窗口 + 字符频次匹配

3. 实现要点：
   - 固定窗口大小：排列长度必须等于s1的长度
   - 字符频次完全匹配：窗口内每个字符的频次都要与s1相同
   - 早期返回：一旦找到符合条件的窗口就立即返回true

4. 算法步骤：
   - 预处理：统计s1中各字符的频次
   - 扩展窗口：右指针移动，更新窗口字符频次
   - 匹配判断：检查当前窗口是否包含所有需要的字符
   - 收缩窗口：当窗口有效且长度正确时返回true；否则移动左指针

5. 与相关问题的关系：
   - 438题(找所有异位词)：返回所有起始位置 vs 只判断是否存在
   - 76题(最小覆盖子串)：包含所有字符 vs 字符频次完全相同
   - 3题(无重复最长子串)：窗口内不重复 vs 窗口与目标匹配

6. 优化技巧：
   - 使用match计数器避免每次遍历所有字符
   - 只处理s1中出现的字符，忽略其他字符
   - 一旦发现不可能的情况就提前退出
*/
