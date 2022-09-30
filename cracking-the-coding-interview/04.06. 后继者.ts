/**
 * 
设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。
如果指定节点没有对应的“下一个”节点，则返回 null。

示例 1:
输入: root = [2,1,3], p = 1

  2
 / \
1   3

输出: 2

示例 2:
输入: root = [5,3,6,2,4,null,null,1], p = 6

      5
     / \
    3   6
   / \
  2   4
 /   
1

输出: null

难度：中等

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/successor-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// Definition for a binary tree node.
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

// inorder
function inorderSuccessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  const stack: TreeNode[] = [];
  let res = null;
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop()!;
    if (root.val > p.val) {
      res = root;
      break;
    }
    root = root.right;
  }
  return res;
}

export {};
