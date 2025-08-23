/*
 * @lc app=leetcode.cn id=129 lang=typescript
 *
 * [129] 求根到叶子节点数字之和
 *
 * https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/
 *
 * algorithms
 * Medium (64.96%)
 * Likes:    224
 * Dislikes: 0
 * Total Accepted:    47K
 * Total Submissions: 71.7K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
 *
 * 例如，从根到叶子节点路径 1->2->3 代表数字 123。
 *
 * 计算从根到叶子节点生成的所有数字之和。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例 1:
 *
 * 输入: [1,2,3]
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * 输出: 25
 * 解释:
 * 从根到叶子节点路径 1->2 代表数字 12.
 * 从根到叶子节点路径 1->3 代表数字 13.
 * 因此，数字总和 = 12 + 13 = 25.
 *
 * 示例 2:
 *
 * 输入: [4,9,0,5,1]
 * ⁠   4
 * ⁠  / \
 * ⁠ 9   0
 * / \
 * 5   1
 * 输出: 1026
 * 解释:
 * 从根到叶子节点路径 4->9->5 代表数字 495.
 * 从根到叶子节点路径 4->9->1 代表数字 491.
 * 从根到叶子节点路径 4->0 代表数字 40.
 * 因此，数字总和 = 495 + 491 + 40 = 1026.
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
 * 方法一：深度优先搜索（DFS）
 *
 * 算法思路：
 * 1. 递归遍历二叉树，维护从根到当前节点的数字
 * 2. 在递归过程中逐位构建数字：currentNumber = prevNumber * 10 + currentNode.val
 * 3. 当到达叶子节点时，将构建的数字加入结果
 * 4. 返回左右子树结果的和
 */
var sumNumbers = function (root: TreeNode | null): number {
  return dfs(root, 0);

  /**
   * DFS递归函数
   * @param root 当前节点
   * @param prevSum 从根到父节点构成的数字
   * @returns 以当前节点为根的子树中所有路径数字之和
   */
  function dfs(root: TreeNode | null, prevSum: number): number {
    if (!root) return 0;

    // 构建从根到当前节点的数字
    const currentSum = prevSum * 10 + root.val;

    // 如果是叶子节点，返回构建的数字
    if (!root.left && !root.right) {
      return currentSum;
    }

    // 递归计算左右子树的数字之和
    return dfs(root.left, currentSum) + dfs(root.right, currentSum);
  }
};

/**
 * 方法二：广度优先搜索（BFS）
 *
 * 算法思路：
 * 1. 使用队列进行层序遍历
 * 2. 同时维护两个队列：节点队列和对应的数字队列
 * 3. 当遇到叶子节点时，将数字累加到结果中
 * 4. 继续处理子节点，更新数字队列
 */
var sumNumbers = function (root: TreeNode | null): number {
  if (!root) return 0;

  let totalSum = 0;
  const nodeQueue: TreeNode[] = []; // 节点队列
  const numQueue: number[] = []; // 对应的数字队列

  // 初始化队列
  nodeQueue.push(root);
  numQueue.push(root.val);

  while (nodeQueue.length > 0) {
    const currentNode = nodeQueue.shift()!;
    const currentNum = numQueue.shift()!;

    const { left, right } = currentNode;

    // 如果是叶子节点，累加数字到结果
    if (!left && !right) {
      totalSum += currentNum;
    } else {
      // 处理左子节点
      if (left) {
        nodeQueue.push(left);
        numQueue.push(currentNum * 10 + left.val);
      }

      // 处理右子节点
      if (right) {
        nodeQueue.push(right);
        numQueue.push(currentNum * 10 + right.val);
      }
    }
  }

  return totalSum;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将根到叶子的路径转换为数字
   - 计算所有这些数字的总和
   - 每条路径代表一个多位数

2. 算法分析：
   - 时间复杂度：O(N) - 需要访问每个节点一次
   - 空间复杂度：O(H) - DFS递归栈深度或BFS队列大小，H为树高度
   - 算法类型：树的遍历（DFS/BFS）

3. 实现要点：
   - 数字构建：每向下一层，当前数字 = 父节点数字 * 10 + 当前节点值
   - 叶子节点判断：!node.left && !node.right
   - 累加结果：只在叶子节点处累加数字

4. 两种解法对比：
   a) DFS（递归）：
      - 优点：代码简洁，递归思路清晰
      - 缺点：深度过大可能栈溢出
      - 空间：O(H) 递归栈
   
   b) BFS（迭代）：
      - 优点：避免栈溢出，层序处理
      - 缺点：需要额外队列存储
      - 空间：O(W) W为树的最大宽度

5. 数字构建示例：
   路径 1->2->3：
   - 根节点1：数字 = 1
   - 节点2：数字 = 1*10 + 2 = 12  
   - 叶子3：数字 = 12*10 + 3 = 123

6. 边界情况：
   - 空树：返回0
   - 单节点：返回节点值
   - 路径包含0：正常处理，0也是有效数字
*/
