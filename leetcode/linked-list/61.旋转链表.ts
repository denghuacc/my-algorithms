/*
 * @lc app=leetcode.cn id=61 lang=typescript
 *
 * [61] 旋转链表
 *
 * https://leetcode-cn.com/problems/rotate-list/description/
 *
 * algorithms
 * Medium (36.70%)
 * Likes:    239
 * Dislikes: 0
 * Total Accepted:    55.9K
 * Total Submissions: 139.2K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
 *
 * 示例 1:
 *
 * 输入: 1->2->3->4->5->NULL, k = 2
 * 输出: 4->5->1->2->3->NULL
 * 解释:
 * 向右旋转 1 步: 5->1->2->3->4->NULL
 * 向右旋转 2 步: 4->5->1->2->3->NULL
 *
 *
 * 示例 2:
 *
 * 输入: 0->1->2->NULL, k = 4
 * 输出: 2->0->1->NULL
 * 解释:
 * 向右旋转 1 步: 2->0->1->NULL
 * 向右旋转 2 步: 1->2->0->NULL
 * 向右旋转 3 步: 0->1->2->NULL
 * 向右旋转 4 步: 2->0->1->NULL
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
var rotateRight = function (head: ListNode | null, k: number): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;

  let oldTail = head;
  let n: number;

  for (n = 1; oldTail.next != null; n++) {
    oldTail = oldTail.next;
  }

  oldTail.next = head; // link to head

  let newTail = head;

  // new tail: n - (k % n) - 1
  for (let i = 0; i < n - (k % n) - 1; i++) {
    newTail = newTail.next!;
  }

  let newHead = newTail.next;

  newTail.next = null; // break

  return newHead;
};

// two pointers
var rotateRight = function (head: ListNode | null, k: number): ListNode | null {
  if (!head || k === 0) return head;

  let tmp: ListNode = head;
  let n = 0;

  while (tmp) {
    tmp = tmp.next!;
    n++;
  }

  k = k % n;
  if (k === 0) return head;

  let node = head;
  tmp = head;

  while (k > 0) {
    k--;
    tmp = tmp.next!;
  }
  while (tmp.next) {
    head = head!.next;
    tmp = tmp.next;
  }

  const ret = head!.next; // new head
  head!.next = null; // break
  tmp.next = node; // link to old head

  return ret;
};
// @lc code=end
