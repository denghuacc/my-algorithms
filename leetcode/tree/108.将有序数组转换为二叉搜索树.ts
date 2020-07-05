/*
 * @lc app=leetcode.cn id=108 lang=typescript
 *
 * [108] 将有序数组转换为二叉搜索树
 *
 * https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/
 *
 * algorithms
 * Easy (60.12%)
 * Likes:    381
 * Dislikes: 0
 * Total Accepted:    60K
 * Total Submissions: 85.4K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 *
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 *
 * 示例:
 *
 * 给定有序数组: [-10,-3,0,5,9],
 *
 * 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 *
 * ⁠     0
 * ⁠    / \
 * ⁠  -3   9
 * ⁠  /   /
 * ⁠-10  5
 *
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
// 中序遍历
var sortedArrayToBST = function (nums: number[]): TreeNode | null {
  return toBST(0, nums.length - 1);

  function toBST(left: number, right: number) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = toBST(left, mid - 1);
    root.right = toBST(mid + 1, right);
    return root;
  }
};
// @lc code=end

var sortedArrayToBST = function (nums: number[]): TreeNode | null {
  return toBST(nums, 0, nums.length - 1);

  function toBST(nums: number[], left: number, right: number) {
    if (left > right) return null;
    let mid = Math.floor((left + right + 1) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = toBST(nums, left, mid - 1);
    root.right = toBST(nums, mid + 1, right);
    return root;
  }
};
