/*
 * @lc app=leetcode.cn id=257 lang=typescript
 *
 * [257] 二叉树的所有路径
 *
 * https://leetcode-cn.com/problems/binary-tree-paths/description/
 *
 * algorithms
 * Easy (64.93%)
 * Likes:    318
 * Dislikes: 0
 * Total Accepted:    54.2K
 * Total Submissions: 83.1K
 * Testcase Example:  '[1,2,3,null,5]'
 *
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 *
 * 输入:
 *
 * ⁠  1
 * ⁠/   \
 * 2     3
 * ⁠\
 * ⁠ 5
 *
 * 输出: ["1->2->5", "1->3"]
 *
 * 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
 *
 */

export {};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// @lc code=start
// dfs
var binaryTreePaths = function (root: TreeNode | null): string[] {
  const paths: string[] = [];
  dfs(root, "");
  return paths;

  function dfs(root: TreeNode | null, path: string) {
    if (root) {
      path += root.val;
      if (!root.left && !root.right) {
        paths.push(path);
      } else {
        path += "->";
        dfs(root.left, path);
        dfs(root.right, path);
      }
    }
  }
};

// bfs
var binaryTreePaths = function (root: TreeNode | null): string[] {
  const paths: string[] = [];
  if (!root) return paths;
  const nodeQueue: TreeNode[] = [root];
  const pathQueue: string[] = [String(root.val)];

  while (nodeQueue.length) {
    const node = nodeQueue.shift()!;
    const path = pathQueue.shift()!;

    if (!node.left && !node.right) {
      paths.push(path); 
    } else {
      if (node.left) {
        nodeQueue.push(node.left);
        pathQueue.push(path + '->'+ String(node.left.val))
      }

      if (node.right) {
        nodeQueue.push(node.right);
        pathQueue.push(path + '->'+ String(node.right.val))
      }
    }
  }

  return paths;
};
// @lc code=end
