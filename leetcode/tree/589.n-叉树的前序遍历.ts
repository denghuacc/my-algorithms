/*
 * @lc app=leetcode.cn id=589 lang=typescript
 *
 * [589] N 叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/description/
 *
 * algorithms
 * Easy (74.20%)
 * Likes:    148
 * Dislikes: 0
 * Total Accepted:    69K
 * Total Submissions: 92.9K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的 前序遍历 。
 *
 * N 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。
 *
 *
 *
 *
 *
 * 进阶：
 *
 * 递归法很简单，你可以使用迭代法完成此题吗?
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[1,3,5,6,2,4]
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]
 *
 *
 *
 *
 * 提示：
 *
 *
 * N 叉树的高度小于或等于 1000
 * 节点总数在范围 [0, 10^4] 内
 *
 *
 *
 *
 */

export {};

//  Definition for node.
class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

// @lc code=start
// recursive
var preorder = function (root: Node | null): number[] {
  const res: number[] = [];
  dfs(root);
  return res;
  function dfs(root: Node | null) {
    if (root) {
      res.push(root.val);
      if (root.children.length) {
        for (const child of root.children) {
          dfs(child);
        }
      }
    }
  }
};

// iterative
var preorder = function (root: Node | null): number[] {
  const res: number[] = [];
  if (!root) {
    return res;
  }
  const stack: Node[] = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop()!;
    res.push(node.val);
    let len = node.children.length;
    if (len) {
      for (let i = len - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
  }
  return res;
};
// @lc code=end
