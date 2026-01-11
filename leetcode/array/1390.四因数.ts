/*
 * @lc app=leetcode.cn id=1390 lang=typescript
 *
 * [1390] 四因数
 *
 * https://leetcode.cn/problems/four-divisors/description/
 *
 * algorithms
 * Medium (45.99%)
 * Likes:    706
 * Dislikes: 211
 * Total Accepted:    123.1K
 * Total Submissions: 226.1K
 * Testcase Example:  '[21,4,7]'
 *
 * 给你一个整数数组 nums，请返回 nums 中恰好有四个因数的数的因数之和。
 * 如果没有这样的数，返回 0。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [21,4,7]
 * 输出：32
 * 解释：
 * 21 的因数有 1, 3, 7, 21（共 4 个）
 * 4 的因数有 1, 2, 4（共 3 个）
 * 7 的因数有 1, 7（共 2 个）
 * 仅 21 满足条件，因此答案是 21 的因数和。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [21,21]
 * 输出：64
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,3,4,5]
 * 输出：0
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^4
 * 1 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * 统计恰好有四个因数的数字，并累加它们的因数和。
 *
 * @param nums - 整数数组
 * @returns 满足条件的因数和总和
 */
function sumFourDivisors(nums: number[]): number {
  let totalSum = 0;
  for (const num of nums) {
    let divisorCount = 0;
    let divisorSum = 0;
    for (let i = 1; i * i <= num; i++) {
      if (num % i === 0) {
        // i 是一个因数，num / i 是对应的配对因数
        divisorCount++;
        divisorSum += i;
        if (i * i !== num) {
          divisorCount++;
          divisorSum += num / i;
        }
      }
      // 因数数量一旦超过 4，就提前结束，避免无效计算
      if (divisorCount > 4) {
        break;
      }
    }
    if (divisorCount === 4) {
      totalSum += divisorSum;
    }
  }
  return totalSum;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：筛选出“恰好有四个因数”的整数，并累加其因数和。
   - 关键特点：因数成对出现，可用平方根优化枚举。
   - 目标：返回所有满足条件的因数和总和。

2. 解题思路
   核心思想
   - 对每个数枚举因数，只需遍历到 sqrt(num)。
   - 发现因数时同时计入配对因数，统计总因数数量与因数和。
   - 因数数量超过 4 时提前终止，避免多余计算。

   算法步骤
   1) 遍历数组中的每个数 num。
   2) 从 i=1 到 i*i<=num 枚举因数：
      - 若 i 可整除 num，因数数量 +1，因数和加上 i。
      - 若 i*i != num，再计入配对因数 num / i。
      - 若因数数量超过 4，直接终止当前 num 的枚举。
   3) 若最终因数数量等于 4，则将因数和加入答案。
   4) 返回累计和。

3. 代码实现
   实现步骤
   - 使用 divisorCount 和 divisorSum 维护每个 num 的状态。
   - 通过 sqrt 枚举 + 配对因数保证效率。
   - 超过 4 个因数立即 break。

   关键函数说明
   - sumFourDivisors：主函数，依次处理每个 num 并累加结果。

4. 复杂度分析
   - 时间复杂度：O(n * sqrt(maxNum))，maxNum 为数组最大值。
   - 空间复杂度：O(1)，仅使用常数额外变量。
   - 关键观察：因数成对出现，sqrt 枚举即可覆盖所有因数。

5. 示例分析
   示例一：nums = [21,4,7]
   - 21 的因数对：(1,21)、(3,7)，共 4 个，因数和为 32。
   - 4 的因数为 1,2,4，共 3 个，不计入。
   - 7 的因数为 1,7，共 2 个，不计入。
   - 总和为 32。

   示例二：nums = [21,21]
   - 每个 21 的因数和为 32，总和为 64。

   示例三：nums = [1,2,3,4,5]
   - 所有数因数数量都不等于 4，结果为 0。

   边界情况
   - num 为平方数时配对因数相同，只计一次。
   - num 很小（如 1），因数数量不足 4。

6. 算法要点总结
   核心技巧
   - 利用因数成对出现与平方根枚举。
   - 提前终止减少不必要计算。

   优化要点
   - 因数超过 4 即退出，时间更可控。
   - 不需要保存因数列表，只维护数量与和。

   类似问题
   - 统计因数个数的相关题。
   - 基于因数枚举的筛选问题。

7. 常见错误
   - 忘记平方数去重，导致因数数量多算。
   - 未提前终止，导致性能下降。
   - 只统计因数数量但忘记累加因数和。
*/
