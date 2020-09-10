/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (31.81%)
 * Likes:    778
 * Dislikes: 0
 * Total Accepted:    151.3K
 * Total Submissions: 395K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 *
 * 示例：
 *
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 *
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 *
 *
 * 说明：
 *
 * 给定的 n 保证是有效的。
 *
 * 进阶：
 *
 * 你能尝试使用一趟扫描实现吗？
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

// 解题思路
// 1. 先求出链表长度 len，
// 2. 然后通过 len - n 找到删除节点的索引
// 3. 最后删除节点

// @lc code=start
// two traverse
var removeNthFromEnd = function (
  head: ListNode | null,
  n: number
): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;

  let len = 0;
  let cur = head;
  while (cur) {
    len++; // list len
    cur = cur.next;
  }

  len -= n; // new Len
  let pre = dummy;
  while (len && pre.next) {
    len--;
    pre = pre.next;
  }
  pre.next = pre.next!.next; // 找到节点删除
  return dummy.next;
};

// one traverse
// two pointer
var removeNthFromEnd = function (
  head: ListNode | null,
  n: number
): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;

  for (let i = 1; i <= n + 1; i++) {
    first = first.next!;
  }

  while (first) {
    first = first.next!;
    second = second.next!;
  }

  second.next = second.next!.next; // 找到节点删除
  return dummy.next;
};
// @lc code=end

// 解题思路 双指针
// 1. 两个指针，一个指针先走 n + 1 步
// 2. 然后两个指针同时走，当第一个指针走到底时，第二个指针刚好指向要删除的节点
// 3. 最后删除节点