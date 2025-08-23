/*
 * @lc app=leetcode.cn id=142 lang=typescript
 *
 * [142] 环形链表 II
 *
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (54.45%)
 * Likes:    909
 * Dislikes: 0
 * Total Accepted:    195.6K
 * Total Submissions: 359.3K
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是
 * -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
 *
 * 说明：不允许修改给定的链表。
 *
 * 进阶：
 *
 *
 * 你是否可以使用 O(1) 空间解决此题？
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：返回索引为 1 的链表节点
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：head = [1,2], pos = 0
 * 输出：返回索引为 0 的链表节点
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 * 示例 3：
 *
 *
 *
 *
 * 输入：head = [1], pos = -1
 * 输出：返回 null
 * 解释：链表中没有环。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围在范围 [0, 10^4] 内
 * -10^5
 * pos 的值为 -1 或者链表中的一个有效索引
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
 * 方法一：哈希表法
 *
 * 核心思想：
 * 1. 遍历链表，将访问过的节点存入哈希表
 * 2. 如果遇到已访问的节点，说明发现环，该节点即为环的入口
 * 3. 如果遍历结束没有重复节点，说明无环
 */
var detectCycle = function (head: ListNode | null): ListNode | null {
  const visited = new Set<ListNode>();
  let cur = head;

  while (cur) {
    if (visited.has(cur)) return cur; // 发现环的入口
    visited.add(cur);
    cur = cur.next;
  }

  return null; // 无环
};

/**
 * 方法二：快慢指针法（Floyd 判圈算法）
 *
 * 核心思想：
 * 1. 第一阶段：快慢指针检测是否有环
 * 2. 第二阶段：若有环，通过数学推导找到环的入口
 *
 * 数学原理：
 * - 设链表头到环入口距离为 a，环入口到相遇点距离为 b，相遇点到环入口距离为 c
 * - 快指针走过距离：a + b + c + b = a + 2b + c
 * - 慢指针走过距离：a + b
 * - 由于快指针速度是慢指针2倍：a + 2b + c = 2(a + b) → c = a
 * - 因此从头节点和相遇点同时开始，每次走一步，必在环入口相遇
 */
var detectCycle = function (head: ListNode | null): ListNode | null {
  if (!head) return null;

  let fast = head;
  let slow = head;

  // 第一阶段：检测是否有环
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;

    if (slow === fast) {
      // 第二阶段：找到环的入口
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next!;
        slow = slow.next!;
      }
      return ptr; // 环的入口
    }
  }

  return null; // 无环
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 检测链表是否有环，如果有环则返回环的入口节点
   - 环是指链表中某个节点的 next 指向之前的节点
   - 需要准确定位环的起始位置，而不仅仅是检测环的存在

2. 算法分析：
   - 方法一：时间 O(n)，空间 O(n) - 哈希表法
   - 方法二：时间 O(n)，空间 O(1) - Floyd 判圈算法
   - 算法类型：双指针 / 哈希表

3. 实现要点：
   - Floyd 算法的数学证明是关键：c = a 的结论
   - 第一阶段：快指针每次走2步，慢指针每次走1步，相遇则有环
   - 第二阶段：一个指针从头开始，一个从相遇点开始，同速前进
   - 两指针相遇点即为环的入口，这是数学推导的结果

4. 优化思路：
   - Floyd 算法是最优解：O(1) 空间 + 巧妙的数学思想
   - 哈希表法更直观但需要额外空间
   - 核心在于理解数学原理：为什么从头和相遇点同时出发会在入口相遇
   - 边界情况：无环、单节点环、头节点就是环入口
*/
