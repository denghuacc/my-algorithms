/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (32.14%)
 * Total Accepted:    78.9K
 * Total Submissions: 245.5K
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 *
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 *
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * 示例：
 *
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 *
 *
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  if (l1 === null || l2 === null) {
    return l1 || l2
  }

  var result = new ListNode(0)
  var cur = result
  var p = l1
  var q = l2
  var carry = 0

  while (p || q) {
    var qVal
    var pVal

    if (q) {
      qVal = q.val
      q = q.next
    } else {
      qVal = 0
    }

    if (p) {
      pVal = p.val
      p = p.next
    } else {
      pVal = 0
    }

    var val = qVal + pVal + carry

    if (val > 9) {
      carry = 1
      val %= 10
    } else {
      carry = 0
    }

    cur.next = new ListNode(val)
    cur = cur.next
  }

  if (carry !== 0) {
    cur.next = new ListNode(1)
  }

  return result.next
}
