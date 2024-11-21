/*
 * @lc app=leetcode.cn id=105 lang=golang
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (71.21%)
 * Likes:    2215
 * Dislikes: 0
 * Total Accepted:    585.3K
 * Total Submissions: 820.8K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
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
func buildTree(preorder []int, inorder []int) *TreeNode {
	idxMap := make(map[int]int)
	for i, v := range inorder {
		idxMap[v] = i
	}
	preIdx := 0
	var build func(int, int) *TreeNode
	build = func(left, right int) *TreeNode {
		if left == right {
			return nil
		}
		rootVal := preorder[preIdx]
		idx := idxMap[rootVal]
		root := &TreeNode{Val: rootVal}
		preIdx++
		root.Left = build(left, idx)
		root.Right = build(idx+1, right)
		return root
	}
	return build(0, len(inorder))
}

// @lc code=end
