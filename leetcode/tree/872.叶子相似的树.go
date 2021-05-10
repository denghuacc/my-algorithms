/*
 * @lc app=leetcode.cn id=872 lang=golang
 *
 * [872] 叶子相似的树
 *
 * https://leetcode-cn.com/problems/leaf-similar-trees/description/
 *
 * algorithms
 * Easy (65.25%)
 * Likes:    141
 * Dislikes: 0
 * Total Accepted:    50.4K
 * Total Submissions: 77.2K
 * Testcase Example:  '[3,5,1,6,2,9,8,null,null,7,4]\n' +
  '[3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]'
 *
 * 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。
 *
 *
 *
 * 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。
 *
 * 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。
 *
 * 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 =
 * [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：root1 = [1], root2 = [1]
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：root1 = [1], root2 = [2]
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：root1 = [1,2], root2 = [2,2]
 * 输出：true
 *
 *
 * 示例 5：
 *
 *
 *
 *
 * 输入：root1 = [1,2,3], root2 = [1,3,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定的两棵树可能会有 1 到 200 个结点。
 * 给定的两棵树上的值介于 0 到 200 之间。
 *
 *
*/

package main

// Definition for a binary tree node.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// @lc code=start
func leafSimilar(root1 *TreeNode, root2 *TreeNode) bool {
	vals := []int{}
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		if node.Left == nil && node.Right == nil {
			vals = append(vals, node.Val)
			return
		}
		dfs(node.Left)
		dfs(node.Right)
	}

	dfs(root1)
	vals1 := append([]int(nil), vals...)
	vals = []int{}
	dfs(root2)

	if len(vals1) != len(vals) {
		return false
	}

	for i, val := range vals {
		if val != vals1[i] {
			return false
		}
	}

	return true
}

// @lc code=end
