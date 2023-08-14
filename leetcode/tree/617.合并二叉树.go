/*
 * @lc app=leetcode.cn id=617 lang=golang
 *
 * [617] 合并二叉树
 *
 * https://leetcode.cn/problems/merge-two-binary-trees/description/
 *
 * algorithms
 * Easy (79.15%)
 * Likes:    1272
 * Dislikes: 0
 * Total Accepted:    425.4K
 * Total Submissions: 536.5K
 * Testcase Example:  '[1,3,2,5]\n[2,1,3,null,4,null,7]'
 *
 * 给你两棵二叉树： root1 和 root2 。
 *
 *
 * 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为
 * null 的节点将直接作为新二叉树的节点。
 *
 * 返回合并后的二叉树。
 *
 * 注意: 合并过程必须从两个树的根节点开始。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
 * 输出：[3,4,5,5,4,null,7]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root1 = [1], root2 = [1,2]
 * 输出：[2,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 两棵树中的节点数目在范围 [0, 2000] 内
 * -10^4 <= Node.val <= 10^4
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
// dfs
// func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
// 	if root1 == nil {
// 		return root2
// 	}
// 	if root2 == nil {
// 		return root1
// 	}
// 	root := &TreeNode{
// 		Val: root1.Val + root2.Val,
// 	}
// 	root.Left = mergeTrees(root1.Left, root2.Left)
// 	root.Right = mergeTrees(root1.Right, root2.Right)
// 	return root
// }

// bfs
func mergeTrees(root1 *TreeNode, root2 *TreeNode) *TreeNode {
	if root1 == nil {
		return root2
	}
	if root2 == nil {
		return root1
	}
	root := &TreeNode{
		Val: root1.Val + root2.Val,
	}
	queue := []*TreeNode{root}
	queue1 := []*TreeNode{root1}
	queue2 := []*TreeNode{root2}

	for len(queue1) > 0 || len(queue2) > 0 {
		node := queue[0]
		queue = queue[1:]
		node1 := queue1[0]
		queue1 = queue1[1:]
		node2 := queue2[0]
		queue2 = queue2[1:]

		left1 := node1.Left
		right1 := node1.Right
		left2 := node2.Left
		right2 := node2.Right

		if left1 != nil && left2 != nil {
			left := &TreeNode{
				Val: left1.Val + left2.Val,
			}
			node.Left = left
			queue = append(queue, left)
			queue1 = append(queue1, left1)
			queue2 = append(queue2, left2)
		} else if left1 != nil {
			node.Left = left1
		} else if left2 != nil {
			node.Left = left2
		}

		if right1 != nil && right2 != nil {
			right := &TreeNode{
				Val: right1.Val + right2.Val,
			}
			node.Right = right
			queue = append(queue, right)
			queue1 = append(queue1, right1)
			queue2 = append(queue2, right2)
		} else if right1 != nil {
			node.Right = right1
		} else if right2 != nil {
			node.Right = right2
		}
	}

	return root
}

// @lc code=end
