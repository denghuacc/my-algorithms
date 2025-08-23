/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (55.92%)
 * Likes:    454
 * Dislikes: 0
 * Total Accepted:    110.3K
 * Total Submissions: 177.6K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 示例 1:
 *
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 *
 * 说明:
 *
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 *
 */

// @lc code=start
/**
 * 寻找第k个最大元素 - 快速选择算法
 * 核心思想：基于快速排序的分区思想，只递归处理包含目标元素的那一半
 */
var findKthLargest = function (nums: number[], k: number): number {
  const n = nums.length;
  // 将问题转换为寻找第(n-k)个最小元素
  return quickSelect(0, n - 1, n - k);

  /**
   * 快速选择算法
   * @param left 左边界
   * @param right 右边界
   * @param targetIndex 目标索引
   * @returns 目标索引位置的元素值
   */
  function quickSelect(
    left: number,
    right: number,
    targetIndex: number
  ): number {
    // 随机选择pivot，避免最坏情况
    const randomIndex = Math.floor(Math.random() * (right - left + 1) + left);
    const pivotIndex = partition(left, right, randomIndex);

    // 根据pivot位置决定递归方向
    if (targetIndex === pivotIndex) {
      return nums[targetIndex];
    } else if (targetIndex < pivotIndex) {
      return quickSelect(left, pivotIndex - 1, targetIndex);
    } else {
      return quickSelect(pivotIndex + 1, right, targetIndex);
    }
  }

  /**
   * 分区函数 - 将数组分为两部分
   * @param left 左边界
   * @param right 右边界
   * @param pivotIndex pivot的索引
   * @returns pivot的最终位置
   */
  function partition(left: number, right: number, pivotIndex: number) {
    const pivot = nums[pivotIndex];
    swap(nums, pivotIndex, right); // 将pivot移到最右边

    let storeIndex = left; // 存储小于pivot的元素的位置

    // 遍历数组，将小于pivot的元素移到左边
    for (let i = left; i <= right; i++) {
      if (nums[i] < pivot) {
        swap(nums, storeIndex, i);
        storeIndex++;
      }
    }

    swap(nums, storeIndex, right); // 将pivot放到正确位置
    return storeIndex;
  }

  /**
   * 交换数组中两个元素的位置
   * @param arr 数组
   * @param a 第一个元素的索引
   * @param b 第二个元素的索引
   */
  function swap(arr: number[], a: number, b: number) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：在未排序数组中找到第k个最大的元素
   - 关键特点：不需要完全排序，只需要找到特定位置的元素
   - 目标：返回第k个最大元素的值

2. 算法分析：
   - 时间复杂度：平均O(n)，最坏O(n²) - 快速选择算法
   - 空间复杂度：O(1) - 原地操作，只使用常数额外空间
   - 算法类型：快速选择算法（QuickSelect）

3. 实现要点：
   - 关键数据结构：随机选择pivot进行分区
   - 核心算法步骤：
     1. 随机选择一个pivot元素
     2. 使用partition函数将数组分为两部分
     3. 根据pivot的位置决定递归处理左半部分还是右半部分
   - 边界情况处理：数组为空、k超出范围、重复元素

4. 优化思路：
   - 随机选择pivot避免最坏情况，提高平均性能
   - 使用原地交换减少空间使用
   - 将问题转换为寻找第(n-k)个最小元素，简化逻辑
   - 在partition过程中直接进行元素交换

5. 核心技巧：
   - 快速选择：基于快速排序的分区思想，但只递归处理包含目标元素的那一半
   - 随机pivot：避免在已排序数组上的最坏情况
   - 分区策略：将小于pivot的元素放在左边，大于pivot的元素放在右边
   - 索引转换：第k个最大元素 = 第(n-k)个最小元素

6. 类似问题：
   - 数组中的第k个最小元素：类似思路，直接寻找第k个最小元素
   - 寻找中位数：k = n/2 的特殊情况
   - 寻找最小的k个数：可以找到第k个最小元素后，返回前k个元素

7. 算法变体：
   - 堆排序：使用最小堆维护k个最大元素，时间复杂度O(n log k)
   - 排序后选择：先排序再选择，时间复杂度O(n log n)
   - 桶排序：对于有范围限制的整数，可以使用桶排序优化

8. 性能对比：
   - 快速选择：平均O(n)，原地操作，适合大数据集
   - 堆排序：O(n log k)，需要额外空间，适合k较小的情况
   - 排序选择：O(n log n)，简单但效率较低
*/
