/*
 * @lc app=leetcode.cn id=1339 lang=typescript
 *
 * [1339] 分裂二叉树的最大乘积
 *
 * https://leetcode.cn/problems/maximum-product-of-splitted-binary-tree/description/
 *
 * algorithms
 * Medium (48.09%)
 * Likes:    3270
 * Dislikes: 112
 * Total Accepted:    170.2K
 * Total Submissions: 334.3K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给你一棵二叉树的根节点 root，删除一条边将其分成两棵子树，
 * 使两棵子树节点值之和的乘积最大。
 *
 * 返回最大乘积。由于结果可能很大，请返回对 10^9 + 7 取模后的值。
 *
 * 注意：必须先最大化乘积，再对结果取模。
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,4,5,6]
 * 输出：110
 * 解释：删除红色边后得到两棵子树，和分别为 11 和 10，乘积为 110。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,null,2,3,4,null,null,5,6]
 * 输出：90
 * 解释：删除红色边后得到两棵子树，和分别为 15 和 6，乘积为 90。
 *
 *
 *
 * 提示：
 *
 *
 * 节点数量在 [2, 5 * 10^4] 范围内
 * 1 <= Node.val <= 10^4
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function maxProduct(root: TreeNode | null): number {
  const MOD = 1e9 + 7;
  let totalSum = 0;
  let maxProduct = 0;

  // 先计算整棵树的节点和
  calcTotalSum(root);
  // 再遍历每个子树，尝试删除其与父节点的边
  calcSubtreeSum(root);

  return Number(BigInt(maxProduct) % BigInt(MOD));

  function calcTotalSum(node: TreeNode | null): number {
    if (!node) return 0;
    totalSum += node.val;
    calcTotalSum(node.left);
    calcTotalSum(node.right);
    return totalSum;
  }

  function calcSubtreeSum(node: TreeNode | null): number {
    if (!node) return 0;
    const leftSum = calcSubtreeSum(node.left);
    const rightSum = calcSubtreeSum(node.right);
    const subtreeSum = leftSum + rightSum + node.val;

    // 删除该子树与父节点的边，形成两部分：subtreeSum 和 totalSum - subtreeSum
    const product = subtreeSum * (totalSum - subtreeSum);
    if (product > maxProduct) {
      maxProduct = product;
    }

    return subtreeSum;
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：删除一条边，将树分成两部分，使两部分节点和的乘积最大。
   - 关键特点：任意子树都可作为切分点，另一部分即总和减去子树和。
   - 目标：最大化 subtreeSum * (totalSum - subtreeSum)。

2. 解题思路
   核心思想
   - 先求整棵树的总和 totalSum。
   - 再遍历每个子树，计算其和 subtreeSum，尝试作为切分点。
   - 对每个子树更新最大乘积。

   算法步骤
   1) 一次 DFS 计算 totalSum。
   2) 再次 DFS 计算每个子树的和：
      - 每到一个节点，得到该节点为根的子树和。
      - 用 subtreeSum 与 totalSum - subtreeSum 计算乘积。
      - 更新最大乘积。
   3) 最大乘积取模后返回。

3. 代码实现
   实现步骤
   - calcTotalSum：统计整棵树节点和。
   - calcSubtreeSum：后序遍历计算子树和并更新最大乘积。
   - 最终对最大乘积取模。

   关键函数说明
   - maxProduct：主函数，调用两次 DFS 完成统计与比较。
   - calcSubtreeSum：返回子树和，同时维护全局最大乘积。

4. 复杂度分析
   - 时间复杂度：O(n)，两次 DFS 各遍历一次。
   - 空间复杂度：O(h)，递归栈深度，h 为树高。
   - 关键观察：每条边都对应一个子树和，可在 DFS 中一次遍历完成。

5. 示例分析
   示例一：root = [1,2,3,4,5,6]
   - totalSum = 21。
   - 切分出子树和 11，与剩余 10，乘积 110，为最大值。

   示例二：root = [1,null,2,3,4,null,null,5,6]
   - totalSum = 21。
   - 切分出子树和 15，与剩余 6，乘积 90，为最大值。

   边界情况
   - 极度不平衡树：递归深度接近 n。
   - 子树和接近 totalSum / 2 时乘积最大。

6. 算法要点总结
   核心技巧
   - 将“切一条边”转化为“枚举子树和”。
   - 乘积最大化等价于子树和尽量接近总和的一半。

   优化要点
   - 两次 DFS 保持逻辑清晰。
   - 直接比较乘积而非差值，避免错误判断。

   类似问题
   - 树的切分与子树和统计问题。
   - 通过子树和组合最大化目标值的问题。

7. 常见错误
   - 先取模再比较乘积，导致结果错误。
   - 忘记使用 long/BigInt 导致乘积溢出。
   - 只比较与总和的一半差值，而未计算乘积，易出错。
*/
