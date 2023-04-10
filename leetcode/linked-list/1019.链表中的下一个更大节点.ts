/*
 * @lc app=leetcode.cn id=1019 lang=typescript
 *
 * [1019] 链表中的下一个更大节点
 *
 * https://leetcode.cn/problems/next-greater-node-in-linked-list/description/
 *
 * algorithms
 * Medium (60.98%)
 * Likes:    263
 * Dislikes: 0
 * Total Accepted:    35.9K
 * Total Submissions: 57.4K
 * Testcase Example:  '[2,1,5]'
 *
 * 给定一个长度为 n 的链表 head
 *
 * 对于列表中的每个节点，查找下一个 更大节点 的值。也就是说，对于每个节点，找到它旁边的第一个节点的值，这个节点的值 严格大于 它的值。
 *
 * 返回一个整数数组 answer ，其中 answer[i] 是第 i 个节点( 从1开始 )的下一个更大的节点的值。如果第 i
 * 个节点没有下一个更大的节点，设置 answer[i] = 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [2,1,5]
 * 输出：[5,5,0]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：head = [2,7,4,3,5]
 * 输出：[7,0,5,5,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数为 n
 * 1 <= n <= 10^4
 * 1 <= Node.val <= 10^9
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
var nextLargerNodes = function (head: ListNode | null): number[] {
  const res: number[] = [];
  while (head) {
    const val = head.val;
    let cur = head.next;
    let has = false;
    while (cur) {
      if (cur.val > val) {
        res.push(cur.val);
        has = true;
        break;
      }
      cur = cur.next;
    }
    if (!has) {
      res.push(0);
    }
    head = head.next;
  }
  return res;
};

// stack
var nextLargerNodes = function (head: ListNode | null): number[] {
  const res: number[] = [];
  const stack: { val: number; index: number }[] = [];
  let index = 0;
  while (head) {
    res[index] = 0;
    while (stack.length && head.val > stack[stack.length - 1].val) {
      const prevIndex = stack.pop()!.index;
      res[prevIndex] = head.val;
    }
    stack.push({ val: head.val, index });
    index++;
    head = head.next;
  }
  return res;
};
// @lc code=end
