/*
 * @lc app=leetcode.cn id=106 lang=golang
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (71.80%)
 * Likes:    1178
 * Dislikes: 0
 * Total Accepted:    343.4K
 * Total Submissions: 477.3K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder
 * 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
 *
 *
 */

package leetcode

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func buildTree(inorder []int, postorder []int) *TreeNode {
	idxMap := make(map[int]int)
	for i, v := range inorder {
		idxMap[v] = i
	}
	postIdx := len(postorder) - 1
	var build func(int, int) *TreeNode
	build = func(left, right int) *TreeNode {
		if left > right {
			return nil
		}
		rootVal := postorder[postIdx]
		idx := idxMap[rootVal]
		root := &TreeNode{Val: rootVal}
		postIdx--
		root.Right = build(idx+1, right)
		root.Left = build(left, idx-1)
		return root
	}
	return build(0, len(inorder)-1)
}

// @lc code=end
