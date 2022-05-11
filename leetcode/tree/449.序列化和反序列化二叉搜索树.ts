/*
 * @lc app=leetcode.cn id=449 lang=typescript
 *
 * [449] 序列化和反序列化二叉搜索树
 *
 * https://leetcode.cn/problems/serialize-and-deserialize-bst/description/
 *
 * algorithms
 * Medium (56.63%)
 * Likes:    288
 * Dislikes: 0
 * Total Accepted:    23.5K
 * Total Submissions: 40.4K
 * Testcase Example:  '[2,1,3]'
 *
 * 序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。
 *
 * 设计一个算法来序列化和反序列化 二叉搜索树 。 对序列化/反序列化算法的工作方式没有限制。
 * 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。
 *
 * 编码的字符串应尽可能紧凑。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [2,1,3]
 * 输出：[2,1,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数范围是 [0, 10^4]
 * 0 <= Node.val <= 10^4
 * 题目数据 保证 输入的树是一棵二叉搜索树。
 *
 *
 */

export {};

//  Definition for a binary tree node.
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
// tree
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  const preorderItems: number[] = [];
  preorder(root, preorderItems);
  return preorderItems.toString();

  function preorder(node: TreeNode | null, arr: number[]): void {
    if (!node) return;
    arr.push(node.val);
    preorder(node.left, arr);
    preorder(node.right, arr);
  }
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  if (!data) return null;
  const preorderItems = data.split(",").map(Number);
  const inOrderItems = preorderItems.slice();
  inOrderItems.sort((a, b) => a - b);

  const node = buildTree(preorderItems, inOrderItems);
  return node;

  // leetcode 105
  function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const map: Map<number, number> = new Map();
    let preIdx = 0;
    for (let i = 0; i < inorder.length; i++) {
      map.set(inorder[i], i);
    }

    return build(0, inorder.length);

    function build(left: number, right: number): TreeNode | null {
      if (left === right) return null;
      const rootVal = preorder[preIdx];
      const root = new TreeNode(rootVal);
      const index = map.get(rootVal)!;
      preIdx++;
      root.left = build(left, index);
      root.right = build(index + 1, right);
      return root;
    }
  }
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
