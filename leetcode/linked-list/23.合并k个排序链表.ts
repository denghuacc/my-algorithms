/*
 * @lc app=leetcode.cn id=23 lang=typescript
 *
 * [23] 合并K个排序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (42.88%)
 * Likes:    575
 * Dislikes: 0
 * Total Accepted:    97.3K
 * Total Submissions: 194.8K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 *
 * 示例:
 *
 * 输入:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * 输出: 1->1->2->3->4->4->5->6
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
var mergeKLists = function (lists: Array<ListNode | null>): ListNode | null {
  return mergeList(lists, 0, lists.length - 1);

  function mergeList(
    lists: Array<ListNode | null>,
    left: number,
    right: number
  ): ListNode | null {
    if (left === right) {
      return lists[left];
    }
    if (left > right) {
      return null;
    }
    const mid = left + Math.floor((right - left) / 2);
    return merge(mergeList(lists, left, mid), mergeList(lists, mid + 1, right));
  }

  function merge(
    head1: ListNode | null,
    head2: ListNode | null
  ): ListNode | null {
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
