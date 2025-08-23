/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (27.86%)
 * Likes:    3405
 * Dislikes: 0
 * Total Accepted:    415.5K
 * Total Submissions: 1.2M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1:
 *
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 */

// @lc code=start

/**
 * 无重复字符的最长子串 - 滑动窗口解法
 *
 * 滑动窗口模板：
 * 1. 右指针不断扩展窗口，加入新字符
 * 2. 当窗口不满足条件时，左指针收缩窗口
 * 3. 在每个有效窗口处更新答案
 */

/**
 * 方法一：滑动窗口 + HashMap统计字符频次
 *
 * 时间复杂度: O(n) - 每个字符最多被访问两次
 * 空间复杂度: O(min(m, n)) - m是字符集大小
 */
function lengthOfLongestSubstring(s: string): number {
  const n = s.length;
  const window: Map<string, number> = new Map(); // 窗口内字符频次
  let left = 0;
  let right = 0;
  let maxLen = 0;

  while (right < n) {
    // 扩展窗口：右指针字符加入窗口
    const rightChar = s[right];
    window.set(rightChar, (window.get(rightChar) ?? 0) + 1);
    right++;

    // 收缩窗口：当出现重复字符时，移动左指针
    while (window.get(rightChar)! > 1) {
      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar)! - 1);
      left++;
    }

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left);
  }

  return maxLen;
}

/**
 * 方法二：滑动窗口 + Set去重
 *
 * 思路：使用Set来判断字符是否重复，更直观
 * 时间复杂度: O(n) - 每个字符最多被访问两次
 * 空间复杂度: O(min(m, n)) - m是字符集大小
 */
function lengthOfLongestSubstringV2(s: string): number {
  const n = s.length;
  const charSet = new Set<string>(); // 记录窗口内的字符
  let right = -1; // 右指针，初始值为-1
  let maxLen = 0;

  for (let left = 0; left < n; left++) {
    // 左指针右移时，移除前一个字符
    if (left !== 0) {
      charSet.delete(s[left - 1]);
    }

    // 右指针不断右移，直到遇到重复字符
    while (right + 1 < n && !charSet.has(s[right + 1])) {
      charSet.add(s[right + 1]);
      right++;
    }

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到字符串中不含重复字符的最长连续子串
   - 关键是维护一个"滑动窗口"，保证窗口内没有重复字符

2. 算法分析：
   - 时间复杂度：O(n) - 每个字符最多被左右指针各访问一次
   - 空间复杂度：O(min(m, n)) - m是字符集大小，n是字符串长度
   - 算法类型：滑动窗口 + 双指针

3. 实现要点：
   - 滑动窗口核心：右指针扩展，左指针收缩
   - 使用HashMap记录字符频次，或使用Set记录字符存在性
   - 当窗口内出现重复字符时，移动左指针直到消除重复

4. 优化思路：
   - 方法一使用HashMap：可以精确控制字符频次
   - 方法二使用Set：代码更简洁，逻辑更清晰
   - 还可以使用HashMap记录字符最后出现位置，实现跳跃式优化

5. 滑动窗口模板：
   - 这是一个经典的滑动窗口问题模板
   - 类似问题：最小覆盖子串、字符串排列等
   - 核心思想：维护窗口的有效性，动态调整窗口大小
*/
