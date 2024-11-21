/*
 * @lc app=leetcode.cn id=429 lang=golang
 *
 * [429] N 叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (71.59%)
 * Likes:    231
 * Dislikes: 0
 * Total Accepted:    87K
 * Total Submissions: 121.2K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
 *
 * 树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[[1],[3,2,4],[5,6]]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树的高度不会超过 1000
 * 树的节点总数在 [0, 10^4] 之间
 *
 *
 */

package leetcode

// Definition for a Node.
type Node struct {
	Val      int
	Children []*Node
}

// @lc code=start
func levelOrder2(root *Node) [][]int {
	if root == nil {
		return [][]int{}
	}
	var res [][]int
	var queue []*Node
	queue = append(queue, root)
	for len(queue) > 0 {
		var level []int
		size := len(queue)
		for i := 0; i < size; i++ {
			level = append(level, queue[i].Val)
			for _, v := range queue[i].Children {
				queue = append(queue, v)
			}
		}
		res = append(res, level)
		queue = queue[size:]
	}
	return res
}

func levelOrder(root *Node) (res [][]int) {
	var dfs func(root *Node, level int)
	dfs = func(root *Node, level int) {
		if root == nil {
			return
		}
		if len(res) == level {
			res = append(res, []int{})
		}
		res[level] = append(res[level], root.Val)
		for _, v := range root.Children {
			dfs(v, level+1)
		}
	}
	dfs(root, 0)
	return
}

// @lc code=end
