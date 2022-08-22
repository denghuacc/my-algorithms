/*
 * @lc app=leetcode.cn id=655 lang=golang
 *
 * [655] 输出二叉树
 *
 * https://leetcode.cn/problems/print-binary-tree/description/
 *
 * algorithms
 * Medium (65.20%)
 * Likes:    149
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 25.2K
 * Testcase Example:  '[1,2]'
 *
 * 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局
 * 。构造此格式化布局矩阵需要遵循以下规则：
 *
 *
 * 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
 * 矩阵的列数 n 应该等于 2^height+1 - 1 。
 * 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n-1)/2] 。
 * 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r+1][c-2^height-r-1] ，右子节点放置在
 * res[r+1][c+2^height-r-1] 。
 * 继续这一过程，直到树中的所有节点都妥善放置。
 * 任意空单元格都应该包含空字符串 "" 。
 *
 *
 * 返回构造得到的矩阵 res 。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2]
 * 输出：
 * [["","1",""],
 * ["2","",""]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3,null,4]
 * 输出：
 * [["","","","1","","",""],
 * ["","2","","","","3",""],
 * ["","","4","","","",""]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数在范围 [1, 2^10] 内
 * -99 <= Node.val <= 99
 * 树的深度在范围 [1, 10] 内
 *
 *
 */

package leetcode

import "fmt"

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func printTree(root *TreeNode) [][]string {
	height := getHeight(root)
	m, n := height+1, (1<<(height+1))-1
	res := make([][]string, m)
	for i := range res {
		res[i] = make([]string, n)
	}
	dfs(res, 0, (n-1)/2, root, height)
	return res
}

func dfs(res [][]string, r, c int, root *TreeNode, height int) {
	res[r][c] = fmt.Sprint(root.Val)
	if root.Left != nil {
		dfs(res, r+1, c-1<<(height-r-1), root.Left, height)
	}
	if root.Right != nil {
		dfs(res, r+1, c+1<<(height-r-1), root.Right, height)
	}
}

func getHeight(root *TreeNode) int {
	h := 0
	if root.Left != nil {
		h = max(h, getHeight(root.Left)+1)
	}
	if root.Right != nil {
		h = max(h, getHeight(root.Right)+1)
	}
	return h
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
