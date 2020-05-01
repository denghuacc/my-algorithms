/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (40.79%)
 * Likes:    354
 * Dislikes: 0
 * Total Accepted:    46.5K
 * Total Submissions: 93.5K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 *
 * 说明:
 * 1 ≤ m ≤ n ≤ 链表长度。
 *
 * 示例:
 *
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  if (head == null) return null
  let [cur, prev] = [head, null]

  while (m > 1) {
    ;[prev, cur] = [cur, cur.next]
    m--
    n--
  }

  let [con, tail, third] = [prev, cur, null]
  while (n > 0) {
    third = cur.next
    cur.next = prev
    prev = cur
    cur = third
    n--
  }

  if (con != null) {
    con.next = prev
  } else {
    head = prev
  }

  tail.next = cur
  return head
}

// recursive
var reverseBetween = function (head, m, n) {
  let left = head
  let stop = false
  recurseAndReverse(head, m, n)
  return head

  function recurseAndReverse(right, m, n) {
    if (n === 1) return
    right = right.next

    if (m > 1) left = left.next

    recurseAndReverse(right, m - 1, n - 1)

    if (left === right || right.next === left) {
      stop = true
    }

    if (!stop) {
      const v = left.val
      left.val = right.val
      right.val = v

      left = left.next
    }
  }
}
// @lc code=end
