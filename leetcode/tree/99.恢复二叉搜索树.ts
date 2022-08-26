/*
 * @lc app=leetcode.cn id=99 lang=typescript
 *
 * [99] 恢复二叉搜索树
 *
 * https://leetcode-cn.com/problems/recover-binary-search-tree/description/
 *
 * algorithms
 * Hard (49.27%)
 * Likes:    183
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 26.7K
 * Testcase Example:  '[1,3,null,null,2]'
 *
 * 二叉搜索树中的两个节点被错误地交换。
 *
 * 请在不改变其结构的情况下，恢复这棵树。
 *
 * 示例 1:
 *
 * 输入: [1,3,null,null,2]
 *
 * 1
 * /
 * 3
 * \
 * 2
 *
 * 输出: [3,1,null,null,2]
 *
 * 3
 * /
 * 1
 * \
 * 2
 *
 *
 * 示例 2:
 *
 * 输入: [3,1,4,null,null,2]
 *
 * ⁠ 3
 * ⁠/ \
 * 1   4
 * /
 * 2
 *
 * 输出: [2,1,4,null,null,3]
 *
 * ⁠ 2
 * ⁠/ \
 * 1   4
 * /
 * ⁠ 3
 *
 * 进阶:
 *
 *
 * 使用 O(n) 空间复杂度的解法很容易实现。
 * 你能想出一个只使用常数空间的解决方案吗？
 *
 *
 */

export {};

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
// inorder
var recoverTree = function (root: TreeNode | null) {
  const nums: number[] = [];
  inOrder(root, nums);
  const swapped = findTwoSwapped(nums);
  recover(root, 2, swapped[0], swapped[1]);

  function inOrder(root: TreeNode | null, nums: number[]) {
    if (!root) return;
    inOrder(root.left, nums);
    nums.push(root.val);
    inOrder(root.right, nums);
  }

  function findTwoSwapped(nums: number[]): [number, number] {
    const len = nums.length;
    let x = -1;
    let y = -1;

    for (let i = 0; i < len - 1; i++) {
      if (nums[i + 1] < nums[i]) {
        y = nums[i + 1];
        if (x === -1) {
          x = nums[i];
        } else {
          break;
        }
      }
    }

    return [x, y];
  }

  function recover(root: TreeNode | null, count: number, x: number, y: number) {
    if (root) {
      if (root.val === x || root.val === y) {
        root.val = root.val === x ? y : x;
        if (--count === 0) return;
      }
      recover(root.left, count, x, y);
      recover(root.right, count, x, y);
    }
  }
};

// recursive
var recoverTree = function (root: TreeNode | null) {
  let x: TreeNode | null = null;
  let y: TreeNode | null = null;
  let pred: TreeNode | null = null;

  findTwoSwapped(root);
  swap(x!, y!);

  function findTwoSwapped(root: TreeNode | null) {
    if (!root) return;
    findTwoSwapped(root.left);
    if (pred && root.val < pred.val) {
      y = root;
      if (!x) x = pred;
      else return;
    }
    pred = root;
    findTwoSwapped(root.right);
  }

  function swap(x: TreeNode, y: TreeNode) {
    [x.val, y.val] = [y.val, x.val];
  }
};

// iterative
var recoverTree = function (root: TreeNode | null) {
  const stack: TreeNode[] = [];
  let x: TreeNode | null = null;
  let y: TreeNode | null = null;
  let pred = null;

  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!;
    if (pred && root.val < pred.val) {
      y = root;
      if (!x) x = pred;
      else break;
    }
    pred = root;
    root = root.right;
  }

  swap(x!, y!);

  function swap(x: TreeNode, y: TreeNode) {
    [x.val, y.val] = [y.val, x.val];
  }
};
// @lc code=end
