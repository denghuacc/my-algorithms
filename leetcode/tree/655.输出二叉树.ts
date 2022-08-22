/*
 * @lc app=leetcode.cn id=655 lang=typescript
 *
 * [655] 输出二叉树
 *
 * https://leetcode.cn/problems/print-binary-tree/description/
 *
 * algorithms
 * Medium (65.20%)
 * Likes:    149
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 25.2K
 * Testcase Example:  '[1,2]'
 *
 * 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局
 * 。构造此格式化布局矩阵需要遵循以下规则：
 *
 *
 * 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
 * 矩阵的列数 n 应该等于 2^height+1 - 1 。
 * 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n-1)/2] 。
 * 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r+1][c-2^height-r-1] ，右子节点放置在
 * res[r+1][c+2^height-r-1] 。
 * 继续这一过程，直到树中的所有节点都妥善放置。
 * 任意空单元格都应该包含空字符串 "" 。
 *
 *
 * 返回构造得到的矩阵 res 。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2]
 * 输出：
 * [["","1",""],
 * ["2","",""]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3,null,4]
 * 输出：
 * [["","","","1","","",""],
 * ["","2","","","","3",""],
 * ["","","4","","","",""]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数在范围 [1, 2^10] 内
 * -99 <= Node.val <= 99
 * 树的深度在范围 [1, 10] 内
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
// dfs
var printTree = function (root: TreeNode | null): string[][] {
  const height = getHeight(root);
  const m = height + 1;
  const n = 2 ** m - 1;
  const res = Array.from(new Array(m), () => new Array(n).fill(""));
  dfs(res, 0, Math.floor((n - 1) / 2), root!, height);
  return res;

  function getHeight(node: TreeNode | null): number {
    let h = 0;
    if (node?.left) {
      h = Math.max(h, getHeight(node.left) + 1);
    }
    if (node?.right) {
      h = Math.max(h, getHeight(node.right) + 1);
    }
    return h;
  }

  function dfs(
    res: string[][],
    r: number,
    c: number,
    root: TreeNode,
    height: number
  ) {
    res[r][c] = root.val.toString();
    if (root.left) {
      dfs(res, r + 1, c - 2 ** (height - r - 1), root.left, height);
    }
    if (root.right) {
      dfs(res, r + 1, c + 2 ** (height - r - 1), root.right, height);
    }
  }
};

// bfs
var printTree = function (root: TreeNode | null): string[][] {
  const height = getHeight(root!);
  const m = height + 1;
  const n = (1 << m) - 1;
  const res = Array.from(new Array(m), () => new Array(n).fill(""));
  const queue: [TreeNode, number, number][] = [
    [root!, 0, Math.floor((n - 1) / 2)],
  ];

  while (queue.length) {
    const [node, r, c] = queue.shift()!;
    res[r][c] = node.val.toString();
    if (node.left) {
      queue.push([node.left, r + 1, c - (1 << (height - r - 1))]);
    }
    if (node.right) {
      queue.push([node.right, r + 1, c + (1 << (height - r - 1))]);
    }
  }

  return res;

  function getHeight(node: TreeNode): number {
    let h = -1;
    const queue: TreeNode[] = [node];
    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift()!;
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      h++;
    }
    return h;
  }
};
// @lc code=end
