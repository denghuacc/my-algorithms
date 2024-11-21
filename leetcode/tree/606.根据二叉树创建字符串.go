/*
 * @lc app=leetcode.cn id=606 lang=golang
 *
 * [606] 根据二叉树创建字符串
 *
 * https://leetcode-cn.com/problems/construct-string-from-binary-tree/description/
 *
 * algorithms
 * Easy (57.53%)
 * Likes:    271
 * Dislikes: 0
 * Total Accepted:    39.9K
 * Total Submissions: 66.8K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
 *
 * 空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。
 *
 * 示例 1:
 *
 *
 * 输入: 二叉树: [1,2,3,4]
 * ⁠      1
 * ⁠    /   \
 * ⁠   2     3
 * ⁠  /
 * ⁠ 4
 *
 * 输出: "1(2(4))(3)"
 *
 * 解释: 原本将是“1(2(4)())(3())”，
 * 在你省略所有不必要的空括号对之后，
 * 它将是“1(2(4))(3)”。
 *
 *
 * 示例 2:
 *
 *
 * 输入: 二叉树: [1,2,3,null,4]
 * ⁠      1
 * ⁠    /   \
 * ⁠   2     3
 * ⁠    \
 * ⁠     4
 *
 * 输出: "1(2()(4))(3)"
 *
 * 解释: 和第一个示例相似，
 * 除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。
 *
 *
 */

package leetcode

import (
	"strconv"
	"strings"
)

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func tree2str2(root *TreeNode) string {
	if root == nil {
		return ""
	}
	if root.Left == nil && root.Right == nil {
		return strconv.Itoa(root.Val)
	}
	if root.Right == nil {
		return strconv.Itoa(root.Val) + "(" + tree2str(root.Left) + ")"
	}
	return strconv.Itoa(root.Val) + "(" + tree2str(root.Left) + ")" + "(" + tree2str(root.Right) + ")"
}

func tree2str(root *TreeNode) string {
	res := &strings.Builder{}
	stack := []*TreeNode{root}
	vis := map[*TreeNode]bool{}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		if vis[node] {
			if node != root {
				res.WriteString(")")
			}
			stack = stack[:len(stack)-1]
		} else {
			vis[node] = true
			if node != root {
				res.WriteString("(")
			}
			res.WriteString(strconv.Itoa(node.Val))
			if node.Left == nil && node.Right != nil {
				res.WriteString("()")
			}
			if node.Right != nil {
				stack = append(stack, node.Right)
			}
			if node.Left != nil {
				stack = append(stack, node.Left)
			}
		}
	}
	return res.String()
}

// @lc code=end
