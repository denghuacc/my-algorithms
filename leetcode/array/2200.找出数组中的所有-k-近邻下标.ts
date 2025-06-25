/*
 * @lc app=leetcode.cn id=2200 lang=typescript
 *
 * [2200] 找出数组中的所有 K 近邻下标
 *
 * https://leetcode.cn/problems/find-all-k-distant-indices-in-an-array/description/
 *
 * algorithms
 * Easy (56.07%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    19.1K
 * Total Submissions: 31.8K
 * Testcase Example:  '[3,4,9,1,3,9,5]\n9\n1'
 *
 * 给你一个下标从 0 开始的整数数组 nums 和两个整数 key 和 k 。K 近邻下标 是 nums 中的一个下标 i ，并满足至少存在一个下标 j
 * 使得 |i - j| <= k 且 nums[j] == key 。
 *
 * 以列表形式返回按 递增顺序 排序的所有 K 近邻下标。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [3,4,9,1,3,9,5], key = 9, k = 1
 * 输出：[1,2,3,4,5,6]
 * 解释：因此，nums[2] == key 且 nums[5] == key 。
 * - 对下标 0 ，|0 - 2| > k 且 |0 - 5| > k ，所以不存在 j 使得 |0 - j| <= k 且 nums[j] == key
 * 。所以 0 不是一个 K 近邻下标。
 * - 对下标 1 ，|1 - 2| <= k 且 nums[2] == key ，所以 1 是一个 K 近邻下标。
 * - 对下标 2 ，|2 - 2| <= k 且 nums[2] == key ，所以 2 是一个 K 近邻下标。
 * - 对下标 3 ，|3 - 2| <= k 且 nums[2] == key ，所以 3 是一个 K 近邻下标。
 * - 对下标 4 ，|4 - 5| <= k 且 nums[5] == key ，所以 4 是一个 K 近邻下标。
 * - 对下标 5 ，|5 - 5| <= k 且 nums[5] == key ，所以 5 是一个 K 近邻下标。
 * - 对下标 6 ，|6 - 5| <= k 且 nums[5] == key ，所以 6 是一个 K 近邻下标。
 * 因此，按递增顺序返回 [1,2,3,4,5,6] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2], key = 2, k = 2
 * 输出：[0,1,2,3,4]
 * 解释：对 nums 的所有下标 i ，总存在某个下标 j 使得 |i - j| <= k 且 nums[j] == key ，所以每个下标都是一个 K
 * 近邻下标。
 * 因此，返回 [0,1,2,3,4] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 1000
 * key 是数组 nums 中的一个整数
 * 1 <= k <= nums.length
 *
 *
 */

export {};

// @lc code=start
// 方法一：暴力解法
var findKDistantIndices = function (
  nums: number[],
  key: number,
  k: number
): number[] {
  // 第一步：收集所有等于 key 的下标位置
  const keyIndexes: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === key) {
      keyIndexes.push(i);
    }
  }

  // 第二步：检查每个位置是否为 K 近邻下标
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // 检查当前位置 i 是否至少与一个 key 位置的距离 <= k
    for (let j = 0; j < keyIndexes.length; j++) {
      if (Math.abs(i - keyIndexes[j]) <= k) {
        result.push(i);
        break; // 找到一个满足条件的就足够了，跳出内层循环
      }
    }
  }

  return result;
};

// 方法二：优化解法 - 区间合并
var findKDistantIndices = function (
  nums: number[],
  key: number,
  k: number
): number[] {
  const result: number[] = [];
  let rightBound = 0; // 记录已处理的右边界，避免重复添加
  const n = nums.length;

  // 遍历数组寻找 key
  for (let j = 0; j < n; j++) {
    if (nums[j] === key) {
      // 计算当前 key 位置 j 的影响范围 [leftBound, rightBound)
      const leftBound = Math.max(rightBound, j - k); // 左边界，避免重复
      const newRightBound = Math.min(n - 1, j + k) + 1; // 右边界

      // 将影响范围内的所有下标添加到结果中
      for (let i = leftBound; i < newRightBound; i++) {
        result.push(i);
      }

      // 更新右边界，确保下次不会重复添加
      rightBound = newRightBound;
    }
  }

  return result;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找出数组中所有满足条件的下标 i：存在至少一个下标 j，使得 |i-j| <= k 且 nums[j] == key
   - 实际上是找出所有与 key 位置距离不超过 k 的下标
   - 结果需要按递增顺序返回

2. 算法分析：

   方法一 - 暴力解法：
   - 时间复杂度：O(n × m)，其中 n 是数组长度，m 是 key 的出现次数
   - 空间复杂度：O(m)，存储 key 的位置
   - 思路：先找出所有 key 的位置，然后对每个下标检查是否在某个 key 的 k 距离内

   方法二 - 区间合并优化：
   - 时间复杂度：O(n)
   - 空间复杂度：O(1)（不考虑结果数组）
   - 思路：遍历数组，遇到 key 时直接计算其影响区间并添加，避免重复

3. 实现要点：

   方法一关键点：
   - 先收集所有 key 的下标位置
   - 对每个位置检查是否与任意一个 key 位置的距离 <= k
   - 找到一个满足条件的即可跳出内层循环

   方法二关键点：
   - 使用 rightBound 记录已处理的右边界，避免重复添加下标
   - 每次遇到 key 时，计算其影响范围 [j-k, j+k]
   - 左边界取 max(rightBound, j-k)，确保不重复
   - 右边界取 min(n-1, j+k)，确保不越界

4. 优化思路：
   - 方法二通过区间合并的思想，避免了重复检查和添加
   - 利用结果数组天然有序的特性，从左到右一次性处理
   - 减少了不必要的距离计算，提高了效率

5. 边界情况处理：
   - 数组长度为 1 的情况
   - k 值很大，覆盖整个数组的情况
   - key 不存在于数组中的情况（返回空数组）
   - 连续多个 key 的情况，需要正确处理区间合并

6. 算法选择建议：
   - 当数组较小或 key 出现次数较少时，方法一简单直观
   - 当追求最优时间复杂度时，推荐使用方法二
   - 方法二在处理密集 key 分布时优势明显
*/
