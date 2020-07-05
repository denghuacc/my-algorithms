/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (57.49%)
 * Likes:    913
 * Dislikes: 0
 * Total Accepted:    218.6K
 * Total Submissions: 318.7K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 *
 * 示例:
 *
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 *
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
// iterative
var reverseList = function (head: ListNode | null): ListNode | null {
  let prev = null; // 缓存前一个节点
  let cur = head;

  while (cur) {
    const nextTemp = cur.next; // 缓存下一个节点
    cur.next = prev; // 指向前一个节点
    prev = cur;
    cur = nextTemp;
  }

  return prev;
};

// recursive
var reverseList = function (head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const p = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return p;
};
// @lc code=end
