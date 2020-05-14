/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 *
 * https://leetcode-cn.com/problems/4sum/description/
 *
 * algorithms
 * Medium (33.27%)
 * Likes:    432
 * Dislikes: 0
 * Total Accepted:    69.9K
 * Total Submissions: 186.7K
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c
 * + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
 *
 * 注意：
 *
 * 答案中不可以包含重复的四元组。
 *
 * 示例：
 *
 * 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
 *
 * 满足要求的四元组集合为：
 * [
 * ⁠ [-1,  0, 0, 1],
 * ⁠ [-2, -1, 1, 2],
 * ⁠ [-2,  0, 0, 2]
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  let ret = [];
  if (nums.length < 4) return ret;

  let size = nums.length;
  let a;
  let b;
  let c;
  let d;

  for (a = 0; a <= size - 4; a++) {
    if (a > 0 && nums[a] === nums[a - 1]) continue;
    for (b = a + 1; b <= size - 3; b++) {
      if (b > a + 1 && nums[b] === nums[b - 1]) continue;
      c = b + 1;
      d = size - 1;
      while (c < d) {
        let sum = nums[a] + nums[b] + nums[c] + nums[d];

        if (sum < target) {
          c++;
        } else if (sum > target) {
          d--;
        } else {
          ret.push([nums[a], nums[b], nums[c], nums[d]]);

          while (c < d && nums[c + 1] === nums[c]) c++;
          while (c < d && nums[c - 1] === nums[d]) d--;
          c++;
          d--;
        }
      }
    }
  }

  return ret;
};
// @lc code=end
