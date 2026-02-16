/*
 * @lc app=leetcode.cn id=1382 lang=typescript
 *
 * [1382] 将二叉搜索树变平衡
 *
 * https://leetcode.cn/problems/balance-a-binary-search-tree/description/
 *
 * algorithms
 * Medium (84.68%)
 * Likes:    3945
 * Dislikes: 103
 * Total Accepted:    328.2K
 * Total Submissions: 384.8K
 * Testcase Example:  '[1,null,2,null,3,null,4]'
 *
 * 给你一棵二叉搜索树的根节点 root，返回任意一棵包含相同节点值的平衡二叉搜索树。
 * 若有多个答案，返回任意一个即可。
 *
 * 若一棵二叉搜索树的任意节点左右子树深度差不超过 1，则该树是平衡的。
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,null,3,null,4,null,null]
 * 输出：[2,1,3,null,null,null,4]
 * 解释：这不是唯一答案，[3,1,4,null,2] 也正确。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [2,1,3]
 * 输出：[2,1,3]
 *
 *
 * 提示：
 *
 *
 * 节点数量在 [1, 10^4] 范围内
 * 1 <= Node.val <= 10^5
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function balanceBST(root: TreeNode | null): TreeNode | null {
  const inorderSeq: number[] = [];
  // 中序遍历得到有序序列
  getInorder(root);
  // 用有序序列构建平衡 BST
  return build(0, inorderSeq.length - 1);

  function getInorder(node: TreeNode | null) {
    if (!node) {
      return;
    }
    getInorder(node.left);
    inorderSeq.push(node.val);
    getInorder(node.right);
  }

  function build(left: number, right: number): TreeNode | null {
    if (left > right) {
      return null;
    }
    const mid = Math.floor((left + right) / 2);
    // 取中点作为根，保证高度尽量平衡
    const node = new TreeNode(inorderSeq[mid]);
    node.left = build(left, mid - 1);
    node.right = build(mid + 1, right);
    return node;
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：将 BST 重新组织为平衡 BST，同时保持所有节点值不变。
   - 关键特点：BST 的中序遍历结果是有序数组。
   - 目标：构造任意一棵高度平衡的 BST。

2. 解题思路
   核心思想
   - 先中序遍历得到有序序列。
   - 再用“有序数组构建平衡 BST”的方法，取中点为根递归构建。

   算法步骤
   1) 中序遍历原 BST，得到有序数组 inorderSeq。
   2) 对数组递归：
      - 取中点作为根节点；
      - 左半部分构建左子树，右半部分构建右子树。
   3) 返回构建后的根节点。

3. 代码实现
   实现步骤
   - getInorder：中序遍历获取有序数组。
   - build：从有序数组递归构建平衡 BST。

   关键函数说明
   - balanceBST：主函数，组织遍历与构建过程。
   - build：确保左右子树规模尽量接近。

4. 复杂度分析
   - 时间复杂度：O(n)，遍历与构建各 O(n)。
   - 空间复杂度：O(n)，保存中序序列与递归栈。
   - 关键观察：有序数组构建 BST 可保证平衡。

5. 示例分析
   示例一：root = [1,null,2,null,3,null,4]
   - 中序序列为 [1,2,3,4]。
   - 取中点 2 或 3 作为根，构造平衡 BST。

   示例二：root = [2,1,3]
   - 已平衡，中序序列为 [1,2,3]，构建后结构不变。

   边界情况
   - 只有一个节点：直接返回该节点。
   - 完全单链树：中序序列仍有序，构建后变平衡。

6. 算法要点总结
   核心技巧
   - BST 中序遍历得到有序数组。
   - 有序数组递归取中点即可平衡。

   优化要点
   - 递归构建避免重复节点创建。
   - 中序遍历只需一次。

   类似问题
   - 将有序数组转换为平衡 BST。
   - 需要保持元素集合不变的树结构重建。

7. 常见错误
   - 忘记中序遍历保证有序性，导致构建错误。
   - 取中点时偏向一侧，导致树不够平衡。
   - 未处理空节点导致递归异常。
*/
