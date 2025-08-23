/*
 * @lc app=leetcode.cn id=897 lang=typescript
 *
 * [897] 递增顺序搜索树
 *
 * https://leetcode-cn.com/problems/increasing-order-search-tree/description/
 *
 * algorithms
 * Easy (73.87%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    33K
 * Total Submissions: 44.7K
 * Testcase Example:  '[5,3,6,2,4,null,8,1,null,null,null,7,9]'
 *
 * 给你一棵二叉搜索树，请你 按中序遍历
 * 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,1,7]
 * 输出：[1,null,5,null,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数的取值范围是 [1, 100]
 * 0
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
 * 方法一：中序遍历 + 重新构建（递归）
 *
 * 算法思路：
 * 1. 通过中序遍历获取BST的有序序列
 * 2. 根据有序序列重新构建一个只有右子树的树
 * 3. 新树的每个节点都没有左子树，只有右子树
 *
 * 优点：思路清晰，实现简单
 * 缺点：需要额外的O(n)空间存储数组
 */
var increasingBST = function (root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  // 存储中序遍历的结果
  const sortedValues: number[] = [];
  inorderTraversal(root, sortedValues);

  // 根据有序数组构建新的递增顺序搜索树
  const newRoot = new TreeNode(sortedValues[0]);
  let currentNode = newRoot;

  for (let i = 1; i < sortedValues.length; i++) {
    currentNode.right = new TreeNode(sortedValues[i]);
    currentNode = currentNode.right;
  }

  return newRoot;

  /**
   * 中序遍历获取有序序列
   * @param node 当前节点
   * @param result 结果数组
   */
  function inorderTraversal(node: TreeNode | null, result: number[]): void {
    if (node) {
      inorderTraversal(node.left, result); // 遍历左子树
      result.push(node.val); // 访问当前节点
      inorderTraversal(node.right, result); // 遍历右子树
    }
  }
};

/**
 * 方法二：中序遍历 + 边遍历边构建（迭代）
 *
 * 算法思路：
 * 1. 使用栈进行中序遍历
 * 2. 在遍历过程中直接构建新的递增顺序树
 * 3. 避免使用额外数组存储，节省空间
 *
 * 优点：空间效率更高，一次遍历完成
 * 缺点：代码稍复杂，需要维护栈和指针
 */
var increasingBST = function (root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  const stack: TreeNode[] = [];
  const dummy = new TreeNode(-1); // 哨兵节点，简化边界处理
  let resultTail = dummy; // 指向结果树的尾部节点

  let current = root;

  // 中序遍历
  while (current || stack.length > 0) {
    // 一路向左，将路径上的节点入栈
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 弹出并处理当前节点
    current = stack.pop()!;

    // 将当前节点添加到结果树的右侧
    resultTail.right = new TreeNode(current.val);
    resultTail = resultTail.right;

    // 移动到右子树
    current = current.right;
  }

  return dummy.right;
};

/**
 * 方法三：原地重构（递归）
 *
 * 算法思路：
 * 1. 直接修改原树结构，不创建新节点
 * 2. 使用中序遍历，将每个节点的左指针置为null
 * 3. 维护一个指针，将当前节点连接到递增序列的尾部
 *
 * 优点：空间复杂度O(1)（除递归栈），不创建新节点
 * 缺点：修改了原树结构
 */
var increasingBSTInPlace = function (root: TreeNode | null): TreeNode | null {
  let prev: TreeNode | null = null; // 指向递增序列的尾部节点

  /**
   * 中序遍历并重构树
   * @param node 当前节点
   * @returns 重构后子树的根节点
   */
  function inorderRebuild(node: TreeNode | null): TreeNode | null {
    if (!node) return null;

    // 递归处理左子树，获取左子树重构后的根节点
    const leftRoot = inorderRebuild(node.left);

    // 处理当前节点
    node.left = null; // 清除左指针

    if (prev) {
      prev.right = node; // 将当前节点连接到序列尾部
    }
    prev = node; // 更新尾部指针

    // 递归处理右子树
    inorderRebuild(node.right);

    // 返回整个左子树的根节点，如果左子树为空则返回当前节点
    return leftRoot || node;
  }

  return inorderRebuild(root);
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将BST重新排列成只有右子树的递增顺序搜索树
   - 保持中序遍历的顺序（即升序）
   - 最左边的节点成为新树的根节点

2. 核心思想：
   - 利用BST中序遍历得到升序序列的特性
   - 将升序序列转换为只有右子树的链式结构
   - 每个节点的左子树都为null，只有右子树

3. 三种解法对比：

   方法一：中序遍历 + 重新构建
   - 时间复杂度：O(n)
   - 空间复杂度：O(n) - 数组存储 + 递归栈
   - 优点：思路清晰，易于理解
   - 缺点：需要额外数组空间
   - 适用：对空间要求不严格，注重代码可读性

   方法二：迭代中序遍历 + 边构建
   - 时间复杂度：O(n)
   - 空间复杂度：O(h) - 栈空间，h为树高度
   - 优点：无需数组存储，一次遍历完成
   - 缺点：代码稍复杂，需要管理栈
   - 适用：空间效率要求较高的场景

   方法三：原地重构
   - 时间复杂度：O(n)
   - 空间复杂度：O(h) - 仅递归栈
   - 优点：最优空间复杂度，不创建新节点
   - 缺点：修改原树结构，逻辑较复杂
   - 适用：内存极度受限，允许修改原树

4. 中序遍历的关键作用：
   - BST的中序遍历自然得到升序序列
   - 访问顺序：左子树 -> 根节点 -> 右子树
   - 保证了新树的递增性质

5. 数据结构转换：
   原始BST结构：
        5
       / \
      3   6
     / \   \
    2   4   8
       
   目标链式结构：
   1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 8
   (表示为只有右子树的树)

6. 实现技巧：
   - 哨兵节点：简化边界条件处理
   - 尾指针：维护链式结构的尾部
   - 原地修改：避免额外空间开销

7. 边界情况处理：
   - 空树：返回null
   - 单节点：返回该节点（左子树置null）
   - 只有左子树：按中序遍历顺序展开
   - 只有右子树：直接转换为链式结构

8. 算法优化：
   - 空间优化：原地修改 > 迭代 > 递归+数组
   - 时间优化：一次遍历，避免重复访问
   - 代码优化：使用哨兵节点简化逻辑

9. 应用场景：
   - 数据扁平化：将树结构转换为线性结构
   - 索引优化：将BST转换为有序链表便于顺序访问
   - 存储优化：减少指针数量，节省存储空间
   - 缓存友好：线性访问模式对缓存更友好

10. 相关问题：
    - 二叉树展开为链表：类似的结构变换
    - BST转有序数组：更直接的扁平化
    - 平衡二叉树：BST的平衡性调整
    - 线索二叉树：利用空指针建立线索

11. 性能考虑：
    - 时间复杂度：所有方法都是O(n)，无法再优化
    - 空间复杂度：原地修改最优，迭代次之，递归+数组最差
    - 实际性能：考虑缓存命中率和内存分配开销

12. 选择建议：
    - 学习理解：推荐方法一，思路最清晰
    - 面试场景：方法二，体现对迭代的掌握
    - 生产环境：根据具体需求选择，考虑内存限制和性能要求
    - 空间受限：方法三，但需要允许修改原树
*/
