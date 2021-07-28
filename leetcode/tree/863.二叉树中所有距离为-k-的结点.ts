/*
 * @lc app=leetcode.cn id=863 lang=typescript
 *
 * [863] 二叉树中所有距离为 K 的结点
 *
 * https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/description/
 *
 * algorithms
 * Medium (55.01%)
 * Likes:    321
 * Dislikes: 0
 * Total Accepted:    17.1K
 * Total Submissions: 30.2K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n2'
 *
 * 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。
 *
 * 返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
 * 输出：[7,4,1]
 * 解释：
 * 所求结点为与目标结点（值为 5）距离为 2 的结点，
 * 值分别为 7，4，以及 1
 *
 *
 *
 * 注意，输入的 "root" 和 "target" 实际上是树上的结点。
 * 上面的输入仅仅是对这些对象进行了序列化描述。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定的树是非空的。
 * 树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
 * 目标结点 target 是树上的结点。
 * 0 <= K <= 1000.
 *
 *
 */

export {};

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

// @lc code=start
// dfs + hash table
function distanceK(
  root: TreeNode | null,
  target: TreeNode | null,
  k: number
): number[] {
  const parents: Map<number, TreeNode> = new Map();
  const ret: number[] = [];
  findParents(root!);
  findRet(target, null, 0);
  return ret;

  function findParents(node: TreeNode) {
    if (node.left) {
      parents.set(node.left.val, node);
      findParents(node.left);
    }
    if (node.right) {
      parents.set(node.right.val, node);
      findParents(node.right);
    }
  }

  function findRet(
    node: TreeNode | null,
    from: TreeNode | null,
    depth: number
  ) {
    if (!node) return;

    if (depth === k) {
      ret.push(node.val);
      return;
    }
    if (node.left !== from) {
      findRet(node.left, node, depth + 1);
    }
    if (node.right !== from) {
      findRet(node.right, node, depth + 1);
    }
    if (parents.get(node.val) !== from) {
      findRet(parents.get(node.val)!, node, depth + 1);
    }
  }
}
// @lc code=end
