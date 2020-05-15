/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
 *
 * https://leetcode-cn.com/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (51.32%)
 * Likes:    210
 * Dislikes: 0
 * Total Accepted:    44K
 * Total Submissions: 74.3K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 * 给定如下二叉树，以及目标和 sum = 22，
 *
 * ⁠             5
 * ⁠            / \
 * ⁠           4   8
 * ⁠          /   / \
 * ⁠         11  13  4
 * ⁠        /  \    / \
 * ⁠       7    2  5   1
 *
 *
 * 返回:
 *
 * [
 * ⁠  [5,4,11,2],
 * ⁠  [5,8,4,5]
 * ]
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
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 * recursive
 */
var pathSum = function (root, sum) {
  const ret = [];
  _pathSum(root, sum, ret, []);
  return ret;

  function _pathSum(root, sum, ret, path) {
    if (!root) return;
    path = [...path, root.val];
    if (!root.left && !root.right && root.val === sum) {
      ret.push(path);
      return;
    }
    _pathSum(root.left, sum - root.val, ret, path);
    _pathSum(root.right, sum - root.val, ret, path);
  }
};

// iterative
var pathSum = function (root, sum) {
  if (!root) return [];
  const stack = [[root, sum, [root.val]]];
  const ret = [];

  while (stack.length) {
    const [node, num, path] = stack.pop();
    if (!node.left && !node.right && node.val === num) {
      ret.push(path);
    }

    if (node.right) {
      stack.push([node.right, num - node.val, [...path, node.right.val]]);
    }

    if (node.left) {
      stack.push([node.left, num - node.val, [...path, node.left.val]]);
    }
  }

  return ret;
};
// @lc code=end
