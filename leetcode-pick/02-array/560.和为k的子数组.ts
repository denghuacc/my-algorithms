/*
 * @lc app=leetcode.cn id=560 lang=typescript
 *
 * [560] 和为K的子数组
 *
 * https://leetcode-cn.com/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (34.61%)
 * Likes:    510
 * Dislikes: 0
 * Total Accepted:    59.3K
 * Total Submissions: 132.7K
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
 *
 * 示例 1 :
 *
 *
 * 输入:nums = [1,1,1], k = 2
 * 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
 *
 *
 * 说明 :
 *
 *
 * 数组的长度为 [1, 20,000]。
 * 数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。
 *
 *
 */

// @lc code=start
/**
 * 方法一：前缀和 + 暴力解法
 * 预计算前缀和数组，然后暴力枚举所有子数组
 */
var subarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  // 构建前缀和数组，sums[i] 表示 nums[0..i-1] 的和
  const sums: number[] = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }

  let count = 0;
  // 枚举所有可能的子数组 [j, i)
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // 子数组 nums[j..i-1] 的和为 sums[i] - sums[j]
      if (sums[i] - sums[j] === k) {
        count++;
      }
    }
  }

  return count;
};

/**
 * 方法二：前缀和 + 哈希表优化（推荐）
 * 一次遍历，用哈希表记录前缀和出现次数，避免重复计算
 */
var subarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  // 哈希表：前缀和 -> 出现次数
  const prefixSumCount: Map<number, number> = new Map();

  // 初始化：前缀和为0出现1次，处理从开头开始的子数组
  prefixSumCount.set(0, 1);

  let count = 0;
  let currentSum = 0;

  for (let i = 0; i < n; i++) {
    // 计算当前前缀和
    currentSum += nums[i];

    // 查找是否存在前缀和为 currentSum - k 的位置
    // 如果存在，说明从那些位置到当前位置的子数组和为k
    const targetSum = currentSum - k;
    if (prefixSumCount.has(targetSum)) {
      count += prefixSumCount.get(targetSum)!;
    }

    // 更新当前前缀和的出现次数
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) ?? 0) + 1);
  }

  return count;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到数组中和为k的连续子数组的个数
   - 需要考虑所有可能的子数组，包括负数的情况
   - 利用前缀和的性质：如果prefixSum[i] - prefixSum[j] = k，则nums[j+1..i]的和为k

2. 算法分析：
   方法一（前缀和 + 暴力）：
   - 时间复杂度：O(n²) - 双重循环枚举所有子数组
   - 空间复杂度：O(n) - 前缀和数组
   
   方法二（前缀和 + 哈希表）：
   - 时间复杂度：O(n) - 一次遍历，哈希表操作O(1)
   - 空间复杂度：O(n) - 哈希表存储前缀和

3. 实现要点：
   - 前缀和转换：子数组和问题转化为前缀和差值问题
   - 哈希表优化：记录每个前缀和出现的次数，而不是位置
   - 初始化技巧：设置prefixSumCount[0] = 1，处理从索引0开始的情况
   - 边遍历边查找：避免重复计算，提高效率

4. 优化思路：
   - 核心转换：子数组和问题 → 前缀和差值问题
   - 哈希表加速：O(1)时间查找目标前缀和
   - 计数优化：记录出现次数而不是位置，支持重复的前缀和
   - 一次遍历：边计算前缀和边查找，避免二次遍历

例子分析：nums = [1,1,1], k = 2
- i=0: sum=1, target=-1, count=0, map=[(0,1),(1,1)]
- i=1: sum=2, target=0, count=1, map=[(0,1),(1,1),(2,1)]
- i=2: sum=3, target=1, count=2, map=[(0,1),(1,1),(2,1),(3,1)]
结果：2个子数组和为2
*/
