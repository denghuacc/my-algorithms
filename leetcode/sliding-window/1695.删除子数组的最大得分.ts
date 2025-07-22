/*
 * @lc app=leetcode.cn id=1695 lang=typescript
 *
 * [1695] 删除子数组的最大得分
 *
 * https://leetcode.cn/problems/maximum-erasure-value/description/
 *
 * algorithms
 * Medium (61.71%)
 * Likes:    124
 * Dislikes: 0
 * Total Accepted:    38.9K
 * Total Submissions: 61.8K
 * Testcase Example:  '[4,2,4,5,6]'
 *
 * 给你一个正整数数组 nums ，请你从中删除一个含有 若干不同元素 的子数组。删除子数组的 得分 就是子数组各元素之 和 。
 *
 * 返回 只删除一个 子数组可获得的 最大得分 。
 *
 * 如果数组 b 是数组 a 的一个连续子序列，即如果它等于 a[l],a[l+1],...,a[r] ，那么它就是 a 的一个子数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,2,4,5,6]
 * 输出：17
 * 解释：最优子数组是 [2,4,5,6]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,2,1,2,5,2,1,2,5]
 * 输出：8
 * 解释：最优子数组是 [5,2,1] 或 [1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^4
 *
 *
 */

export {};

// @lc code=start
function maximumUniqueSubarray(nums: number[]): number {
  const set = new Set<number>();
  let left = 0;
  let currentSum = 0;
  let maxSum = 0;

  for (let right = 0; right < nums.length; right++) {
    // 如果当前元素已存在，收缩左边界直到移除该重复元素
    while (set.has(nums[right])) {
      set.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    // 添加当前元素到窗口
    set.add(nums[right]);
    currentSum += nums[right];

    // 更新最大和
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到数组中所有元素都不相同的连续子数组
   - 返回这些子数组中和最大的那个

2. 算法分析：
   - 时间复杂度：O(n) - 每个元素最多被访问两次（一次加入，一次移除）
   - 空间复杂度：O(min(m,n)) - m是数组中不同元素的个数
   - 算法类型：滑动窗口（双指针）

3. 实现要点：
   - 使用Set维护当前窗口中的元素，保证无重复
   - 使用双指针(left, right)维护滑动窗口
   - 当遇到重复元素时，收缩左边界直到移除重复元素
   - 实时维护当前窗口的和，避免重复计算

4. 关键步骤：
   - 扩展右边界：每次将right指针的元素加入窗口
   - 处理重复：当发现重复元素时，移动left指针直到移除重复元素
   - 更新答案：每次扩展窗口后，更新最大和
   - 窗口不变性：始终保持窗口内所有元素不重复

5. 示例分析：
   对于 [4,2,4,5,6]：
   - [4]: sum=4, max=4
   - [4,2]: sum=6, max=6  
   - [4,2,4]: 发现重复，收缩到[2,4], sum=6, max=6
   - [2,4,5]: sum=11, max=11
   - [2,4,5,6]: sum=17, max=17
   
   最终答案：17

6. 优化要点：
   - 使用Set的O(1)查找和删除操作
   - 避免重复计算子数组和，维护running sum
   - 双指针保证每个元素最多被处理两次
*/
