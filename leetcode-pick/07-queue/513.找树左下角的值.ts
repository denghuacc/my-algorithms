/*
 * @lc app=leetcode.cn id=513 lang=typescript
 *
 * [513] 找树左下角的值
 *
 * https://leetcode.cn/problems/find-bottom-left-tree-value/description/
 *
 * algorithms
 * Medium (73.13%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    104.6K
 * Total Submissions: 141.7K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
 *
 * 假设二叉树中至少有一个节点。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: root = [2,1,3]
 * 输出: 1
 *
 *
 * 示例 2:
 *
 * ⁠
 *
 *
 * 输入: [1,2,3,4,null,5,6,null,null,7]
 * 输出: 7
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [1,10^4]
 * -2^31
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
 * 解法一：广度优先搜索 - 标准层序遍历
 * 思路：逐层遍历，记录每层的第一个节点（最左侧节点）
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(w)，w为树的最大宽度，队列最大长度
 */
var findBottomLeftValue = function (root: TreeNode): number {
  const queue: TreeNode[] = [root];
  let res = root.val;

  while (queue.length) {
    const size = queue.length; // 当前层的节点数量

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;

      // 如果是当前层的第一个节点，则它是最左侧节点
      if (i === 0) {
        res = node.val;
      }

      // 按从左到右的顺序将下一层节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};

/**
 * 解法二：广度优先搜索 - 优化版（推荐）
 * 思路：从右到左入队，这样最后出队的节点就是最底层最左侧的节点
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(w)，w为树的最大宽度，队列最大长度
 */
var findBottomLeftValue = function (root: TreeNode): number {
  const queue: TreeNode[] = [root];
  let res = root.val;

  while (queue.length) {
    const node = queue.shift()!;

    // 关键：先将右子节点入队，再将左子节点入队
    // 这样最后处理的就是最底层最左侧的节点
    if (node.right) queue.push(node.right);
    if (node.left) queue.push(node.left);

    // 每次更新结果，最后一次更新的就是最底层最左侧节点
    res = node.val;
  }
  return res;
};

/**
 * 解法三：深度优先搜索 - 左优先遍历
 * 思路：优先遍历左子树，记录每个深度第一次访问的节点
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(h)，h为树的高度，递归栈深度
 */
var findBottomLeftValue = function (root: TreeNode): number {
  let res = root.val;
  let maxDepth = 0; // 记录当前找到的最大深度

  dfs(root, 0);
  return res;

  function dfs(node: TreeNode | null, depth: number) {
    if (!node) return;

    // 优先遍历左子树，确保每层最先访问的是最左侧节点
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);

    // 如果当前深度大于已记录的最大深度，说明找到了更深层的最左节点
    if (depth > maxDepth) {
      maxDepth = depth;
      res = node.val;
    }
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到二叉树最底层（最深层）最左边的节点值
   - 本质是层序遍历的应用，需要同时考虑深度和位置

2. 算法分析：
   - 时间复杂度：O(n) - 三种解法都需要遍历所有节点
   - 空间复杂度：
     * 解法一：O(w) - 队列最大长度，w为树的最大宽度
     * 解法二：O(w) - 队列最大长度，但实现更简洁
     * 解法三：O(h) - 递归栈深度，h为树高
   - 算法类型：树的遍历、广度优先搜索、深度优先搜索

3. 实现要点：
   - **解法一（BFS标准层序）**：
     * 逐层遍历，记录每层第一个节点
     * 需要明确记录当前层的节点数量
   
   - **解法二（BFS优化版）**：
     * 巧妙地从右到左入队，最后出队的就是目标节点
     * 代码最简洁，是最推荐的BFS解法
   
   - **解法三（DFS左优先）**：
     * 优先遍历左子树，记录每个深度首次访问的节点
     * 空间效率最优，递归实现简洁

4. 优化思路：
   - 解法二通过调整入队顺序，避免了层级控制的复杂性
   - 解法三在空间复杂度上最优，适合深度较大的树
   - 关键insight：无论BFS还是DFS，都要确保"左优先"访问
   - 可以提前终止：一旦确定了最大深度，就可以停止搜索

5. 类似问题：
   - 199. 二叉树的右视图（找每层最右节点）
   - 515. 在每个树行中找最大值（层序遍历变种）
   - 102. 二叉树的层序遍历（基础层序遍历）
   - 104. 二叉树的最大深度（深度相关问题）
   - 111. 二叉树的最小深度（深度相关问题）

6. 常见错误：
   - 混淆"最底层"和"叶子节点"的概念
   - DFS时忘记优先处理左子树
   - BFS解法二中，错误地先将左子节点入队
   - 忘记处理单节点树的情况
   - 深度计算错误（从0开始还是从1开始）
*/
