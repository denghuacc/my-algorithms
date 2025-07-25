/*
 * @lc app=leetcode.cn id=3202 lang=typescript
 *
 * [3202] 找出有效子序列的最大长度 II
 *
 * https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-ii/description/
 *
 * algorithms
 * Medium (46.11%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    12.2K
 * Total Submissions: 20.9K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个整数数组 nums 和一个 正 整数 k 。
 * nums 的一个 子序列 sub 的长度为 x ，如果其满足以下条件，则称其为 有效子序列 ：
 *
 *
 * (sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x
 * - 1]) % k
 *
 * 返回 nums 的 最长有效子序列 的长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,4,5], k = 2
 *
 * 输出：5
 *
 * 解释：
 *
 * 最长有效子序列是 [1, 2, 3, 4, 5] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,2,3,1,4], k = 3
 *
 * 输出：4
 *
 * 解释：
 *
 * 最长有效子序列是 [1, 4, 1, 4] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 10^3
 * 1 <= nums[i] <= 10^7
 * 1 <= k <= 10^3
 *
 *
 */

export {};

// @lc code=start
function maximumLength(nums: number[], k: number): number {
  // dp[i][j] 表示以余数为i结尾，且相邻元素和余数为j的有效子序列的最大长度
  const dp = Array.from({ length: k }, () => new Array(k).fill(0));
  let res = 0;

  for (const num of nums) {
    const mod = num % k; // 当前数字对k取余

    // 遍历所有可能的余数i，尝试将当前数字添加到以余数i结尾的子序列后面
    for (let i = 0; i < k; i++) {
      // 如果当前数字添加到以余数i结尾的子序列后面
      // 那么新的相邻元素和余数为 (i + mod) % k
      // 子序列长度增加1
      dp[i][mod] = dp[mod][i] + 1;
      res = Math.max(res, dp[i][mod]);
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 寻找最长的子序列，使得子序列中所有相邻元素对的和对k取余都相等
   - 这是一个动态规划问题，需要考虑状态转移和状态定义

2. 算法分析：
   - 时间复杂度：O(n * k)，其中n是数组长度，k是给定的正整数
   - 空间复杂度：O(k^2)，用于存储dp数组
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j] 表示以余数为i结尾，且相邻元素和余数为j的有效子序列的最大长度
   - 状态转移：对于当前数字num，其余数为mod，可以添加到任何以余数i结尾的子序列后面
   - 关键观察：如果当前数字添加到以余数i结尾的子序列后面，新的相邻元素和余数为 (i + mod) % k

4. 优化思路：
   - 使用二维dp数组记录状态，避免重复计算
   - 在遍历过程中实时更新最大长度，避免最后再次遍历
   - 利用模运算的性质，将问题转化为余数空间的问题

5. 边界情况：
   - 空数组：返回0
   - 单个元素：返回1（任何单个元素都是有效子序列）
   - k=1：所有子序列都有效，返回数组长度

6. 示例分析：
   - 示例1：nums = [1,2,3,4,5], k = 2
     * 所有数字对2取余都是1，所以任意相邻元素和都是2，对2取余都是0
     * 因此整个数组都是有效子序列，长度为5
   
   - 示例2：nums = [1,4,2,3,1,4], k = 3
     * 最长有效子序列是 [1, 4, 1, 4]
     * 相邻元素和：1+4=5, 4+1=5, 1+4=5，都对3取余为2

7. 核心技巧：
   - 利用模运算的性质，将问题转化为余数空间
   - 使用二维dp数组记录状态，避免重复计算
   - 在遍历过程中实时更新最大长度

8. 类似问题：
   - 最长递增子序列
   - 最长公共子序列
   - 其他涉及子序列的动态规划问题
*/
