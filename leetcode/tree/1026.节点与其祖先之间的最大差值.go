/*
 * @lc app=leetcode.cn id=1026 lang=golang
 *
 * [1026] 节点与其祖先之间的最大差值
 *
 * https://leetcode.cn/problems/maximum-difference-between-node-and-ancestor/description/
 *
 * algorithms
 * Medium (72.48%)
 * Likes:    159
 * Dislikes: 0
 * Total Accepted:    20.8K
 * Total Submissions: 28.7K
 * Testcase Example:  '[8,3,10,1,6,null,14,null,null,4,7,13]'
 *
 * 给定二叉树的根节点 root，找出存在于 不同 节点 A 和 B 之间的最大值 V，其中 V = |A.val - B.val|，且 A 是 B
 * 的祖先。
 *
 * （如果 A 的任何子节点之一为 B，或者 A 的任何子节点是 B 的祖先，那么我们认为 A 是 B 的祖先）
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [8,3,10,1,6,null,14,null,null,4,7,13]
 * 输出：7
 * 解释：
 * 我们有大量的节点与其祖先的差值，其中一些如下：
 * |8 - 3| = 5
 * |3 - 7| = 4
 * |8 - 1| = 7
 * |10 - 13| = 3
 * 在所有可能的差值中，最大值 7 由 |8 - 1| = 7 得出。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,null,2,null,0,3]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在 2 到 5000 之间。
 * 0
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
func maxAncestorDiff(root *TreeNode) int {
	var dfs func(*TreeNode, int, int) int
	dfs = func(root *TreeNode, minVal, maxVal int) int {
		if root == nil {
			return 0
		}
		diff := max(abs(root.Val-minVal), abs(root.Val-maxVal))
		minVal = min(minVal, root.Val)
		maxVal = max(maxVal, root.Val)
		leftDiff := dfs(root.Left, minVal, maxVal)
		rightDiff := dfs(root.Right, minVal, maxVal)
		return max(diff, max(leftDiff, rightDiff))
	}
	return dfs(root, root.Val, root.Val)
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

// @lc code=end
