/*
 * @lc app=leetcode.cn id=1123 lang=typescript
 *
 * [1123] 最深叶节点的最近公共祖先
 *
 * https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves/description/
 *
 * algorithms
 * Medium (74.45%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    18.6K
 * Total Submissions: 25K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]'
 *
 * 给你一个有根节点 root 的二叉树，返回它 最深的叶节点的最近公共祖先 。
 *
 * 回想一下：
 *
 *
 * 叶节点 是二叉树中没有子节点的节点
 * 树的根节点的 深度 为 0，如果某一节点的深度为 d，那它的子节点的深度就是 d+1
 * 如果我们假定 A 是一组节点 S 的 最近公共祖先，S 中的每个节点都在以 A 为根节点的子树中，且 A 的深度达到此条件下可能的最大值。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4]
 * 输出：[2,7,4]
 * 解释：我们返回值为 2 的节点，在图中用黄色标记。
 * 在图中用蓝色标记的是树的最深的节点。
 * 注意，节点 6、0 和 8 也是叶节点，但是它们的深度是 2 ，而节点 7 和 4 的深度是 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[1]
 * 解释：根节点是树中最深的节点，它是它本身的最近公共祖先。
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [0,1,3,null,2]
 * 输出：[2]
 * 解释：树中最深的叶节点是 2 ，最近公共祖先是它自己。
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数将在 [1, 1000] 的范围内。
 * 0 <= Node.val <= 1000
 * 每个节点的值都是 独一无二 的。
 *
 *
 *
 *
 * 注意：本题与力扣 865
 * 重复：https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/
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
 * 返回最深叶节点的最近公共祖先。
 *
 * @param root - 二叉树根节点
 * @returns 最深叶节点的最近公共祖先
 */
function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  // dfs 返回 [子树最大深度, 对应的最近公共祖先]
  return dfs(root)[1];

  function dfs(node: TreeNode | null): [number, TreeNode | null] {
    if (!node) {
      // 空节点深度为 0，祖先为空
      return [0, null];
    }
    const [d1, loc1] = dfs(node.left);
    const [d2, loc2] = dfs(node.right);
    if (d1 > d2) {
      // 左子树更深，继承左子树的 LCA
      return [d1 + 1, loc1];
    }
    if (d1 < d2) {
      // 右子树更深，继承右子树的 LCA
      return [d2 + 1, loc2];
    }
    // 深度相同，当前节点是两侧最深叶的最近公共祖先
    return [d1 + 1, node];
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：找出“最深叶节点集合”的最近公共祖先。
   - 关键特点：树的深度由根到叶路径长度决定，最深叶可能不止一个。
   - 目标：返回深度最大的叶节点集合的 LCA。

2. 解题思路
   核心思想
   - 对每个节点，递归返回两项信息：
     1) 该子树的最大深度
     2) 该子树最深叶节点的最近公共祖先
   - 若左子树更深，则最深叶全部在左侧，LCA 继承左侧结果。
   - 若右子树更深，同理继承右侧结果。
   - 若左右深度相同，则当前节点就是两侧最深叶的 LCA。

   算法步骤
   1) 深度优先遍历，返回 [depth, lca]。
   2) 比较左右子树深度：
      - 左深返回左侧 LCA；
      - 右深返回右侧 LCA；
      - 相等返回当前节点。
   3) 根节点的返回值中的 lca 即答案。

3. 代码实现
   实现步骤
   - dfs 返回一个二元组，包含最大深度与对应 LCA。
   - 空节点深度记为 0，LCA 为空。
   - 使用后序遍历保证子树信息已计算完毕。

   关键函数说明
   - lcaDeepestLeaves：主函数，取 dfs(root) 的 LCA 部分。
   - dfs：递归计算深度并确定 LCA。

4. 复杂度分析
   - 时间复杂度：O(n)，每个节点访问一次。
   - 空间复杂度：O(h)，递归栈深度 h 为树高。
   - 关键观察：每个节点只需一次合并左右子树结果。

5. 示例分析
   示例一：root = [3,5,1,6,2,0,8,null,null,7,4]
   - 最深叶为 7 和 4，深度相同。
   - 它们的最近公共祖先为节点 2。

   示例二：root = [1]
   - 只有一个节点，它既是最深叶也是 LCA。

   示例三：root = [0,1,3,null,2]
   - 最深叶为 2，LCA 为 2 本身。

   边界情况
   - 只有单边子树时，LCA 会沿着更深一侧向下传递。
   - 多个最深叶分布在左右两侧时，LCA 为当前节点。

6. 算法要点总结
   核心技巧
   - 递归同时返回“深度 + LCA”，避免重复遍历。
   - 深度比较决定 LCA 的归属。

   优化要点
   - 一次 DFS 即可完成统计与决策。
   - 不需要显式收集最深叶集合。

   类似问题
   - 二叉树的最近公共祖先问题。
   - 计算最深节点相关信息的树 DP。

7. 常见错误
   - 空节点深度设置不一致，导致深度比较错误。
   - 左右深度相同时忘记返回当前节点。
   - 用先序或中序处理导致子树信息不完整。
*/
