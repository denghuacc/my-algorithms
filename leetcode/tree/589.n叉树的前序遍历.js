/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/description/
 *
 * algorithms
 * Easy (74.05%)
 * Likes:    111
 * Dislikes: 0
 * Total Accepted:    50.8K
 * Total Submissions: 68.7K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的前序遍历。
 *
 * 例如，给定一个 3叉树 :
 *
 *
 *
 *
 *
 *
 *
 * 返回其前序遍历: [1,3,5,6,2,4]。
 *
 *
 *
 * 说明: 递归法很简单，你可以使用迭代法完成此题吗?
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// recursive
var preorder = function (root) {
  const ret = [];
  dfs(root);
  return ret;

  function dfs(root) {
    if (root) {
      ret.push(root.val);
      if (root.children?.length) {
        for (const child of root.children) {
          dfs(child);
        }
      }
    }
  }
};

// iterative
var preorder = function (root) {
  const ret = [];
  if (!root) return ret;
  const stack = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.pop();
    ret.push(node.val);
    let len = node.children.length;
    if (len) {
      for (let i = len - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }

  return ret;
};
// @lc code=end
