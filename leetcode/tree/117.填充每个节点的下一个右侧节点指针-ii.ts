/*
 * @lc app=leetcode.cn id=117 lang=typescript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 *
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/description/
 *
 * algorithms
 * Medium (59.54%)
 * Likes:    375
 * Dislikes: 0
 * Total Accepted:    65.2K
 * Total Submissions: 109.6K
 * Testcase Example:  '[1,2,3,4,5,null,7]'
 *
 * 给定一个二叉树
 *
 *
 * struct Node {
 * ⁠ int val;
 * ⁠ Node *left;
 * ⁠ Node *right;
 * ⁠ Node *next;
 * }
 *
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 *
 * 初始状态下，所有 next 指针都被设置为 NULL。
 *
 *
 *
 * 进阶：
 *
 *
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 *
 *
 *
 *
 * 示例：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化输出按层序遍历顺序（由 next
 * 指针连接），'#' 表示每层的末尾。
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数小于 6000
 * -100
 *
 *
 *
 *
 *
 *
 *
 */

export {};

// Definition for Node.
class Node {
  val: number;
  left: Node | null;
  right: Node | null;
  next: Node | null;
  constructor(val?: number, left?: Node, right?: Node, next?: Node) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

// @lc code=start
// level traverse
var connect = function (root: Node | null): Node | null {
  if (!root) return null;
  const queue: Node[] = [root];
  while (queue.length) {
    const n = queue.length;
    let last: Node | null = null;
    for (let i = 0; i < n; i++) {
      const node = queue.shift()!;
      // new level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (i !== 0) last!.next = node;
      last = node;
    }
  }
  return root;
};

// use existing next pointer
var connect = function (root: Node | null): Node | null {
  if (!root) return null;
  let start = root;
  let last: Node | null = null;
  let nextStart: Node | null = null;

  while (start) {
    last = null;
    nextStart = null;

    for (let p = start; p != null; p = p.next!) {
      if (p.left) handle(p.left);
      if (p.right) handle(p.right);
    }

    start = nextStart!;
  }

  return root;

  // build next pointer
  function handle(node: Node | null) {
    if (last) {
      last.next = node;
    }
    if (!nextStart) {
      nextStart = node;
    }
    last = node;
  }
};
// @lc code=end
