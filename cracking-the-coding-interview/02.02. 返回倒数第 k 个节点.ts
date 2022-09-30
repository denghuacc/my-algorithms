/**
 * 
实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。
注意：本题相对原题稍作改动

示例：
输入： 1->2->3->4->5 和 k = 2
输出： 4

说明：
给定的 k 保证是有效的。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/kth-node-from-end-of-list-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function kthToLast(head: ListNode, k: number): number {
  let fast = head;
  let slow = head;
  while (k > 0) {
    fast = fast.next!;
    k--;
  }
  while (fast) {
    fast = fast.next!;
    slow = slow.next!;
  }
  return slow.val;
}

export {};
