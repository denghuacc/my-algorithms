/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 *
 * https://leetcode-cn.com/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (68.41%)
 * Likes:    339
 * Dislikes: 0
 * Total Accepted:    40.5K
 * Total Submissions: 59.2K
 * Testcase Example:  '"aab"'
 *
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
 *
 * 返回 s 所有可能的分割方案。
 *
 * 示例:
 *
 * 输入: "aab"
 * 输出:
 * [
 *  ["aa","b"],
 *  ["a","a","b"]
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 分割回文串 - 回溯算法（基础版本）
 *
 * 核心思想：
 * 使用回溯算法，尝试在字符串的每个位置进行分割
 * 每次分割后检查子串是否为回文，如果是则继续递归
 */
function partition(s: string): string[][] {
  const n = s.length;
  const ret: string[][] = [];
  if (n === 0) return ret;

  dfs([], 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的分割方案
   * @param start - 当前要分割的起始位置
   */
  function dfs(subset: string[], start: number) {
    // 找到一个完整的分割方案
    if (start === n) {
      ret.push(subset.slice());
      return;
    }

    // 尝试从start开始的不同长度分割
    for (let i = start; i < n; i++) {
      // 检查s[start:i]是否为回文
      if (!checkPalindrome(s, start, i)) continue;

      subset.push(s.slice(start, i + 1));
      dfs(subset, i + 1); // 从i+1位置继续分割
      subset.pop(); // 回溯
    }
  }

  /**
   * 检查字符串的指定范围是否为回文
   * @param s - 要检查的字符串
   * @param left - 左边界
   * @param right - 右边界
   * @returns 是否为回文
   */
  function checkPalindrome(s: string, left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  }
}

/**
 * 分割回文串 - 回溯算法 + 动态规划优化
 *
 * 核心思想：
 * 使用动态规划预处理回文信息，避免重复计算
 * 在回溯过程中直接查询预计算的回文信息
 */
function partitionDP(s: string): string[][] {
  const n = s.length;
  const ret: string[][] = [];
  if (n === 0) return ret;

  // dp[i][j] 表示 s[i]~s[j] 是否是回文
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  // 动态规划预处理回文信息
  for (let right = 0; right < n; right++) {
    for (let left = 0; left <= right; left++) {
      // 状态转移方程：
      // 如果s[left] == s[right]且(left+1, right-1)是回文，则(left, right)是回文
      if (
        s[left] === s[right] &&
        (right - left <= 2 || dp[left + 1][right - 1])
      ) {
        dp[left][right] = true;
      }
    }
  }

  dfs([], 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的分割方案
   * @param start - 当前要分割的起始位置
   */
  function dfs(subset: string[], start: number) {
    // 找到一个完整的分割方案
    if (start === n) {
      ret.push(subset.slice());
      return;
    }

    // 尝试从start开始的不同长度分割
    for (let i = start; i < n; i++) {
      // 直接查询预计算的回文信息
      if (!dp[start][i]) continue;

      subset.push(s.slice(start, i + 1));
      dfs(subset, i + 1); // 从i+1位置继续分割
      subset.pop(); // 回溯
    }
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将字符串分割成若干个子串，每个子串都是回文
   - 需要找到所有可能的分割方案
   - 关键是如何高效判断子串是否为回文

2. 算法分析：
   - 时间复杂度：O(n * 2^n)，其中n是字符串长度
   - 空间复杂度：O(n)，递归深度为n
   - 算法类型：回溯算法 + 动态规划优化

3. 实现要点：
   - 回溯分割：尝试在每个位置进行分割
   - 回文检查：判断子串是否为回文
   - 动态规划：预处理回文信息避免重复计算
   - 状态转移：利用回文的性质进行状态转移

4. 两种实现方法对比：
   - 方法1：基础回溯，每次检查回文
   - 方法2：动态规划优化，预处理回文信息
   - 方法2在时间效率上更好，避免了重复计算

5. 动态规划优化原理：
   - dp[i][j]表示s[i]~s[j]是否为回文
   - 状态转移：如果s[i]==s[j]且dp[i+1][j-1]为true，则dp[i][j]为true
   - 边界条件：单个字符是回文，两个相同字符是回文

6. 优化思路：
   - 动态规划预处理：避免重复计算回文
   - 剪枝：提前退出不可能的分支
   - 空间优化：使用二维数组存储回文信息
   - 时间优化：O(1)时间查询回文信息

7. 关键技巧：
   - 回文检查：双指针法检查回文
   - 状态转移：利用回文的对称性质
   - 回溯分割：尝试所有可能的分割点
   - 边界处理：单个字符和两个字符的特殊情况

8. 复杂度分析：
   - 基础版本：每次检查回文需要O(n)时间
   - 优化版本：预处理O(n²)，查询O(1)
   - 总体复杂度：O(n * 2^n)，但常数因子更小
*/
