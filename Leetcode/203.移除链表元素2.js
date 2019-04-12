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
  // 特殊处理 head
  while (head !== null && head.val === val) {
    // const delNode = head
    head = head.next
    // delNode.next = null // leetcode 可以不用清理内存
  }

  if (head === null) {
    return null
  }

  let prev = head

  while (prev.next !== null) {
    if (prev.next.val === val) {
      // const delNode = prev.next
      prev.next = prev.next.next
      // delNode.next = null
    } else {
      prev = prev.next
    }
  }

  return head
}
