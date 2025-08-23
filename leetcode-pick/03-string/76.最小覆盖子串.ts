/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode-cn.com/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (32.75%)
 * Likes:    617
 * Dislikes: 0
 * Total Accepted:    59.1K
 * Total Submissions: 155.3K
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。
 *
 * 示例：
 *
 * 输入: S = "ADOBECODEBANC", T = "ABC"
 * 输出: "BANC"
 *
 * 说明：
 *
 *
 * 如果 S 中不存这样的子串，则返回空字符串 ""。
 * 如果 S 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 */

// @lc code=start
/**
 * 最小覆盖子串 - 滑动窗口解法
 *
 * 问题：在字符串S中找到包含字符串T所有字符的最小子串
 * 核心思路：使用滑动窗口，先扩展窗口直到包含所有字符，再收缩窗口寻找最小长度
 */

/**
 * 方法一：滑动窗口 + 字符匹配计数
 *
 * 时间复杂度: O(|S| + |T|) - 每个字符最多被访问两次
 * 空间复杂度: O(|S| + |T|) - 存储窗口和需求字符的频次
 */
function minWindow(s: string, t: string): string {
  const window: Map<string, number> = new Map(); // 窗口内字符频次
  const needs: Map<string, number> = new Map(); // 目标字符频次

  // 统计目标字符串t中各字符的频次
  for (const ch of t) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let start = 0; // 最小窗口的起始位置
  let minLen = Infinity; // 最小窗口长度
  let left = 0; // 左指针
  let right = 0; // 右指针
  let match = 0; // 已匹配的字符种类数量

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
      // 更新最小窗口
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
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

  return minLen === Infinity ? "" : s.slice(start, start + minLen);
}

/**
 * 方法二：滑动窗口 + 直接检查覆盖性
 *
 * 思路：每次移动指针后直接检查当前窗口是否覆盖目标字符串
 * 时间复杂度: O(|S| * |T|) - 每次都要检查所有目标字符
 * 空间复杂度: O(|S| + |T|)
 */
function minWindowV2(s: string, t: string): string {
  const needs: Map<string, number> = new Map();
  const window: Map<string, number> = new Map();

  // 统计目标字符频次
  for (const ch of t) {
    needs.set(ch, (needs.get(ch) ?? 0) + 1);
  }

  let left = 0;
  let right = -1;
  let minLen = Number.MAX_SAFE_INTEGER;
  let resultLeft = -1;
  let resultRight = -1;

  while (right < s.length) {
    right++;
    const rightChar = s[right];

    // 扩展窗口
    if (right < s.length && needs.has(rightChar)) {
      window.set(rightChar, (window.get(rightChar) ?? 0) + 1);
    }

    // 检查并收缩窗口
    while (checkCoverage() && left <= right) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        resultLeft = left;
        resultRight = left + minLen;
      }

      const leftChar = s[left];
      if (needs.has(leftChar)) {
        window.set(leftChar, window.get(leftChar)! - 1);
      }
      left++;
    }
  }

  return resultLeft === -1 ? "" : s.slice(resultLeft, resultRight);

  // 检查当前窗口是否覆盖目标字符串
  function checkCoverage(): boolean {
    for (const [char, needCount] of needs.entries()) {
      if ((window.get(char) ?? 0) < needCount) {
        return false;
      }
    }
    return true;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在字符串S中找到包含字符串T所有字符的最小子串
   - 关键是要包含T中所有字符（包括重复字符）
   - 这是滑动窗口的典型应用场景

2. 算法分析：
   - 时间复杂度：O(|S| + |T|) - 每个字符最多被访问两次
   - 空间复杂度：O(|S| + |T|) - HashMap存储字符频次
   - 算法类型：滑动窗口 + 双指针 + 字符频次统计

3. 实现要点：
   - 使用两个HashMap：needs记录目标字符频次，window记录窗口字符频次
   - match变量记录已完全匹配的字符种类数，避免每次都遍历检查
   - 先扩展窗口(右指针)直到包含所有字符，再收缩窗口(左指针)寻找最小值

4. 算法步骤：
   - 右指针扩展：加入新字符，更新窗口状态
   - 检查匹配：当某字符频次达到需求时，match++
   - 左指针收缩：当窗口有效时，尝试缩小窗口并更新答案
   - 更新匹配：当某字符频次不足时，match--

5. 优化要点：
   - 使用match计数器避免频繁检查所有字符
   - 只处理目标字符串中存在的字符，其他字符直接跳过
   - 及时更新最小窗口的起始位置和长度

6. 常见错误：
   - 边界条件：空字符串的处理
   - 重复字符：必须考虑字符的频次，不能只看存在性
   - 窗口维护：移动指针时要正确更新窗口状态
*/
