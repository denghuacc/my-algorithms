/*
 * @lc app=leetcode.cn id=687 lang=golang
 *
 * [687] 最长同值路径
 *
 * https://leetcode.cn/problems/longest-univalue-path/description/
 *
 * algorithms
 * Medium (45.40%)
 * Likes:    633
 * Dislikes: 0
 * Total Accepted:    55.3K
 * Total Submissions: 120.2K
 * Testcase Example:  '[5,4,5,1,1,null,5]'
 *
 * 给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。
 *
 * 两个节点之间的路径长度 由它们之间的边数表示。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：root = [5,4,5,1,1,5]
 * 输出：2
 *
 *
 * 示例 2:
 *
 *
 *
 *
 * 输入：root = [1,4,5,4,4,5]
 * 输出：2
 *
 *
 *
 *
 * 提示:
 *
 *
 * 树的节点数的范围是 [0, 10^4]
 * -1000 <= Node.val <= 1000
 * 树的深度将不超过 1000
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
func longestUnivaluePath(root *TreeNode) (res int) {
	var dfs func(*TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		leftPath, rightPath := dfs(node.Left), dfs(node.Right)
		left, right := 0, 0
		if node.Left != nil && node.Left.Val == node.Val {
			left = leftPath + 1
		}
		if node.Right != nil && node.Right.Val == node.Val {
			right = rightPath + 1
		}

		res = max(res, left+right)
		return max(left, right)
	}
	dfs(root)
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
