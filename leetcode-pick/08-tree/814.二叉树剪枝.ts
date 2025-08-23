/*
 * @lc app=leetcode.cn id=814 lang=typescript
 *
 * [814] 二叉树剪枝
 *
 * https://leetcode.cn/problems/binary-tree-pruning/description/
 *
 * algorithms
 * Medium (70.23%)
 * Likes:    251
 * Dislikes: 0
 * Total Accepted:    37K
 * Total Submissions: 51.7K
 * Testcase Example:  '[1,null,0,0,1]'
 *
 * 给你二叉树的根结点 root ，此外树的每个结点的值要么是 0 ，要么是 1 。
 *
 * 返回移除了所有不包含 1 的子树的原二叉树。
 *
 * 节点 node 的子树为 node 本身加上所有 node 的后代。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,0,0,1]
 * 输出：[1,null,0,null,1]
 * 解释：
 * 只有红色节点满足条件“所有不包含 1 的子树”。 右图为返回的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,0,1,0,0,0,1]
 * 输出：[1,null,1,null,1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,1,0,1,1,0,1,0]
 * 输出：[1,1,0,1,1,null,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目在范围 [1, 200] 内
 * Node.val 为 0 或 1
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
 * 二叉树剪枝
 *
 * 算法思路：
 * 1. 使用后序遍历（自底向上）处理二叉树
 * 2. 先处理左右子树，再处理当前节点
 * 3. 如果一个节点值为0且没有子节点，则删除该节点
 * 4. 递归地应用这个规则，直到没有可删除的节点
 *
 * 核心思想：
 * - 后序遍历确保先处理子树，再处理当前节点
 * - 只有当子树被完全处理后，才能准确判断当前节点是否需要删除
 * - 节点删除条件：值为0 且 没有左右子树
 */
function pruneTree(root: TreeNode | null): TreeNode | null {
  // 边界条件：空节点直接返回null
  if (!root) return null;

  // 后序遍历：先递归处理左右子树
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);

  // 处理当前节点：如果值为0且无子节点，则删除
  if (!root.left && !root.right && root.val === 0) {
    return null; // 删除当前节点
  }

  // 保留当前节点
  return root;
}

/**
 * 迭代版本：使用栈模拟后序遍历
 *
 * 算法思路：
 * 1. 使用栈和标记来实现后序遍历
 * 2. 对每个节点，先访问左右子树，最后处理节点本身
 * 3. 在处理过程中标记需要删除的节点
 * 4. 重建树结构，排除被标记删除的节点
 */
function pruneTreeIterative(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  const stack: TreeNode[] = [];
  const visited: Set<TreeNode> = new Set();
  const toDelete: Set<TreeNode> = new Set();

  let current = root;

  // 后序遍历
  while (current || stack.length > 0) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      const peekNode = stack[stack.length - 1];

      // 如果右子树存在且未访问过，访问右子树
      if (peekNode.right && !visited.has(peekNode.right)) {
        current = peekNode.right;
      } else {
        // 处理当前节点
        visited.add(peekNode);

        // 判断是否需要删除
        const leftExists = peekNode.left && !toDelete.has(peekNode.left);
        const rightExists = peekNode.right && !toDelete.has(peekNode.right);

        if (!leftExists && !rightExists && peekNode.val === 0) {
          toDelete.add(peekNode);
        }

        stack.pop();
      }
    }
  }

  // 重建树结构
  return reconstructTree(root, toDelete);

  /**
   * 重建树，排除被标记删除的节点
   * @param node 当前节点
   * @param toDelete 需要删除的节点集合
   * @returns 重建后的节点
   */
  function reconstructTree(
    node: TreeNode | null,
    toDelete: Set<TreeNode>
  ): TreeNode | null {
    if (!node || toDelete.has(node)) return null;

    node.left = reconstructTree(node.left, toDelete);
    node.right = reconstructTree(node.right, toDelete);

    return node;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 删除所有不包含1的子树
   - 子树定义：节点本身加上所有后代节点
   - 删除条件：子树中所有节点值都为0

2. 核心思想：
   - 自底向上处理：先处理叶子节点，再处理父节点
   - 后序遍历：左子树 -> 右子树 -> 根节点
   - 递归删除：删除条件满足时，将节点置为null

3. 算法分析：
   - 时间复杂度：O(n) - 每个节点访问一次
   - 空间复杂度：O(h) - 递归栈深度，h为树高度
   - 算法类型：后序遍历 + 递归

4. 删除条件分析：
   节点需要删除当且仅当：
   - 节点值为0 且
   - 左子树为空（或已被删除）且  
   - 右子树为空（或已被删除）

5. 后序遍历的重要性：
   - 保证子节点在父节点之前被处理
   - 子树的删除状态确定后，父节点才能做出正确判断
   - 避免父节点基于过时信息做出错误决策

6. 示例执行过程：
   原始树：[1,null,0,0,1]
           1
            \
             0
            / \
           0   1
   
   执行步骤：
   1. 处理叶子节点0：值为0且无子节点 -> 删除
   2. 处理叶子节点1：值为1 -> 保留
   3. 处理父节点0：值为0，左子树已删除，右子树存在 -> 保留
   4. 处理根节点1：值为1 -> 保留
   
   结果：[1,null,0,null,1]

7. 递归与迭代对比：
   
   递归版本：
   - 优点：代码简洁，思路清晰
   - 缺点：可能栈溢出（深度很大时）
   - 适用：一般情况，代码简洁优先

   迭代版本：
   - 优点：避免栈溢出，可控性强
   - 缺点：代码复杂，实现难度大
   - 适用：深度很大的树，性能要求高

8. 关键实现细节：
   - 空节点处理：直接返回null
   - 子树删除：递归调用的返回值
   - 节点保留：满足保留条件时返回原节点

9. 边界情况：
   - 空树：返回null
   - 单节点值为0：删除，返回null
   - 单节点值为1：保留
   - 全为0的树：完全删除
   - 全为1的树：完全保留

10. 类似问题：
    - 删除二叉搜索树中的节点
    - 修剪二叉搜索树
    - 二叉树的清理和重构

11. 应用扩展：
    - 条件删除：根据其他条件删除节点
    - 批量修剪：同时应用多个修剪规则
    - 树的优化：删除冗余或无效节点

12. 性能考虑：
    - 空间优化：原地修改 vs 创建新树
    - 时间优化：早期终止条件
    - 内存管理：及时释放删除的节点

13. 测试策略：
    - 基本功能：正常的修剪操作
    - 边界测试：空树、单节点、极端情况
    - 性能测试：大规模树的处理时间
    - 正确性验证：修剪结果的准确性检查
*/
