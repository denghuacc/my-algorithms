/*
 * @lc app=leetcode.cn id=437 lang=typescript
 *
 * [437] 路径总和 III
 *
 * https://leetcode-cn.com/problems/path-sum-iii/description/
 *
 * algorithms
 * Medium (55.90%)
 * Likes:    580
 * Dislikes: 0
 * Total Accepted:    52.5K
 * Total Submissions: 93.9K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树，它的每个结点都存放着一个整数值。
 *
 * 找出路径和等于给定数值的路径总数。
 *
 * 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 * 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 *
 * 示例：
 *
 * root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 *
 * ⁠     10
 * ⁠    /  \
 * ⁠   5   -3
 * ⁠  / \    \
 * ⁠ 3   2   11
 * ⁠/ \   \
 * 3  -2   1
 *
 * 返回 3。和等于 8 的路径有:
 *
 * 1.  5 -> 3
 * 2.  5 -> 2 -> 1
 * 3.  -3 -> 11
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

/**
 * 方法一：暴力解法（双重递归）
 *
 * 算法思路：
 * 1. 对每个节点，计算以该节点为起点的路径数
 * 2. 递归处理每个节点的左右子树
 * 3. 路径可以从任意节点开始，向下延伸
 *
 * 时间复杂度：O(n²) - 最坏情况下每个节点都要重复计算
 * 空间复杂度：O(h) - 递归栈深度
 */
var pathSum = function (root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;

  return (
    // 以当前节点为起点的路径数
    calcPathSum(root, targetSum) +
    // 递归处理左子树
    pathSum(root.left, targetSum) +
    // 递归处理右子树
    pathSum(root.right, targetSum)
  );

  /**
   * 计算以指定节点为起点的路径数
   * @param node 起始节点
   * @param remainingSum 剩余需要的和
   * @returns 满足条件的路径数量
   */
  function calcPathSum(node: TreeNode | null, remainingSum: number): number {
    if (!node) return 0;

    // 更新剩余和
    remainingSum -= node.val;

    return (
      // 如果剩余和为0，找到一条路径
      (remainingSum === 0 ? 1 : 0) +
      // 继续向左子树寻找
      calcPathSum(node.left, remainingSum) +
      // 继续向右子树寻找
      calcPathSum(node.right, remainingSum)
    );
  }
};

/**
 * 方法二：前缀和优化（回溯 + 哈希表）
 *
 * 算法思路：
 * 1. 使用前缀和的概念：如果存在前缀和prefixSum，使得
 *    currentPrefixSum - prefixSum = targetSum，则找到一条路径
 * 2. 使用哈希表记录从根到当前节点路径上所有前缀和的出现次数
 * 3. 回溯时需要将当前节点的前缀和从哈希表中移除
 *
 * 核心思想：
 * - 前缀和: prefixSum[i] = sum(root -> node[i])
 * - 路径和: pathSum = prefixSum[j] - prefixSum[i] (i < j)
 * - 目标: 找到满足 pathSum = targetSum 的路径数
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 哈希表存储前缀和
 */
var pathSum = function (root: TreeNode | null, targetSum: number): number {
  // 哈希表：前缀和 -> 出现次数
  const prefixSumCount: Map<number, number> = new Map();
  // 初始化：前缀和为0的情况（表示从根节点开始的路径）
  prefixSumCount.set(0, 1);

  return dfsWithPrefixSum(root, targetSum, 0);

  /**
   * DFS遍历 + 前缀和计算
   * @param node 当前节点
   * @param targetSum 目标和
   * @param currentPrefixSum 从根到当前节点的前缀和
   * @returns 以当前节点为根的子树中满足条件的路径数
   */
  function dfsWithPrefixSum(
    node: TreeNode | null,
    targetSum: number,
    currentPrefixSum: number
  ): number {
    if (!node) return 0;

    let pathCount = 0;

    // 更新前缀和
    currentPrefixSum += node.val;

    // 检查是否存在以当前节点为终点的有效路径
    // 需要的起始前缀和 = 当前前缀和 - 目标和
    const neededPrefixSum = currentPrefixSum - targetSum;
    pathCount += prefixSumCount.get(neededPrefixSum) ?? 0;

    // 将当前前缀和加入哈希表
    prefixSumCount.set(
      currentPrefixSum,
      (prefixSumCount.get(currentPrefixSum) ?? 0) + 1
    );

    // 递归处理左右子树
    pathCount += dfsWithPrefixSum(node.left, targetSum, currentPrefixSum);
    pathCount += dfsWithPrefixSum(node.right, targetSum, currentPrefixSum);

    // 回溯：移除当前节点的前缀和（避免影响其他路径）
    prefixSumCount.set(
      currentPrefixSum,
      prefixSumCount.get(currentPrefixSum)! - 1
    );

    return pathCount;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在二叉树中找到路径和等于目标值的路径数量
   - 路径方向必须向下（父节点到子节点）
   - 路径不必从根节点开始，也不必在叶子节点结束

2. 核心挑战：
   - 路径起点可以是任意节点
   - 需要考虑所有可能的路径组合
   - 避免重复计算提高效率

3. 方法对比：

   方法一：暴力解法
   - 思路：对每个节点都尝试作为路径起点
   - 优点：思路直观，易于理解
   - 缺点：时间复杂度O(n²)，存在重复计算
   - 适用：小规模数据或理解算法思路

   方法二：前缀和优化
   - 思路：利用前缀和快速计算任意路径和
   - 优点：时间复杂度O(n)，避免重复计算
   - 缺点：需要额外空间存储前缀和
   - 适用：大规模数据，生产环境

4. 前缀和核心原理：
   - 前缀和定义：从根节点到当前节点的路径和
   - 路径和计算：任意路径和 = 终点前缀和 - 起点前缀和
   - 目标查找：寻找满足 currentPrefix - targetPrefix = targetSum 的情况

5. 哈希表的作用：
   - 存储路径上所有前缀和的出现次数
   - 快速查找是否存在需要的前缀和
   - 支持重复前缀和的计数

6. 回溯的必要性：
   - 确保哈希表只包含当前路径上的前缀和
   - 避免不同路径间的前缀和相互干扰
   - 保证算法的正确性

7. 示例分析：
   树: [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
   
   路径1: 5 -> 3 (sum = 8)
   路径2: 5 -> 2 -> 1 (sum = 8)  
   路径3: -3 -> 11 (sum = 8)
   
   前缀和方法：
   - 在节点3处：currentPrefix = 18, neededPrefix = 10
   - 在节点1处：currentPrefix = 18, neededPrefix = 10
   - 在节点11处：currentPrefix = 18, neededPrefix = 10

8. 边界情况：
   - 空树：返回0
   - 单节点：检查节点值是否等于目标和
   - 目标和为0：需要特别处理空路径情况
   - 负数节点：正常处理，前缀和可能为负

9. 算法优化要点：
   - 避免重复遍历：每个节点只访问一次
   - 空间优化：及时清理不需要的前缀和
   - 数值溢出：注意大数值情况下的前缀和计算

10. 类似问题：
    - 路径总和 I：判断是否存在根到叶子的路径
    - 路径总和 II：返回所有根到叶子的有效路径
    - 路径总和 III：当前问题（任意路径）
*/
