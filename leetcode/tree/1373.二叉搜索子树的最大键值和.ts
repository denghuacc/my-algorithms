/*
 * @lc app=leetcode.cn id=1373 lang=typescript
 *
 * [1373] 二叉搜索子树的最大键值和
 *
 * https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/description/
 *
 * algorithms
 * Hard (43.12%)
 * Likes:    162
 * Dislikes: 0
 * Total Accepted:    24.9K
 * Total Submissions: 53.8K
 * Testcase Example:  '[1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]'
 *
 * 给你一棵以 root 为根的 二叉树 ，请你返回 任意 二叉搜索子树的最大键值和。
 *
 * 二叉搜索树的定义如下：
 *
 *
 * 任意节点的左子树中的键值都 小于 此节点的键值。
 * 任意节点的右子树中的键值都 大于 此节点的键值。
 * 任意节点的左子树和右子树都是二叉搜索树。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
 * 输出：20
 * 解释：键值为 3 的子树是和最大的二叉搜索树。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root = [4,3,null,1,2]
 * 输出：2
 * 解释：键值为 2 的单节点子树是和最大的二叉搜索树。
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [-4,-2,-5]
 * 输出：0
 * 解释：所有节点键值都为负数，和最大的二叉搜索树为空。
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = [2,1,3]
 * 输出：6
 *
 *
 * 示例 5：
 *
 *
 * 输入：root = [5,4,8,3,null,6,3]
 * 输出：7
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每棵树有 1 到 40000 个节点。
 * 每个节点的键值在 [-4 * 10^4 , 4 * 10^4] 之间。
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
function maxSumBST(root: TreeNode | null): number {
  const INF = 0x3f3f3f3f;
  let res = 0;
  dfs(root);
  return res;

  function dfs(root: TreeNode | null): SubTree {
    if (!root) {
      return new SubTree(true, INF, -INF, 0);
    }
    const left = dfs(root.left);
    const right = dfs(root.right);

    if (
      left.isBST &&
      right.isBST &&
      root.val > left.maxValue &&
      root.val < right.minValue
    ) {
      const sum = root.val + left.sumValue + right.sumValue;
      res = Math.max(res, sum);
      return new SubTree(
        true,
        Math.min(left.minValue, root.val),
        Math.max(root.val, right.maxValue),
        sum
      );
    } else {
      return new SubTree(false, 0, 0, 0);
    }
  }
}

class SubTree {
  isBST: boolean;
  minValue: number;
  maxValue: number;
  sumValue: number;

  constructor(
    isBST: boolean,
    minValue: number,
    maxValue: number,
    sumValue: number
  ) {
    this.isBST = isBST;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.sumValue = sumValue;
  }
}

// @lc code=end
