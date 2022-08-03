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
  let postIdx = postorder.length - 1; // postorder pointer
  // create a map: val -> inorderIndex
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  return build(0, inorder.length);

  function build(left: number, right: number): TreeNode | null {
    if (left === right) return null;
    const rootVal = postorder[postIdx];
    const root = new TreeNode(rootVal);
    const index = map.get(rootVal)!; // get index of root value in the Map
    postIdx--; // the next postInorder value is right child
    root.right = build(index + 1, right);
    root.left = build(left, index);
    return root;
  }
};

// iterative 😥
var buildTree = function (
  inorder: number[],
  postorder: number[]
): TreeNode | null {
  if (!postorder.length || !inorder.length) return null;
  const root = new TreeNode(postorder[postorder.length - 1]);
  const stack: TreeNode[] = [];
  stack.push(root);
  let inorderIdx = inorder.length - 1; // inorder pointer from max index

  for (let i = postorder.length - 2; i >= 0; i--) {
    const postorderVal = postorder[i];
    let node = stack[stack.length - 1];
    if (node.val !== inorder[inorderIdx]) {
      node.right = new TreeNode(postorderVal); // create right child
      stack.push(node.right);
    } else {
      while (
        stack.length &&
        stack[stack.length - 1].val === inorder[inorderIdx]
      ) {
        node = stack.pop()!; // backtrack until find parent node
        inorderIdx--;
      }
      node.left = new TreeNode(postorderVal); // create left child
      stack.push(node.left);
    }
  }

  return root;
};
// @lc code=end
