/*
 * @lc app=leetcode.cn id=203 lang=typescript
 *
 * [203] 移除链表元素
 *
 * https://leetcode-cn.com/problems/remove-linked-list-elements/description/
 *
 * algorithms
 * Easy (38.74%)
 * Total Accepted:    20.7K
 * Total Submissions: 51.7K
 * Testcase Example:  '[1,2,6,3,4,5,6]\n6'
 *
 * 删除链表中等于给定值 val 的所有节点。
 *
 * 示例:
 *
 * 输入: 1->2->6->3->4->5->6, val = 6
 * 输出: 1->2->3->4->5
 *
 *
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
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
var removeElements = function (
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return null;

  // 当头部节点是需要删除的节点时
  if (head && head.val === val) {
    const del = head;
    head = head.next;
    del.next = null; // leetcode 可无需优化
  }

  let pre = head!;

  // 非头部节点
  while (pre.next) {
    if (pre.next.val === val) {
      const del = pre.next;
      pre.next = del.next;
      del.next = null;
    } else {
      pre = pre.next;
    }
  }

  return head;
};

// method2 -> 优化 method1
var removeElements = function (
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return null;

  // 当头部节点是需要删除的节点时
  while (head && head.val === val) {
    head = head.next;
  }

  let pre = head!;

  // 非头部节点
  while (pre.next) {
    if (pre.next.val === val) {
      pre.next = pre.next.next;
    } else {
      pre = pre.next;
    }
  }

  return head;
};

// method3 使用虚拟头节点
var removeElements = function (
  head: ListNode | null,
  val: number
): ListNode | null {
  const dummy = new ListNode(-1);
  dummy.next = head;

  let pre = dummy; // 要删除的节点的前一个节点

  while (pre.next) {
    if (pre.next.val === val) {
      const del = pre.next;
      pre.next = del.next;
      del.next = null;
    } else {
      pre = pre.next;
    }
  }

  return dummy.next;
};

// method4 -> 递归
var removeElements = function (
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return null;

  const res = removeElements(head.next, val);

  if (head.val === val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
};

// method5 -> 优化 method4
var removeElements = function (
  head: ListNode | null,
  val: number
): ListNode | null {
  if (!head) return null;

  head.next = removeElements(head.next, val);

  return head.val === val ? head.next : head;
};
// @lc code=end
