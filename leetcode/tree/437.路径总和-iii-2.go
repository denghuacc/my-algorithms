/*
 * @lc app=leetcode.cn id=437 lang=golang
 *
 * [437] 路径总和 III
 *
 * https://leetcode-cn.com/problems/path-sum-iii/description/
 *
 * algorithms
 * Medium (56.94%)
 * Likes:    1025
 * Dislikes: 0
 * Total Accepted:    104.6K
 * Total Submissions: 183.6K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 *
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * 输出：3
 * 解释：和等于 8 的路径有 3 条，如图所示。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：3
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [0,1000]
 * -10^9
 * -1000
 *
 *
 */

package leetcode

//  Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func pathSum(root *TreeNode, targetSum int) (ret int) {
	preSum := map[int]int{0: 1}
	var dfs func(*TreeNode, int)
	dfs = func(node *TreeNode, cur int) {
		if node == nil {
			return
		}
		cur += node.Val
		ret += preSum[cur-targetSum]
		preSum[cur]++
		dfs(node.Left, cur)
		dfs(node.Right, cur)
		preSum[cur]--
		return
	}
	dfs(root, 0)
	return
}

// @lc code=end
