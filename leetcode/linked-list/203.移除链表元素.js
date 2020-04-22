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

// @lc code=start
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (head == null) return null

  // 当头部节点是需要删除的节点时
  while (head != null && head.val === val) {
    const del = head
    head = head.next
    del.next = null // leetcode 可无需优化
  }

  let prev = head

  // 非头部节点
  while (prev.next != null) {
    if (prev.next.val === val) {
      const del = prev.next
      prev.next = del.next
      del.next = null
    } else {
      prev = prev.next
    }
  }

  return head
}

// method2 -> 优化 method1
var removeElements = function (head, val) {
  if (head == null) return null

  // 当头部节点是需要删除的节点时
  while (head != null && head.val === val) {
    head = head.next
  }

  let prev = head

  // 非头部节点
  while (prev.next != null) {
    if (prev.next.val === val) {
      prev.next = prev.next.next
    } else {
      prev = prev.next
    }
  }

  return head
}

// method3 使用虚拟头节点
var removeElements = function (head, val) {
  const dummy = new ListNode(-1)
  dummy.next = head

  let prev = dummy // 要删除的节点的前一个节点

  while (prev.next != null) {
    if (prev.next.val === val) {
      const del = prev.next
      prev.next = del.next
      del.next = null
    } else {
      prev = prev.next
    }
  }

  return dummy.next
}

// method4 -> 递归
var removeElements = function (head, val) {
  if (head == null) return null

  const res = removeElements(head.next, val)

  if (head.val === val) {
    return res
  } else {
    head.next = res
    return head
  }
}

// method5 -> 优化 method4
var removeElements = function (head, val) {
  if (head == null) return null

  head.next = removeElements(head.next, val)

  return head.val === val ? head.next : head
}
// @lc code=end
