/*
 * @lc app=leetcode.cn id=35 lang=typescript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (42.42%)
 * Likes:    475
 * Dislikes: 0
 * Total Accepted:    138.7K
 * Total Submissions: 305.7K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 你可以假设数组中无重复元素。
 *
 * 示例 1:
 *
 * 输入: [1,3,5,6], 5
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: [1,3,5,6], 2
 * 输出: 1
 *
 *
 * 示例 3:
 *
 * 输入: [1,3,5,6], 7
 * 输出: 4
 *
 *
 * 示例 4:
 *
 * 输入: [1,3,5,6], 0
 * 输出: 0
 *
 *
 */

// @lc code=start
/**
 * 方法一：线性查找
 * 简单直接的遍历方法，但时间复杂度较高
 */
function searchInsertLinear(nums: number[], target: number): number {
  // 如果目标值小于第一个元素，插入到开头
  if (nums[0] > target) return 0;

  // 遍历数组找到第一个大于等于目标值的位置
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }

  // 如果没找到，说明目标值大于所有元素，插入到末尾
  return nums.length;
}

/**
 * 方法二：二分查找（推荐）
 * 在有序数组中查找插入位置的最优解法
 *
 * 核心思想：
 * 1. 利用数组有序的特性，使用二分查找
 * 2. 寻找第一个大于等于target的位置
 * 3. 如果找到相等的值，返回其索引
 * 4. 如果没找到，left指针最终会指向插入位置
 */
function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // 防止溢出的中点计算方式
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      // 找到目标值，直接返回索引
      return mid;
    } else if (nums[mid] > target) {
      // 中点值太大，在左半部分继续查找
      right = mid - 1;
    } else {
      // 中点值太小，在右半部分继续查找
      left = mid + 1;
    }
  }

  // 循环结束时，left就是插入位置
  // 此时left > right，left指向第一个大于target的位置
  return left;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在有序数组中找到目标值的位置，如果不存在则返回插入位置
   - 核心是寻找"第一个大于等于target的位置"

2. 算法分析：
   - 时间复杂度：O(log n) - 二分查找的标准复杂度
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：二分查找

3. 实现要点：
   - 使用标准的二分查找模板
   - 关键在于理解循环结束条件：left > right
   - 当循环结束时，left指向的就是插入位置
   - 边界情况处理：目标值小于所有元素或大于所有元素

4. 二分查找的核心思想：
   - 每次比较都能排除一半的搜索空间
   - 维护不变量：target的插入位置在[left, right+1]区间内
   - 当nums[mid] < target时，插入位置在[mid+1, right+1]
   - 当nums[mid] >= target时，插入位置在[left, mid]

5. 边界情况分析：
   - 空数组：返回0
   - target小于所有元素：返回0
   - target大于所有元素：返回nums.length
   - target等于某个元素：返回该元素的索引

6. 示例分析：
   nums = [1,3,5,6], target = 5
   - 初始：left=0, right=3
   - 第一次：mid=1, nums[1]=3 < 5, left=2
   - 第二次：mid=2, nums[2]=5 = 5, 返回2

   nums = [1,3,5,6], target = 2
   - 初始：left=0, right=3
   - 第一次：mid=1, nums[1]=3 > 2, right=0
   - 第二次：mid=0, nums[0]=1 < 2, left=1
   - 循环结束：left=1 > right=0，返回1
*/
