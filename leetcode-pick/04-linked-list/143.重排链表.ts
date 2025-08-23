/*
 * @lc app=leetcode.cn id=143 lang=typescript
 *
 * [143] 重排链表
 *
 * https://leetcode-cn.com/problems/reorder-list/description/
 *
 * algorithms
 * Medium (47.45%)
 * Likes:    203
 * Dislikes: 0
 * Total Accepted:    22.2K
 * Total Submissions: 39.9K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
 * 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
 *
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 * 示例 1:
 *
 * 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
 *
 * 示例 2:
 *
 * 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
 *
 */

export {};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// @lc code=start
/**
 * 方法一：转换为线性表
 *
 * 核心思想：
 * 1. 将链表节点存储到数组中，支持随机访问
 * 2. 使用双指针从数组两端交替取节点重新连接
 * 3. 实现 L0→Ln→L1→Ln-1→... 的重排序
 */
var reorderList = function (head: ListNode | null) {
  if (!head) return;
  const list: ListNode[] = [];

  // 将链表节点存入数组
  let cur = head;
  while (cur) {
    list.push(cur);
    cur = cur.next;
  }

  let i = 0;
  let j = list.length - 1;

  // 双指针交替连接节点
  while (i < j) {
    list[i].next = list[j];
    i++;
    if (i === j) break;
    list[j].next = list[i];
    j--;
  }

  list[i].next = null; // 终止链表
};

/**
 * 方法二：找中点 + 反转 + 合并（推荐）
 *
 * 核心思想：
 * 1. 快慢指针找到链表中点，将链表分为两部分
 * 2. 反转后半部分链表
 * 3. 交替合并两个链表
 */
var reorderList = function (head: ListNode | null) {
  if (!head) return;

  // 1. 找到链表中点
  const mid = middleNode(head);
  const l1 = head;
  let l2 = mid.next;
  mid.next = null; // 断开链表

  // 2. 反转后半部分
  l2 = reverseList(l2);

  // 3. 交替合并两个链表
  mergeList(l1, l2);

  /**
   * 找到链表的中点（偏左）
   */
  function middleNode(head: ListNode): ListNode {
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
      slow = slow.next!;
      fast = fast.next.next;
    }
    return slow;
  }

  /**
   * 反转链表
   */
  function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let cur = head;
    while (cur) {
      const nextTmp = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nextTmp;
    }
    return prev;
  }

  /**
   * 交替合并两个链表
   */
  function mergeList(l1: ListNode | null, l2: ListNode | null) {
    let tmpL1: ListNode | null;
    let tmpL2: ListNode | null;
    while (l1 && l2) {
      tmpL1 = l1.next;
      tmpL2 = l2.next;

      l1.next = l2;
      l1 = tmpL1;

      l2.next = l1;
      l2 = tmpL2;
    }
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将链表 L0→L1→...→Ln-1→Ln 重排为 L0→Ln→L1→Ln-1→...
   - 需要交替连接头尾两端的节点
   - 关键挑战：链表无法直接访问尾部节点

2. 算法分析：
   - 方法一：时间 O(n)，空间 O(n) - 使用数组存储节点
   - 方法二：时间 O(n)，空间 O(1) - 三步法（找中点+反转+合并）
   - 算法类型：双指针 / 链表操作

3. 实现要点：
   - 方法二三个步骤缺一不可：定位中点→反转后半部分→交替合并
   - 找中点：快慢指针，注意边界条件确保中点偏左
   - 反转：标准的链表反转操作
   - 合并：交替连接，注意保存临时指针避免丢失节点

4. 优化思路：
   - 方法二空间最优，是面试推荐解法
   - 方法一更直观但需要额外空间
   - 关键在于正确处理指针操作，避免形成环或丢失节点
   - 边界情况：空链表、单节点、两节点链表
*/
