/*
 * @lc app=leetcode.cn id=430 lang=typescript
 *
 * [430] 扁平化多级双向链表
 *
 * https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/description/
 *
 * algorithms
 * Medium (56.00%)
 * Likes:    251
 * Dislikes: 0
 * Total Accepted:    26.7K
 * Total Submissions: 47.7K
 * Testcase Example:  '[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]'
 *
 *
 * 多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。
 *
 * 给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。
 *
 *
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
 * 输出：[1,2,3,7,8,11,12,9,10,4,5,6]
 * 解释：
 *
 * 输入的多级列表如下图所示：
 *
 *
 *
 * 扁平化后的链表如下图：
 *
 *
 *
 *
 * 示例 2：
 *
 * 输入：head = [1,2,null,3]
 * 输出：[1,3,2]
 * 解释：
 *
 * 输入的多级列表如下图所示：
 *
 * ⁠ 1---2---NULL
 * ⁠ |
 * ⁠ 3---NULL
 *
 *
 * 示例 3：
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 *
 *
 * 如何表示测试用例中的多级链表？
 *
 * 以 示例 1 为例：
 *
 * ⁠1---2---3---4---5---6--NULL
 * ⁠        |
 * ⁠        7---8---9---10--NULL
 * ⁠            |
 * ⁠            11--12--NULL
 *
 * 序列化其中的每一级之后：
 *
 * [1,2,3,4,5,6,null]
 * [7,8,9,10,null]
 * [11,12,null]
 *
 *
 * 为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。
 *
 * [1,2,3,4,5,6,null]
 * [null,null,7,8,9,10,null]
 * [null,11,12,null]
 *
 *
 * 合并所有序列化结果，并去除末尾的 null 。
 *
 * [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
 *
 *
 *
 * 提示：
 *
 *
 * 节点数目不超过 1000
 * 1 <= Node.val <= 10^5
 *
 *
 */

export {};

// Definition for node.
class Node {
  val: number;
  prev: Node | null;
  next: Node | null;
  child: Node | null;
  constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
    this.val = val === undefined ? 0 : val;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
    this.child = child === undefined ? null : child;
  }
}

// @lc code=start
/**
 * 扁平化多级双向链表 - DFS 深度优先搜索
 *
 * 核心思想：
 * 1. 遍历链表，遇到有 child 的节点时，优先处理子链表
 * 2. 将子链表递归扁平化，并插入到当前位置
 * 3. 正确维护双向链表的 prev 和 next 指针关系
 * 4. 清除原有的 child 指针
 */
function flatten(head: Node | null): Node | null {
  dfs(head);
  return head;

  /**
   * DFS 扁平化函数
   * @param node 当前处理的起始节点
   * @returns 返回当前层级的最后一个节点
   */
  function dfs(node: Node | null): Node | null {
    let cur = node;
    let last = null;

    while (cur) {
      const next = cur.next;

      // 如果当前节点有子链表
      if (cur.child) {
        // 递归扁平化子链表，获取子链表的尾节点
        const childLast = dfs(cur.child)!;

        // 将子链表插入到当前位置
        cur.next = cur.child;
        cur.child.prev = cur;

        // 如果原来有后继节点，连接子链表尾部和后继节点
        if (next) {
          childLast.next = next;
          next.prev = childLast;
        }

        // 清除 child 指针
        cur.child = null;
        last = childLast;
      } else {
        last = cur;
      }

      cur = next;
    }

    return last;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将多级双向链表扁平化为单级双向链表
   - 子链表要插入到父节点的后面，按深度优先的顺序
   - 保持双向链表的 prev 和 next 指针正确性
   - 清除所有 child 指针

2. 算法分析：
   - 时间复杂度：O(n)，每个节点访问一次
   - 空间复杂度：O(d)，其中 d 是最大深度（递归栈空间）
   - 算法类型：深度优先搜索（DFS）+ 链表操作

3. 实现要点：
   - 遇到有 child 的节点时，先递归处理子链表
   - 将扁平化的子链表插入到当前节点后面
   - 正确连接四个指针：cur->child, child->prev, childLast->next, next->prev
   - 递归函数返回当前层级的最后一个节点，用于连接
   - 记得清除 child 指针

4. 优化思路：
   - DFS 递归解法最直观，代码清晰易懂
   - 也可用栈实现迭代版本，避免递归栈溢出
   - 关键是维护双向链表的指针关系完整性
   - 边界情况：空链表、无子链表、多层嵌套子链表
*/
