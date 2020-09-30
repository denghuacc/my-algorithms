/*
 * @lc app=leetcode.cn id=701 lang=typescript
 *
 * [701] 二叉搜索树中的插入操作
 *
 * https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/description/
 *
 * algorithms
 * Medium (60.08%)
 * Likes:    71
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 20.6K
 * Testcase Example:  '[4,2,7,1,3]\n5'
 *
 * 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。
 *
 * 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。
 *
 * 例如,
 *
 *
 * 给定二叉搜索树:
 *
 * ⁠       4
 * ⁠      / \
 * ⁠     2   7
 * ⁠    / \
 * ⁠   1   3
 *
 * 和 插入的值: 5
 *
 *
 * 你可以返回这个二叉搜索树:
 *
 *
 * ⁠        4
 * ⁠      /   \
 * ⁠     2     7
 * ⁠    / \   /
 * ⁠   1   3 5
 *
 *
 * 或者这个树也是有效的:
 *
 *
 * ⁠        5
 * ⁠      /   \
 * ⁠     2     7
 * ⁠    / \
 * ⁠   1   3
 * ⁠        \
 * ⁠         4
 *
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
// recursive
var insertIntoBST = function (
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
};

// iterator
var insertIntoBST = function (
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (!root) return new TreeNode(val);

  let node = root;
  while (node) {
    if (val < node.val) {
      if (!node.left) {
        node.left = new TreeNode(val);
        break;
      } else {
        node = node.left;
      }
    } else if (val > node.val) {
      if (!node.right) {
        node.right = new TreeNode(val);
        break;
      } else {
        node = node.right;
      }
    }
  }

  return root;
};
// @lc code=end
