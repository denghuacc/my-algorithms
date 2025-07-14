/*
 * @lc app=leetcode.cn id=1290 lang=typescript
 *
 * [1290] 二进制链表转整数
 *
 * https://leetcode.cn/problems/convert-binary-number-in-a-linked-list-to-integer/description/
 *
 * algorithms
 * Easy (80.20%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    109.3K
 * Total Submissions: 135.5K
 * Testcase Example:  '[1,0,1]'
 *
 * 给你一个单链表的引用结点 head。链表中每个结点的值不是 0 就是 1。已知此链表是一个整数数字的二进制表示形式。
 *
 * 请你返回该链表所表示数字的 十进制值 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [1,0,1]
 * 输出：5
 * 解释：二进制数 (101) 转化为十进制数 (5)
 *
 *
 * 示例 2：
 *
 * 输入：head = [0]
 * 输出：0
 *
 *
 * 示例 3：
 *
 * 输入：head = [1]
 * 输出：1
 *
 *
 * 示例 4：
 *
 * 输入：head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
 * 输出：18880
 *
 *
 * 示例 5：
 *
 * 输入：head = [0,0]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表不为空。
 * 链表的结点总数不超过 30。
 * 每个结点的值不是 0 就是 1。
 *
 *
 */

export {};

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

/**
 * 方法1：先收集到数组，再从低位到高位计算
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var getDecimalValue = function (head: ListNode | null): number {
  const arr: number[] = [];

  // 第一步：遍历链表，将所有节点值存储到数组中
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  const n = arr.length;
  let res = 0;
  let t = 1; // 当前位的权值，从最低位开始为1，每次乘以2

  // 第二步：从数组最后一位开始，按二进制位权值计算十进制值
  // 二进制 101 = 1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5
  for (let i = n - 1; i >= 0; i--) {
    res += arr[i] * t; // 当前位值 × 当前位权值
    t *= 2; // 权值左移一位（乘以2）
  }

  return res;
};

/**
 * 方法2：一次遍历，利用位运算思想
 * 时间复杂度：O(n)，空间复杂度：O(1)
 */
var getDecimalValue = function (head: ListNode | null): number {
  let res = 0;

  // 遍历链表，每次将结果左移一位（乘以2）再加上当前位的值
  // 例如：101 的计算过程
  // 第1步：res = 0×2 + 1 = 1
  // 第2步：res = 1×2 + 0 = 2
  // 第3步：res = 2×2 + 1 = 5
  while (head) {
    res = res * 2 + head.val; // 等价于 res = (res << 1) + head.val
    head = head.next;
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将链表表示的二进制数转换为十进制数
   - 链表从头到尾代表二进制数从高位到低位

2. 算法分析：
   - 时间复杂度：O(n) - 需要遍历整个链表
   - 空间复杂度：方法1 O(n)，方法2 O(1)
   - 算法类型：链表遍历 + 进制转换

3. 两种解法对比：

   方法1 - 数组收集法：
   - 先遍历链表收集所有位到数组
   - 再从最低位开始计算：res = Σ(bit[i] × 2^i)
   - 思路直观，但需要额外空间

   方法2 - 位运算法（推荐）：
   - 利用二进制左移的特性：每次左移相当于乘以2
   - 从高位到低位处理：res = res × 2 + current_bit
   - 空间复杂度更优，一次遍历完成

4. 实现要点：
   - 二进制转十进制公式：Σ(bit[i] × 2^i)
   - 位运算优化：左移一位等于乘以2
   - 边界处理：空链表和单节点情况

5. 示例分析：
   链表 [1,0,1] 表示二进制 101
   
   方法1计算过程：
   - 数组：[1, 0, 1]
   - 计算：1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5
   
   方法2计算过程：
   - 步骤1：res = 0×2 + 1 = 1
   - 步骤2：res = 1×2 + 0 = 2
   - 步骤3：res = 2×2 + 1 = 5

6. 优化要点：
   - 方法2避免了额外的数组空间
   - 利用乘法代替位运算，代码更易读
   - 一次遍历即可完成转换

7. 类似问题：
   - 各种进制转换问题
   - 数组/链表表示的数字运算
   - 二进制相关的位运算问题
*/
