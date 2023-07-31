/*
 * @lc app=leetcode.cn id=143 lang=golang
 *
 * [143] 重排链表
 *
 * https://leetcode.cn/problems/reorder-list/description/
 *
 * algorithms
 * Medium (64.94%)
 * Likes:    1267
 * Dislikes: 0
 * Total Accepted:    264.2K
 * Total Submissions: 405.1K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
 *
 *
 * L0 → L1 → … → Ln - 1 → Ln
 *
 *
 * 请将其重新排列后变为：
 *
 *
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 *
 * 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [1,2,3,4]
 * 输出：[1,4,2,3]
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：head = [1,2,3,4,5]
 * 输出：[1,5,2,4,3]
 *
 *
 *
 * 提示：
 *
 *
 * 链表的长度范围为 [1, 5 * 10^4]
 * 1 <= node.val <= 1000
 *
 *
 */

package leetcode

// Definition for singly-linked list.
type ListNode struct {
	Val  int
	Next *ListNode
}

// @lc code=start
func reorderList(head *ListNode) {
	list := make([]*ListNode, 0)
	for head != nil {
		list = append(list, head)
		head = head.Next
	}
	i, j := 0, len(list)-1
	for i < j {
		list[i].Next = list[j]
		i++
		if i == j {
			break
		}
		list[j].Next = list[i]
		j--
	}
	list[i].Next = nil
}

// @lc code=end
