/*
 * @lc app=leetcode.cn id=147 lang=typescript
 *
 * [147] 对链表进行插入排序
 *
 * https://leetcode-cn.com/problems/insertion-sort-list/description/
 *
 * algorithms
 * Medium (53.95%)
 * Likes:    162
 * Dislikes: 0
 * Total Accepted:    30.1K
 * Total Submissions: 46.8K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 对链表进行插入排序。
 *
 *
 * 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
 * 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。
 *
 *
 *
 * 插入排序算法：
 *
 *
 * 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
 * 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
 * 重复直到所有输入数据插入完为止。
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 *
 *
 * 示例 2：
 *
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
var insertionSortList = function (head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let pre = dummy;
  let cur = head;

  while (cur) {
    const tmp = cur.next;
    while (pre.next && pre.next.val < cur.val) {
      pre = pre.next;
    }
    cur.next = pre.next;
    pre.next = cur;
    pre = dummy;
    cur = tmp;
  }

  return dummy.next;
};

// use tail pointer
var insertionSortList = function (head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let pre = dummy;
  let tail = dummy;
  let cur = head;

  while (cur) {
    if (tail.val < cur.val) {
      tail.next = cur;
      tail = cur;
      cur = cur.next;
    } else {
      const tmp = cur.next;
      tail.next = tmp;
      while (pre.next && pre.next.val < cur.val) {
        pre = pre.next;
      }
      cur.next = pre.next;
      pre.next = cur;
      pre = dummy;
      cur = tmp;
    }
  }

  return dummy.next;
};
// @lc code=end
