/*
 * @lc app=leetcode.cn id=1305 lang=golang
 *
 * [1305] 两棵二叉搜索树中的所有元素
 *
 * https://leetcode-cn.com/problems/all-elements-in-two-binary-search-trees/description/
 *
 * algorithms
 * Medium (74.85%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    36.6K
 * Total Submissions: 46.9K
 * Testcase Example:  '[2,1,4]\r\n[1,0,3]\r'
 *
 * 给你 root1 和 root2 这两棵二叉搜索树。请你返回一个列表，其中包含 两棵树 中的所有整数并按 升序 排序。.
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root1 = [2,1,4], root2 = [1,0,3]
 * 输出：[0,1,1,2,3,4]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root1 = [1,null,8], root2 = [8,1]
 * 输出：[1,1,8,8]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每棵树的节点数在 [0, 5000] 范围内
 * -10^5 <= Node.val <= 10^5
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
func getAllElements(root1 *TreeNode, root2 *TreeNode) []int {
	arr1 := inorder(root1)
	arr2 := inorder(root2)
	p1, p2 := 0, 0
	res := make([]int, 0, len(arr1)+len(arr2))

	for {
		if p1 == len(arr1) {
			for i := p2; i < len(arr2); i++ {
				res = append(res, arr2[i])
			}
			break
		}
		if p2 == len(arr2) {
			for i := p1; i < len(arr1); i++ {
				res = append(res, arr1[i])
			}
			break
		}

		if arr1[p1] < arr2[p2] {
			res = append(res, arr1[p1])
			p1++
		} else {
			res = append(res, arr2[p2])
			p2++
		}
	}

	return res

}

func inorder(root *TreeNode) (res []int) {
	var dfs func(*TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		dfs(node.Left)
		res = append(res, node.Val)
		dfs(node.Right)
	}
	dfs(root)
	return
}

// @lc code=end
