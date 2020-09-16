/*
 * @lc app=leetcode.cn id=106 lang=typescript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (57.64%)
 * Likes:    187
 * Dislikes: 0
 * Total Accepted:    31.5K
 * Total Submissions: 46.5K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 根据一棵树的中序遍历与后序遍历构造二叉树。
 *
 * 注意:
 * 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 *
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
 *
 * 返回如下的二叉树：
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
// recursive 👌
var buildTree = function (
  inorder: number[],
  postorder: number[]
): TreeNode | null {
  const map: Map<number, number> = new Map();
  let postIdx = postorder.length - 1; // 后序指针
  // 中序索引映射 val -> index
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  return build(0, inorder.length);

  function build(left: number, right: number): TreeNode | null {
    if (left === right) return null;
    const rootVal = postorder[postIdx]; // 根节点的值
    const root = new TreeNode(rootVal); // 创建根节点
    const index = map.get(rootVal)!; // 根节点在中序的索引值
    postIdx--; // 递减，下一个是右子树
    root.right = build(index + 1, right); // 根据中序遍历创建右子树
    root.left = build(left, index); // 根据中序遍历创建左子树
    return root;
  }
};
// @lc code=end
