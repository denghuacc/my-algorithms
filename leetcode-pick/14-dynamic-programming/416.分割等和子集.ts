/*
 * @lc app=leetcode.cn id=416 lang=typescript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (49.32%)
 * Likes:    463
 * Dislikes: 0
 * Total Accepted:    62.1K
 * Total Submissions: 126.1K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 * 注意:
 *
 *
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 *
 *
 * 示例 1:
 *
 * 输入: [1, 5, 11, 5]
 *
 * 输出: true
 *
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 *
 *
 *
 *
 * 示例 2:
 *
 * 输入: [1, 2, 3, 5]
 *
 * 输出: false
 *
 * 解释: 数组不能分割成两个元素和相等的子集.
 *
 *
 *
 *
 */

// @lc code=start
/**
 * 动态规划解法
 * 核心思想：将问题转化为0-1背包问题，判断是否存在子集和为总和的一半
 */
var canPartition = function (nums: number[]): boolean {
  const n = nums.length;
  // 数组长度小于2时无法分割
  if (n < 2) return false;

  let sum = 0;
  let maxNum = 0;

  // 计算总和和最大值
  for (const num of nums) {
    sum += num;
    maxNum = Math.max(maxNum, num);
  }

  // 如果总和为奇数，无法分割成两个相等的子集
  if (sum & 1) return false;
  const target = Math.floor(sum / 2); // 目标和为总和的一半
  // 如果最大值大于目标和，无法分割
  if (maxNum > target) return false;

  // dp[i][j] 表示前i个数字中是否存在子集和为j
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(target + 1).fill(false)
  );

  // 初始化：空子集的和为0
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  // 第一个数字可以组成其自身的和
  dp[0][nums[0]] = true;

  // 填充dp数组
  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        // 可以选择使用或不使用当前数字
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        // 当前数字太大，不能使用
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n - 1][target];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断数组是否可以分割成两个和相等的子集
   - 每个数字只能使用一次
   - 等价于判断是否存在子集和为总和的一半

2. 算法分析：
   - 时间复杂度：O(n * target)，其中target = sum/2
   - 空间复杂度：O(n * target)
   - 算法类型：动态规划（0-1背包问题）

3. 实现要点：
   - 状态定义：dp[i][j]表示前i个数字中是否存在子集和为j
   - 状态转移：dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]
   - 边界条件：dp[i][0] = true（空子集）
   - 优化：提前判断奇偶性和最大值

4. 优化思路：
   - 提前返回：总和为奇数时直接返回false
   - 最大值剪枝：如果最大值大于目标和，直接返回false
   - 空间优化：可以使用一维数组代替二维数组

5. 边界情况：
   - 数组长度小于2：返回false
   - 总和为奇数：返回false
   - 最大值大于目标和：返回false
   - 空数组：返回false

6. 类似问题：
   - 0-1背包问题
   - 目标和（添加正负号）
   - 其他子集和问题

7. 关键洞察：
   - 问题可以转化为0-1背包问题
   - 目标和为总和的一半
   - 可以使用动态规划求解

8. 示例分析：
   nums = [1, 5, 11, 5]
   - sum = 22, target = 11
   - dp[0][1] = true (使用第一个数字1)
   - dp[1][6] = true (使用前两个数字1+5)
   - dp[2][11] = true (使用前三个数字1+5+5)
   - 结果：true

9. 空间优化版本：
   - 可以使用一维数组dp[j]代替dp[i][j]
   - 从后往前遍历避免重复使用
   - 空间复杂度优化为O(target)

10. 状态转移理解：
    - 对于位置i和目标和j，有两种选择：
      1. 不使用nums[i]：dp[i][j] = dp[i-1][j]
      2. 使用nums[i]：dp[i][j] = dp[i-1][j-nums[i]]
    - 只要有一种选择为true，dp[i][j]就为true
*/
