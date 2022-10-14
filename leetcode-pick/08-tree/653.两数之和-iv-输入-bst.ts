/*
 * @lc app=leetcode.cn id=653 lang=typescript
 *
 * [653] 两数之和 IV - 输入 BST
 *
 * https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/description/
 *
 * algorithms
 * Easy (61.83%)
 * Likes:    347
 * Dislikes: 0
 * Total Accepted:    64.5K
 * Total Submissions: 104.3K
 * Testcase Example:  '[5,3,6,2,4,null,7]\n9'
 *
 * 给定一个二叉搜索树 root 和一个目标结果 k，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 9
 * 输出: true
 *
 *
 * 示例 2：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 28
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是  [1, 10^4].
 * -10^4 <= Node.val <= 10^4
 * root 为二叉搜索树
 * -10^5 <= k <= 10^5
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
var findTarget = function (root: TreeNode | null, k: number): boolean {
  if (!root) return false;
  const stack: TreeNode[] = [];
  const set: Set<number> = new Set();
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!;
    if (set.has(root.val)) return true;
    set.add(k - root.val);
    root = root.right;
  }
  return false;
};

var findTarget = function (root: TreeNode | null, k: number): boolean {
  const set: Set<number> = new Set();
  return dfs(root, k);

  function dfs(root: TreeNode | null, k: number): boolean {
    if (!root) {
      return false;
    }
    if (set.has(k - root.val)) {
      return true;
    }
    set.add(root.val);
    return dfs(root.left, k) || dfs(root.right, k);
  }
};
// @lc code=end
