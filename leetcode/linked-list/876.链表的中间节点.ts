/*
 * @lc app=leetcode.cn id=876 lang=typescript
 *
 * [876] 链表的中间节点
 *
 * https://leetcode-cn.com/problems/middle-of-the-linked-list/description/
 *
 * algorithms
 * Easy (57.12%)
 * Likes:    208
 * Dislikes: 0
 * Total Accepted:    58.4K
 * Total Submissions: 84.9K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 给定一个带有头结点 head 的非空单链表，返回链表的中间结点。
 *
 * 如果有两个中间结点，则返回第二个中间结点。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[1,2,3,4,5]
 * 输出：此列表中的结点 3 (序列化形式：[3,4,5])
 * 返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
 * 注意，我们返回了一个 ListNode 类型的对象 ans，这样：
 * ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next
 * = NULL.
 *
 *
 * 示例 2：
 *
 * 输入：[1,2,3,4,5,6]
 * 输出：此列表中的结点 4 (序列化形式：[4,5,6])
 * 由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定链表的结点数介于 1 和 100 之间。
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
var middleNode = function (head: ListNode | null): ListNode | null {
  const node: ListNode[] = new Array(100);
  let n = 0;
  while (head) {
    node[n++] = head;
    head = head.next;
  }
  return node[Math.floor(n / 2)];
};

// simple pointer
var middleNode = function (head: ListNode | null): ListNode | null {
  let n = 0;
  let cur = head;

  while (cur) {
    cur = cur.next;
    n++;
  }

  let k = 0;
  cur = head;
  while (k < Math.floor(n / 2)) {
    cur = cur!.next;
    k++;
  }

  return cur;
};

// two pointers
var middleNode = function (head: ListNode | null): ListNode | null {
  let slow = head!;
  let fast = head!;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
  }

  return slow;
};
// @lc code=end
