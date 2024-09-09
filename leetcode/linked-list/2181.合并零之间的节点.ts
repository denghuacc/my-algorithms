/*
 * @lc app=leetcode.cn id=2181 lang=typescript
 *
 * [2181] 合并零之间的节点
 *
 * https://leetcode.cn/problems/merge-nodes-in-between-zeros/description/
 *
 * algorithms
 * Medium (84.10%)
 * Likes:    47
 * Dislikes: 0
 * Total Accepted:    26.4K
 * Total Submissions: 30.7K
 * Testcase Example:  '[0,3,1,0,4,5,2,0]'
 *
 * 给你一个链表的头节点 head ，该链表包含由 0 分隔开的一连串整数。链表的 开端 和 末尾 的节点都满足 Node.val == 0 。
 *
 * 对于每两个相邻的 0 ，请你将它们之间的所有节点合并成一个节点，其值是所有已合并节点的值之和。然后将所有 0 移除，修改后的链表不应该含有任何 0
 * 。
 *
 * 返回修改后链表的头节点 head 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [0,3,1,0,4,5,2,0]
 * 输出：[4,11]
 * 解释：
 * 上图表示输入的链表。修改后的链表包含：
 * - 标记为绿色的节点之和：3 + 1 = 4
 * - 标记为红色的节点之和：4 + 5 + 2 = 11
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：head = [0,1,0,3,0,2,2,0]
 * 输出：[1,3,4]
 * 解释：
 * 上图表示输入的链表。修改后的链表包含：
 * - 标记为绿色的节点之和：1 = 1
 * - 标记为红色的节点之和：3 = 3
 * - 标记为黄色的节点之和：2 + 2 = 4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 列表中的节点数目在范围 [3, 2 * 10^5] 内
 * 0 <= Node.val <= 1000
 * 不 存在连续两个 Node.val == 0 的节点
 * 链表的 开端 和 末尾 节点都满足 Node.val == 0
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
var mergeNodes = function (head: ListNode | null): ListNode | null {
  if (!head) return null;
  const dummy = new ListNode(-1);
  let tmp = dummy;
  let tmpVal = 0;
  let cur = head.next;
  while (cur) {
    while (cur && cur.val !== 0) {
      tmpVal += cur.val;
      cur = cur.next;
    }
    cur = cur?.next!;
    const node = new ListNode(tmpVal);
    tmp.next = node;
    tmp = tmp.next;
    tmpVal = 0;
  }
  return dummy.next;
};

// 在 val 有值的时候都需要处理不管是不是零，使用 for 循环好点
var mergeNodes = function (head: ListNode | null): ListNode | null {
  if (!head) return null;
  const dummy = new ListNode(-1);
  let tmp = dummy;
  let tmpVal = 0;
  for (let cur = head.next; cur !== null; cur = cur.next) {
    if (cur.val === 0) {
      const node = new ListNode(tmpVal);
      tmp.next = node;
      tmp = tmp.next;
      tmpVal = 0;
    } else {
      tmpVal += cur.val;
    }
  }
  return dummy.next;
};
// @lc code=end
