/*
 * @lc app=leetcode.cn id=167 lang=typescript
 *
 * [167] 两数之和 II - 输入有序数组
 *
 * https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * algorithms
 * Easy (46.27%)
 * Likes:    294
 * Dislikes: 0
 * Total Accepted:    93.9K
 * Total Submissions: 174.3K
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
 *
 * 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
 *
 * 说明:
 *
 *
 * 返回的下标值（index1 和 index2）不是从零开始的。
 * 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
 *
 *
 * 示例:
 *
 * 输入: numbers = [2, 7, 11, 15], target = 9
 * 输出: [1,2]
 * 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 *
 */

// @lc code=start
/**
 * 方法一：双指针解法（推荐）
 * 利用数组有序的特性，用双指针从两端向中间收缩
 */
var twoSum = function (numbers: number[], target: number): number[] {
  let left = 0; // 左指针指向数组开始
  let right = numbers.length - 1; // 右指针指向数组末尾

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // 找到目标，返回1-based索引
      return [left + 1, right + 1];
    } else if (sum < target) {
      // 和太小，需要增大，移动左指针
      left++;
    } else {
      // 和太大，需要减小，移动右指针
      right--;
    }
  }

  // 根据题目保证有解，这里不会执行到
  return [-1, -1];
};

/**
 * 方法二：二分查找解法
 * 固定一个数，用二分查找另一个数
 */
function twoSumBinarySearch(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i]; // 需要找的另一个数

    // 在i+1到末尾的范围内二分查找complement
    let left = i + 1;
    let right = numbers.length - 1;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (numbers[mid] === complement) {
        // 找到目标，返回1-based索引
        return [i + 1, mid + 1];
      } else if (numbers[mid] < complement) {
        // 中间值太小，在右半部分查找
        left = mid + 1;
      } else {
        // 中间值太大，在左半部分查找
        right = mid - 1;
      }
    }
  }

  // 根据题目保证有解，这里不会执行到
  return [-1, -1];
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在有序数组中找两个数，使得它们的和等于目标值
   - 数组已排序，可以利用这个性质优化算法
   - 返回1-based的索引位置

2. 算法分析：
   方法一（双指针）：
   - 时间复杂度：O(n) - 每个元素最多被访问一次
   - 空间复杂度：O(1) - 只使用常数额外空间
   
   方法二（二分查找）：
   - 时间复杂度：O(n log n) - 外层循环O(n)，内层二分查找O(log n)
   - 空间复杂度：O(1) - 只使用常数额外空间

3. 实现要点：
   - 双指针法：利用数组有序性，根据sum与target的关系移动指针
   - 二分查找法：固定一个数，在剩余范围内二分查找另一个数
   - 索引转换：题目要求返回1-based索引，需要+1

4. 优化思路：
   - 双指针法是最优解，充分利用了数组有序的特性
   - 相比哈希表解法，双指针法空间复杂度更优
   - 相比二分查找，双指针法时间复杂度更优
   - 每次比较后都能排除一半的可能性
*/
