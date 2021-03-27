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

// Definition for singly-linked list.
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
  if (!head || !head.next || k === 0) return head;

  let cur: ListNode = head;
  let n = 1;

  while (cur.next) {
    cur = cur.next;
    n++;
  }

  let add = n - k % n;

  if (add === n) {
    return head;
  }

  cur.next = head;  // tail link to head to cycle
  // -> cur pointer continue moving
  while (add) {
    cur = cur.next!;
    add--;
  }

  const ret = cur.next; // first cache new head
  cur.next = null; // break cycle
  return ret;
};
// @lc code=end
