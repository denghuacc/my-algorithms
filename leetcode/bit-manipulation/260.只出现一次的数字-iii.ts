/*
 * @lc app=leetcode.cn id=260 lang=typescript
 *
 * [260] 只出现一次的数字 III
 *
 * https://leetcode-cn.com/problems/single-number-iii/description/
 *
 * algorithms
 * Medium (61.59%)
 * Likes:    210
 * Dislikes: 0
 * Total Accepted:    19K
 * Total Submissions: 26.5K
 * Testcase Example:  '[1,2,1,3,2,5]'
 *
 * 给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。
 *
 * 示例 :
 *
 * 输入: [1,2,1,3,2,5]
 * 输出: [3,5]
 *
 * 注意：
 *
 *
 * 结果输出的顺序并不重要，对于上面的例子， [5, 3] 也是正确答案。
 * 你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？
 *
 *
 */

export {};
// @lc code=start
var singleNumber = function (nums: number[]): number[] {
  const map = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const ret = [];
  let i = 0;

  for (const pair of map.entries()) {
    if (pair[1] === 1) {
      ret[i++] = pair[0];
    }
  }

  return ret;
};

var singleNumber = function (nums: number[]): number[] {
  let bitMask = 0;

  for (const num of nums) {
    bitMask ^= num;
  }

  let diff = bitMask & -bitMask;

  let x = 0;

  for (const num of nums) {
    if ((num & diff) !== 0) {
      x ^= num;
    }
  }

  return [x, bitMask ^ x];
};
// @lc code=end
