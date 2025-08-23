/*
 * @lc app=leetcode.cn id=873 lang=typescript
 *
 * [873] 最长的斐波那契子序列的长度
 *
 * https://leetcode.cn/problems/length-of-longest-fibonacci-subsequence/description/
 *
 * algorithms
 * Medium (54.50%)
 * Likes:    312
 * Dislikes: 0
 * Total Accepted:    35.3K
 * Total Submissions: 64.2K
 * Testcase Example:  '[1,2,3,4,5,6,7,8]'
 *
 * 如果序列 X_1, X_2, ..., X_n 满足下列条件，就说它是 斐波那契式 的：
 *
 *
 * n >= 3
 * 对于所有 i + 2 ，都有 X_i + X_{i+1} = X_{i+2}
 *
 *
 * 给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。
 *
 * （回想一下，子序列是从原序列 arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如， [3, 5, 8]
 * 是 [3, 4, 5, 6, 7, 8] 的一个子序列）
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: arr = [1,2,3,4,5,6,7,8]
 * 输出: 5
 * 解释: 最长的斐波那契式子序列为 [1,2,3,5,8] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入: arr = [1,3,7,11,12,14,18]
 * 输出: 3
 * 解释: 最长的斐波那契式子序列有 [1,11,12]、[3,11,14] 以及 [7,11,18] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3
 *
 * 1
 *
 *
 *
 */

// @lc code=start
/**
 * 动态规划解法
 * 核心思想：对于每个位置i，枚举所有可能的前一个位置j，检查是否存在k使得arr[k] + arr[j] = arr[i]
 */
function lenLongestFibSubseq(arr: number[]): number {
  // 创建哈希表，用于快速查找数字在数组中的索引
  const map: Map<number, number> = new Map();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    map.set(arr[i], i);
  }

  // dp[j][i] 表示以 arr[j] 和 arr[i] 作为最后两个数字的斐波那契子序列的最大长度
  const dp: number[][] = Array.from(new Array(n), () => new Array(n).fill(0));
  let res = 0;

  // 枚举所有可能的结尾位置对 (j, i)
  for (let i = 0; i < n; i++) {
    // 从后往前枚举j，优化：当arr[j] * 2 <= arr[i]时，arr[i] - arr[j] >= arr[j]，不可能存在更小的k
    for (let j = n - 1; j >= 0; j--) {
      if (arr[j] * 2 <= arr[i]) {
        break;
      }

      // 检查是否存在k，使得arr[k] + arr[j] = arr[i]
      if (map.has(arr[i] - arr[j])) {
        const k = map.get(arr[i] - arr[j])!;
        // 如果k < j，说明找到了一个有效的斐波那契序列
        // dp[k][j] + 1 表示在原有序列基础上加上arr[i]
        // 3 表示至少需要3个数字才能构成斐波那契序列
        dp[j][i] = Math.max(dp[k][j] + 1, 3);
        res = Math.max(res, dp[j][i]);
      }
    }
  }
  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在严格递增数组中寻找最长的斐波那契子序列
   - 斐波那契序列定义：X_i + X_{i+1} = X_{i+2}，且长度 >= 3
   - 子序列可以不连续，但必须保持相对顺序

2. 算法分析：
   - 时间复杂度：O(n²)，其中n是数组长度
   - 空间复杂度：O(n²)，用于存储dp数组
   - 算法类型：动态规划

3. 实现要点：
   - 使用哈希表快速查找数字索引，避免O(n)的线性搜索
   - dp[j][i]表示以arr[j]和arr[i]结尾的斐波那契序列最大长度
   - 优化：当arr[j] * 2 <= arr[i]时提前退出，因为arr[i] - arr[j] >= arr[j]
   - 状态转移：dp[j][i] = max(dp[k][j] + 1, 3)，其中arr[k] + arr[j] = arr[i]

4. 优化思路：
   - 哈希表查找：将O(n)的查找优化为O(1)
   - 提前退出：利用数组严格递增的特性减少不必要的枚举
   - 状态定义：使用二维dp避免重复计算

5. 边界情况：
   - 数组长度小于3时返回0
   - 不存在斐波那契序列时返回0
   - 最小斐波那契序列长度为3

6. 类似问题：
   - 最长递增子序列 (LIS)
   - 最长公共子序列 (LCS)
   - 其他序列相关的动态规划问题
*/
