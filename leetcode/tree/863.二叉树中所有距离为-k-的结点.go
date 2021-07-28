/*
 * @lc app=leetcode.cn id=863 lang=golang
 *
 * [863] 二叉树中所有距离为 K 的结点
 *
 * https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/description/
 *
 * algorithms
 * Medium (55.01%)
 * Likes:    321
 * Dislikes: 0
 * Total Accepted:    17.1K
 * Total Submissions: 30.2K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n2'
 *
 * 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。
 *
 * 返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
 * 输出：[7,4,1]
 * 解释：
 * 所求结点为与目标结点（值为 5）距离为 2 的结点，
 * 值分别为 7，4，以及 1
 *
 *
 *
 * 注意，输入的 "root" 和 "target" 实际上是树上的结点。
 * 上面的输入仅仅是对这些对象进行了序列化描述。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定的树是非空的。
 * 树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
 * 目标结点 target 是树上的结点。
 * 0 <= K <= 1000.
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
// dfs + hash table
func distanceK(root *TreeNode, target *TreeNode, k int) (ret []int) {
	parents := map[int]*TreeNode{}
	var findParents func(*TreeNode)
	findParents = func(node *TreeNode) {
		if node.Left != nil {
			parents[node.Left.Val] = node
			findParents(node.Left)
		}
		if node.Right != nil {
			parents[node.Right.Val] = node
			findParents(node.Right)
		}
	}
	var findRet func(node *TreeNode, from *TreeNode, depth int)
	findRet = func(node *TreeNode, from *TreeNode, depth int) {
		if node == nil {
			return
		}
		if depth == k {
			ret = append(ret, node.Val)
			return
		}
		if node.Left != from {
			findRet(node.Left, node, depth+1)
		}
		if node.Right != from {
			findRet(node.Right, node, depth+1)
		}
		if parents[node.Val] != from {
			findRet(parents[node.Val], node, depth+1)
		}
	}

	findParents(root)
	findRet(target, nil, 0)
	return
}

// @lc code=end
