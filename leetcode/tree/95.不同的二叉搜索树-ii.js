/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 *
 * https://leetcode-cn.com/problems/unique-binary-search-trees-ii/description/
 *
 * algorithms
 * Medium (49.42%)
 * Likes:    353
 * Dislikes: 0
 * Total Accepted:    26.7K
 * Total Submissions: 42.9K
 * Testcase Example:  '3'
 *
 * 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。
 *
 * 示例:
 *
 * 输入: 3
 * 输出:
 * [
 * [1,null,3,2],
 * [3,2,null,1],
 * [3,1,null,null,2],
 * [2,1,3],
 * [1,null,2,null,3]
 * ]
 * 解释:
 * 以上的输出对应以下 5 种不同结构的二叉搜索树：
 *
 * ⁠  1         3     3      2      1
 * ⁠   \       /     /      / \      \
 * ⁠    3     2     1      1   3      2
 * ⁠   /     /       \                 \
 * ⁠  2     1         2                 3
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 * recursion
 */
var generateTrees = function (n) {
  if (n === 0) return []
  return _generateTrees(1, n)

  function _generateTrees(start, end) {
    const allTrees = []

    if (start > end) {
      allTrees.push(null)
      return allTrees
    }

    for (let i = start; i <= end; i++) {
      let leftTrees = _generateTrees(start, i - 1)
      let rightTrees = _generateTrees(i + 1, end)

      for (const leftTree of leftTrees) {
        for (const rightTree of rightTrees) {
          const currentTree = new TreeNode(i)
          currentTree.left = leftTree
          currentTree.right = rightTree
          allTrees.push(currentTree)
        }
      }
    }
    return allTrees
  }
}
// @lc code=end
