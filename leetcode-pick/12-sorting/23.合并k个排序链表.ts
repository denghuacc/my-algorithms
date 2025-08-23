/*
 * @lc app=leetcode.cn id=23 lang=typescript
 *
 * [23] 合并K个排序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (42.88%)
 * Likes:    575
 * Dislikes: 0
 * Total Accepted:    97.3K
 * Total Submissions: 194.8K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 *
 * 示例:
 *
 * 输入:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * 输出: 1->1->2->3->4->4->5->6
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
 * 合并k个排序链表 - 方法一：暴力排序
 * 核心思想：将所有节点值提取到数组中，排序后重建链表
 * 时间复杂度：O(n log n)，空间复杂度：O(n)
 */
var mergeKLists = function (lists: Array<ListNode | null>): ListNode | null {
  const nums = [];
  const dummy: ListNode = new ListNode(0);
  let point: ListNode = dummy;

  // 提取所有链表节点的值
  for (let list of lists) {
    while (list != null) {
      nums.push(list.val);
      list = list.next;
    }
  }

  // 对提取的值进行排序
  nums.sort((a, b) => a - b);

  // 根据排序后的值重建链表
  for (const num of nums) {
    point.next = new ListNode(num);
    point = point.next;
  }

  return dummy.next;
};

/**
 * 合并k个排序链表 - 方法二：分治合并（推荐）
 * 核心思想：两两合并链表，逐步减少链表数量
 * 时间复杂度：O(n log k)，空间复杂度：O(1)
 */
var mergeKLists = function (lists: Array<ListNode | null>): ListNode | null {
  let len = lists.length;
  if (len === 0) return null;

  // 分治合并：每次将链表两两配对合并
  while (len > 1) {
    for (let i = 0; i < Math.floor(len / 2); i++) {
      // 合并第i个和第(len-1-i)个链表
      lists[i] = mergeTwoLists(lists[i], lists[len - 1 - i]);
    }
    // 更新链表数量（处理奇数个链表的情况）
    len = Math.floor((len + 1) / 2);
  }

  return lists[0];

  /**
   * 合并两个有序链表
   * @param l1 第一个有序链表
   * @param l2 第二个有序链表
   * @returns 合并后的有序链表
   */
  function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;

    // 递归合并：选择较小的头节点作为新链表的头
    if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
    }
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：将k个已排序的链表合并成一个有序链表
   - 关键特点：每个链表都是有序的，需要高效合并多个链表
   - 目标：返回合并后的有序链表头节点

2. 算法分析：
   - 时间复杂度：O(n log k) - 其中n是所有链表的总节点数，k是链表数量
   - 空间复杂度：O(1) - 原地操作，只使用常数额外空间
   - 算法类型：分治合并（Divide and Conquer）

3. 实现要点：
   - 关键数据结构：两两合并链表，逐步减少链表数量
   - 核心算法步骤：
     1. 将k个链表两两配对合并
     2. 重复合并过程直到只剩一个链表
     3. 使用递归或迭代实现两两合并
   - 边界情况处理：空链表数组、单个链表、奇数个链表

4. 优化思路：
   - 分治策略：避免逐个合并导致的O(k²)时间复杂度
   - 两两合并：每次合并后链表数量减半，总共需要log k轮
   - 原地合并：直接修改链表指针，不创建新节点
   - 处理奇数链表：最后一轮可能剩一个链表需要特殊处理

5. 核心技巧：
   - 分治合并：将k个链表的问题分解为多个两两合并的子问题
   - 链表合并：使用双指针技术合并两个有序链表
   - 递归合并：可以递归实现两两合并，代码更简洁
   - 迭代合并：使用循环实现，避免递归调用栈

6. 类似问题：
   - 合并两个有序链表：基础版本，k=2的情况
   - 排序链表：先合并再排序，或使用归并排序
   - 多路归并：外部排序中的多路归并问题

7. 算法变体：
   - 优先队列：使用最小堆维护每个链表的当前节点，时间复杂度相同但空间复杂度更高
   - 逐个合并：依次合并每个链表，时间复杂度O(k²n)
   - 外部排序：当链表存储在外部存储时，需要考虑I/O优化

8. 性能对比：
   - 分治合并：O(n log k)，最优的时间复杂度
   - 优先队列：O(n log k)，但需要额外空间存储堆
   - 逐个合并：O(k²n)，简单但效率较低
   - 暴力排序：O(n log n)，将所有节点值排序后重建链表
*/
