/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 *
 * https://leetcode-cn.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (62.36%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    38.7K
 * Total Submissions: 61.4K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 *
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 *
 *
 *
 * 示例 1：
 *
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 *
 *
 * 示例 2：
 *
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 *
 *
 *
 * 提示：
 *
 *
 * 输入的字符串长度不会超过 1000 。
 *
 *
 */

// @lc code=start
/**
 * 回文子串 - 中心扩展法
 *
 * 问题：计算字符串中回文子串的数量
 * 回文串：正着读和倒着读都一样的字符串
 *
 * 时间复杂度: O(n²) - 每个中心最多扩展n次
 * 空间复杂度: O(1) - 只使用常数额外空间
 */
function countSubstrings(s: string): number {
  const n = s.length;
  let count = 0;

  // 遍历所有可能的回文中心（包括单字符中心和双字符中心）
  for (let i = 0; i < 2 * n - 1; i++) {
    // 计算左右指针的起始位置
    let left = Math.floor(i / 2); // 左指针
    let right = Math.floor(i / 2) + (i % 2); // 右指针

    // 从中心向两边扩展，统计回文子串
    while (left >= 0 && right < n && s[left] === s[right]) {
      count++; // 找到一个回文子串
      left--; // 向左扩展
      right++; // 向右扩展
    }
  }

  return count;
}

/**
 * 回文子串 - 动态规划解法
 *
 * 思路：使用二维DP表记录每个子串是否为回文串
 * 时间复杂度: O(n²) - 需要填充整个DP表
 * 空间复杂度: O(n²) - 存储DP表
 */
function countSubstringsDP(s: string): number {
  const n = s.length;
  let count = 0;

  // dp[i][j] 表示 s[i:j+1] 是否是回文串
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  // 按照子串长度从小到大填充DP表
  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      // 单个字符一定是回文串
      if (i === j) {
        dp[i][j] = true;
        count++;
      }
      // 两个相同字符是回文串
      else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true;
        count++;
      }
      // 多个字符：首尾相同且内部是回文串
      else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        count++;
      }
    }
  }

  return count;
}

/**
 * 动态规划简化版本
 *
 * 优化：合并条件判断，代码更简洁
 */
function countSubstringsDPSimplified(s: string): number {
  const n = s.length;
  let count = 0;

  // dp[i][j] 表示 s[i:j+1] 是否是回文串
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (i === j) {
        // 单字符回文
        dp[i][j] = true;
      } else if (s[i] === s[j]) {
        // 首尾字符相同时，检查内部是否为回文
        dp[i][j] = j - i === 1 || dp[i + 1][j - 1];
      }

      if (dp[i][j]) count++;
    }
  }

  return count;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 统计字符串中所有回文子串的数量
   - 回文串：正着读和倒着读完全相同的字符串
   - 注意：不同位置的相同子串被视为不同的回文子串

2. 方法一：中心扩展法
   - 算法分析：
     * 时间复杂度：O(n²) - n个中心，每个中心最多扩展n次
     * 空间复杂度：O(1) - 只使用常数额外空间
   - 核心思想：以每个字符（或字符间隙）为中心向两边扩展
   - 技巧：使用2n-1个中心点，包含奇数长度和偶数长度回文串

3. 方法二：动态规划
   - 算法分析：
     * 时间复杂度：O(n²) - 需要填充n×n的DP表
     * 空间复杂度：O(n²) - 存储DP表
   - 状态定义：dp[i][j] 表示子串 s[i:j+1] 是否为回文串
   - 状态转移：
     * 单字符：dp[i][i] = true
     * 两字符：dp[i][i+1] = (s[i] == s[i+1])
     * 多字符：dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]

4. 实现要点：
   - 中心扩展法：
     * 巧妙的索引映射：i//2 和 i//2 + i%2
     * 同时处理奇数和偶数长度的回文串
   - 动态规划：
     * 按照子串长度递增的顺序填充DP表
     * 确保在计算dp[i][j]时，dp[i+1][j-1]已经计算过

5. 算法比较：
   - 中心扩展法：空间效率高，代码简洁，推荐使用
   - 动态规划：思路清晰，便于理解状态转移过程
   - 两种方法时间复杂度相同，但中心扩展法空间复杂度更优

6. 相关问题：
   - 5. 最长回文子串：找到最长的回文子串
   - 125. 验证回文串：判断整个字符串是否为回文
   - 680. 验证回文串II：最多删除一个字符后判断是否为回文

7. 扩展思考：
   - Manacher算法：可以在O(n)时间内解决此类问题
   - 适用于需要频繁查询回文信息的场景
   - 但实现复杂度较高，面试中较少涉及
*/
