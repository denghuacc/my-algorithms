/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 *
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/description/
 *
 * algorithms
 * Medium (51.81%)
 * Likes:    231
 * Dislikes: 0
 * Total Accepted:    37.6K
 * Total Submissions: 68.2K
 * Testcase Example:  '[1,2,3,4,5,null,7]'
 *
 * 给定一个二叉树
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
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数小于 6000
 * -100 <= node.val <= 100
 *
 *
 *
 *
 *
 *
 *
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
// level traverse
var connect = function (root) {
  if (!root) return null;
  const queue = [root];
  while (queue.length) {
    const n = queue.length;
    let last = null;
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      // new level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (i !== 0) last.next = node;
      last = node;
    }
  }
  return root;
};

// use existing next pointer
var connect = function (root) {
  if (!root) return null;
  let start = root;
  let last = null;
  let nextStart = null;

  while (start) {
    last = null;
    nextStart = null;

    for (let p = start; p != null; p = p.next) {
      if (p.left) handle(p.left);
      if (p.right) handle(p.right);
    }

    start = nextStart;
  }

  return root;

  // build next pointer
  function handle(node) {
    if (last) last.next = node;
    if (!nextStart) nextStart = node;
    last = node;
  }
};
// @lc code=end
