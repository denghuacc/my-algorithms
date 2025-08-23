/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (67.96%)
 * Likes:    1012
 * Dislikes: 0
 * Total Accepted:    125.4K
 * Total Submissions: 166.4K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例：
 *
 * 输入：n = 3
 * 输出：[
 *       "((()))",
 *       "(()())",
 *       "(())()",
 *       "()(())",
 *       "()()()"
 *     ]
 *
 *
 */

export {};

// @lc code=start
/**
 * 括号生成 - 回溯算法（基础版本）
 *
 * 核心思想：
 * 使用回溯算法，在每一步选择添加左括号或右括号
 * 通过约束条件确保生成的括号序列有效
 */
function generateParenthesis(n: number): string[] {
  const ret: string[] = [];
  dfs("", 0, 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的括号序列
   * @param open - 已使用的左括号数量
   * @param close - 已使用的右括号数量
   */
  function dfs(subset: string, open: number, close: number) {
    // 找到一个完整的有效括号序列
    if (subset.length === n * 2) {
      ret.push(subset);
      return;
    }

    // 如果左括号数量小于n，可以添加左括号
    if (open < n) {
      subset += "(";
      dfs(subset, open + 1, close);
      subset = subset.slice(0, -1); // 回溯：移除最后一个字符
    }

    // 如果右括号数量小于左括号数量，可以添加右括号
    if (open > close) {
      subset += ")";
      dfs(subset, open, close + 1);
      subset = subset.slice(0, -1); // 回溯：移除最后一个字符
    }
  }
}

/**
 * 括号生成 - 递归算法（分治版本）
 *
 * 核心思想：
 * 使用分治思想，将问题分解为子问题
 * 对于n对括号，可以分解为(左部分)右部分的形式
 */
function generateParenthesisRecursive(n: number): string[] {
  const cache: string[][] = []; // 记忆化缓存
  return generate(n);

  /**
   * 递归生成函数
   * @param n - 要生成的括号对数
   * @returns 所有有效的括号组合
   */
  function generate(n: number): string[] {
    // 如果已经计算过，直接返回缓存结果
    if (cache[n] != null) return cache[n];

    const ret: string[] = [];

    if (n === 0) {
      // 基础情况：0对括号，返回空字符串
      ret.push("");
    } else {
      // 对于n对括号，可以分解为(左部分)右部分的形式
      // 其中左部分有i对括号，右部分有n-1-i对括号
      for (let i = 0; i < n; i++) {
        for (const left of generate(i)) {
          for (const right of generate(n - 1 - i)) {
            ret.push("(" + left + ")" + right);
          }
        }
      }
    }

    cache[n] = ret; // 缓存结果
    return ret;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 生成n对括号的所有有效组合
   - 有效括号序列：左括号和右括号数量相等，且任意前缀中左括号数量不少于右括号数量
   - 组合数量为卡特兰数：C(2n,n)/(n+1)

2. 算法分析：
   - 时间复杂度：O(4^n/√n)，卡特兰数的增长速度
   - 空间复杂度：O(n)，递归深度为n
   - 算法类型：回溯算法 / 分治算法

3. 实现要点：
   - 约束条件：左括号数量不超过n，右括号数量不超过左括号数量
   - 回溯剪枝：通过约束条件避免无效分支
   - 分治思想：将问题分解为子问题
   - 记忆化：避免重复计算

4. 两种实现方法对比：
   - 方法1：回溯算法，直接构建括号序列
   - 方法2：分治算法，通过子问题组合
   - 方法2使用记忆化，避免重复计算

5. 回溯算法原理：
   - 在每一步选择添加左括号或右括号
   - 约束条件确保生成的序列有效
   - 当序列长度达到2n时，找到一个有效组合

6. 分治算法原理：
   - 对于n对括号，可以表示为(左部分)右部分
   - 左部分有i对括号，右部分有n-1-i对括号
   - 递归生成左右两部分，然后组合

7. 优化思路：
   - 约束剪枝：提前退出无效分支
   - 记忆化：避免重复计算子问题
   - 字符串操作：使用slice进行回溯
   - 缓存优化：存储已计算的结果

8. 关键技巧：
   - 约束条件：open < n 和 open > close
   - 回溯恢复：使用slice(0, -1)移除字符
   - 分治分解：将问题分解为子问题
   - 记忆化：使用数组缓存结果

9. 复杂度分析：
   - 回溯版本：O(4^n/√n)，但实际运行时间更短
   - 分治版本：O(4^n/√n)，但常数因子更小
   - 空间复杂度：O(n)，递归深度
*/
