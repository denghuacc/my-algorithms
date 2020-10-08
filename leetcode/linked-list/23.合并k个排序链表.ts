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
// sort
var mergeKLists = function (lists: Array<ListNode | null>): ListNode | null {
  const nums: number[] = []; // the values of linked list
  let dummy: ListNode;
  let point: ListNode;
  dummy = point = new ListNode(0);

  for (let node of lists) {
    while (node) {
      nums.push(node.val);
      node = node.next;
    }
  }

  nums.sort((a, b) => a - b); // sort

  for (const num of nums) {
    point.next = new ListNode(num);
    point = point.next;
  }

  return dummy.next;
};

// recursive
var mergeKLists = function (lists: Array<ListNode | null>): ListNode | null {
  let len = lists.length;
  if (len === 0) return null;

  while (len > 1) {
    for (let i = 0; i < Math.floor(len / 2); i++) {
      lists[i] = mergeTwoLists(lists[i], lists[len - 1 - i]); // merge two linked list
    }
    len = Math.floor((len + 1) / 2);
  }

  return lists[0];

  // leetcode 21
  function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
    }
  }
};
// @lc code=end
