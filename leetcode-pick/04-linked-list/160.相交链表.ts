/*
 * @lc app=leetcode.cn id=160 lang=typescript
 *
 * [160] 相交链表
 *
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/description/
 *
 * algorithms
 * Easy (57.83%)
 * Likes:    1034
 * Dislikes: 0
 * Total Accepted:    204.3K
 * Total Submissions: 353.2K
 * Testcase Example:  '8\n[4,1,8,4,5]\n[5,6,1,8,4,5]\n2\n3'
 *
 * 编写一个程序，找到两个单链表相交的起始节点。
 *
 * 如下面的两个链表：
 *
 *
 *
 * 在节点 c1 开始相交。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2,
 * skipB = 3
 * 输出：Reference of the node with value = 8
 * 输入解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为
 * [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
 *
 *
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB
 * = 1
 * 输出：Reference of the node with value = 2
 * 输入解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为
 * [3,2,4]。在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
 *
 *
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
 * 输出：null
 * 输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为
 * 0，而 skipA 和 skipB 可以是任意值。
 * 解释：这两个链表不相交，因此返回 null。
 *
 *
 *
 *
 * 注意：
 *
 *
 * 如果两个链表没有交点，返回 null.
 * 在返回结果后，两个链表仍须保持原有的结构。
 * 可假定整个链表结构中没有循环。
 * 程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 *
 *
 */

export {};

// Definition for singly-linked list.
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
 * 方法一：双指针法（推荐）
 *
 * 核心思想：
 * 1. 两个指针分别从两个链表头开始遍历
 * 2. 当指针到达链表末尾时，跳转到另一个链表的头部
 * 3. 如果有交点，两指针会在交点相遇；无交点则同时到达 null
 *
 * 巧妙之处：通过切换链表，抵消了两链表长度差
 */
var getIntersectionNode = function (
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  let pA = headA;
  let pB = headB;

  // 两指针同时移动，到达末尾后切换到另一链表
  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  // 相遇点即为交点（或都为 null 表示无交点）
  return pA;
};

/**
 * 方法二：哈希表法
 *
 * 核心思想：
 * 1. 遍历链表 A，将所有节点存入哈希表
 * 2. 遍历链表 B，检查每个节点是否在哈希表中
 * 3. 第一个在哈希表中的节点即为交点
 */
var getIntersectionNode = function (
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  const visited = new Set<ListNode>();

  // 将链表 A 的所有节点加入哈希表
  let cur = headA;
  while (cur) {
    visited.add(cur);
    cur = cur.next;
  }

  // 遍历链表 B，查找第一个重复节点
  cur = headB;
  while (cur) {
    if (visited.has(cur)) return cur;
    cur = cur.next;
  }

  return null;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到两个单链表的第一个公共节点
   - 相交是指节点相同（地址相同），不仅仅是值相等
   - 相交后的部分完全重合，形成 Y 字形结构
   - 可能无交点，需要返回 null

2. 算法分析：
   - 方法一：时间 O(m+n)，空间 O(1) - 双指针法
   - 方法二：时间 O(m+n)，空间 O(m) - 哈希表法
   - 算法类型：双指针 / 哈希表

3. 实现要点：
   - 双指针巧妙之处：pA 走完链表 A 再走链表 B，pB 走完链表 B 再走链表 A
   - 这样两指针走过的路程相等：(a+c) + (b+c) = (b+c) + (a+c)
   - 如果有交点，必在第二轮遍历时相遇；无交点则同时到达 null
   - 哈希表法更直观：先记录再查找

4. 优化思路：
   - 双指针法是最优解：O(1) 空间 + 优雅的数学思想
   - 核心洞察：通过路径切换消除长度差异
   - 边界情况：无交点、一个或两个链表为空
   - 也可先计算长度差，让长链表先走几步，但双指针法更简洁
*/
