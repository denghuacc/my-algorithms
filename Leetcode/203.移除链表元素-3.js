/*
 * @lc app=leetcode.cn id=203 lang=javascript
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

function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  // 方法二 使用虚拟头节点
  const dummyHead = new ListNode(-1)
  dummyHead.next = head

  let prev = dummyHead // 要删除的节点的前一个节点

  while (prev.next !== null) {
    if (prev.next.val === val) {
      const delNode = prev.next
      prev.next = delNode.next
      delNode.next = null
    } else {
      prev = prev.next
    }
  }

  return dummyHead.next
}
