/*
 * @lc app=leetcode.cn id=1110 lang=golang
 *
 * [1110] 删点成林
 *
 * https://leetcode.cn/problems/delete-nodes-and-return-forest/description/
 *
 * algorithms
 * Medium (64.92%)
 * Likes:    241
 * Dislikes: 0
 * Total Accepted:    24.4K
 * Total Submissions: 36.3K
 * Testcase Example:  '[1,2,3,4,5,6,7]\n[3,5]'
 *
 * 给出二叉树的根节点 root，树上每个节点都有一个不同的值。
 *
 * 如果节点值在 to_delete 中出现，我们就把该节点从树上删去，最后得到一个森林（一些不相交的树构成的集合）。
 *
 * 返回森林中的每棵树。你可以按任意顺序组织答案。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,6,7], to_delete = [3,5]
 * 输出：[[1,2,null,4],[6],[7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,4,null,3], to_delete = [3]
 * 输出：[[1,2,4]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数最大为 1000。
 * 每个节点都有一个介于 1 到 1000 之间的值，且各不相同。
 * to_delete.length <= 1000
 * to_delete 包含一些从 1 到 1000、各不相同的值。
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
func delNodes(root *TreeNode, to_delete []int) []*TreeNode {
	toDeleteSet := make(map[int]bool)
	for _, del := range to_delete {
		toDeleteSet[del] = true
	}
	var res []*TreeNode
	dfs(root, true, toDeleteSet, &res)
	return res
}

func dfs(node *TreeNode, isRoot bool, toDeleteSet map[int]bool, nodes *[]*TreeNode) *TreeNode {
	if node == nil {
		return nil
	}
	deleted := toDeleteSet[node.Val]
	node.Left = dfs(node.Left, deleted, toDeleteSet, nodes)
	node.Right = dfs(node.Right, deleted, toDeleteSet, nodes)
	if deleted {
		return nil
	} else {
		if isRoot {
			*nodes = append(*nodes, node)
		}
		return node
	}
}

// @lc code=end
