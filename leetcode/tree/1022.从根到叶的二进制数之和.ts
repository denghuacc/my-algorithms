/*
 * @lc app=leetcode.cn id=1022 lang=typescript
 *
 * [1022] 从根到叶的二进制数之和
 *
 * https://leetcode.cn/problems/sum-of-root-to-leaf-binary-numbers/description/
 *
 * algorithms
 * Easy (73.26%)
 * Likes:    158
 * Dislikes: 0
 * Total Accepted:    30.7K
 * Total Submissions: 41.9K
 * Testcase Example:  '[1,0,1,0,1,0,1]'
 *
 * 给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数。
 *
 *
 * 例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13 。
 *
 *
 * 对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字。
 *
 * 返回这些数字之和。题目数据保证答案是一个 32 位 整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,0,1,0,1,0,1]
 * 输出：22
 * 解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [0]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在 [1, 1000] 范围内
 * Node.val 仅为 0 或 1
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
 * 解法一：DFS + 路径字符串拼接
 *
 * @param root - 二叉树根节点
 * @returns 所有根到叶路径对应二进制数的十进制和
 *
 * 思路：
 * 1) 深度优先遍历整棵树。
 * 2) 用 `path` 记录从根到当前节点的二进制字符串。
 * 3) 到达叶子时，将完整路径加入数组。
 * 4) 遍历结束后，把每条路径用 `parseInt(path, 2)` 转为十进制并求和。
 */
var sumRootToLeaf = function (root: TreeNode | null): number {
  // 空树没有根到叶路径，答案为 0。
  if (!root) {
    return 0;
  }

  // 保存所有叶子路径的二进制字符串。
  const paths: string[] = [];

  // 从根开始构建路径。
  dfs(root, "");

  // 将每条二进制路径转为十进制并累加。
  return paths.reduce((sum, binaryPath) => sum + parseInt(binaryPath, 2), 0);

  function dfs(node: TreeNode | null, path: string) {
    // 递归终止：空节点直接返回。
    if (!node) {
      return;
    }

    // 当前节点追加到路径末尾，形成到当前节点的路径值。
    const nextPath = path + node.val;

    // 叶子节点：说明形成了一条完整根到叶路径，收集结果。
    if (!node.left && !node.right) {
      paths.push(nextPath);
      return;
    }

    // 继续向左右子树搜索。
    dfs(node.left, nextPath);
    dfs(node.right, nextPath);
  }
};

/**
 * 解法二：DFS + 二进制位运算累积（推荐）
 *
 * @param root - 二叉树根节点
 * @returns 所有根到叶路径对应二进制数的十进制和
 *
 * 思路：
 * 1) 用整数 `value` 表示当前根到节点路径的二进制值。
 * 2) 访问新节点时，执行 `value = (value << 1) | node.val`，
 *    相当于“左移一位后把当前 bit 放到最低位”。
 * 3) 到达叶子时，`value` 就是该路径的十进制值，直接返回。
 * 4) 非叶子返回左右子树结果之和。
 *
 * 优势：
 * - 不需要构造字符串，也不用二次遍历做 `parseInt`，常数更小。
 */
var sumRootToLeaf = function (root: TreeNode | null): number {
  // 从根节点开始 DFS，初始路径值为 0。
  return dfs(root, 0);

  /**
   * 深度优先搜索，返回当前子树内所有根到叶路径和。
   *
   * @param node - 当前访问节点
   * @param value - 从根到当前节点“父节点”为止的路径值
   * @returns 以 node 为根的子树贡献总和
   */
  function dfs(node: TreeNode | null, value: number): number {
    // 空节点不贡献路径值。
    if (!node) {
      return 0;
    }

    // 更新当前路径值：左移并加入当前节点 bit。
    const nextValue = (value << 1) | node.val;

    // 到达叶子，返回这条路径的十进制值。
    if (!node.left && !node.right) {
      return nextValue;
    }

    // 非叶子：结果等于左右子树贡献之和。
    return dfs(node.left, nextValue) + dfs(node.right, nextValue);
  }
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：每条“根到叶”路径可以看作一个二进制数，
     要求所有路径值总和。
   - 关键特点：节点值只有 0/1，天然对应二进制位。
   - 目标：高效遍历所有根到叶路径并累计数值。

2. 算法分析
   - 解法一（字符串 DFS）
     时间复杂度：O(n * h)，n 为节点数，h 为树高，
     字符串拼接带来额外代价。
     空间复杂度：O(n * h)（保存路径字符串） + 递归栈 O(h)。
   - 解法二（位运算 DFS）
     时间复杂度：O(n)，每个节点只处理一次，更新路径值是 O(1)。
     空间复杂度：O(h)，仅递归栈。
   - 算法类型：深度优先搜索（DFS） + 路径状态传递。

3. 解题思路
   - 核心思想：DFS 遍历树，并把“当前路径对应数值”作为状态向下传递。
   - 推导过程：
     若当前路径值为 value，访问下一节点 bit 后，新值为：
     newValue = value * 2 + bit
     位运算等价写法是：newValue = (value << 1) | bit
   - 为什么成立：
     二进制左移一位等于在末尾补 0（乘 2），
     再加上当前 bit 就得到新路径值。

4. 实现要点
   - 叶子判断条件：`!node.left && !node.right`。
   - 空节点返回 0，便于“左右子树求和”写法统一。
   - 第二种解法避免字符串拼接与 parseInt，性能更稳。
   - TypeScript 存在多个解答时，使用 `var` 同名覆盖是 LeetCode 常见写法，
     这里保留。

5. 示例分析
   - 示例一：root = [1,0,1,0,1,0,1]
     路径为：
     1->0->0 = 二进制 100 = 4
     1->0->1 = 二进制 101 = 5
     1->1->0 = 二进制 110 = 6
     1->1->1 = 二进制 111 = 7
     总和 = 4 + 5 + 6 + 7 = 22
   - 示例二：root = [0]
     只有一条路径“0”，值为 0，总和也是 0。

6. 常见错误
   - 错误一：把“到达 null”当作路径结束并返回当前值，会重复计数。
     正确做法：只有叶子节点才算完整路径。
   - 错误二：遗漏空节点返回 0，导致左右求和逻辑复杂或报错。
   - 错误三：位运算更新写错为 `(value | node.val) << 1`，位序会错。
     正确顺序是先左移再并入当前 bit：`(value << 1) | node.val`。

7. 扩展思考
   - 如果节点值不是 0/1，而是 0~9，可改为“十进制拼接”：
     newValue = value * 10 + node.val。
   - 如果树很深并担心递归栈，可改为显式栈迭代 DFS，思路一致。
*/
