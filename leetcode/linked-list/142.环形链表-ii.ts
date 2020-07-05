/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (32.88%)
 * Likes:    449
 * Dislikes: 0
 * Total Accepted:    69.8K
 * Total Submissions: 140.1K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
 *
 * 说明：不允许修改给定的链表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：tail connects to node index 1
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 *
 *
 * 示例 2：
 *
 * 输入：head = [1,2], pos = 0
 * 输出：tail connects to node index 0
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 *
 *
 * 示例 3：
 *
 * 输入：head = [1], pos = -1
 * 输出：no cycle
 * 解释：链表中没有环。
 *
 *
 *
 *
 *
 *
 * 进阶：
 * 你是否可以不用额外空间解决此题？
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
var detectCycle = function (head: ListNode | null): ListNode | null {
  const set = new Set();
  let node = head;
  while (node) {
    if (set.has(node)) return node;
    set.add(node);
    node = node.next;
  }
  return null;
};

// Floyd
var detectCycle = function (head: ListNode | null): ListNode | null {
  if (head == null) return null;
  const intersect = getIntersect(head);
  if (intersect == null) return null;

  let ptr1 = head;
  let ptr2 = intersect;
  while (ptr1 !== ptr2) {
    ptr1 = ptr1.next!;
    ptr2 = ptr2.next!;
  }

  return ptr1;

  function getIntersect(node: ListNode | null) {
    let tortoise = head;
    let hare = head;

    while (hare && hare.next) {
      tortoise = tortoise!.next;
      hare = hare.next.next;
      if (tortoise === hare) return tortoise;
    }
    return null;
  }
};
// @lc code=end
