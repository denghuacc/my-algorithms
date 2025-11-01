/*
 * @lc app=leetcode.cn id=3217 lang=typescript
 *
 * [3217] 从链表中移除在数组中存在的节点
 *
 * https://leetcode.cn/problems/delete-nodes-from-linked-list-present-in-array/description/
 *
 * algorithms
 * Medium (65.67%)
 * Likes:    31
 * Dislikes: 0
 * Total Accepted:    22.8K
 * Total Submissions: 33.7K
 * Testcase Example:  '[1,2,3]\n[1,2,3,4,5]'
 *
 * 给你一个整数数组 nums 和一个链表的头节点 head。从链表中移除所有存在于 nums 中的节点后，返回修改后的链表的头节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： nums = [1,2,3], head = [1,2,3,4,5]
 *
 * 输出： [4,5]
 *
 * 解释：
 *
 *
 *
 * 移除数值为 1, 2 和 3 的节点。
 *
 *
 * 示例 2：
 *
 *
 * 输入： nums = [1], head = [1,2,1,2,1,2]
 *
 * 输出： [2,2,2]
 *
 * 解释：
 *
 *
 *
 * 移除数值为 1 的节点。
 *
 *
 * 示例 3：
 *
 *
 * 输入： nums = [5], head = [1,2,3,4]
 *
 * 输出： [1,2,3,4]
 *
 * 解释：
 *
 *
 *
 * 链表中不存在值为 5 的节点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 * nums 中的所有元素都是唯一的。
 * 链表中的节点数在 [1, 10^5] 的范围内。
 * 1 <= Node.val <= 10^5
 * 输入保证链表中至少有一个值没有在 nums 中出现过。
 *
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  // 1. 将 nums 数组转换为哈希集合，实现 O(1) 的查找时间复杂度
  const numSet = new Set(nums);

  // 2. 创建虚拟头节点，简化头节点的删除操作
  // 虚拟头节点的作用：统一处理头节点和普通节点的删除逻辑
  const dummy = new ListNode(0, head);

  // 3. 初始化当前指针，从虚拟头节点开始遍历
  let cur = dummy;

  // 4. 遍历链表，检查每个节点的下一个节点
  while (cur.next) {
    const val = cur.next.val;

    // 5. 如果下一个节点的值在 numSet 中，删除该节点
    if (numSet.has(val)) {
      // 删除操作：跳过当前节点的下一个节点
      // cur.next 指向 cur.next.next，从而移除 cur.next 节点
      cur.next = cur.next?.next;
    } else {
      // 6. 如果下一个节点的值不在 numSet 中，移动指针到下一个节点
      cur = cur.next!;
    }
  }

  // 7. 返回虚拟头节点的下一个节点，即修改后的链表头节点
  return dummy.next;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从单链表中删除所有值在给定数组中的节点
   - 关键特点：需要高效判断节点值是否在数组中
   - 目标：返回删除操作后的链表头节点

2. 算法分析：
   - 时间复杂度：O(n + m)
     * n 是链表的长度，需要遍历整个链表
     * m 是 nums 数组的长度，需要构建哈希集合
     * 总体时间复杂度为 O(n + m)
   - 空间复杂度：O(m)
     * 需要创建一个哈希集合存储 nums 数组中的所有元素
     * 虚拟头节点占用 O(1) 空间
   - 算法类型：链表操作 + 哈希表

3. 解题思路：

   核心思想：
   - 使用哈希集合将数组元素的查找时间从 O(m) 优化到 O(1)
   - 使用虚拟头节点简化头节点的删除逻辑
   - 通过指针操作实现节点的删除

   关键观察：
   - 直接在数组中查找元素的时间复杂度是 O(m)，如果链表长度为 n，总时间复杂度会达到 O(n * m)
   - 通过哈希集合预处理，可以将查找时间降低到 O(1)
   - 使用虚拟头节点可以避免头节点删除的特殊处理

   算法步骤：
   1. 将 nums 数组转换为哈希集合 numSet，时间复杂度 O(m)
   2. 创建虚拟头节点 dummy，指向原链表的头节点
   3. 从虚拟头节点开始遍历链表
   4. 对于每个节点，检查其下一个节点的值是否在 numSet 中
   5. 如果在集合中，删除下一个节点（cur.next = cur.next.next）
   6. 如果不在集合中，移动指针到下一个节点（cur = cur.next）
   7. 遍历结束后，返回 dummy.next 作为新的头节点

4. 实现要点：

   数据结构选择：
   - 使用 Set 数据结构存储 nums 数组，提供 O(1) 的查找性能
   - 使用虚拟头节点（dummy node）统一处理头节点和普通节点的删除

   边界条件处理：
   - 虚拟头节点确保即使头节点需要删除，也能正确返回新的头节点
   - 题目保证链表中至少有一个值不在 nums 中，因此不会出现空链表

   优化技巧：
   - 预处理 nums 数组为 Set，避免重复的线性查找
   - 使用虚拟头节点避免对头节点的特殊判断
   - 检查 cur.next 而不是 cur，使得删除操作更简洁

5. 示例分析：

   示例 1：nums = [1,2,3], head = [1,2,3,4,5]

   初始状态：
   dummy -> 1 -> 2 -> 3 -> 4 -> 5
   cur
   numSet = {1, 2, 3}

   第1轮：cur = dummy, cur.next = 1
   - 1 在 numSet 中，删除节点 1
   - dummy -> 2 -> 3 -> 4 -> 5
   - cur 保持在 dummy

   第2轮：cur = dummy, cur.next = 2
   - 2 在 numSet 中，删除节点 2
   - dummy -> 3 -> 4 -> 5
   - cur 保持在 dummy

   第3轮：cur = dummy, cur.next = 3
   - 3 在 numSet 中，删除节点 3
   - dummy -> 4 -> 5
   - cur 保持在 dummy

   第4轮：cur = dummy, cur.next = 4
   - 4 不在 numSet 中，移动指针
   - cur 移动到节点 4

   第5轮：cur = 4, cur.next = 5
   - 5 不在 numSet 中，移动指针
   - cur 移动到节点 5

   第6轮：cur = 5, cur.next = null
   - 循环结束

   返回 dummy.next = 4 -> 5

   边界情况：
   - 头节点需要删除：虚拟头节点处理
   - 连续多个节点需要删除：while 循环中 cur 不移动，持续删除
   - 所有节点都不需要删除：cur 正常向后移动
   - 链表只有一个节点：题目保证至少有一个节点不在 nums 中

6. 算法要点总结：

   核心技巧：
   - 哈希集合优化：将数组转换为 Set，实现 O(1) 查找
   - 虚拟头节点：统一处理头节点和普通节点的删除逻辑
   - 指针操作：通过修改 cur.next 指向实现节点删除

   优化要点：
   - 预处理数组为 Set，避免每次都遍历数组查找
   - 虚拟头节点避免对头节点的特殊判断，简化代码逻辑
   - 检查 cur.next 而不是 cur 本身，使删除操作更直接

   类似问题：
   - LeetCode 203. 移除链表元素：删除所有值等于给定值的节点
   - LeetCode 237. 删除链表中的节点：删除指定节点
   - LeetCode 83. 删除排序链表中的重复元素：删除重复节点

7. 常见错误：
   - 忘记使用虚拟头节点，导致头节点删除时需要特殊处理
   - 删除节点后错误地移动指针，导致跳过某些节点
   - 直接在数组中查找元素，导致时间复杂度过高
   - 未处理连续需要删除的节点，导致部分节点未被删除

8. 扩展思考：
   - 如果 nums 数组非常大，但链表很短，可以考虑遍历链表时动态检查
   - 如果需要保留被删除的节点，可以创建两个链表分别存储
   - 可以使用递归方法实现，但会增加空间复杂度（调用栈）
*/
