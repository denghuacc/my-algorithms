/*
 * @lc app=leetcode.cn id=538 lang=typescript
 *
 * [538] 把二叉搜索树转换为累加树
 *
 * https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/
 *
 * algorithms
 * Easy (63.32%)
 * Likes:    338
 * Dislikes: 0
 * Total Accepted:    41.6K
 * Total Submissions: 65.4K
 * Testcase Example:  '[5,2,13]'
 *
 * 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater
 * Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
 *
 *
 *
 * 例如：
 *
 * 输入: 原始二叉搜索树:
 * ⁠             5
 * ⁠           /   \
 * ⁠          2     13
 *
 * 输出: 转换为累加树:
 * ⁠            18
 * ⁠           /   \
 * ⁠         20     13
 *
 *
 *
 *
 * 注意：本题和 1038:
 * https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/ 相同
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
 * 方法一：反向中序遍历（递归）
 *
 * 算法思路：
 * 1. BST的中序遍历得到升序序列，反向中序遍历得到降序序列
 * 2. 按降序访问节点，累加之前访问过的所有节点值
 * 3. 每个节点的新值 = 原值 + 所有比它大的节点值之和
 *
 * 核心洞察：
 * - 反向中序遍历：右子树 -> 根节点 -> 左子树
 * - 保证每次访问节点时，所有比它大的节点都已被处理
 * - 使用累加器记录比当前节点大的所有节点值之和
 */
var convertBST = function (root: TreeNode | null): TreeNode | null {
  let cumulativeSum = 0; // 累加和：记录所有比当前节点大的节点值之和

  reverseInorderTraversal(root);
  return root;

  /**
   * 反向中序遍历：右 -> 根 -> 左
   * @param node 当前访问的节点
   */
  function reverseInorderTraversal(node: TreeNode | null): void {
    if (node) {
      // 1. 先遍历右子树（值更大的节点）
      reverseInorderTraversal(node.right);

      // 2. 处理当前节点
      cumulativeSum += node.val; // 累加当前节点值
      node.val = cumulativeSum; // 更新节点值为累加和

      // 3. 最后遍历左子树（值更小的节点）
      reverseInorderTraversal(node.left);
    }
  }
};

/**
 * 方法二：Morris遍历（迭代，O(1)空间）
 *
 * 算法思路：
 * 1. 使用Morris遍历实现反向中序遍历，避免递归栈
 * 2. 通过建立临时线索（thread）来记录遍历路径
 * 3. 在遍历过程中动态建立和删除线索连接
 *
 * Morris遍历原理：
 * - 利用叶子节点的空指针来存储遍历信息
 * - 建立前驱/后继关系来模拟栈的功能
 * - 遍历完成后恢复原始树结构
 *
 * 优势：O(1)空间复杂度，不使用递归栈或显式栈
 */
var convertBST = function (root: TreeNode | null): TreeNode | null {
  let cumulativeSum = 0;
  let currentNode = root;

  while (currentNode) {
    // 情况1：没有右子树，直接处理当前节点
    if (!currentNode.right) {
      cumulativeSum += currentNode.val;
      currentNode.val = cumulativeSum;
      currentNode = currentNode.left; // 移动到左子树
    }
    // 情况2：有右子树，需要建立线索
    else {
      const successor = findInorderSuccessor(currentNode);

      // 子情况2.1：还没建立线索，建立线索后移动到右子树
      if (!successor.left) {
        successor.left = currentNode; // 建立线索
        currentNode = currentNode.right;
      }
      // 子情况2.2：已经建立线索，说明右子树已遍历完，删除线索并处理当前节点
      else {
        successor.left = null; // 删除线索，恢复原树结构
        cumulativeSum += currentNode.val;
        currentNode.val = cumulativeSum;
        currentNode = currentNode.left; // 移动到左子树
      }
    }
  }

  return root;

  /**
   * 找到当前节点在反向中序遍历中的后继节点
   * （即右子树中最左边的节点）
   * @param node 当前节点
   * @returns 后继节点
   */
  function findInorderSuccessor(node: TreeNode): TreeNode {
    let successor = node.right!;
    // 找到右子树的最左节点，但不能是之前建立的线索
    while (successor.left && successor.left !== node) {
      successor = successor.left;
    }
    return successor;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将BST转换为累加树（Greater Sum Tree）
   - 每个节点的新值 = 原值 + 所有大于原值的节点值之和
   - 保持原有的树结构不变

2. 核心思想：
   - 利用BST的有序性：中序遍历得到升序序列
   - 反向思考：反向中序遍历得到降序序列
   - 按降序处理：确保处理每个节点时，所有更大的值都已累加

3. 算法分析：
   - 时间复杂度：O(n) - 每个节点访问一次
   - 空间复杂度：
     * 递归方法：O(h) - 递归栈深度
     * Morris方法：O(1) - 常数空间
   - 算法类型：树的遍历 + 累加计算

4. 反向中序遍历顺序：
   标准中序：左 -> 根 -> 右 （升序）
   反向中序：右 -> 根 -> 左 （降序）
   
   示例BST [5,2,13] 的遍历顺序：
   - 标准中序：2, 5, 13
   - 反向中序：13, 5, 2

5. 累加过程示例：
   原始BST: [5,2,13]
   
   访问顺序和累加过程：
   1. 访问13：sum = 0 + 13 = 13, 节点值更新为13
   2. 访问5：sum = 13 + 5 = 18, 节点值更新为18  
   3. 访问2：sum = 18 + 2 = 20, 节点值更新为20
   
   结果：[18,20,13]

6. Morris遍历详解：
   - 目标：用O(1)空间实现树的遍历
   - 原理：利用叶子节点的空指针作为"返回路径"
   - 步骤：
     1. 找到当前节点的中序后继
     2. 建立临时连接（线索）
     3. 遍历完成后删除线索
   
7. Morris遍历的优势：
   - 空间效率：不需要递归栈或显式栈
   - 结构保持：遍历完成后原树结构完全恢复
   - 时间效率：虽然有额外的线索操作，总时间复杂度仍为O(n)

8. 两种方法对比：
   
   递归方法：
   - 优点：代码简洁，易于理解
   - 缺点：递归深度可能导致栈溢出
   - 适用：一般情况下的首选方案
   
   Morris方法：
   - 优点：O(1)空间，避免栈溢出
   - 缺点：代码复杂，理解难度大
   - 适用：空间受限或树深度很大的场景

9. 应用扩展：
   - Greater Sum Tree：当前问题
   - 累加和数组：一维数组的类似问题  
   - 区间查询：线段树、树状数组的应用场景
   - 前缀和：解决连续子数组问题

10. 常见错误：
    - 遍历顺序错误：使用标准中序而非反向中序
    - 累加逻辑错误：重复累加或遗漏累加
    - Morris实现错误：线索建立/删除时机不对
    - 边界处理：空树或单节点的特殊情况
*/
