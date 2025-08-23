/*
 * @lc app=leetcode.cn id=173 lang=typescript
 *
 * [173] 二叉搜索树迭代器
 *
 * https://leetcode-cn.com/problems/binary-search-tree-iterator/description/
 *
 * algorithms
 * Medium (74.35%)
 * Likes:    249
 * Dislikes: 0
 * Total Accepted:    29.6K
 * Total Submissions: 39.7K
 * Testcase Example:  '["BSTIterator","next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]\n' +
  '[[[7,3,15,null,null,9,20]],[null],[null],[null],[null],[null],[null],[null],[null],[null]]'
 *
 * 实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。
 * 
 * 调用 next() 将返回二叉搜索树中的下一个最小的数。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 
 * BSTIterator iterator = new BSTIterator(root);
 * iterator.next();    // 返回 3
 * iterator.next();    // 返回 7
 * iterator.hasNext(); // 返回 true
 * iterator.next();    // 返回 9
 * iterator.hasNext(); // 返回 true
 * iterator.next();    // 返回 15
 * iterator.hasNext(); // 返回 true
 * iterator.next();    // 返回 20
 * iterator.hasNext(); // 返回 false
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * next() 和 hasNext() 操作的时间复杂度是 O(1)，并使用 O(h) 内存，其中 h 是树的高度。
 * 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 中至少存在一个下一个最小的数。
 * 
 * 
 */

export {};

// Definition for a binary tree node
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
 * 二叉搜索树迭代器
 *
 * 设计思路：
 * 1. 利用BST的中序遍历得到升序序列的特性
 * 2. 在构造函数中预先进行中序遍历，存储所有节点值
 * 3. 使用索引指针实现next()和hasNext()操作
 *
 * 优化方案：
 * - 当前实现：O(n)空间预存储，O(1)时间获取下一个元素
 * - 可优化为：使用栈实现懒加载，O(h)空间，平均O(1)时间
 */
class BSTIterator {
  private idx: number; // 当前索引位置
  private items: number[]; // 存储所有节点值的数组（升序）

  /**
   * 构造函数：初始化迭代器
   * @param root 二叉搜索树的根节点
   */
  constructor(root: TreeNode | null) {
    this.idx = 0;
    this.items = [];
    // 中序遍历BST，生成升序序列
    this.inorder(root);
  }

  /**
   * 返回下一个最小的元素
   * @returns 下一个最小元素的值
   */
  next(): number {
    return this.items[this.idx++];
  }

  /**
   * 检查是否还有下一个元素
   * @returns 如果还有下一个元素返回true，否则返回false
   */
  hasNext(): boolean {
    return this.idx < this.items.length;
  }

  /**
   * 中序遍历二叉搜索树（递归实现）
   * @param node 当前遍历的节点
   */
  private inorder(node: TreeNode | null): void {
    if (node) {
      // 先遍历左子树
      this.inorder(node.left);
      // 访问当前节点（添加到结果数组）
      this.items.push(node.val);
      // 再遍历右子树
      this.inorder(node.right);
    }
  }
}

/**
 * 优化版本：使用栈实现懒加载（节省空间）
 *
 * 思路：不预先遍历整棵树，而是维护一个栈来模拟中序遍历过程
 * - 空间复杂度：O(h) 其中h是树的高度
 * - 时间复杂度：next()和hasNext()平均O(1)
 */
class BSTIteratorOptimized {
  private stack: TreeNode[];

  constructor(root: TreeNode | null) {
    this.stack = [];
    // 将根节点到最左节点的路径入栈
    this.pushLeft(root);
  }

  next(): number {
    const node = this.stack.pop()!;
    // 如果有右子树，将右子树的最左路径入栈
    this.pushLeft(node.right);
    return node.val;
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  /**
   * 将从当前节点到最左节点的路径都入栈
   * @param node 起始节点
   */
  private pushLeft(node: TreeNode | null): void {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 实现一个迭代器，能按升序返回BST中的元素
   - 支持next()和hasNext()操作
   - 要求时间复杂度尽可能低

2. 核心思想：
   - 利用BST的中序遍历结果是升序序列的性质
   - 中序遍历：左子树 -> 根节点 -> 右子树

3. 两种实现方案：

   方案一：预处理方案（当前实现）
   - 构造时：完整中序遍历，存储所有值
   - next()：O(1) 直接返回下一个元素
   - hasNext()：O(1) 检查索引
   - 空间：O(n) 存储所有节点值
   - 优点：next()和hasNext()都是O(1)
   - 缺点：需要O(n)额外空间

   方案二：懒加载方案（优化版）
   - 构造时：只将根到最左节点路径入栈
   - next()：弹出栈顶，处理其右子树
   - hasNext()：检查栈是否为空
   - 空间：O(h) h为树高度
   - 优点：节省空间
   - 缺点：实现稍复杂

4. 中序遍历的栈模拟：
   - 始终保持栈中存储"待访问的最小元素到根的路径"
   - 弹出栈顶时，将其右子树的最左路径入栈
   - 这样保证每次弹出的都是当前最小的元素

5. 示例执行过程：
   BST: [7,3,15,null,null,9,20]
   中序遍历结果：[3,7,9,15,20]
   
   初始栈：[7,3] (根到最左节点)
   next(): 返回3，栈变为[7]
   next(): 返回7，处理7的右子树，栈变为[15,9]
   next(): 返回9，栈变为[15]
   ...

6. 时间复杂度分析：
   - 构造函数：O(h) 或 O(n)
   - next()：平均O(1)，最坏O(h)
   - hasNext()：O(1)
   - 总体：n次next()调用总时间为O(n)

7. 应用场景：
   - 大型BST的顺序访问
   - 内存受限环境下的树遍历
   - 需要中断和恢复的遍历过程
*/
