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
// recursive 👌
var buildTree = function (
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  const map: Map<number, number> = new Map();
  let preIdx = 0; // 前序指针
  // 中序索引映射 val -> index
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  return build(0, inorder.length);

  function build(left: number, right: number): TreeNode | null {
    if (left === right) return null;
    const rootVal = preorder[preIdx]; // 根节点的值
    const root = new TreeNode(rootVal); // 创建根节点
    const index = map.get(rootVal)!; // 根节点在中序的索引值
    preIdx++; // 递增，下一个是左子树
    root.left = build(left, index); // 根据中序遍历创建左子树
    root.right = build(index + 1, right); // 根据中序遍历创建右子树
    return root;
  }
};

// iterative 😥
var buildTree = function (
  preorder: number[],
  inorder: number[]
): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const stack: TreeNode[] = [];
  stack.push(root);
  let inIdx = 0; // 中序指针

  for (let i = 1; i < preorder.length; i++) {
    let preorderVal = preorder[i];
    let node = stack[stack.length - 1];
    if (node.val !== inorder[inIdx]) {
      node.left = new TreeNode(preorderVal); // 创建左子树
      stack.push(node.left);
    } else {
      while (stack.length && stack[stack.length - 1].val === inorder[inIdx]) {
        node = stack.pop()!; // 回溯，知道找到父节点 node 为止
        inIdx++;
      }
      node.right = new TreeNode(preorderVal); // 创建右子树
      stack.push(node.right);
    }
  }

  return root;
};
// @lc code=end
