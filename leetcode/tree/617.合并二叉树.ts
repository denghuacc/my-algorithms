/*
 * @lc app=leetcode.cn id=617 lang=typescript
 *
 * [617] 合并二叉树
 *
 * https://leetcode-cn.com/problems/merge-two-binary-trees/description/
 *
 * algorithms
 * Easy (77.23%)
 * Likes:    486
 * Dislikes: 0
 * Total Accepted:    76.3K
 * Total Submissions: 98.3K
 * Testcase Example:  '[1,3,2,5]\n[2,1,3,null,4,null,7]'
 *
 * 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
 *
 * 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL
 * 的节点将直接作为新二叉树的节点。
 *
 * 示例 1:
 *
 *
 * 输入:
 * Tree 1                     Tree 2
 * ⁠         1                         2
 * ⁠        / \                       / \
 * ⁠       3   2                     1   3
 * ⁠      /                           \   \
 * ⁠     5                             4   7
 * 输出:
 * 合并后的树:
 * 3
 * / \
 * 4   5
 * / \   \
 * 5   4   7
 *
 *
 * 注意: 合并必须从两个树的根节点开始。
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
var mergeTrees = function (
  t1: TreeNode | null,
  t2: TreeNode | null
): TreeNode | null {
  if (!t1 && !t2) return null;
  if (!t1 && t2) return t2;
  if (t1 && !t2) return t1;
  const root = new TreeNode(t1!.val + t2!.val);
  root.left = mergeTrees(t1!.left, t2!.left);
  root.right = mergeTrees(t1!.right, t2!.right);
  return root;
};

// bfs
var mergeTrees = function (
  t1: TreeNode | null,
  t2: TreeNode | null
): TreeNode | null {
  if (!t1 && !t2) return null;
  if (!t1 && t2) return t2;
  if (t1 && !t2) return t1;

  const queue: TreeNode[] = [];
  const queue1: TreeNode[] = [];
  const queue2: TreeNode[] = [];
  const t = new TreeNode(t1!.val + t2!.val);
  queue.push(t);
  queue1.push(t1!);
  queue2.push(t2!);

  while (queue1.length || queue2.length) {
    const node = queue.shift()!;
    const node1 = queue1.shift()!;
    const node2 = queue2.shift()!;

    const left1 = node1.left;
    const right1 = node1.right;
    const left2 = node2.left;
    const right2 = node2.right;

    if (left1 && left2) {
      const left = new TreeNode(left1.val + left2.val);
      node.left = left;
      queue.push(left);
      queue1.push(left1);
      queue2.push(left2);
    } else if (left1) {
      node.left = left1;
    } else if (left2) {
      node.left = left2;
    }

    if (right1 && right2) {
      const right = new TreeNode(right1.val + right2.val);
      node.right = right;
      queue.push(right);
      queue1.push(right1);
      queue2.push(right2);
    } else if (right1) {
      node.right = right1;
    } else if (right2) {
      node.right = right2;
    }
  }

  return t;
};
// @lc code=end
