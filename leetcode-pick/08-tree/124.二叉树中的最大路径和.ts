/*
 * @lc app=leetcode.cn id=124 lang=typescript
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode.cn/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (45.28%)
 * Likes:    1762
 * Dislikes: 0
 * Total Accepted:    279.7K
 * Total Submissions: 617.7K
 * Testcase Example:  '[1,2,3]'
 *
 * 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个
 * 节点，且不一定经过根节点。
 *
 * 路径和 是路径中各节点值的总和。
 *
 * 给你一个二叉树的根节点 root ，返回其 最大路径和 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 *
 * 示例 2：
 *
 *
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目范围是 [1, 3 * 10^4]
 * -1000
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
/**
 * 求二叉树中的最大路径和
 *
 * 算法思路：
 * 1. 使用深度优先搜索（DFS）递归遍历每个节点
 * 2. 对于每个节点，计算以该节点为顶点的最大路径和
 * 3. 路径可以是左子树->当前节点->右子树的形式
 * 4. 返回值是从当前节点向下的最大路径和（只能选择左或右一条路径）
 *
 * 关键点：
 * - 区分"经过节点的最大路径和"和"从节点开始的最大路径和"
 * - 经过节点的路径和 = 左子树路径和 + 节点值 + 右子树路径和
 * - 从节点开始的路径和 = 节点值 + max(左子树路径和, 右子树路径和)
 */
function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity; // 全局最大路径和
  dfs(root);
  return maxSum;

  /**
   * DFS递归函数
   * @param node 当前节点
   * @returns 从当前节点开始向下的最大路径和
   */
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    // 计算左右子树的最大路径和，如果为负数则取0（不选择该路径）
    const leftSum = Math.max(dfs(node.left), 0);
    const rightSum = Math.max(dfs(node.right), 0);

    // 计算经过当前节点的最大路径和（左子树->当前节点->右子树）
    const currentMaxPath = leftSum + node.val + rightSum;

    // 更新全局最大值
    maxSum = Math.max(maxSum, currentMaxPath);

    // 返回从当前节点开始的最大路径和（只能选择一条向下的路径）
    return node.val + Math.max(leftSum, rightSum);
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到二叉树中任意路径的最大和
   - 路径可以从任意节点开始和结束
   - 路径必须是连通的，不能跳跃

2. 算法分析：
   - 时间复杂度：O(N) - 每个节点访问一次
   - 空间复杂度：O(H) - 递归栈深度，H为树的高度
   - 算法类型：深度优先搜索 + 递归

3. 实现要点：
   - 使用递归DFS遍历所有节点
   - 对每个节点计算两个值：
     a) 经过该节点的最大路径和（用于更新全局最大值）
     b) 从该节点开始向下的最大路径和（用于向上传递）
   - 负数路径直接舍弃（取max(path, 0)）

4. 核心思想：
   - 递归分解：将大问题分解为子树问题
   - 状态转移：当前节点的结果依赖于左右子树的结果
   - 全局维护：在递归过程中维护全局最大值

5. 边界情况处理：
   - 空节点：返回0
   - 单节点：直接返回节点值
   - 负数节点：可能被舍弃或保留（取决于整体路径）

6. 算法优化：
   - 一次遍历完成计算，无需额外存储
   - 及时剪枝：负数路径直接舍弃
   - 空间优化：只使用递归栈，无额外数据结构
*/
