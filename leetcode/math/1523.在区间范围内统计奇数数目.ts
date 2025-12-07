/*
 * @lc app=leetcode.cn id=1523 lang=typescript
 *
 * [1523] 在区间范围内统计奇数数目
 *
 * https://leetcode.cn/problems/count-odd-numbers-in-an-interval-range/description/
 *
 * algorithms
 * Easy (51.04%)
 * Likes:    2973
 * Dislikes: 170
 * Total Accepted:    455K
 * Total Submissions: 864.7K
 * Testcase Example:  '3\n7'
 *
 * 给你两个非负整数 low 和 high ，返回区间 [low, high] 内奇数的个数
 * （含端点）。
 *
 *
 * 示例 1：
 *
 *
 * 输入：low = 3, high = 7
 * 输出：3
 * 解释：3 到 7 之间的奇数是 [3,5,7]。
 *
 * 示例 2：
 *
 *
 * 输入：low = 8, high = 10
 * 输出：1
 * 解释：8 到 10 之间的奇数是 [9]。
 *
 *
 * 提示：
 *
 *
 * 0 <= low <= high <= 10^9
 *
 */

// @lc code=start
/**
 * 统计闭区间内奇数个数，利用前缀奇数计数函数 floor((x + 1) / 2)。
 *
 * @param low - 区间左端点
 * @param high - 区间右端点
 * @returns 闭区间内奇数的数量
 */
function countOdds(low: number, high: number): number {
  // 前缀奇数数目：从 0 到 x 的奇数有 floor((x + 1) / 2) 个
  return Math.floor((high + 1) / 2) - Math.floor(low / 2);
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 统计闭区间 [low, high] 中的奇数数量。
   - 奇偶分布均匀，可用前缀计数函数直接计算。

2. 关键观察：
   - 从 0 到 x 的奇数个数为 floor((x + 1) / 2)。
   - 区间计数可转化为前缀差分：odd(high) - odd(low - 1)。

3. 算法步骤：
   - 计算 prefixOdd(high) 与 prefixOdd(low - 1)。
   - 返回二者差值。
   - 通过代数化简得到实现公式：
     floor((high + 1) / 2) - floor(low / 2)。

4. 复杂度分析：
   - 时间复杂度：O(1)。
   - 空间复杂度：O(1)。

5. 示例验证：
   - low=3, high=7：floor(8/2)-floor(3/2)=4-1=3。
   - low=8, high=10：floor(11/2)-floor(8/2)=5-4=1。

6. 常见错误：
   - 忘记闭区间包含端点，导致 off-by-one。
   - 误用 (high - low) / 2，未考虑端点奇偶性。
*/
