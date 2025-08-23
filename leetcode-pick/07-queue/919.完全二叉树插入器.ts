/*
 * @lc app=leetcode.cn id=919 lang=typescript
 *
 * [919] 完全二叉树插入器
 *
 * https://leetcode.cn/problems/complete-binary-tree-inserter/description/
 *
 * algorithms
 * Medium (67.02%)
 * Likes:    98
 * Dislikes: 0
 * Total Accepted:    12.9K
 * Total Submissions: 19.3K
 * Testcase Example:  '["CBTInserter","insert","get_root"]\n[[[1]],[2],[]]'
 *
 * 完全二叉树 是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。
 *
 * 设计一种算法，将一个新节点插入到一个完整的二叉树中，并在插入后保持其完整。
 *
 * 实现 CBTInserter 类:
 *
 *
 * CBTInserter(TreeNode root) 使用头节点为 root 的给定树初始化该数据结构；
 * CBTInserter.insert(int v)  向树中插入一个值为 Node.val == val的新节点
 * TreeNode。使树保持完全二叉树的状态，并返回插入节点 TreeNode 的父节点的值；
 * CBTInserter.get_root() 将返回树的头节点。
 *
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入
 * ["CBTInserter", "insert", "insert", "get_root"]
 * [[[1, 2]], [3], [4], []]
 * 输出
 * [null, 1, 2, [1, 2, 3, 4]]
 *
 * 解释
 * CBTInserter cBTInserter = new CBTInserter([1, 2]);
 * cBTInserter.insert(3);  // 返回 1
 * cBTInserter.insert(4);  // 返回 2
 * cBTInserter.get_root(); // 返回 [1, 2, 3, 4]
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数量范围为 [1, 1000]
 * 0 <= Node.val <= 5000
 * root 是完全二叉树
 * 0 <= val <= 5000
 * 每个测试用例最多调用 insert 和 get_root 操作 10^4 次
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
 * 完全二叉树插入器
 *
 * 核心思想：
 * 1. 维护一个候选节点队列，存储所有还未填满子节点的节点
 * 2. 插入时总是选择队列中第一个节点作为父节点
 * 3. 优先填充左子节点，再填充右子节点
 * 4. 当节点填满后从候选队列中移除
 */
class CBTInserter {
  root: TreeNode | null;
  candidate: TreeNode[] = []; // 候选父节点队列（未填满的节点）

  /**
   * 构造函数：初始化完全二叉树插入器
   * 时间复杂度：O(n)，需要遍历现有的所有节点
   * 空间复杂度：O(w)，w为树的最大宽度
   */
  constructor(root: TreeNode | null) {
    this.root = root;
    this.candidate = [];

    // 使用BFS找到所有未填满的节点
    const queue: TreeNode[] = [root!];
    while (queue.length) {
      const node = queue.shift()!;

      // 将子节点加入队列继续遍历
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      // 如果当前节点还未填满（缺少左子节点或右子节点），则加入候选队列
      if (!(node.left && node.right)) {
        this.candidate.push(node);
      }
    }
  }

  /**
   * 插入新节点，保持完全二叉树性质
   * 时间复杂度：O(1)，每次插入都是常数时间操作
   * 空间复杂度：O(1)，只使用常数额外空间
   */
  insert(val: number): number {
    const newNode = new TreeNode(val);

    // 取候选队列中的第一个节点作为父节点
    const parentNode = this.candidate[0];
    const parentVal = parentNode.val;

    // 优先填充左子节点
    if (!parentNode.left) {
      parentNode.left = newNode;
    } else {
      // 左子节点已存在，填充右子节点
      parentNode.right = newNode;
      // 当前节点已填满，从候选队列中移除
      this.candidate.shift();
    }

    // 新插入的节点可能成为未来的父节点，加入候选队列
    this.candidate.push(newNode);

    return parentVal;
  }

  /**
   * 获取树的根节点
   * 时间复杂度：O(1)
   * 空间复杂度：O(1)
   */
  get_root(): TreeNode | null {
    return this.root;
  }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个数据结构，能够在完全二叉树中高效插入新节点
   - 完全二叉树：除最后一层外，其他层都被完全填充，最后一层从左到右填充
   - 需要维护完全二叉树的性质，同时提供高效的插入操作

2. 算法分析：
   - 初始化时间复杂度：O(n)，需要遍历现有树找到所有未满的节点
   - 插入时间复杂度：O(1)，每次插入都是常数时间操作
   - 空间复杂度：O(w)，w为树的最大宽度，主要用于存储候选父节点
   - 算法类型：树的设计、队列应用、完全二叉树性质维护

3. 实现要点：
   - **核心数据结构**：候选父节点队列（candidate）
     * 存储所有还未填满子节点的节点
     * 队列头部是下一个应该添加子节点的父节点
   
   - **初始化策略**：
     * 使用BFS遍历现有树
     * 找出所有未填满的节点（缺少左子节点或右子节点）
     * 这些节点按层序顺序加入候选队列
   
   - **插入策略**：
     * 优先填充左子节点，再填充右子节点
     * 节点填满后立即从候选队列移除
     * 新节点总是加入候选队列（可能成为未来的父节点）

4. 完全二叉树性质：
   - 每一层都被完全填充（除了可能的最后一层）
   - 最后一层的节点从左到右连续填充
   - 这保证了BFS遍历的顺序就是插入的顺序
   - 候选队列的顺序确保了正确的父节点选择

5. 优化思路：
   - 候选队列避免了每次插入时重新搜索父节点
   - O(1)的插入时间复杂度是最优的
   - 空间复杂度已经是必需的，无法进一步优化
   - 可以考虑使用双端队列优化头部删除操作

6. 类似问题：
   - 297. 二叉树的序列化与反序列化（树的重建）
   - 662. 二叉树最大宽度（完全二叉树性质应用）
   - 958. 二叉树的完全性检验（验证完全二叉树）
   - 1161. 最大层内元素和（层序遍历应用）

7. 拓展应用：
   - 堆的实现：完全二叉树是堆的基础结构
   - 线段树：部分实现基于完全二叉树
   - 优先队列：底层常用完全二叉树实现
   - 树状数组：利用完全二叉树的索引关系

8. 常见错误：
   - 忘记在构造函数中初始化候选队列
   - 插入时没有按照"左优先"的原则
   - 节点填满后忘记从候选队列中移除
   - 新节点没有加入候选队列
   - 混淆完全二叉树和满二叉树的概念
   - 没有正确处理根节点为空的情况
*/
