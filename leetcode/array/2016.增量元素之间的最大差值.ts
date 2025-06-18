/*
 * @lc app=leetcode.cn id=2016 lang=typescript
 *
 * [2016] 增量元素之间的最大差值
 *
 * https://leetcode-cn.com/problems/maximum-difference-between-increasing-elements/description/
 *
 * algorithms
 * Easy (60.00%)
 * Likes:    48
 * Dislikes: 0
 * Total Accepted:    21.3K
 * Total Submissions: 35.6K
 * Testcase Example:  '[7,1,5,4]'
 *
 * 给你一个下标从 0 开始的整数数组 nums ，该数组的大小为 n ，请你计算 nums[j] - nums[i] 能求得的 最大差值 ，其中 0 <=
 * i < j < n 且 nums[i] < nums[j] 。
 *
 * 返回 最大差值 。如果不存在满足要求的 i 和 j ，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [7,1,5,4]
 * 输出：4
 * 解释：
 * 最大差值出现在 i = 1 且 j = 2 时，nums[j] - nums[i] = 5 - 1 = 4 。
 * 注意，尽管 i = 1 且 j = 0 时 ，nums[j] - nums[i] = 7 - 1 = 6 > 4 ，但 i > j 不满足题面要求，所以
 * 6 不是有效的答案。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [9,4,3,2]
 * 输出：-1
 * 解释：
 * 不存在同时满足 i < j 和 nums[i] < nums[j] 这两个条件的 i, j 组合。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1,5,2,10]
 * 输出：9
 * 解释：
 * 最大差值出现在 i = 0 且 j = 3 时，nums[j] - nums[i] = 10 - 1 = 9 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 2 <= n <= 1000
 * 1 <= nums[i] <= 10^9
 *
 *
 */

export {};

// @lc code=start
/**
 * 解法一：暴力解法 - 枚举所有可能的 (i, j) 对
 * 时间复杂度：O(n²)，空间复杂度：O(1)
 */
function maximumDifference1(nums: number[]): number {
  let max = -1; // 初始化最大差值为 -1，表示没有找到满足条件的差值
  const n = nums.length;

  // 外层循环：枚举所有可能的 i (作为较小值的位置)
  for (let i = 0; i < n - 1; i++) {
    // 内层循环：枚举所有可能的 j (作为较大值的位置，且 j > i)
    for (let j = i + 1; j < n; j++) {
      // 检查是否满足增量条件：nums[i] < nums[j]
      if (nums[i] < nums[j]) {
        // 计算差值并更新最大值
        max = Math.max(max, nums[j] - nums[i]);
      }
    }
  }

  return max;
}

/**
 * 解法二：贪心算法 - 一次遍历，维护前缀最小值
 * 时间复杂度：O(n)，空间复杂度：O(1)
 */
function maximumDifference(nums: number[]): number {
  let max = -1; // 记录最大差值
  const n = nums.length;
  let preMin = nums[0]; // 维护当前位置之前的最小值

  // 从第二个元素开始遍历
  for (let i = 1; i < n; i++) {
    // 如果当前元素大于前面的最小值，说明可以形成增量差值
    if (nums[i] > preMin) {
      // 更新最大差值
      max = Math.max(max, nums[i] - preMin);
    } else {
      // 如果当前元素不大于前面的最小值，更新最小值
      // 这样为后续可能的更大元素提供更好的基础
      preMin = nums[i];
    }
  }

  return max;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在数组中找到两个元素 nums[i] 和 nums[j]，满足 i < j 且 nums[i] < nums[j]
   - 使得 nums[j] - nums[i] 最大
   - 如果不存在这样的对，返回 -1

2. 算法分析：

   方法一：暴力解法
   - 时间复杂度：O(n²) - 双重循环遍历所有 (i,j) 对
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 思路：枚举所有可能的 (i,j) 对，检查是否满足条件并更新最大差值

   方法二：贪心算法（推荐）
   - 时间复杂度：O(n) - 一次遍历
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 思路：对于每个位置 j，我们希望找到它前面的最小值作为 i
   - 关键观察：要使差值最大，应该用当前元素减去它前面出现的最小元素

3. 实现要点：

   贪心算法的核心思想：
   - 维护一个变量 preMin 记录当前位置之前的最小值
   - 对于每个位置 i，如果 nums[i] > preMin，则可以计算差值 nums[i] - preMin
   - 如果 nums[i] <= preMin，则更新 preMin = nums[i]，为后续更大的元素提供更好的基础

   边界情况处理：
   - 如果数组是递减的，不存在满足条件的 (i,j)，返回 -1
   - 数组长度至少为 2，题目已保证

4. 优化思路：

   从暴力到贪心的优化过程：
   - 暴力解法：对每个 j，都要遍历前面所有的 i
   - 贪心优化：对每个 j，只需要知道前面的最小值即可
   - 关键洞察：要最大化 nums[j] - nums[i]，就要最小化 nums[i]

   算法正确性证明：
   - 对于任意位置 j，如果存在 i₁ < i₂ < j 且 nums[i₁] >= nums[i₂]
   - 那么 nums[j] - nums[i₂] >= nums[j] - nums[i₁]
   - 因此选择更小的 nums[i₂] 总是更优的选择

5. 示例分析：

   示例：nums = [7,1,5,4]
   - i=0: preMin=7
   - i=1: nums[1]=1 < preMin=7, 更新 preMin=1
   - i=2: nums[2]=5 > preMin=1, 计算差值 5-1=4, max=4
   - i=3: nums[3]=4 > preMin=1, 计算差值 4-1=3, max 仍为 4
   - 返回 4

   示例：nums = [9,4,3,2] (递减数组)
   - i=0: preMin=9
   - i=1: nums[1]=4 < preMin=9, 更新 preMin=4
   - i=2: nums[2]=3 < preMin=4, 更新 preMin=3  
   - i=3: nums[3]=2 < preMin=3, 更新 preMin=2
   - max 始终为 -1，返回 -1
*/
