/*
 * @lc app=leetcode.cn id=653 lang=golang
 *
 * [653] 两数之和 IV - 输入 BST
 *
 * https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/description/
 *
 * algorithms
 * Easy (61.83%)
 * Likes:    347
 * Dislikes: 0
 * Total Accepted:    64.5K
 * Total Submissions: 104.3K
 * Testcase Example:  '[5,3,6,2,4,null,7]\n9'
 *
 * 给定一个二叉搜索树 root 和一个目标结果 k，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 9
 * 输出: true
 *
 *
 * 示例 2：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 28
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是  [1, 10^4].
 * -10^4 <= Node.val <= 10^4
 * root 为二叉搜索树
 * -10^5 <= k <= 10^5
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
func findTarget2(root *TreeNode, k int) bool {
	if root == nil {
		return false
	}
	var stack []*TreeNode
	var m = make(map[int]bool)
	for root != nil || len(stack) > 0 {
		for root != nil {
			stack = append(stack, root)
			root = root.Left
		}
		root = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if _, ok := m[k-root.Val]; ok {
			return true
		}
		m[root.Val] = true
		root = root.Right
	}
	return false
}

func findTarget(root *TreeNode, k int) bool {
	set := make(map[int]bool)
	var dfs func(root *TreeNode, k int) bool
	dfs = func(root *TreeNode, k int) bool {
		if root == nil {
			return false
		}
		if set[k-root.Val] {
			return true
		}
		set[root.Val] = true
		return dfs(root.Left, k) || dfs(root.Right, k)
	}

	return dfs(root, k)

}

// @lc code=end
