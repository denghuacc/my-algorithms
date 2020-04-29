/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 *
 * https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/
 *
 * algorithms
 * Medium (60.73%)
 * Likes:    193
 * Dislikes: 0
 * Total Accepted:    25.5K
 * Total Submissions: 35.5K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。
 *
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 *
 * 示例:
 *
 * 给定的有序链表： [-10, -3, 0, 5, 9],
 *
 * 一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：
 *
 * ⁠     0
 * ⁠    / \
 * ⁠  -3   9
 * ⁠  /   /
 * ⁠-10  5
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (head == null) return null
  let mid = findMiddleElement(head)
  let node = new TreeNode(mid.val)
  if (head === mid) return node
  node.left = sortedListToBST(head)
  node.right = sortedListToBST(mid.next)
  return node

  function findMiddleElement(head) {
    let [prev, slow, fast] = [null, head, head]

    while (fast != null && fast.next != null) {
      ;[prev, slow, fast] = [slow, slow.next, fast.next.next]
    }

    if (prev != null) prev.next = null
    return slow
  }
}

var sortedListToBST = function (head) {
  const arr = []
  mapListToValues(head, arr)
  return convertListToBST(0, arr.length - 1)

  // convert to array
  function mapListToValues(head, arr) {
    while (head != null) {
      arr.push(head.val)
      head = head.next
    }
  }

  function convertListToBST(left, right) {
    if (left > right) return null

    let mid = Math.round((left + right) / 2)
    let node = new TreeNode(arr[mid])

    if (left === right) return node
    node.left = convertListToBST(left, mid - 1)
    node.right = convertListToBST(mid + 1, right)

    return node
  }
}

// inorder
var sortedListToBST = function (head) {
  let size = findSize(head)
  return convertListToBST(0, size - 1)
  
  function findSize(head) {
    let cur = head
    let c = 0
    while (cur != null) {
      cur = cur.next
      c++
    }
    return c
  }
  
  function convertListToBST(left, right) {
    if (left > right) return null
    
    let mid = Math.round((left + right) / 2)
    
    const leftNode = convertListToBST(left, mid - 1)
    
    const node = new TreeNode(head.val)
    node.left = leftNode
    
    head = head.next // update head
    
    node.right = convertListToBST(mid + 1, right)
    return node
  }
}
// @lc code=end
