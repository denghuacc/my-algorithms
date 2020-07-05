/*
 * @lc app=leetcode.cn id=119 lang=typescript
 *
 * [119] 杨辉三角 II
 *
 * https://leetcode-cn.com/problems/pascals-triangle-ii/description/
 *
 * algorithms
 * Easy (53.45%)
 * Likes:    136
 * Dislikes: 0
 * Total Accepted:    46.8K
 * Total Submissions: 77.1K
 * Testcase Example:  '3'
 *
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
 *
 *
 *
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 *
 * 示例:
 *
 * 输入: 3
 * 输出: [1,3,3,1]
 *
 *
 * 进阶：
 *
 * 你可以优化你的算法到 O(k) 空间复杂度吗？
 *
 */

// @lc code=start
// dp
var getRow = function (rowIndex: number): number[] {
  let ret = [1];
  for (let i = 0; i < rowIndex; i++) {
    ret.unshift(0); // 最前面插入 0
    for (let j = 0; j < i + 1; j++) {
      ret[j] = ret[j] + ret[j + 1];
    }
  }
  return ret;
};

// 优化
var getRow = function (rowIndex: number): number[] {
  let ret = [1];
  for (let i = 0; i < rowIndex; i++) {
    ret.unshift(0); // 最前面插入 0
    const midIndex = Math.floor((i + 1) / 2);
    for (let j = 0; j < i + 1; j++) {
      if (j > midIndex) {
        ret[j] = ret[midIndex + ((i + 1) % 2) - (j - midIndex)];
        continue;
      }
      ret[j] = ret[j] + ret[j + 1];
    }
  }
  return ret;
};
// @lc code=end
