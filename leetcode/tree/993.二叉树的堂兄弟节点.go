/*
 * @lc app=leetcode.cn id=993 lang=golang
 *
 * [993] 二叉树的堂兄弟节点
 *
 * https://leetcode-cn.com/problems/cousins-in-binary-tree/description/
 *
 * algorithms
 * Easy (55.40%)
 * Likes:    194
 * Dislikes: 0
 * Total Accepted:    40K
 * Total Submissions: 72.2K
 * Testcase Example:  '[1,2,3,4]\n4\n3'
 *
 * 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
 *
 * 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点。
 *
 * 我们给出了具有唯一值的二叉树的根节点 root ，以及树中两个不同节点的值 x 和 y 。
 *
 * 只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：root = [1,2,3,4], x = 4, y = 3
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 *
 *
 * 输入：root = [1,2,3,null,4], x = 2, y = 3
 * 输出：false
 *
 *
 *
 * 提示：
 *
 *
 * 二叉树的节点数介于 2 到 100 之间。
 * 每个节点的值都是唯一的、范围为 1 到 100 的整数。
 *
 *
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

// dfs
func isCousins2(root *TreeNode, x int, y int) bool {
	var (
		xParent, yParent *TreeNode
		xDeep, yDeep     int
		xFound, yFound   bool
		dfs              func(node, parent *TreeNode, deep int)
	)

	dfs = func(node, parent *TreeNode, deep int) {
		if node == nil {
			return
		}

		if node.Val == x {
			xParent, xDeep, xFound = parent, deep, true
		} else if node.Val == y {
			yParent, yDeep, yFound = parent, deep, true
		}

		if xFound && yFound {
			return
		}

		dfs(node.Left, node, deep+1)

		if xFound && yFound {
			return
		}

		dfs(node.Right, node, deep+1)
	}

	dfs(root, nil, 0)
	return xDeep == yDeep && xParent != yParent
}

// @lc code=start
// bfs
func isCousins(root *TreeNode, x int, y int) bool {
	var (
		xParent, yParent *TreeNode
		xDeep, yDeep     int
		xFound, yFound   bool
		update           func(node, parent *TreeNode, deep int)
	)

	update = func(node, parent *TreeNode, deep int) {
		if node.Val == x {
			xParent, xDeep, xFound = parent, deep, true
		} else if node.Val == y {
			yParent, yDeep, yFound = parent, deep, true
		}
	}

	type pair struct {
		node *TreeNode
		deep int
	}

	queue := []pair{{root, 0}}
	update(root, nil, 0)

	for len(queue) > 0 {
		node, deep := queue[0].node, queue[0].deep
		queue = queue[1:]
		if node.Left != nil {
			queue = append(queue, pair{node.Left, deep + 1})
			update(node.Left, node, deep+1)
		}
		if node.Right != nil {
			queue = append(queue, pair{node.Right, deep + 1})
			update(node.Right, node, deep+1)
		}
		if xFound && yFound {
			break
		}
	}

	return xParent != yParent && xDeep == yDeep
}

// @lc code=end
