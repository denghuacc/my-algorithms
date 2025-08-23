/*
 * @lc app=leetcode.cn id=445 lang=typescript
 *
 * [445] 两数相加 II
 *
 * https://leetcode-cn.com/problems/add-two-numbers-ii/description/
 *
 * algorithms
 * Medium (45.69%)
 * Likes:    210
 * Dislikes: 0
 * Total Accepted:    40.4K
 * Total Submissions: 70.5K
 * Testcase Example:  '[7,2,4,3]\n[5,6,4]'
 *
 * 给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 *
 *
 *
 * 进阶：
 *
 * 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
 *
 *
 *
 * 示例：
 *
 * 输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 8 -> 0 -> 7
 *
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
 * 两数相加 II - 栈解法
 *
 * 核心思想：
 * 1. 由于数字高位在链表前面，需要从低位开始计算
 * 2. 使用两个栈分别存储两个链表的值
 * 3. 从栈顶开始弹出元素进行加法运算
 * 4. 采用头插法构建结果链表
 */
var addTwoNumbers = function (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const s1: number[] = [];
  const s2: number[] = [];

  // 将两个链表的值分别压入栈中
  while (l1) {
    s1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    s2.push(l2.val);
    l2 = l2.next;
  }

  let res: ListNode | null = null;
  let carry = 0;

  // 从低位开始计算，处理进位
  while (s1.length || s2.length || carry > 0) {
    const v1 = s1.length ? s1.pop()! : 0;
    const v2 = s2.length ? s2.pop()! : 0;
    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    const val = sum % 10;

    // 头插法构建结果链表
    const node = new ListNode(val);
    node.next = res;
    res = node;
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 两个链表表示两个非负整数，高位在前
   - 需要计算两数之和并返回新链表
   - 关键挑战：链表从高位开始，但加法需要从低位计算

2. 算法分析：
   - 时间复杂度：O(max(m, n))，其中 m 和 n 分别是两个链表的长度
   - 空间复杂度：O(m + n)，栈空间存储所有节点值
   - 算法类型：栈 + 模拟

3. 实现要点：
   - 使用栈数据结构实现"后进先出"，模拟从低位开始的加法
   - 头插法构建结果链表，保证高位在前的顺序
   - 正确处理进位，包括最高位的进位
   - 边界情况：两链表长度不同，最终仍有进位

4. 优化思路：
   - 栈解法是最直观的解决方案
   - 如果不允许修改原链表，此方法最优
   - 若允许修改，可先反转链表再相加，但会增加代码复杂度
   - 空间优化：可以考虑递归解法，但实现较复杂
*/
