/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode-cn.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (57.45%)
 * Likes:    509
 * Dislikes: 0
 * Total Accepted:    56.6K
 * Total Submissions: 87K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 *
 * 示例 1:
 *
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 *
 *
 * 示例 2:
 *
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
 * @return {ListNode}
 * merge sorted
 */
var sortList = function (head) {
  if (head == null || head.next == null) return head

  let slow = head
  let fast = head.next

  while (fast != null && fast.next != null) {
    slow = slow.next
    fast = fast.next.next
  }

  let temp = slow.next 
  slow.next = null // 切断中点
  let left = sortList(head)
  let right = sortList(temp)
  let h = new ListNode(-1)
  let ret = h

  // 分组排序 
  while (left != null && right != null) {
    if (left.val < right.val) {
      h.next = left
      left = left.next
    } else {
      h.next = right
      right = right.next
    }
    h = h.next
  }
  h.next = left != null ? left : right
  return ret.next
}
// @lc code=end
