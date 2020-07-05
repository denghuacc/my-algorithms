/*
 * @lc app=leetcode.cn id=92 lang=typescript
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
var reverseBetween = function (
  head: ListNode | null,
  m: number,
  n: number
): ListNode | null {
  if (head == null) return null;
  let cur = head;
  let prev = null;

  while (m > 1) {
    prev = cur;
    cur = cur.next!;
    m--;
    n--;
  }

  let con = prev;
  let tail = cur;
  let third = null;
  while (n > 0 && cur) {
    third = cur.next!;
    cur.next = prev;
    prev = cur;
    cur = third;
    n--;
  }

  if (con != null) {
    con.next = prev;
  } else {
    head = prev;
  }

  tail.next = cur;
  return head;
};

// recursive
var reverseBetween = function (
  head: ListNode | null,
  m: number,
  n: number
): ListNode | null {
  let left = head;
  let stop = false;
  recurseAndReverse(head!, m, n);
  return head;

  function recurseAndReverse(right: ListNode | null, m: number, n: number) {
    if (n === 1) return;
    if (right) right = right.next;

    if (m > 1 && left) left = left.next;

    recurseAndReverse(right, m - 1, n - 1);

    if (left === right || (right && right.next === left)) {
      stop = true;
    }

    if (!stop && left && right) {
      let v = left.val;
      left.val = right.val;
      right.val = v;

      left = left.next;
    }
  }
};
// @lc code=end
