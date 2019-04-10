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
  if (head === null) {
    return null
  }

  const res = removeElements(head.next, val)

  if (head.val === val) {
    return res
  } else {
    head.next = res
    return head
  }
}
