/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] k个一组翻转链表
 *
 * https://leetcode-cn.com/problems/reverse-nodes-in-k-group/description/
 *
 * algorithms
 * Hard (48.45%)
 * Likes:    456
 * Dislikes: 0
 * Total Accepted:    52.3K
 * Total Submissions: 89.8K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
 *
 * k 是一个正整数，它的值小于或等于链表的长度。
 *
 * 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 *
 *
 *
 * 示例：
 *
 * 给你这个链表：1->2->3->4->5
 *
 * 当 k = 2 时，应当返回: 2->1->4->3->5
 *
 * 当 k = 3 时，应当返回: 3->2->1->4->5
 *
 *
 *
 * 说明：
 *
 *
 * 你的算法只能使用常数的额外空间。
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * stack
 */
var reverseKGroup = function (head, k) {
  const stack = []
  const dummy = new ListNode(-1)
  let p = dummy

  while (true) {
    let count = 0
    let temp = head
    while (temp != null && count < k) {
      stack.push(temp)
      temp = temp.next
      count++
    }
    if (count !== k) {
      p.next = head
      break
    }
    while (stack.length !== 0) {
      p.next = stack.pop()
      p = p.next
    }
    p.next = temp
    head = temp
  }
  return dummy.next
}

// recursive
var reverseKGroup = function (head, k) {
  let cur = head
  let count = 0

  while (cur != null && count !== k) {
    cur = cur.next
    count++
  }

  if (count === k) {
    cur = reverseKGroup(cur, k)
    while (count !== 0) {
      count--
      let temp = head.next
      head.next = cur
      cur = head
      head = temp
    }
    head = cur
  }

  return head
}
// @lc code=end
