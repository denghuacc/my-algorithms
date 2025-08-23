/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (31.81%)
 * Likes:    778
 * Dislikes: 0
 * Total Accepted:    151.3K
 * Total Submissions: 395K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 *
 * 示例：
 *
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 *
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 *
 *
 * 说明：
 *
 * 给定的 n 保证是有效的。
 *
 * 进阶：
 *
 * 你能尝试使用一趟扫描实现吗？
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
 * 方法一：两次遍历
 *
 * 核心思想：
 * 1. 第一次遍历计算链表长度
 * 2. 第二次遍历找到要删除节点的前驱节点
 * 3. 删除目标节点
 */
var removeNthFromEnd = function (
  head: ListNode | null,
  n: number
): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;

  // 第一次遍历：计算链表长度
  let len = 0;
  let cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }

  // 第二次遍历：找到要删除节点的前驱
  len -= n; // 计算要删除节点的前驱位置
  let pre = dummy;
  while (len && pre.next) {
    len--;
    pre = pre.next;
  }

  // 删除目标节点
  pre.next = pre.next!.next;
  return dummy.next;
};

/**
 * 方法二：双指针一次遍历（推荐）
 *
 * 核心思想：
 * 1. 使用快慢双指针，快指针先走 n+1 步
 * 2. 然后快慢指针同时移动，直到快指针到达末尾
 * 3. 此时慢指针指向要删除节点的前驱
 */
var removeNthFromEnd = function (
  head: ListNode | null,
  n: number
): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy; // 快指针
  let second = dummy; // 慢指针

  // 快指针先走 n+1 步，建立双指针间距
  for (let i = 0; i < n + 1; i++) {
    first = first.next!;
  }

  // 双指针同时移动，直到快指针到达末尾
  while (first) {
    first = first.next;
    second = second.next!;
  }

  // 此时 second 指向要删除节点的前驱，执行删除
  second.next = second.next!.next;
  return dummy.next;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 删除链表的倒数第 n 个节点
   - 需要找到该节点的前驱节点才能执行删除操作
   - 关键挑战：如何在一次遍历中定位倒数第 n 个节点

2. 算法分析：
   - 时间复杂度：O(L)，其中 L 是链表长度
   - 空间复杂度：O(1)，只使用常数额外空间
   - 算法类型：双指针

3. 实现要点：
   - 使用虚拟头节点处理删除头节点的边界情况
   - 双指针技巧：保持两指针间距为 n+1，确保慢指针指向前驱
   - 快指针先移动 n+1 步的原因：需要找到前驱节点而非目标节点
   - 边界情况：删除头节点、链表只有一个节点

4. 优化思路：
   - 双指针解法是最优解：一次遍历 + 常数空间
   - 两次遍历解法更直观但效率略低
   - 虚拟头节点简化边界情况处理
   - 注意指针移动的步数和顺序，避免空指针异常
*/
