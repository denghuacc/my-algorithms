/*
 * @lc app=leetcode.cn id=559 lang=golang
 *
 * [559] N 叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/description/
 *
 * algorithms
 * Easy (72.85%)
 * Likes:    205
 * Dislikes: 0
 * Total Accepted:    67.7K
 * Total Submissions: 92.6K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，找到其最大深度。
 *
 * 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 *
 * N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树的深度不会超过 1000 。
 * 树的节点数目位于 [0, 10^4] 之间。
 *
 *
 */

package leetcode

//  Definition for a Node.
type Node struct {
	Val      int
	Children []*Node
}

// @lc code=start
// recursive
func maxDepth2(root *Node) int {
	if root == nil {
		return 0
	} else if len(root.Children) == 0 {
		return 1
	} else {
		maxChildDepth := 0
		for _, child := range root.Children {
			maxChildDepth = max(maxChildDepth, maxDepth2(child))
		}
		return maxChildDepth + 1
	}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// bfs
func maxDepth(root *Node) int {
	if root == nil {
		return 0
	}
	queue := []*Node{root}
	depth := 0
	for len(queue) > 0 {
		size := len(queue)
		for size > 0 {
			node := queue[0]
			queue = queue[1:]
			for _, child := range node.Children {
				queue = append(queue, child)
			}
			size--
		}
		depth++
	}
	return depth
}

// @lc code=end
