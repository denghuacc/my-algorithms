/*
 * @lc app=leetcode.cn id=199 lang=typescript
 *
 * [199] 二叉树的右视图
 *
 * https://leetcode-cn.com/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (64.25%)
 * Likes:    318
 * Dislikes: 0
 * Total Accepted:    66.7K
 * Total Submissions: 103.9K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 * 示例:
 *
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1, 3, 4]
 * 解释:
 *
 * ⁠  1            <---
 * ⁠/   \
 * 2     3         <---
 * ⁠\     \
 * ⁠ 5     4       <---
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
 * 解法一：深度优先搜索 + 层级收集
 * 思路：先收集每一层的所有节点值，然后取每层的最后一个值
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(n)，递归栈深度和存储层级数据
 */
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;

  // 存储每一层的所有节点值
  const levels: number[][] = [];

  // 深度优先搜索，收集每层节点
  dfs(root, 0);

  // 取每层的最后一个节点值（最右侧）
  for (const level of levels) {
    res.push(level.pop()!);
  }

  return res;

  function dfs(node: TreeNode, depth: number) {
    // 如果当前深度没有对应的层级数组，则创建
    if (levels.length === depth) levels.push([]);

    // 将当前节点值加入对应层级
    levels[depth].push(node.val);

    // 递归遍历左右子树
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};

/**
 * 解法二：深度优先搜索 + 右优先遍历（推荐）
 * 思路：优先遍历右子树，每层第一个访问到的节点就是最右侧节点
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(h)，h为树的高度，递归栈深度
 */
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;

  let maxDepth = -1; // 记录已访问的最大深度
  dfs(root, 0);
  return res;

  function dfs(node: TreeNode, depth: number) {
    // 如果当前深度大于已访问的最大深度，说明这是该层第一个访问的节点
    if (depth > maxDepth) {
      maxDepth = depth;
      res.push(node.val); // 由于右优先遍历，这就是最右侧节点
    }

    // 关键：优先处理右子树，确保每层最先访问的是最右侧节点
    if (node.right) dfs(node.right, depth + 1);
    if (node.left) dfs(node.left, depth + 1);
  }
};

/**
 * 解法三：广度优先搜索（层序遍历）
 * 思路：逐层遍历，记录每层的最后一个节点
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(w)，w为树的最大宽度，队列最大长度
 */
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;

  const queue: TreeNode[] = [root];

  while (queue.length) {
    const size = queue.length; // 当前层的节点数量

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;

      // 将下一层节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      // 如果是当前层的最后一个节点，则它是最右侧节点
      if (i === size - 1) {
        res.push(node.val);
      }
    }
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从二叉树的右侧观察，找出每一层最右边可见的节点
   - 本质是层序遍历的变种，需要识别每层的最右侧节点

2. 算法分析：
   - 时间复杂度：O(n) - 三种解法都需要遍历所有节点
   - 空间复杂度：
     * 解法一：O(n) - 需要存储所有层级的节点值
     * 解法二：O(h) - 递归栈深度，h为树高
     * 解法三：O(w) - 队列最大长度，w为树的最大宽度
   - 算法类型：树的遍历、广度优先搜索、深度优先搜索

3. 实现要点：
   - **解法一（DFS层级收集）**：
     * 使用DFS收集每层所有节点，最后取每层的最后一个
     * 直观但空间占用较大
   
   - **解法二（DFS右优先）**：
     * 优先遍历右子树，利用深度标记确保每层第一个访问的是最右节点
     * 空间效率最优，是最推荐的解法
   
   - **解法三（BFS层序遍历）**：
     * 标准的层序遍历，记录每层的最后一个节点
     * 思路最直观，适合理解队列的使用

4. 优化思路：
   - 解法二在空间复杂度上最优，避免了额外的存储开销
   - 右优先遍历的关键是先处理右子树，确保深度标记的正确性
   - 队列解法适用于需要明确层级信息的场景
   - 所有解法的时间复杂度都是最优的O(n)

5. 类似问题：
   - 513. 找树左下角的值（左视图的变种）
   - 515. 在每个树行中找最大值（层序遍历应用）
   - 102. 二叉树的层序遍历（基础层序遍历）
   - 107. 二叉树的层序遍历II（自底向上层序遍历）

6. 常见错误：
   - 忘记处理空树的情况
   - DFS右优先遍历时，错误地先处理左子树
   - BFS中没有正确记录当前层的节点数量
   - 混淆了"右视图"和"最右叶子节点"的概念
*/
