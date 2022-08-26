/*
 * @lc app=leetcode.cn id=606 lang=typescript
 *
 * [606] 根据二叉树创建字符串
 *
 * https://leetcode-cn.com/problems/construct-string-from-binary-tree/description/
 *
 * algorithms
 * Easy (57.53%)
 * Likes:    271
 * Dislikes: 0
 * Total Accepted:    39.9K
 * Total Submissions: 66.8K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。
 *
 * 空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。
 *
 * 示例 1:
 *
 *
 * 输入: 二叉树: [1,2,3,4]
 * ⁠      1
 * ⁠    /   \
 * ⁠   2     3
 * ⁠  /
 * ⁠ 4
 *
 * 输出: "1(2(4))(3)"
 *
 * 解释: 原本将是“1(2(4)())(3())”，
 * 在你省略所有不必要的空括号对之后，
 * 它将是“1(2(4))(3)”。
 *
 *
 * 示例 2:
 *
 *
 * 输入: 二叉树: [1,2,3,null,4]
 * ⁠      1
 * ⁠    /   \
 * ⁠   2     3
 * ⁠    \
 * ⁠     4
 *
 * 输出: "1(2()(4))(3)"
 *
 * 解释: 和第一个示例相似，
 * 除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。
 *
 *
 */

export {};

// Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// @lc code=start
// recursive
var tree2str = function (root: TreeNode | null): string {
  if (!root) {
    return "";
  }
  const left = tree2str(root.left);
  const right = tree2str(root.right);
  if (!left && !right) {
    return `${root.val}`;
  }
  if (!right) {
    return `${root.val}(${left})`;
  }
  return `${root.val}(${left})(${right})`;
};

// iterative
var tree2str = function (root: TreeNode | null): string {
  let res = "";
  const stack: TreeNode[] = [];
  if (!root) {
    return res;
  }
  stack.push(root);
  const vis = new Set<TreeNode>();
  while (stack.length) {
    const node = stack[stack.length - 1];
    if (vis.has(node)) {
      if (node !== root) {
        res += ")";
      }
      stack.pop();
    } else {
      vis.add(node);
      if (node !== root) {
        res += "(";
      }
      res += `${node.val}`;
      if (!node.left && node.right) {
        res += "()";
      }
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
  return res;
};
// @lc code=end
