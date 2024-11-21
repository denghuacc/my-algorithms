/*
 * @lc app=leetcode.cn id=590 lang=golang
 *
 * [590] N 叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/description/
 *
 * algorithms
 * Easy (76.69%)
 * Likes:    199
 * Dislikes: 0
 * Total Accepted:    81.2K
 * Total Submissions: 105.2K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 n 叉树的根节点 root ，返回 其节点值的 后序遍历 。
 *
 * n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[5,6,3,2,4,1]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[2,6,14,11,7,3,12,8,4,13,9,10,5,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 节点总数在范围 [0, 10^4] 内
 * 0 <= Node.val <= 10^4
 * n 叉树的高度小于或等于 1000
 *
 *
 *
 *
 * 进阶：递归法很简单，你可以使用迭代法完成此题吗?
 *
 */

package leetcode

// Definition for a Node.
type Node struct {
	Val      int
	Children []*Node
}

// @lc code=start
func postorder2(root *Node) []int {
	var res []int
	var dfs func(root *Node)
	dfs = func(root *Node) {
		if root == nil {
			return
		}
		for _, child := range root.Children {
			dfs(child)
		}
		res = append(res, root.Val)
	}
	dfs(root)
	return res
}

func postorder(root *Node) []int {
	if root == nil {
		return nil
	}
	var res []int
	var stack []*Node
	stack = append(stack, root)
	vis := map[*Node]bool{}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		if len(node.Children) == 0 || vis[node] {
			res = append(res, node.Val)
			stack = stack[:len(stack)-1]
			continue
		}
		for i := len(node.Children) - 1; i >= 0; i-- {
			stack = append(stack, node.Children[i])
		}
		vis[node] = true
	}
	return res
}

// @lc code=end
