/*
 * @lc app=leetcode.cn id=105 lang=typescript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (55.35%)
 * Likes:    416
 * Dislikes: 0
 * Total Accepted:    58.6K
 * Total Submissions: 90.3K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 *
 * 注意:
 * 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 *
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 *
 * 返回如下的二叉树：
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
var buildTree = function (
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  const map = new Map();
  let idx = 0;
  let preIdx = 0;
  for (const num of inorder) {
    map.set(num, idx++);
  }

  return build(0, inorder.length);

  function build(left: number, right: number): TreeNode | null {
    if (left === right) return null;
    const rootVal = preorder[preIdx];
    const root = new TreeNode(rootVal); // 根节点
    const index = map.get(rootVal);
    preIdx++;
    root.left = build(left, index);
    root.right = build(index + 1, right);
    return root;
  }
};
// @lc code=end
