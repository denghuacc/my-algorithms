/*
 * @lc app=leetcode.cn id=206 lang=typescript
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (57.49%)
 * Likes:    913
 * Dislikes: 0
 * Total Accepted:    218.6K
 * Total Submissions: 318.7K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 *
 * 示例:
 *
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 *
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
 * 方法一：迭代法（推荐）
 *
 * 核心思想：
 * 1. 使用三个指针：pre(前驱)、cur(当前)、next(后继)
 * 2. 逐个节点改变指针方向，将 cur.next 指向 pre
 * 3. 同时更新三个指针位置，继续处理下一个节点
 */
var reverseList = function (head: ListNode | null): ListNode | null {
  let pre = null; // 前驱节点，初始为 null
  let cur = head; // 当前节点，从头开始

  while (cur) {
    const nextTemp = cur.next; // 保存下一个节点
    cur.next = pre; // 反转当前节点指针
    pre = cur; // 更新前驱节点
    cur = nextTemp; // 移动到下一个节点
  }

  return pre; // pre 成为新的头节点
};

/**
 * 方法二：递归法
 *
 * 核心思想：
 * 1. 递归到链表末尾，末尾节点成为新头节点
 * 2. 在回溯过程中逐层反转指针方向
 * 3. 每层递归处理当前节点和下一节点的指针关系
 */
var reverseList = function (head: ListNode | null): ListNode | null {
  // 递归终止条件：空节点或只有一个节点
  if (!head || !head.next) return head;

  // 递归反转后续链表，p 是新的头节点
  const p = reverseList(head.next);

  // 反转当前层的指针：让下一个节点指向当前节点
  head.next.next = head;
  head.next = null; // 断开原来的指针

  return p; // 返回新头节点
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 反转单向链表的指针方向
   - 将原来的 A -> B -> C -> NULL 变成 NULL <- A <- B <- C
   - 关键挑战：在改变指针方向时不丢失后续节点的引用

2. 算法分析：
   - 时间复杂度：O(n)，需要遍历链表中的每个节点
   - 空间复杂度：迭代法 O(1)，递归法 O(n)（递归栈空间）
   - 算法类型：双指针（迭代） / 递归

3. 实现要点：
   - 迭代法：三指针技巧确保不丢失节点引用
   - 递归法：先递归到末尾，再在回溯中反转指针
   - 边界情况：空链表、单节点链表
   - 指针更新顺序：先保存 next，再反转，最后移动指针

4. 优化思路：
   - 迭代法更优：常数空间复杂度，无栈溢出风险
   - 递归法更优雅：代码简洁，思路清晰
   - 实际应用建议使用迭代法
   - 可以作为其他链表问题的基础操作
*/
