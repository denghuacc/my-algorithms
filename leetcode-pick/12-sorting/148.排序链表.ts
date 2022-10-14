/*
 * @lc app=leetcode.cn id=148 lang=typescript
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

export {};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// @lc code=start
// merge sorting
var sortList = function (head: ListNode | null): ListNode | null {
  return sort(head, null);

  function sort(head: ListNode | null, tail: ListNode | null): ListNode | null {
    if (!head) return null;
    if (head.next === tail) {
      head.next = null;
      return head;
    }
    let slow = head;
    let fast = head;
    while (fast !== tail) {
      slow = slow.next!;
      fast = fast.next!;
      if (fast !== tail) {
        fast = fast.next!;
      }
    }
    const mid = slow;
    return merge(sort(head, mid), sort(mid, tail));
  }

  function merge(head1: ListNode | null, head2: ListNode | null) {
    const dummy = new ListNode(0);
    let cur = dummy;
    while (head1 && head2) {
      if (head1.val < head2.val) {
        cur.next = head1;
        head1 = head1.next!;
      } else {
        cur.next = head2;
        head2 = head2.next!;
      }
      cur = cur.next!;
    }
    cur.next = head1 ? head1 : head2;
    return dummy.next;
  }
};
// @lc code=end
