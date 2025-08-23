/*
 * @lc app=leetcode.cn id=713 lang=typescript
 *
 * [713] 乘积小于 K 的子数组
 *
 * https://leetcode-cn.com/problems/subarray-product-less-than-k/description/
 *
 * algorithms
 * Medium (45.61%)
 * Likes:    440
 * Dislikes: 0
 * Total Accepted:    48K
 * Total Submissions: 105.3K
 * Testcase Example:  '[10,5,2,6]\n100'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,5,2,6], k = 100
 * 输出：8
 * 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2],、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
 * 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 0
 * 输出：0
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * 1 <= nums[i] <= 1000
 * 0 <= k <= 10^6
 *
 *
 */

// @lc code=start
/**
 * 方法一：暴力滑动窗口
 * 对每个起始位置，尽可能扩展窗口直到乘积不小于k
 */
var numSubarrayProductLessThanK = function (nums: number[], k: number): number {
  if (k <= 1) return 0; // 所有元素都是正数，如果k <= 1则不可能有满足条件的子数组

  const n = nums.length;
  let count = 0;

  // 枚举每个可能的起始位置
  for (let left = 0; left < n; left++) {
    let right = left;
    let product = 1;

    // 从left开始，尽可能向右扩展
    while (right < n && product * nums[right] < k) {
      product *= nums[right];
      right++;
    }

    // 以left为起点的满足条件的子数组个数为 right - left
    count += right - left;
  }

  return count;
};

/**
 * 方法二：优化滑动窗口（推荐）
 * 维护一个乘积小于k的滑动窗口，每次添加新元素时计算新增的子数组个数
 */
var numSubarrayProductLessThanK = function (nums: number[], k: number): number {
  if (k <= 1) return 0; // 边界情况：k <= 1时不可能有满足条件的子数组

  const n = nums.length;
  let count = 0;
  let left = 0; // 窗口左边界
  let product = 1; // 当前窗口内元素的乘积

  // 扩展右边界
  for (let right = 0; right < n; right++) {
    // 将新元素加入窗口
    product *= nums[right];

    // 当乘积不小于k时，收缩左边界
    while (product >= k && left <= right) {
      product /= nums[left];
      left++;
    }

    // 以right为右端点的满足条件的子数组个数为 right - left + 1
    // 这些子数组分别是：[left,right], [left+1,right], ..., [right,right]
    count += right - left + 1;
  }

  return count;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到所有乘积严格小于k的连续子数组个数
   - 所有元素都是正整数，乘积具有单调性
   - 可以使用滑动窗口技巧，因为乘积的单调性

2. 算法分析：
   方法一（暴力滑动窗口）：
   - 时间复杂度：O(n²) - 外层循环O(n)，内层扩展最多O(n)
   - 空间复杂度：O(1) - 只使用常数额外空间
   
   方法二（优化滑动窗口）：
   - 时间复杂度：O(n) - 每个元素最多被访问两次（一次加入，一次移除）
   - 空间复杂度：O(1) - 只使用常数额外空间

3. 实现要点：
   - 单调性利用：由于所有元素为正，乘积具有单调递增性
   - 滑动窗口：维护一个乘积小于k的最大窗口
   - 计数技巧：每次扩展右边界时，新增的子数组个数为 right - left + 1
   - 边界处理：k <= 1时直接返回0，因为所有元素都 >= 1

4. 优化思路：
   - 窗口维护：保持窗口内乘积始终小于k
   - 计数优化：每次只计算新增的子数组，避免重复计算
   - 双指针技巧：left和right指针协调移动，每个元素最多被访问两次
   - 早期终止：k <= 1时直接返回0

例子分析：nums = [10,5,2,6], k = 100
- right=0: product=10, count=1 ([10])
- right=1: product=50, count=3 ([5], [10,5])  
- right=2: product=100>=k, 收缩left=1, product=10, count=6 ([2], [5,2], [10,5,2])
- right=3: product=60, count=10 ([6], [2,6], [5,2,6], [10,5,2,6])
结果：8个子数组（注意[10,5,2]乘积=100不满足严格小于）
*/
