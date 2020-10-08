/*
 * @lc app=leetcode.cn id=24 lang=typescript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (56.69%)
 * Likes:    471
 * Dislikes: 0
 * Total Accepted:    93.6K
 * Total Submissions: 143.6K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 *
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 *
 *
 * 示例:
 *
 * 给定 1->2->3->4, 你应该返回 2->1->4->3.
 *
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
// recursive
var swapPairs = function (head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const firstNode = head;
  const secondNode = head.next;
  firstNode.next = swapPairs(secondNode.next);
  secondNode.next = firstNode;
  return secondNode;
};

// iterative
var swapPairs = function (head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;

  let prevNode = dummy;
  while (head && head.next) {
    const firstNode = head;
    const secondNode = head.next;

    prevNode.next = secondNode;
    firstNode.next = secondNode.next;
    secondNode.next = firstNode;

    prevNode = firstNode;
    head = firstNode.next;
  }

  return dummy.next;
};
// @lc code=end
