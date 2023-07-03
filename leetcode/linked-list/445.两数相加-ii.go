/*
 * @lc app=leetcode.cn id=445 lang=golang
 *
 * [445] 两数相加 II
 *
 * https://leetcode.cn/problems/add-two-numbers-ii/description/
 *
 * algorithms
 * Medium (60.21%)
 * Likes:    628
 * Dislikes: 0
 * Total Accepted:    128.5K
 * Total Submissions: 211.8K
 * Testcase Example:  '[7,2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 *
 *
 *
 * 示例1：
 *
 *
 *
 *
 * 输入：l1 = [7,2,4,3], l2 = [5,6,4]
 * 输出：[7,8,0,7]
 *
 *
 * 示例2：
 *
 *
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[8,0,7]
 *
 *
 * 示例3：
 *
 *
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表的长度范围为 [1, 100]
 * 0 <= node.val <= 9
 * 输入数据保证链表代表的数字无前导 0
 *
 *
 *
 *
 * 进阶：如果输入链表不能翻转该如何解决？
 *
 */

package leetcode

// Definition for singly-linked list.
type ListNode struct {
	Val  int
	Next *ListNode
}

// @lc code=start
func addTwoNumbers(l1 *ListNode, l2 *ListNode) (res *ListNode) {
	a1, a2 := []int{}, []int{}
	for l1 != nil {
		a1 = append(a1, l1.Val)
		l1 = l1.Next
	}
	for l2 != nil {
		a2 = append(a2, l2.Val)
		l2 = l2.Next
	}

	carry := 0
	for len(a1) > 0 || len(a2) > 0 || carry > 0 {
		sum := carry
		if len(a1) > 0 {
			sum += a1[len(a1)-1]
			a1 = a1[:len(a1)-1]
		}
		if len(a2) > 0 {
			sum += a2[len(a2)-1]
			a2 = a2[:len(a2)-1]
		}
		carry = sum / 10
		val := sum % 10
		node := &ListNode{Val: val}
		node.Next = res
		res = node
	}

	return
}

// @lc code=end
