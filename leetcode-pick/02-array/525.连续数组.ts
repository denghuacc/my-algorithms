/*
 * @lc app=leetcode.cn id=525 lang=typescript
 *
 * [525] 连续数组
 *
 * https://leetcode-cn.com/problems/contiguous-array/description/
 *
 * algorithms
 * Medium (45.88%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    16.7K
 * Total Submissions: 33.8K
 * Testcase Example:  '[0,1]'
 *
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [0,1]
 * 输出: 2
 * 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
 *
 * 示例 2:
 *
 *
 * 输入: nums = [0,1,0]
 * 输出: 2
 * 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 *
 *
 */

export {};

// @lc code=start
/**
 * 哈希表 + 前缀和解法
 * 将0转换为-1，问题转化为寻找和为0的最长子数组
 */
function findMaxLength(nums: number[]): number {
  let maxLength = 0;
  // 存储每个前缀和第一次出现的位置
  const sumToIndex: Map<number, number> = new Map();
  let prefixSum = 0;

  // 初始化：前缀和为0的位置设为-1，处理从开头开始的情况
  sumToIndex.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    // 将0视为-1，1保持不变，这样相等数量的0和1对应和为0
    if (nums[i] === 1) {
      prefixSum++;
    } else {
      prefixSum--;
    }

    if (sumToIndex.has(prefixSum)) {
      // 如果当前前缀和之前出现过，说明中间的子数组和为0
      // 即这个子数组中0和1的数量相等
      const previousIndex = sumToIndex.get(prefixSum)!;
      const currentLength = i - previousIndex;
      maxLength = Math.max(maxLength, currentLength);
    } else {
      // 记录这个前缀和第一次出现的位置
      sumToIndex.set(prefixSum, i);
    }
  }

  return maxLength;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到包含相同数量0和1的最长连续子数组
   - 转换思路：将0看作-1，问题变为寻找和为0的最长子数组
   - 利用前缀和的性质：如果两个位置的前缀和相同，那么它们之间的子数组和为0

2. 算法分析：
   - 时间复杂度：O(n) - 遍历数组一次，哈希表操作O(1)
   - 空间复杂度：O(n) - 最坏情况下哈希表存储n个不同的前缀和
   - 算法类型：哈希表 + 前缀和

3. 实现要点：
   - 数值转换：0 → -1, 1 → 1，使得相等数量的0和1对应和为0
   - 前缀和记录：用哈希表记录每个前缀和第一次出现的位置
   - 初始化技巧：设置sumToIndex[0] = -1，处理从索引0开始的情况
   - 长度计算：当前位置 - 第一次出现位置 = 中间子数组长度

4. 优化思路：
   - 核心转换：0/1平衡问题 → 前缀和相等问题
   - 哈希表优化：只存储每个前缀和的第一次出现位置（保证最长）
   - 一次遍历：边计算前缀和边查找，避免多次遍历
   - 空间优化：理论上可以用数组代替哈希表，但前缀和范围是[-n,n]

例子分析：nums = [0,1,0]
- i=0: num=0 → sum=-1, map=[(0,-1),(-1,0)]
- i=1: num=1 → sum=0, sum在map中，length = 1-(-1) = 2
- i=2: num=0 → sum=-1, sum在map中，length = 2-0 = 2
最大长度为2
*/
