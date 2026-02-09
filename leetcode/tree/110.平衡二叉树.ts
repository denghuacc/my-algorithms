/*
 * @lc app=leetcode.cn id=110 lang=typescript
 *
 * [110] 平衡二叉树
 *
 * https://leetcode-cn.com/problems/balanced-binary-tree/description/
 *
 * algorithms
 * Easy (45.89%)
 * Likes:    284
 * Dislikes: 0
 * Total Accepted:    64.9K
 * Total Submissions: 127.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 *
 * 本题中，一棵高度平衡二叉树定义为：
 *
 *
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
 *
 *
 * 示例 1:
 *
 * 给定二叉树 [3,9,20,null,null,15,7]
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回 true 。
 *
 * 示例 2:
 *
 * 给定二叉树 [1,2,2,3,3,null,null,4,4]
 *
 * ⁠      1
 * ⁠     / \
 * ⁠    2   2
 * ⁠   / \
 * ⁠  3   3
 * ⁠ / \
 * ⁠4   4
 *
 *
 * 返回 false 。
 *
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
// recursive top-down
/**
 * 方法一：自顶向下递归，逐节点比较高度差。
 *
 * @param root - 二叉树根节点
 * @returns 是否为平衡二叉树
 */
var isBalanced = function (root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }
  // 当前节点平衡，且左右子树也平衡
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );

  // the height of node
  function height(root: TreeNode | null): number {
    if (!root) {
      return 0;
    }
    return 1 + Math.max(height(root.left), height(root.right));
  }
};

// recursive bottom-up
/**
 * 方法二：自底向上递归，返回高度或 -1 表示失衡。
 *
 * @param root - 二叉树根节点
 * @returns 是否为平衡二叉树
 */
var isBalanced = function (root: TreeNode | null): boolean {
  // 若高度计算返回 -1，说明某处失衡
  return height(root) >= 0;

  function height(root: TreeNode | null): number {
    if (!root) {
      return 0;
    }
    const leftHeight = height(root.left);
    const rightHeight = height(root.right);
    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      // 子树已失衡或当前节点失衡，向上返回 -1
      return -1;
    } else {
      // 返回当前子树高度
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：判断二叉树是否满足“任意节点左右子树高度差不超过 1”。
   - 关键特点：平衡条件需要对每个节点成立。
   - 目标：返回是否为平衡二叉树。

2. 解题思路
   核心思想
   - 方法一（自顶向下）：对每个节点计算左右子树高度差，并递归判断子树。
   - 方法二（自底向上）：在计算高度的同时发现失衡，返回 -1 快速剪枝。

   算法步骤（方法一）
   1) 若节点为空，认为平衡。
   2) 计算左右子树高度差是否 <= 1。
   3) 递归判断左右子树是否平衡。

   算法步骤（方法二）
   1) 后序遍历计算高度。
   2) 若任意子树失衡或高度差 > 1，返回 -1。
   3) 根节点高度非 -1 则平衡。

3. 代码实现
   实现步骤
   - 方法一调用 height 计算子树高度。
   - 方法二在 height 中融合平衡判断，减少重复计算。

   关键函数说明
   - isBalanced（方法一）：逐节点校验高度差。
   - isBalanced（方法二）：返回高度或 -1 表示失衡。

4. 复杂度分析
   - 方法一时间复杂度：O(n^2)，每个节点可能重复计算高度。
   - 方法二时间复杂度：O(n)，每个节点只访问一次。
   - 空间复杂度：O(h)，递归栈深度 h 为树高。
   - 关键观察：自底向上可避免重复计算高度。

5. 示例分析
   示例一：root = [3,9,20,null,null,15,7]
   - 左右子树高度差均 <= 1，返回 true。

   示例二：root = [1,2,2,3,3,null,null,4,4]
   - 节点 2 的左右子树高度差为 2，返回 false。

   边界情况
   - 空树：平衡。
   - 只有一个节点：平衡。
   - 退化链表：若高度差超过 1 则不平衡。

6. 算法要点总结
   核心技巧
   - 方法一简单直观，但可能重复计算。
   - 方法二自底向上剪枝更高效。

   优化要点
   - 使用 -1 作为失衡标记，快速返回。
   - 避免重复求高度带来的 O(n^2)。

   类似问题
   - 计算二叉树高度与平衡性判断类问题。
   - 需要自底向上合并信息的树 DP 问题。

7. 常见错误
   - 忘记对子树递归判断，导致只检查根节点。
   - 高度差判断条件写错或漏掉绝对值。
   - 自顶向下重复计算高度导致超时。
*/
