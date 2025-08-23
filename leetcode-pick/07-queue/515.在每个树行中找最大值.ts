/*
 * @lc app=leetcode.cn id=515 lang=typescript
 *
 * [515] 在每个树行中找最大值
 *
 * https://leetcode.cn/problems/find-largest-value-in-each-tree-row/description/
 *
 * algorithms
 * Medium (65.80%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    73.6K
 * Total Submissions: 111.3K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
 *
 *
 *
 * 示例1：
 *
 *
 *
 *
 * 输入: root = [1,3,2,5,3,null,9]
 * 输出: [1,3,9]
 *
 *
 * 示例2：
 *
 *
 * 输入: root = [1,2,3]
 * 输出: [1,3]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 二叉树的节点个数的范围是 [0,10^4]
 * -2^31 <= Node.val <= 2^31 - 1
 *
 *
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
 * 解法一：广度优先搜索（层序遍历）
 * 思路：逐层遍历二叉树，维护每层的最大值
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(w)，w为树的最大宽度，队列最大长度
 */
var largestValues = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;

  const queue: TreeNode[] = [root];

  while (queue.length) {
    const size = queue.length; // 当前层的节点数量
    let maxVal = -Infinity; // 当前层的最大值，初始化为负无穷

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;

      // 更新当前层的最大值
      maxVal = Math.max(maxVal, node.val);

      // 将下一层节点加入队列
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // 将当前层的最大值加入结果数组
    res.push(maxVal);
  }

  return res;
};

/**
 * 解法二：深度优先搜索（推荐）
 * 思路：使用DFS遍历，用数组下标表示层级，维护每层的最大值
 * 时间复杂度：O(n)，需要遍历所有节点
 * 空间复杂度：O(h)，h为树的高度，递归栈深度
 */
var largestValues = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;

  dfs(root, 0);
  return res;

  function dfs(node: TreeNode | null, depth: number) {
    if (!node) return;

    // 如果是该层第一个访问的节点，直接设置为最大值
    if (depth === res.length) {
      res.push(node.val);
    } else {
      // 否则与当前层已记录的最大值比较并更新
      res[depth] = Math.max(res[depth], node.val);
    }

    // 递归遍历左右子树
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到二叉树每一层的最大值，返回包含所有层最大值的数组
   - 本质是层序遍历的经典应用，需要按层处理并维护最大值

2. 算法分析：
   - 时间复杂度：O(n) - 两种解法都需要遍历所有节点
   - 空间复杂度：
     * 解法一（BFS）：O(w) - 队列最大长度，w为树的最大宽度
     * 解法二（DFS）：O(h) - 递归栈深度，h为树的高度
   - 算法类型：树的遍历、广度优先搜索、深度优先搜索

3. 实现要点：
   - **解法一（BFS层序遍历）**：
     * 标准的层序遍历模板，逐层处理节点
     * 在每层遍历过程中维护最大值
     * 思路直观，易于理解和实现
   
   - **解法二（DFS深度优先）**：
     * 使用递归深度表示层级，用数组下标对应层数
     * 第一次访问某层时初始化，后续访问时更新最大值
     * 空间效率更优，代码更简洁

4. 优化思路：
   - DFS解法在空间复杂度上优于BFS，特别是对于宽度很大的树
   - 可以使用-Infinity作为初始最大值，处理负数节点的情况
   - 注意边界情况：空树返回空数组
   - 两种解法在时间复杂度上都是最优的O(n)

5. 类似问题：
   - 102. 二叉树的层序遍历（基础层序遍历）
   - 107. 二叉树的层序遍历II（自底向上层序遍历）
   - 199. 二叉树的右视图（找每层最右节点）
   - 513. 找树左下角的值（找最底层最左节点）
   - 637. 二叉树的层平均值（计算每层平均值）

6. 拓展变种：
   - 找每层的最小值：只需将Math.max改为Math.min
   - 找每层的节点个数：记录每层的size
   - 找每层的平均值：累加每层节点值并除以节点数
   - 找每层的中位数：收集每层所有值并排序

7. 常见错误：
   - 忘记处理空树的边界情况
   - BFS中忘记记录当前层的节点数量，导致层级混乱
   - DFS中深度计算错误，或者数组越界访问
   - 最大值初始化错误，应使用-Infinity而不是0
   - 混淆了层序遍历和普通遍历的区别
*/
