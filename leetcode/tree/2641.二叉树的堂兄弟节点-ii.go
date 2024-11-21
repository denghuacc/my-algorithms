/*
 * @lc app=leetcode.cn id=2641 lang=golang
 *
 * [2641] 二叉树的堂兄弟节点 II
 *
 * https://leetcode.cn/problems/cousins-in-binary-tree-ii/description/
 *
 * algorithms
 * Medium (75.65%)
 * Likes:    48
 * Dislikes: 0
 * Total Accepted:    13.6K
 * Total Submissions: 17.9K
 * Testcase Example:  '[5,4,9,1,10,null,7]'
 *
 * 给你一棵二叉树的根 root ，请你将每个节点的值替换成该节点的所有 堂兄弟节点值的和 。
 *
 * 如果两个节点在树中有相同的深度且它们的父节点不同，那么它们互为 堂兄弟 。
 *
 * 请你返回修改值之后，树的根 root 。
 *
 * 注意，一个节点的深度指的是从树根节点到这个节点经过的边数。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [5,4,9,1,10,null,7]
 * 输出：[0,0,0,7,7,null,11]
 * 解释：上图展示了初始的二叉树和修改每个节点的值之后的二叉树。
 * - 值为 5 的节点没有堂兄弟，所以值修改为 0 。
 * - 值为 4 的节点没有堂兄弟，所以值修改为 0 。
 * - 值为 9 的节点没有堂兄弟，所以值修改为 0 。
 * - 值为 1 的节点有一个堂兄弟，值为 7 ，所以值修改为 7 。
 * - 值为 10 的节点有一个堂兄弟，值为 7 ，所以值修改为 7 。
 * - 值为 7 的节点有两个堂兄弟，值分别为 1 和 10 ，所以值修改为 11 。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root = [3,1,2]
 * 输出：[0,0,0]
 * 解释：上图展示了初始的二叉树和修改每个节点的值之后的二叉树。
 * - 值为 3 的节点没有堂兄弟，所以值修改为 0 。
 * - 值为 1 的节点没有堂兄弟，所以值修改为 0 。
 * - 值为 2 的节点没有堂兄弟，所以值修改为 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目的范围是 [1, 10^5] 。
 * 1 <= Node.val <= 10^4
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
func replaceValueInTree(root *TreeNode) *TreeNode {
	q := []*TreeNode{root}
	root.Val = 0
	for len(q) > 0 {
		q2 := []*TreeNode{}
		sum := 0
		for _, node := range q {
			if node.Left != nil {
				q2 = append(q2, node.Left)
				sum += node.Left.Val
			}
			if node.Right != nil {
				q2 = append(q2, node.Right)
				sum += node.Right.Val
			}
		}
		for _, node := range q {
			childSum := 0
			if node.Left != nil {
				childSum += node.Left.Val
			}
			if node.Right != nil {
				childSum += node.Right.Val
			}
			if node.Left != nil {
				node.Left.Val = sum - childSum
			}
			if node.Right != nil {
				node.Right.Val = sum - childSum
			}
		}
		q = q2
	}
	return root
}

// @lc code=end
