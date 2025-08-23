/*
 * @lc app=leetcode.cn id=128 lang=typescript
 *
 * [128] 最长连续序列
 *
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Hard (40.90%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    36.5K
 * Total Submissions: 75.1K
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组，找出最长连续序列的长度。
 *
 * 要求算法的时间复杂度为 O(n)。
 *
 * 示例:
 *
 * 输入: [100, 4, 200, 1, 3, 2]
 * 输出: 4
 * 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 */

// @lc code=start
/**
 * 排序解决方案
 *
 * 核心思想：先对数组排序，然后遍历查找最长的连续序列
 */
function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  // 对数组进行排序
  nums = nums.sort((a, b) => a - b);

  let longest = 1; // 最长连续序列长度
  let curLongest = 1; // 当前连续序列长度

  // 遍历排序后的数组
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      // 跳过重复元素
      if (nums[i] === nums[i - 1] + 1) {
        // 如果当前数字与前一个数字连续
        curLongest += 1;
      } else {
        // 如果不连续，更新最长长度并重置当前长度
        longest = Math.max(longest, curLongest);
        curLongest = 1;
      }
    }
  }

  // 返回最长长度（需要考虑最后一个连续序列）
  return Math.max(longest, curLongest);
}

/**
 * 哈希表解决方案
 *
 * 核心思想：使用Set存储所有数字，对每个数字检查其连续序列的长度
 */
function longestConsecutive2(nums: number[]): number {
  // 将所有数字加入Set，去重并提高查找效率
  const set: Set<number> = new Set(nums);

  let longest = 0; // 最长连续序列长度

  // 遍历Set中的每个数字
  for (const num of set.values()) {
    // 只有当num是连续序列的起点时才计算长度
    // 即num-1不在Set中
    if (!set.has(num - 1)) {
      let curNum = num; // 当前数字
      let curLongest = 1; // 当前连续序列长度

      // 向后查找连续的数字
      while (set.has(curNum + 1)) {
        curNum += 1;
        curLongest += 1;
      }

      // 更新最长长度
      longest = Math.max(longest, curLongest);
    }
  }

  return longest;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在未排序数组中寻找最长的连续整数序列
   - 连续序列定义：相邻数字差值为1
   - 要求时间复杂度O(n)

2. 算法分析：
   - 排序解法：
     * 时间复杂度：O(n log n)，排序占主导
     * 空间复杂度：O(1)，原地排序
   - 哈希表解法：
     * 时间复杂度：O(n)，每个数字最多访问两次
     * 空间复杂度：O(n)，Set存储所有数字

3. 两种解法的比较：
   - 排序解法：简单直观，但时间复杂度不满足要求
   - 哈希表解法：满足O(n)要求，更高效

4. 排序解法实现要点：
   - 先排序：确保数字按顺序排列
   - 去重处理：跳过重复元素
   - 连续检查：检查相邻数字是否差值为1
   - 长度统计：维护当前长度和最长长度

5. 哈希表解法实现要点：
   - Set存储：快速查找和去重
   - 起点检测：只从连续序列的起点开始计算
   - 向后扩展：从起点向后查找连续数字
   - 长度更新：实时更新最长长度

6. 关键技巧：
   - 起点优化：只从连续序列的起点开始计算，避免重复计算
   - 去重处理：使用Set自动去重
   - 边界处理：考虑空数组和单个元素的情况
   - 长度维护：正确维护当前长度和最长长度

7. 为什么哈希表解法是O(n)：
   - 每个数字最多被访问两次：一次在遍历时，一次在查找连续序列时
   - 内层while循环的总执行次数不超过n
   - 总体时间复杂度为O(n)

8. 算法步骤（排序解法）：
   - 排序数组
   - 遍历数组，检查连续性
   - 维护当前长度和最长长度
   - 返回最长长度

9. 算法步骤（哈希表解法）：
   - 将数组元素加入Set
   - 遍历Set，找到连续序列起点
   - 从起点向后扩展，计算长度
   - 更新最长长度

10. 类似问题：
    - 最长递增子序列 (300)
    - 数组中的最长连续子序列
    - 任何需要查找连续序列的问题

11. 算法优势：
    - 哈希表解法满足O(n)要求
    - 代码简洁，易于理解
    - 空间复杂度可控
    - 适合处理大规模数据

12. 边界情况处理：
    - 空数组：返回0
    - 单个元素：返回1
    - 重复元素：自动去重
    - 无连续序列：返回1

13. 优化思路：
    - 使用哈希表避免排序
    - 起点检测避免重复计算
    - 去重处理减少不必要的计算
    - 提前返回：如果找到长度为n的序列可以直接返回

14. 复杂度分析：
    - 排序解法：时间O(n log n)，空间O(1)
    - 哈希表解法：时间O(n)，空间O(n)
    - 哈希表解法在时间上更优，但需要额外空间
*/
