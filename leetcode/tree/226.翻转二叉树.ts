/*
 * @lc app=leetcode.cn id=226 lang=typescript
 *
 * [226] 翻转二叉树
 *
 * https://leetcode-cn.com/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (66.27%)
 * Likes:    418
 * Dislikes: 0
 * Total Accepted:    73.3K
 * Total Submissions: 97.9K
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * 翻转一棵二叉树。
 *
 * 示例：
 *
 * 输入：
 *
 * ⁠    4
 * ⁠  /   \
 * ⁠ 2     7
 * ⁠/ \   / \
 * 1   3 6   9
 *
 * 输出：
 *
 * ⁠    4
 * ⁠  /   \
 * ⁠ 7     2
 * ⁠/ \   / \
 * 9   6 3   1
 *
 * 备注:
 * 这个问题是受到 Max Howell 的 原问题 启发的 ：
 *
 * 谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
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
var invertTree = function (root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  let right = invertTree(root.right);
  let left = invertTree(root.left);
  root.left = right;
  root.right = left;
  return root;
};

var invertTree = function (root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const queue: Array<TreeNode | null> = [];
  queue.push(root);
  while (queue.length) {
    let cur = queue.shift()!;
    [cur.left, cur.right] = [cur.right, cur.left];
    if (cur.left) queue.push(cur.left);
    if (cur.right) queue.push(cur.right);
  }
  return root;
};
// @lc code=end
