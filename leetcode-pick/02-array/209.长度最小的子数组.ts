/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode-cn.com/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (36.60%)
 * Likes:    330
 * Dislikes: 0
 * Total Accepted:    54.7K
 * Total Submissions: 126K
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s
 * 的长度最小的连续子数组，并返回其长度。如果不存在符合条件的连续子数组，返回 0。
 *
 * 示例:
 *
 * 输入: s = 7, nums = [2,3,1,2,4,3]
 * 输出: 2
 * 解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
 *
 *
 * 进阶:
 *
 * 如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
 *
 */

// @lc code=start
/**
 * 方法一：暴力解法
 * 枚举所有可能的子数组，找到满足条件的最短长度
 */
function minSubArrayLenBrute(target: number, nums: number[]): number {
  const n = nums.length;
  let minLength = Infinity;

  // 枚举所有可能的起始位置
  for (let i = 0; i < n; i++) {
    let sum = 0;

    // 从起始位置i开始，向右扩展子数组
    for (let j = i; j < n; j++) {
      sum += nums[j];

      // 一旦满足条件，更新最小长度并break
      if (sum >= target) {
        minLength = Math.min(minLength, j - i + 1);
        break;
      }
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

/**
 * 方法二：滑动窗口解法（推荐）
 * 维护一个动态的窗口，满足条件时收缩左边界，否则扩展右边界
 */
var minSubArrayLen = function (target: number, nums: number[]): number {
  const n = nums.length;
  let minLength = Infinity;
  let left = 0; // 窗口左边界
  let right = 0; // 窗口右边界
  let windowSum = 0; // 当前窗口内元素的和

  while (right < n) {
    // 扩展右边界，将新元素加入窗口
    windowSum += nums[right];

    // 当窗口和满足条件时，尝试收缩左边界
    while (windowSum >= target) {
      // 更新最小长度
      minLength = Math.min(minLength, right - left + 1);

      // 收缩左边界，移除左边元素
      windowSum -= nums[left];
      left++;
    }

    // 继续扩展右边界
    right++;
  }

  return minLength === Infinity ? 0 : minLength;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到数组中连续子数组，使其和大于等于target且长度最小
   - 如果不存在这样的子数组，返回0
   - 所有元素都是正整数，这是使用滑动窗口的关键条件

2. 算法分析：
   方法一（暴力解法）：
   - 时间复杂度：O(n²) - 双重循环枚举所有子数组
   - 空间复杂度：O(1) - 只使用常数额外空间
   
   方法二（滑动窗口）：
   - 时间复杂度：O(n) - 每个元素最多被访问两次（一次加入，一次移除）
   - 空间复杂度：O(1) - 只使用常数额外空间

3. 实现要点：
   - 滑动窗口技巧：维护一个动态的[left, right]窗口
   - 窗口扩展：当和小于target时，right右移
   - 窗口收缩：当和大于等于target时，left右移
   - 记录最优解：每次满足条件时更新最小长度

4. 优化思路：
   - 滑动窗口是最优解，充分利用了数组元素非负的特性
   - 窗口收缩时可以连续移动left指针，直到不满足条件
   - 避免了暴力解法中的重复计算
   - 双指针技巧：left和right指针都只向右移动，不会回退
*/
