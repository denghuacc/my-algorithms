/*
 * @lc app=leetcode.cn id=2610 lang=typescript
 *
 * [2610] 转换二维数组
 *
 * https://leetcode.cn/problems/convert-an-array-into-a-2d-array-with-conditions/description/
 *
 * algorithms
 * Medium (84.13%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    22.4K
 * Total rowmissions: 25.7K
 * Testcase Example:  '[1,3,4,1,2,3,1]'
 *
 * 给你一个整数数组 nums 。请你创建一个满足以下条件的二维数组：
 *
 *
 * 二维数组应该 只 包含数组 nums 中的元素。
 * 二维数组中的每一行都包含 不同 的整数。
 * 二维数组的行数应尽可能 少 。
 *
 *
 * 返回结果数组。如果存在多种答案，则返回其中任何一种。
 *
 * 请注意，二维数组的每一行上可以存在不同数量的元素。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,3,4,1,2,3,1]
 * 输出：[[1,3,4,2],[1,3],[1]]
 * 解释：根据题目要求可以创建包含以下几行元素的二维数组：
 * - 1,3,4,2
 * - 1,3
 * - 1
 * nums 中的所有元素都有用到，并且每一行都由不同的整数组成，所以这是一个符合题目要求的答案。
 * 可以证明无法创建少于三行且符合题目要求的二维数组。
 *
 * 示例 2：
 *
 * 输入：nums = [1,2,3,4]
 * 输出：[[4,3,2,1]]
 * 解释：nums 中的所有元素都不同，所以我们可以将其全部保存在二维数组中的第一行。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * 1 <= nums[i] <= nums.length
 *
 *
 */

// @lc code=start
function findMatrix(nums: number[]): number[][] {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  const res = [];
  while (map.size > 0) {
    const row = [];
    for (const [key, val] of map) {
      row.push(key);
      map.set(key, val - 1);
      if (val - 1 === 0) {
        map.delete(key);
      }
    }
    res.push(row);
  }
  return res;
}
// @lc code=end
