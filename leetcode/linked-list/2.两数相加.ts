/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (32.14%)
 * Total Accepted:    78.9K
 * Total Submissions: 245.5K
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 *
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 *
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * 示例：
 *
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
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
var addTwoNumbers = function (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let pre = new ListNode(0);
  let cur = pre;
  let carry = 0;

  while (l1 || l2) {
    let x = !l1 ? 0 : l1.val;
    let y = !l2 ? 0 : l2.val;
    let sum = x + y + carry;

    carry = sum > 9 ? 1: 0;
    sum = sum % 10;
    cur.next = new ListNode(sum);

    cur = cur.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  if (carry === 1) cur.next = new ListNode(carry);
  return pre.next;
};
// @lc code=end
