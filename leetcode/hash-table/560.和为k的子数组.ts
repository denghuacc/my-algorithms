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
// array + 前缀和
var subarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  const sums: number[] = new Array(n + 1).fill(0);

  // 创建前缀和
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }

  let ret = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (sums[i] - sums[j] === k) {
        ret += 1;
      }
    }
  }
  return ret;
};

// array + 前缀和 + hash table (optimize)
var subarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  const sums: Map<number, number> = new Map();
  sums.set(0, 1); // Set<前缀和, 前缀和出现的次数>

  let ret = 0;
  let sum0_i = 0;
  for (let i = 0; i < n; i++) {
    sum0_i += nums[i];
    const sum0_j = sum0_i - k;
    if (sums.has(sum0_j)) {
      ret += sums.get(sum0_j)!;
    }
    sums.set(sum0_i, (sums.get(sum0_i) ?? 0) + 1);
  }
  return ret;
};
// @lc code=end
