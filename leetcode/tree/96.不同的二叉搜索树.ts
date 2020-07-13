/*
 * @lc app=leetcode.cn id=96 lang=typescript
 *
 * [96] 不同的二叉搜索树
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees/description/
 *
 * algorithms
 * Medium (55.98%)
 * Likes:    469
 * Dislikes: 0
 * Total Accepted:    38.6K
 * Total Submissions: 59.3K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
 *
 * 示例:
 *
 * 输入: 3
 * 输出: 5
 * 解释:
 * 给定 n = 3, 一共有 5 种不同结构的二叉搜索树:
 *
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 *
 */

// @lc code=start
// dp
var numTrees = function (n: number): number {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
};

// math 卡塔兰数
var numTrees = function (n: number): number {
  let c = 1;
  for (let i = 0; i < n; i++) {
    c = Math.floor((c * 2 * (2 * i + 1)) / (i + 2));
  }
  return c;
};
// @lc code=end
