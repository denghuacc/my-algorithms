/*
 * @lc app=leetcode.cn id=101 lang=typescript
 *
 * [101] 对称二叉树
 *
 * https://leetcode-cn.com/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (44.66%)
 * Likes:    712
 * Dislikes: 0
 * Total Accepted:    119.9K
 * Total Submissions: 236.3K
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给定一个二叉树，检查它是否是镜像对称的。
 *
 *
 *
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠/ \ / \
 * 3  4 4  3
 *
 *
 *
 *
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠  \   \
 * ⁠  3    3
 *
 *
 *
 *
 * 进阶：
 *
 * 你可以运用递归和迭代两种方法解决这个问题吗？
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
// recursive
var isSymmetric = function (root: TreeNode | null): boolean {
  return isMirror(root, root);

  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return (
      t1.val === t2.val &&
      isMirror(t1.left, t2.right) &&
      isMirror(t1.right, t2.left)
    );
  }
};

// iterative
var isSymmetric = function (root: TreeNode | null): boolean {
  const queue: Array<TreeNode | null> = [];
  queue.push(root);
  queue.push(root);

  while (queue.length) {
    const t1 = queue.shift();
    const t2 = queue.shift();
    if (!t1 && !t2) continue;
    if (!t1 || !t2) return false;
    if (t1.val != t2.val) return false;
    queue.push(t1.left);
    queue.push(t2.right);
    queue.push(t1.right);
    queue.push(t2.left);
  }
  return true;
};

// iterative 2
var isSymmetric = function (root: TreeNode | null): boolean {
  const queue1: Array<TreeNode | null> = [];
  const queue2: Array<TreeNode | null> = [];
  queue1.push(root);
  queue2.push(root);

  while (queue1.length || queue2.length) {
    const t1 = queue1.shift();
    const t2 = queue2.shift();
    if (!t1 && !t2) continue;
    if (!t1 || !t2) return false;
    if (t1.val != t2.val) return false;
    queue1.push(t1.left);
    queue1.push(t1.right);
    queue2.push(t2.right);
    queue2.push(t2.left);
  }
  return true;
};
// @lc code=end
