/*
 * @lc app=leetcode.cn id=3010 lang=typescript
 *
 * [3010] 将数组分成最小总代价的子数组 I
 *
 * https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-i/description/
 *
 * algorithms
 * Easy (66.55%)
 * Likes:    268
 * Dislikes: 18
 * Total Accepted:    80.4K
 * Total Submissions: 107.2K
 * Testcase Example:  '[1,2,3,12]'
 *
 * 给你一个长度为 n 的整数数组 nums。
 *
 * 数组的代价等于其首元素的值。例如，[1,2,3] 的代价为 1，[3,4,1] 的代价为 3。
 *
 * 你需要将 nums 分成 3 个互不重叠的连续子数组。
 *
 * 返回这 3 个子数组代价之和的最小可能值。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,12]
 * 输出：6
 * 解释：最优划分为 [1]、[2]、[3,12]，总代价为 1 + 2 + 3 = 6。
 * 其它划分：
 * - [1]、[2,3]、[12]，总代价为 1 + 2 + 12 = 15。
 * - [1,2]、[3]、[12]，总代价为 1 + 3 + 12 = 16。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,4,3]
 * 输出：12
 * 解释：只能划分为 [5]、[4]、[3]，总代价为 12。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [10,3,1,1]
 * 输出：12
 * 解释：最优划分为 [10,3]、[1]、[1]，总代价为 10 + 1 + 1 = 12。
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= n <= 50
 * 1 <= nums[i] <= 50
 *
 *
 */

// @lc code=start
/**
 * 将数组分成 3 个连续子数组，使代价和最小。
 *
 * @param nums - 整数数组
 * @returns 最小代价和
 */
function minimumCost(nums: number[]): number {
  const n = nums.length;
  const firstCost = nums[0];
  let secondMin = Infinity;
  let thirdMin = Infinity;

  // 在 nums[1..] 中找出最小的两个值作为后两个子数组的首元素
  for (let i = 1; i < n; i++) {
    if (nums[i] < secondMin) {
      thirdMin = secondMin;
      secondMin = nums[i];
    } else if (nums[i] < thirdMin) {
      thirdMin = nums[i];
    }
  }
  return firstCost + secondMin + thirdMin;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：分成 3 个连续子数组，代价为各子数组首元素之和。
   - 关键特点：首元素的位置决定代价，子数组必须连续且互不重叠。
   - 目标：最小化三段的首元素之和。

2. 解题思路
   核心思想
   - 第一个子数组必然以 nums[0] 开始，因此其代价固定为 nums[0]。
   - 剩余两个子数组的首元素从 nums[1..] 中选择，且为了最小化和，应取最小
     的两个值。
   - 由于数组允许任意切分为连续段，只要选择的两个值位于 nums[1..] 中，均
     可通过切分使其成为后两段的首元素。

   算法步骤
   1) 固定第一个代价为 nums[0]。
   2) 在 nums[1..] 中扫描，找出最小的两个值。
   3) 返回三者之和。

3. 代码实现
   实现步骤
   - 用 secondMin 和 thirdMin 维护最小的两个值。
   - 单次遍历即可得到结果。

   关键函数说明
   - minimumCost：主函数，线性扫描找出两个最小值。

4. 复杂度分析
   - 时间复杂度：O(n)，仅一次扫描。
   - 空间复杂度：O(1)，常数额外空间。
   - 关键观察：第一段首元素固定，后两段只需取最小两值。

5. 示例分析
   示例一：nums = [1,2,3,12]
   - firstCost = 1，后两段最小值为 2 和 3，总和 6。

   示例二：nums = [5,4,3]
   - firstCost = 5，后两段最小值为 3 和 4，总和 12。

   示例三：nums = [10,3,1,1]
   - firstCost = 10，后两段最小值为 1 和 1，总和 12。

   边界情况
   - n=3 时，三个元素分别为三段首元素。
   - nums[1..] 中有相等最小值，允许重复选择。

6. 算法要点总结
   核心技巧
   - 固定首元素 + 选剩余最小两值。
   - 连续性约束不影响“首元素”选择的可行性。

   优化要点
   - 线性扫描比排序更省时间。
   - 常量空间即可完成。

   类似问题
   - 分段取首元素最小化的问题。
   - 固定起点 + 选最小若干值的贪心问题。

7. 常见错误
   - 误以为必须排序后再切分，导致多余的 O(n log n)。
   - 忽略第一个子数组首元素固定为 nums[0]。
   - 只取一个最小值，遗漏第二段的最小首元素。
*/
