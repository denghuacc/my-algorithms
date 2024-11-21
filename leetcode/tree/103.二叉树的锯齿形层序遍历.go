/*
 * @lc app=leetcode.cn id=103 lang=golang
 *
 * [103] 二叉树的锯齿形层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/
 *
 * algorithms
 * Medium (58.06%)
 * Likes:    852
 * Dislikes: 0
 * Total Accepted:    347.8K
 * Total Submissions: 596.8K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[[1]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
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
func zigzagLevelOrder(root *TreeNode) (res [][]int) {
	if root == nil {
		return
	}

	var order func(*TreeNode, int)
	order = func(node *TreeNode, level int) {
		if len(res) == level {
			res = append(res, []int{})
		}
		res[level] = append(res[level], node.Val)
		if node.Left != nil {
			order(node.Left, level+1)
		}
		if node.Right != nil {
			order(node.Right, level+1)
		}
	}

	order(root, 0)
	for i := range res {
		if i%2 != 0 {
			reverse(res[i])
		}
	}
	return res
}

func reverse(arr []int) []int {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return arr
}

// @lc code=end
