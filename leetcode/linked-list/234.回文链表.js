/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 *
 * https://leetcode-cn.com/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (34.80%)
 * Likes:    508
 * Dislikes: 0
 * Total Accepted:    90.6K
 * Total Submissions: 216.5K
 * Testcase Example:  '[1,2]'
 *
 * 请判断一个链表是否为回文链表。
 *
 * 示例 1:
 *
 * 输入: 1->2
 * 输出: false
 *
 * 示例 2:
 *
 * 输入: 1->2->2->1
 * 输出: true
 *
 *
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const arr = [];

  let cur = head;
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }

  let first = 0;
  let last = arr.length - 1;
  while (first < last) {
    if (arr[first] !== arr[last]) {
      return false;
    }
    first++;
    last--;
  }
  return true;
};

var isPalindrome = function (head) {
  let frontPointer = head;
  return recursivelyCheck(head);

  function recursivelyCheck(curNode) {
    if (curNode) {
      if (!recursivelyCheck(curNode.next)) return false;
      if (curNode.val != frontPointer.val) return false;
      frontPointer = frontPointer.next;
    }
    return true;
  }
};

var isPalindrome = function (head) {
  if (!head || !head.next) return true;
  let fast = head;
  let slow = head;
  let pre = null;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 将 slow 之后链表进行断开且反转
  while (slow) {
    let p = slow.next;
    slow.next = pre;
    pre = slow;
    slow = p;
  }

  // 前后链表进行比较
  while (head && pre) {
    if (head.val !== pre.val) return false;
    head = head.next;
    pre = pre.next;
  }

  return true;
};
// @lc code=end
