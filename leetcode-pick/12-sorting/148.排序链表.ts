/*
 * @lc app=leetcode.cn id=148 lang=typescript
 *
 * [148] 排序链表
 *
 * https://leetcode-cn.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (57.45%)
 * Likes:    509
 * Dislikes: 0
 * Total Accepted:    56.6K
 * Total Submissions: 87K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 *
 * 示例 1:
 *
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 *
 *
 * 示例 2:
 *
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
 * 链表排序 - 归并排序实现
 * 核心思想：使用快慢指针找到中点，递归排序，然后合并
 */
var sortList = function (head: ListNode | null): ListNode | null {
  return sort(head, null);

  /**
   * 递归排序函数
   * @param head 链表头节点
   * @param tail 链表尾节点（不包含）
   * @returns 排序后的链表头节点
   */
  function sort(head: ListNode | null, tail: ListNode | null): ListNode | null {
    // 空链表或单节点链表直接返回
    if (!head) return null;
    if (head.next === tail) {
      head.next = null;
      return head;
    }

    // 使用快慢指针找到中点
    let slow = head;
    let fast = head;
    while (fast !== tail) {
      slow = slow.next!;
      fast = fast.next!;
      if (fast !== tail) {
        fast = fast.next!;
      }
    }
    const mid = slow;

    // 递归排序左半部分和右半部分，然后合并
    return merge(sort(head, mid), sort(mid, tail));
  }

  /**
   * 合并两个有序链表
   * @param head1 第一个有序链表的头节点
   * @param head2 第二个有序链表的头节点
   * @returns 合并后的有序链表头节点
   */
  function merge(head1: ListNode | null, head2: ListNode | null) {
    const dummy = new ListNode(0); // 虚拟头节点
    let cur = dummy;

    // 双指针合并两个有序链表
    while (head1 && head2) {
      if (head1.val < head2.val) {
        cur.next = head1;
        head1 = head1.next!;
      } else {
        cur.next = head2;
        head2 = head2.next!;
      }
      cur = cur.next!;
    }

    // 将剩余节点连接到结果链表
    cur.next = head1 ? head1 : head2;
    return dummy.next;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：对链表进行排序，要求O(n log n)时间复杂度和常数空间复杂度
   - 关键特点：链表结构限制了随机访问，需要特殊的排序算法
   - 目标：返回排序后的链表头节点

2. 算法分析：
   - 时间复杂度：O(n log n) - 归并排序的标准复杂度
   - 空间复杂度：O(log n) - 递归调用栈的深度
   - 算法类型：归并排序（自顶向下）

3. 实现要点：
   - 关键数据结构：快慢指针用于找到链表中点
   - 核心算法步骤：
     1. 使用快慢指针找到链表的中点
     2. 递归地对前半部分和后半部分进行排序
     3. 合并两个已排序的链表
   - 边界情况处理：空链表、单节点链表、双节点链表

4. 优化思路：
   - 使用快慢指针技巧高效找到中点，避免遍历两次
   - 在递归过程中直接修改链表结构，减少空间使用
   - 使用虚拟头节点简化合并过程
   - 递归终止条件：当链表长度小于等于1时

5. 核心技巧：
   - 快慢指针：快指针每次走两步，慢指针每次走一步，快指针到达末尾时慢指针在中点
   - 链表分割：在慢指针处断开链表，形成两个独立的链表
   - 链表合并：使用双指针技术合并两个有序链表
   - 递归分治：将大问题分解为小问题，然后合并结果

6. 类似问题：
   - 合并两个有序链表：基础版本，不需要分割
   - 重排链表：将链表重新排列为特定模式
   - 链表排序的其他实现：自底向上归并排序、快速排序等

7. 算法变体：
   - 自底向上归并排序：可以进一步优化空间复杂度到O(1)
   - 快速排序：虽然平均时间复杂度相同，但在链表上实现较复杂
   - 堆排序：需要额外的数据结构，不符合空间复杂度要求
*/
