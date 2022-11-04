/*
 * @lc app=leetcode.cn id=445 lang=typescript
 *
 * [445] 两数相加 II
 *
 * https://leetcode-cn.com/problems/add-two-numbers-ii/description/
 *
 * algorithms
 * Medium (45.69%)
 * Likes:    210
 * Dislikes: 0
 * Total Accepted:    40.4K
 * Total Submissions: 70.5K
 * Testcase Example:  '[7,2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 *
 *
 *
 * 进阶：
 *
 * 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
 *
 *
 *
 * 示例：
 *
 * 输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 8 -> 0 -> 7
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
// stack
var addTwoNumbers = function (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const s1: number[] = [];
  const s2: number[] = [];
  while (l1) {
    s1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    s2.push(l2.val);
    l2 = l2.next;
  }

  let res: ListNode | null = null;
  let carry = 0;
  while (s1.length || s2.length || carry > 0) {
    const v1 = s1.length ? s1.pop()! : 0;
    const v2 = s2.length ? s2.pop()! : 0;
    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    const val = sum % 10;
    const node = new ListNode(val);
    node.next = res;
    res = node;
  }
  return res;
};
// @lc code=end
