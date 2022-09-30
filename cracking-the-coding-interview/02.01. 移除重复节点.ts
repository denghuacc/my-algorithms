/**
 * 
编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

示例1:
输入：[1, 2, 3, 3, 2, 1]
输出：[1, 2, 3]

示例2:
输入：[1, 1, 1, 1, 2]
输出：[1, 2]

提示：
- 链表长度在[0, 20000]范围内。
- 链表元素在[0, 20000]范围内。

进阶：
如果不得使用临时缓冲区，该怎么解决？

难度：简单

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/remove-duplicate-node-lcci
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

var removeDuplicateNodes = function (head: ListNode | null): ListNode | null {
  if (!head) return null;
  const set: Set<number> = new Set();
  let cur = head;
  while (cur && cur.next) {
    set.add(cur.val);
    if (set.has(cur.next.val)) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};

// 进阶：空间复杂度 O(1)
var removeDuplicateNodes = function (head: ListNode | null): ListNode | null {
  if (!head) return null;
  let cur = head;
  while (cur) {
    let tmp = cur;
    while (tmp.next) {
      if (tmp.next.val == cur.val) {
        tmp.next = tmp.next.next;
      } else {
        tmp = tmp.next;
      }
    }
    cur = cur.next!;
  }
  return head;
};

export {};
