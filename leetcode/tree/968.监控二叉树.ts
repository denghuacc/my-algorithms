/*
 * @lc app=leetcode.cn id=968 lang=typescript
 *
 * [968] 监控二叉树
 *
 * https://leetcode-cn.com/problems/binary-tree-cameras/description/
 *
 * algorithms
 * Hard (40.09%)
 * Likes:    109
 * Dislikes: 0
 * Total Accepted:    4.7K
 * Total Submissions: 10.9K
 * Testcase Example:  '[0,0,null,0,0]'
 *
 * 给定一个二叉树，我们在树的节点上安装摄像头。
 *
 * 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
 *
 * 计算监控树的所有节点所需的最小摄像头数量。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：[0,0,null,0,0]
 * 输出：1
 * 解释：如图所示，一台摄像头足以监控所有节点。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：[0,0,null,0,null,0,null,null,0]
 * 输出：2
 * 解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。
 *
 *
 *
 * 提示：
 *
 *
 * 给定树的节点数的范围是 [1, 1000]。
 * 每个节点的值都是 0。
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
// recursive
var minCameraCover = function (root: TreeNode | null): number {
  return dfs(root)[1];

  function dfs(root: TreeNode | null): [number, number, number] {
    if (!root) {
      return [Math.floor(Number.MAX_SAFE_INTEGER / 2), 0, 0];
    }
    const [la, lb, lc] = dfs(root.left);
    const [ra, rb, rc] = dfs(root.right);
    const a = lc + rc + 1;
    const b = Math.min(a, Math.min(la + rb, ra + lb));
    const c = Math.min(a, lb + rb);
    return [a, b, c];
  }
};
// @lc code=end

// 状态 a：root 必须放置摄像头的情况下，覆盖整棵树需要的摄像头数目。
// 状态 b：覆盖整棵树需要的摄像头数目，无论 root 是否放置摄像头。
// 状态 c：覆盖两棵子树需要的摄像头数目，无论节点 root 本身是否被监控到。
