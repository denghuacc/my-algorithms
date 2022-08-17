/*
 * @lc app=leetcode.cn id=1302 lang=golang
 *
 * [1302] 层数最深叶子节点的和
 *
 * https://leetcode.cn/problems/deepest-leaves-sum/description/
 *
 * algorithms
 * Medium (82.59%)
 * Likes:    105
 * Dislikes: 0
 * Total Accepted:    34.8K
 * Total Submissions: 41K
 * Testcase Example:  '[1,2,3,4,5,null,6,7,null,null,null,null,8]'
 *
 * 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 * 输出：15
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 * 输出：19
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [1, 10^4] 之间。
 * 1
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
func deepestLeavesSum(root *TreeNode) (sum int) {
	maxLevel := -1
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, level int) {
		if node != nil {
			if level > maxLevel {
				maxLevel = level
				sum = node.Val
			} else if level == maxLevel {
				sum += node.Val
			}
			if node.Left != nil {
				dfs(node.Left, level+1)
			}
			if node.Right != nil {
				dfs(node.Right, level+1)
			}
		}
	}
	dfs(root, 0)
	return
}

// @lc code=end
