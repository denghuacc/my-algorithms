/*
 * @lc app=leetcode.cn id=234 lang=typescript
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
 * 方法一：转换为数组 + 双指针
 *
 * 核心思想：
 * 1. 将链表值复制到数组中
 * 2. 使用双指针从数组两端向中间比较
 * 3. 如果所有对应位置值相等，则为回文链表
 */
var isPalindrome = function (head: ListNode | null): boolean {
  const arr: number[] = [];

  // 将链表值存入数组
  let cur = head;
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }

  // 双指针检查回文
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

/**
 * 方法二：快慢指针 + 反转链表（推荐）
 *
 * 核心思想：
 * 1. 用快慢指针找到链表中点
 * 2. 反转后半部分链表
 * 3. 比较前半部分和反转后的后半部分
 */
var isPalindrome = function (head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  let fast = head;
  let slow = head;

  // 快慢指针找中点
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
  }

  // 反转后半部分链表
  let pre = null;
  while (slow) {
    const nextTemp = slow.next;
    slow.next = pre;
    pre = slow;
    slow = nextTemp;
  }

  // 比较前半部分和反转后的后半部分
  while (head && pre) {
    if (head.val !== pre.val) return false;
    head = head.next;
    pre = pre.next;
  }

  return true;
};

/**
 * 方法三：递归法
 *
 * 核心思想：
 * 1. 使用递归到达链表末尾
 * 2. 在回溯过程中与前方指针比较
 * 3. 前方指针在每次比较后向前移动
 */
var isPalindrome = function (head: ListNode | null): boolean {
  let frontPointer = head!;
  return recursivelyCheck(head);

  function recursivelyCheck(curNode: ListNode | null): boolean {
    if (curNode) {
      if (!recursivelyCheck(curNode.next)) return false;
      if (curNode.val !== frontPointer.val) return false;
      frontPointer = frontPointer.next!;
    }
    return true;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断链表是否为回文结构
   - 回文：正序和逆序读取结果相同
   - 关键挑战：链表无法随机访问，难以直接从两端比较

2. 算法分析：
   - 方法一：时间 O(n)，空间 O(n) - 使用额外数组
   - 方法二：时间 O(n)，空间 O(1) - 快慢指针 + 反转链表
   - 方法三：时间 O(n)，空间 O(n) - 递归栈空间
   - 算法类型：双指针 / 链表操作 / 递归

3. 实现要点：
   - 快慢指针精确定位中点（奇数链表中点，偶数链表右中点）
   - 反转后半部分链表，注意不会影响判断结果
   - 比较时处理链表长度奇偶性差异
   - 递归法：利用递归栈特性实现"后进先出"的比较

4. 优化思路：
   - 空间最优：方法二，O(1) 空间复杂度
   - 如需保持原链表结构，可在比较后再次反转
   - 实际面试推荐方法二：既满足空间要求又体现算法能力
   - 边界情况：空链表、单节点、两节点链表的处理
*/
