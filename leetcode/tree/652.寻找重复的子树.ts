/*
 * @lc app=leetcode.cn id=652 lang=typescript
 *
 * [652] 寻找重复的子树
 *
 * https://leetcode.cn/problems/find-duplicate-subtrees/description/
 *
 * algorithms
 * Medium (58.80%)
 * Likes:    502
 * Dislikes: 0
 * Total Accepted:    63.8K
 * Total Submissions: 107.3K
 * Testcase Example:  '[1,2,3,4,null,2,4,null,null,4]'
 *
 * 给定一棵二叉树 root，返回所有重复的子树。
 *
 * 对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。
 *
 * 如果两棵树具有相同的结构和相同的结点值，则它们是重复的。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,null,2,4,null,null,4]
 * 输出：[[2,4],[4]]
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root = [2,1,1]
 * 输出：[[1]]
 *
 * 示例 3：
 *
 *
 *
 *
 * 输入：root = [2,2,2,3,null,3,null]
 * 输出：[[2,3],[3]]
 *
 *
 *
 * 提示：
 *
 *
 * 树中的结点数在[1,10^4]范围内。
 * -200 <= Node.val <= 200
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
var findDuplicateSubtrees = function (root: TreeNode | null): Array<TreeNode> {
  const seen: Map<string, TreeNode> = new Map();
  const res: Set<TreeNode> = new Set();
  dfs(root);
  return [...res];

  function dfs(node: TreeNode | null): string {
    if (!node) return "";
    let str = "";
    str += node.val;
    str += "(";
    str += dfs(node.left);
    str += ")(";
    str += dfs(node.right);
    if (seen.has(str)) {
      res.add(seen.get(str)!);
    } else {
      seen.set(str, node);
    }
    return str;
  }
};

var findDuplicateSubtrees = function (root: TreeNode | null): Array<TreeNode> {
  const seen: Map<string, [number, TreeNode]> = new Map();
  const res: Set<TreeNode> = new Set();
  let treeIdx = 0;
  dfs(root);
  return [...res];

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const tri: number[] = [node.val, dfs(node.left), dfs(node.right)];
    const str = tri.toString();
    if (seen.has(str)) {
      const [idx, node] = seen.get(str)!;
      res.add(node);
      return idx;
    }
    treeIdx++;
    seen.set(str, [treeIdx, node]);
    return treeIdx;
  }
};
// @lc code=end
