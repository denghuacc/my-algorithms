/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (20.03%)
 * Likes:    1972
 * Dislikes: 0
 * Total Accepted:    192.3K
 * Total Submissions: 730.1K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？请你找出所有满足条件且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例：
 *
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */

// @lc code=start
/**
 * 双指针解法 - 三数之和
 * 通过排序 + 双指针避免重复组合
 */
var threeSum = function (nums: number[]): number[][] {
  const result: number[][] = [];
  const n = nums.length;

  // 排序是关键：便于跳过重复元素和使用双指针
  nums.sort((a, b) => a - b);

  // 固定第一个数，用双指针寻找另外两个数
  for (let i = 0; i < n - 2; i++) {
    // 优化：如果第一个数大于0，后面都是正数，不可能和为0
    if (nums[i] > 0) break;

    // 跳过重复的第一个数，避免重复组合
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1; // 左指针从i+1开始
    let right = n - 1; // 右指针从末尾开始

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // 找到一个有效组合
        result.push([nums[i], nums[left], nums[right]]);

        // 跳过重复的左指针元素
        while (left < right && nums[left] === nums[left + 1]) left++;
        // 跳过重复的右指针元素
        while (left < right && nums[right] === nums[right - 1]) right--;

        // 移动双指针继续寻找
        left++;
        right--;
      } else if (sum < 0) {
        // 和太小，需要增大，移动左指针
        left++;
      } else {
        // 和太大，需要减小，移动右指针
        right--;
      }
    }
  }

  return result;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在数组中找三个数使得和为0，且不能有重复的三元组
   - 需要处理重复元素，避免重复组合

2. 算法分析：
   - 时间复杂度：O(n²) - 外层循环O(n)，内层双指针O(n)
   - 空间复杂度：O(logn) - 排序所需的额外空间
   - 算法类型：双指针 + 排序

3. 实现要点：
   - 排序：使数组有序，便于跳过重复元素和使用双指针
   - 三层去重：
     * 第一个数去重：i > 0 && nums[i] === nums[i-1]
     * 第二个数去重：left < right && nums[left] === nums[left+1]
     * 第三个数去重：left < right && nums[right] === nums[right-1]
   - 优化剪枝：如果第一个数大于0，直接break

4. 优化思路：
   - 早期终止：当nums[i] > 0时直接break
   - 重复跳过：在三个层次都进行重复元素跳过
   - 双指针收缩：根据sum的大小来移动指针
*/
