/*
 * @lc app=leetcode.cn id=662 lang=golang
 *
 * [662] 二叉树最大宽度
 *
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/description/
 *
 * algorithms
 * Medium (41.33%)
 * Likes:    446
 * Dislikes: 0
 * Total Accepted:    60.4K
 * Total Submissions: 143.4K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给你一棵二叉树的根节点 root ，返回树的 最大宽度 。
 *
 * 树的 最大宽度 是所有层中最大的 宽度 。
 *
 *
 *
 * 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的
 * null 节点，这些 null 节点也计入长度。
 *
 * 题目数据保证答案将会在  32 位 带符号整数范围内。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,3,2,5,3,null,9]
 * 输出：4
 * 解释：最大宽度出现在树的第 3 层，宽度为 4 (5,3,null,9) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,3,2,5,null,null,9,6,null,7]
 * 输出：7
 * 解释：最大宽度出现在树的第 4 层，宽度为 7 (6,null,null,null,null,null,7) 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,3,2,5]
 * 输出：2
 * 解释：最大宽度出现在树的第 2 层，宽度为 2 (3,2) 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目范围是 [1, 3000]
 * -100 <= Node.val <= 100
 *
 *
 *
 *
 */

package leetcode

import (
	"math"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func widthOfBinaryTree(root *TreeNode) int {
	type pair struct {
		node *TreeNode
		idx  int
	}
	levels := make([][]pair, 3001)
	var dfs func(*TreeNode, int, int)
	dfs = func(node *TreeNode, idx, level int) {
		if len(levels) == level {
			levels[level] = []pair{{node, idx}}
		} else {
			levels[level] = append(levels[level], pair{node, idx})
		}
		if node.Left != nil {
			dfs(node.Left, 2*idx, level+1)
		}
		if node.Right != nil {
			dfs(node.Right, 2*idx+1, level+1)
		}
	}
	dfs(root, 0, 0)

	maxWidth := math.MinInt32
	for _, list := range levels {
		var width int
		if len(list) < 2 {
			width = 1
		} else {
			width = list[len(list)-1].idx - list[0].idx + 1
		}
		if width > maxWidth {
			maxWidth = width
		}
	}
	return maxWidth
}

// @lc code=end
