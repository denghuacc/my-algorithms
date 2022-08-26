/*
 * @lc app=leetcode.cn id=501 lang=typescript
 *
 * [501] 二叉搜索树中的众数
 *
 * https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/description/
 *
 * algorithms
 * Easy (45.81%)
 * Likes:    155
 * Dislikes: 0
 * Total Accepted:    20.3K
 * Total Submissions: 43.5K
 * Testcase Example:  '[1,null,2,2]'
 *
 * 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
 *
 * 假定 BST 有如下定义：
 *
 *
 * 结点左子树中所含结点的值小于等于当前结点的值
 * 结点右子树中所含结点的值大于等于当前结点的值
 * 左子树和右子树都是二叉搜索树
 *
 *
 * 例如：
 * 给定 BST [1,null,2,2],
 *
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  2
 *
 *
 * 返回[2].
 *
 * 提示：如果众数超过1个，不需考虑输出顺序
 *
 * 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
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
// inorder
var findMode = function (root: TreeNode | null): number[] {
  let res: number[] = [];
  let count = 0;
  let maxCount = 0;
  let lastMode!: number;

  inorder(root);
  return res;

  function inorder(node: TreeNode | null) {
    if (node) {
      if (node.left) inorder(node.left);
      if (node.val === lastMode) {
        count++;
      } else {
        count = 1;
      }
      if (count === maxCount) {
        res.push(node.val);
      } else if (count > maxCount) {
        maxCount = count;
        res = [node.val]; // replace res with new value
      }
      lastMode = node.val;
      if (node.right) inorder(node.right);
    }
  }
};
// @lc code=end
