/*
 * @lc app=leetcode.cn id=3379 lang=typescript
 *
 * [3379] 转换数组
 *
 * https://leetcode.cn/problems/transformed-array/description/
 *
 * algorithms
 * Easy (57.31%)
 * Likes:    296
 * Dislikes: 35
 * Total Accepted:    105.1K
 * Total Submissions: 155.8K
 * Testcase Example:  '[3,-2,1,1]'
 *
 * 给你一个整数数组 nums，它表示一个环形数组。请构造一个同长度数组 result，
 * 规则如下：对每个下标 i（0 <= i < nums.length）独立执行：
 *
 * - 若 nums[i] > 0：从 i 出发向右移动 nums[i] 步，result[i] 为落点的值。
 * - 若 nums[i] < 0：从 i 出发向左移动 abs(nums[i]) 步，result[i] 为落点的值。
 * - 若 nums[i] == 0：result[i] = nums[i]。
 *
 * 返回数组 result。
 *
 * 注意：数组是环形的，超出末尾会回到开头，越过开头会回到末尾。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [3,-2,1,1]
 * 输出：[1,1,1,3]
 * 解释：
 * - nums[0] = 3，向右 3 步到下标 3，result[0] = nums[3] = 1。
 * - nums[1] = -2，向左 2 步到下标 3，result[1] = nums[3] = 1。
 * - nums[2] = 1，向右 1 步到下标 3，result[2] = nums[3] = 1。
 * - nums[3] = 1，向右 1 步到下标 0，result[3] = nums[0] = 3。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [-1,4,-1]
 * 输出：[-1,-1,4]
 * 解释：
 * - nums[0] = -1，向左 1 步到下标 2，result[0] = nums[2] = -1。
 * - nums[1] = 4，向右 4 步到下标 2，result[1] = nums[2] = -1。
 * - nums[2] = -1，向左 1 步到下标 1，result[2] = nums[1] = 4。
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * -100 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
/**
 * 构造变换后的数组，使用取模统一处理正负步长。
 *
 * @param nums - 环形数组
 * @returns 变换后的结果数组
 */
function constructTransformedArray(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    // 利用取模将步数限制在 [-(n-1), n-1]，统一处理正负方向
    const shift = nums[i] % n;
    const targetIndex = (i + shift + n) % n;
    result[i] = nums[targetIndex];
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：对每个位置独立移动若干步，取落点值构造新数组。
   - 关键特点：数组为环形，移动步数可正可负。
   - 目标：对每个位置计算落点下标并填充结果。

2. 解题思路
   核心思想
   - 使用取模把移动步数缩到数组长度范围内。
   - 统一用公式 (i + shift + n) % n 处理正负移动。

   算法步骤
   1) 设 n 为数组长度。
   2) 对每个 i：
      - 计算 shift = nums[i] % n。
      - 计算落点 targetIndex = (i + shift + n) % n。
      - result[i] = nums[targetIndex]。
   3) 返回 result。

3. 代码实现
   实现步骤
   - 逐元素计算目标下标，避免分支判断。
   - 使用模运算实现环形移动。

   关键函数说明
   - constructTransformedArray：主函数，逐个位置计算落点。

4. 复杂度分析
   - 时间复杂度：O(n)，每个元素处理一次。
   - 空间复杂度：O(n)，结果数组。
   - 关键观察：每个位置独立计算，不需额外结构。

5. 示例分析
   示例一：nums = [3,-2,1,1]
   - i=0, shift=3, target=3 -> 1
   - i=1, shift=-2, target=3 -> 1
   - i=2, shift=1, target=3 -> 1
   - i=3, shift=1, target=0 -> 3

   示例二：nums = [-1,4,-1]
   - i=0, shift=-1, target=2 -> -1
   - i=1, shift=1, target=2 -> -1
   - i=2, shift=-1, target=1 -> 4

   边界情况
   - n=1：只有一个元素，结果仍为该元素。
   - nums[i] 为 0：shift 为 0，落点为自身。

6. 算法要点总结
   核心技巧
   - 环形数组移动可用模运算统一处理正负。
   - 取模后再加 n 保证非负下标。

   优化要点
   - 无需分支判断正负方向，代码更简洁。
   - 单次遍历即可完成。

   类似问题
   - 环形数组索引计算问题。
   - 基于偏移量的数组变换问题。

7. 常见错误
   - 忽略负数取模的符号，导致下标为负。
   - 忘记加 n 再取模，数组越界。
   - 误用绝对值导致方向丢失。
*/
