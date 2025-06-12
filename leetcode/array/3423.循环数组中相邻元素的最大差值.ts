/*
 * @lc app=leetcode.cn id=3423 lang=typescript
 *
 * [3423] 循环数组中相邻元素的最大差值
 *
 * https://leetcode.cn/problems/maximum-difference-between-adjacent-elements-in-a-circular-array/description/
 *
 * algorithms
 * Easy (84.01%)
 * Likes:    9
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 10.5K
 * Testcase Example:  '[1,2,4]'
 *
 * 给你一个 循环 数组 nums ，请你找出相邻元素之间的 最大 绝对差值。
 *
 * 注意：一个循环数组中，第一个元素和最后一个元素是相邻的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,4]
 *
 * 输出：3
 *
 * 解释：
 *
 * 由于 nums 是循环的，nums[0] 和 nums[2] 是相邻的，它们之间的绝对差值是最大值 |4 - 1| = 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [-5,-10,-5]
 *
 * 输出：5
 *
 * 解释：
 *
 * 相邻元素 nums[0] 和 nums[1] 之间的绝对差值为最大值 |-5 - (-10)| = 5 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 100
 * -100 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
function maxAdjacentDistance(nums: number[]): number {
  const n = nums.length;

  // 初始化最大差值为第一个元素和最后一个元素的差值
  // 因为是循环数组，第一个和最后一个元素也是相邻的
  let res = Math.abs(nums[0] - nums[n - 1]);

  // 遍历数组中所有相邻的元素对
  for (let i = 1; i < n; i++) {
    // 计算当前元素与前一个元素的绝对差值
    // 并更新最大差值
    res = Math.max(res, Math.abs(nums[i] - nums[i - 1]));
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在循环数组中找到相邻元素间的最大绝对差值
   - 循环数组意味着第一个元素和最后一个元素也是相邻的

2. 算法分析：
   - 时间复杂度：O(n) - 只需要遍历数组一次
   - 空间复杂度：O(1) - 只使用了常数级别的额外空间
   - 算法类型：一次遍历 + 贪心思想

3. 实现要点：
   - 关键观察：循环数组中的相邻关系包括 nums[0] 和 nums[n-1]
   - 数据结构：只需要维护一个最大值变量
   - 核心步骤：
     * 初始化：计算首尾元素的差值作为初始最大值
     * 遍历：依次计算所有相邻元素的差值
     * 更新：使用 Math.max 保持最大差值

4. 边界情况处理：
   - 数组长度为 2：只有一对相邻元素（首尾相邻）
   - 负数处理：使用 Math.abs 确保计算绝对差值
   - 相同元素：差值为 0，不影响最大值计算

5. 优化思路：
   - 算法已经是最优的 O(n) 时间复杂度
   - 空间复杂度已经是最优的 O(1)
   - 代码简洁明了，无需进一步优化

6. 关键技巧：
   - 循环数组处理：记住首尾元素的相邻关系
   - 一次遍历：通过维护最大值变量避免多次遍历
   - 绝对差值：使用 Math.abs 处理正负数差值
*/
