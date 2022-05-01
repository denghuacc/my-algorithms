/*
 * @lc app=leetcode.cn id=1305 lang=typescript
 *
 * [1305] 两棵二叉搜索树中的所有元素
 *
 * https://leetcode-cn.com/problems/all-elements-in-two-binary-search-trees/description/
 *
 * algorithms
 * Medium (74.85%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    36.6K
 * Total Submissions: 46.9K
 * Testcase Example:  '[2,1,4]\r\n[1,0,3]\r'
 *
 * 给你 root1 和 root2 这两棵二叉搜索树。请你返回一个列表，其中包含 两棵树 中的所有整数并按 升序 排序。.
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root1 = [2,1,4], root2 = [1,0,3]
 * 输出：[0,1,1,2,3,4]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root1 = [1,null,8], root2 = [8,1]
 * 输出：[1,1,8,8]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每棵树的节点数在 [0, 5000] 范围内
 * -10^5 <= Node.val <= 10^5
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
function getAllElements(
  root1: TreeNode | null,
  root2: TreeNode | null
): number[] {
  const arr1: number[] = [];
  const arr2: number[] = [];
  inorder(root1, arr1);
  inorder(root2, arr2);

  const res: number[] = [];
  let p1 = 0;
  let p2 = 0;

  while (true) {
    if (p1 === arr1.length) {
      for (let i = p2; i < arr2.length; i++) {
        res.push(arr2[i]);
      }
      break;
    }
    if (p2 === arr2.length) {
      for (let i = p1; i < arr1.length; i++) {
        res.push(arr1[i]);
      }
      break;
    }

    if (arr1[p1] < arr2[p2]) {
      res.push(arr1[p1]);
      p1++;
    } else {
      res.push(arr2[p2]);
      p2++;
    }
  }

  return res;

  function inorder(root: TreeNode | null, arr: number[]) {
    if (!root) return;
    inorder(root.left, arr);
    arr.push(root.val);
    inorder(root.right, arr);
  }
}
// @lc code=end
