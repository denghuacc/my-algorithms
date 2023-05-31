/*
 * @lc app=leetcode.cn id=1110 lang=typescript
 *
 * [1110] 删点成林
 *
 * https://leetcode.cn/problems/delete-nodes-and-return-forest/description/
 *
 * algorithms
 * Medium (64.92%)
 * Likes:    241
 * Dislikes: 0
 * Total Accepted:    24.4K
 * Total Submissions: 36.3K
 * Testcase Example:  '[1,2,3,4,5,6,7]\n[3,5]'
 *
 * 给出二叉树的根节点 root，树上每个节点都有一个不同的值。
 *
 * 如果节点值在 to_delete 中出现，我们就把该节点从树上删去，最后得到一个森林（一些不相交的树构成的集合）。
 *
 * 返回森林中的每棵树。你可以按任意顺序组织答案。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,6,7], to_delete = [3,5]
 * 输出：[[1,2,null,4],[6],[7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,4,null,3], to_delete = [3]
 * 输出：[[1,2,4]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数最大为 1000。
 * 每个节点都有一个介于 1 到 1000 之间的值，且各不相同。
 * to_delete.length <= 1000
 * to_delete 包含一些从 1 到 1000、各不相同的值。
 *
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

// @lc code=start
function delNodes(
  root: TreeNode | null,
  to_delete: number[]
): Array<TreeNode | null> {
  const toDeleteSet = new Set(to_delete);
  const nodes: Array<TreeNode | null> = [];
  dfs(root, true, toDeleteSet, nodes);
  return nodes;

  function dfs(
    node: TreeNode | null,
    isRoot: boolean,
    toDeleteSet: Set<number>,
    nodes: Array<TreeNode | null>
  ): TreeNode | null {
    if (!node) {
      return null;
    }
    const deleted = toDeleteSet.has(node.val);
    node.left = dfs(node.left, deleted, toDeleteSet, nodes);
    node.right = dfs(node.right, deleted, toDeleteSet, nodes);
    if (deleted) {
      return null;
    } else {
      if (isRoot) {
        nodes.push(node);
      }
      return node;
    }
  }
}
// @lc code=end
