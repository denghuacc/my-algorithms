/*
 * @lc app=leetcode.cn id=2487 lang=typescript
 *
 * [2487] 从链表中移除节点
 *
 * https://leetcode.cn/problems/remove-nodes-from-linked-list/description/
 *
 * algorithms
 * Medium (68.63%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 20.5K
 * Testcase Example:  '[5,2,13,3,8]'
 *
 * 给你一个链表的头节点 head 。
 *
 * 移除每个右侧有一个更大数值的节点。
 *
 * 返回修改后链表的头节点 head 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [5,2,13,3,8]
 * 输出：[13,8]
 * 解释：需要移除的节点是 5 ，2 和 3 。
 * - 节点 13 在节点 5 右侧。
 * - 节点 13 在节点 2 右侧。
 * - 节点 8 在节点 3 右侧。
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,1,1,1]
 * 输出：[1,1,1,1]
 * 解释：每个节点的值都是 1 ，所以没有需要移除的节点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定列表中的节点数目在范围 [1, 10^5] 内
 * 1 <= Node.val <= 10^5
 *
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
// recursive
var removeNodes = function (head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }
  head.next = removeNodes(head.next);
  if (head?.next && head?.val < head?.next?.val) {
    return head.next;
  }
  return head;
};

var removeNodes = function (head: ListNode | null): ListNode | null {
  const stack = [];
  while (head) {
    stack.push(head);
    head = head?.next;
  }
  while (stack.length) {
    if (!head || stack[stack.length - 1]?.val >= head?.val) {
      stack[stack.length - 1].next = head;
      head = stack[stack.length - 1];
    }
    stack.pop();
  }
  return head;
};

var removeNodes = function (head: ListNode | null): ListNode | null {
  head = reverse(head);
  let cur = head;
  while (cur?.next) {
    if (cur.val > cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return reverse(head);

  function reverse(head: ListNode | null): ListNode | null {
    if (!head) {
      return null;
    }
    const dummy = new ListNode();
    while (head) {
      const p = head;
      head = head.next;
      p.next = dummy.next;
      dummy.next = p;
    }
    return dummy.next;
  }
};
// @lc code=end
