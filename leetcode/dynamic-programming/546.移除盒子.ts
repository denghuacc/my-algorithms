/*
 * @lc app=leetcode.cn id=546 lang=typescript
 *
 * [546] 移除盒子
 *
 * https://leetcode-cn.com/problems/remove-boxes/description/
 *
 * algorithms
 * Hard (51.14%)
 * Likes:    169
 * Dislikes: 0
 * Total Accepted:    7.2K
 * Total Submissions: 12.1K
 * Testcase Example:  '[1,3,2,2,2,3,4,3,1]\r'
 *
 * 给出一些不同颜色的盒子，盒子的颜色由数字表示，即不同的数字表示不同的颜色。
 * 你将经过若干轮操作去去掉盒子，直到所有的盒子都去掉为止。每一轮你可以移除具有相同颜色的连续 k 个盒子（k >= 1），这样一轮之后你将得到 k*k
 * 个积分。
 * 当你将所有盒子都去掉之后，求你能获得的最大积分和。
 *
 *
 *
 * 示例：
 *
 * 输入：boxes = [1,3,2,2,2,3,4,3,1]
 * 输出：23
 * 解释：
 * [1, 3, 2, 2, 2, 3, 4, 3, 1]
 * ----> [1, 3, 3, 4, 3, 1] (3*3=9 分)
 * ----> [1, 3, 3, 3, 1] (1*1=1 分)
 * ----> [1, 1] (3*3=9 分)
 * ----> [] (2*2=4 分)
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= boxes.length <= 100
 * 1 <= boxes[i] <= 100
 *
 *
 */

// @lc code=start
// dp
var removeBoxes = function (boxes: number[]): number {

  // dp[l][r][k] -> boxes[l, r] 加上该区间 boxes[r]的 k 个元素组成的序列的最大积分
  // [6, 3, 6, 5, 6, 7, 6, 6, 8, 6]
  // dp[1][5][3] -> [6, 3, 6, 5, 6] + 后面 3 个 6
  const dp: number[][][] = Array.from(new Array(100), () =>
    Array.from(new Array(100), () => new Array(100).fill(0))
  );

  return calculatePoints(boxes, dp, 0, boxes.length - 1, 0);

  function calculatePoints(
    boxes: number[],
    dp: number[][][],
    l: number,
    r: number,
    k: number
  ): number {
    if (l > r) return 0;
    if (dp[l][r][k] !== 0) return dp[l][r][k];
    while (r > l && boxes[r] === boxes[r - 1]) {
      r--;
      k++;
    }
    dp[l][r][k] = calculatePoints(boxes, dp, l, r - 1, 0) + (k + 1) * (k + 1);
    for (let i = l; i < r; i++) {
      if (boxes[i] === boxes[r]) {
        dp[l][r][k] = Math.max(
          dp[l][r][k],
          calculatePoints(boxes, dp, l, i, k + 1) +
            calculatePoints(boxes, dp, i + 1, r - 1, 0)
        );
      }
    }
    return dp[l][r][k];
  }
};
// @lc code=end
