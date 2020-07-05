/*
 * @lc app=leetcode.cn id=82 lang=typescript
 *
 * [82] 删除排序链表中的重复元素 II
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/description/
 *
 * algorithms
 * Medium (37.60%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    43K
 * Total Submissions: 90.8K
 * Testcase Example:  '[1,2,3,3,4,4,5]'
 *
 * 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。
 *
 * 示例 1:
 *
 * 输入: 1->2->3->3->4->4->5
 * 输出: 1->2->5
 *
 *
 * 示例 2:
 *
 * 输入: 1->1->1->2->3
 * 输出: 2->3
 *
 */

export {};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null: next;
  }
}

// @lc code=start
var deleteDuplicates = function (head: ListNode | null): ListNode | null {
  if (head == null) return head;
  const dummy = new ListNode(-1);
  dummy.next = head;
  let slow = dummy;
  let fast = dummy.next;

  while (fast != null) {
    while (fast.next != null && fast.val === fast.next.val) fast = fast.next;
    if (slow.next === fast) slow = slow.next;
    else slow.next = fast.next;
    fast = fast.next!;
  }

  return dummy.next;
};

// recursive
var deleteDuplicates = function (head: ListNode | null): ListNode | null {
  if (head == null) return head;
  if (head.next != null && head.val === head.next.val) {
    while (head.next != null && head.val === head.next.val) head = head.next;
    return deleteDuplicates(head.next);
  } else {
    head.next = deleteDuplicates(head.next);
    return head;
  }
};
// @lc code=end
