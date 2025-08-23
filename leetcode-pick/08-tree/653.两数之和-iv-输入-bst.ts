/*
 * @lc app=leetcode.cn id=653 lang=typescript
 *
 * [653] 两数之和 IV - 输入 BST
 *
 * https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/description/
 *
 * algorithms
 * Easy (61.83%)
 * Likes:    347
 * Dislikes: 0
 * Total Accepted:    64.5K
 * Total Submissions: 104.3K
 * Testcase Example:  '[5,3,6,2,4,null,7]\n9'
 *
 * 给定一个二叉搜索树 root 和一个目标结果 k，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 9
 * 输出: true
 *
 *
 * 示例 2：
 *
 *
 * 输入: root = [5,3,6,2,4,null,7], k = 28
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是  [1, 10^4].
 * -10^4 <= Node.val <= 10^4
 * root 为二叉搜索树
 * -10^5 <= k <= 10^5
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
 * 方法一：中序遍历 + 哈希表（迭代）
 *
 * 算法思路：
 * 1. 使用栈进行中序遍历BST
 * 2. 对每个节点，检查哈希表中是否存在对应的补数
 * 3. 如果存在补数，返回true；否则将补数加入哈希表
 * 4. 继续遍历直到找到答案或遍历完整棵树
 *
 * 核心思想：
 * - 利用两数之和的经典思路：target - current = complement
 * - 边遍历边查找，无需预先存储所有值
 */
var findTarget = function (root: TreeNode | null, k: number): boolean {
  if (!root) return false;

  const stack: TreeNode[] = [];
  const complementSet: Set<number> = new Set(); // 存储已遍历节点对应的补数
  let current = root;

  // 中序遍历BST
  while (current || stack.length > 0) {
    // 一路向左，将路径上的节点入栈
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 处理当前节点
    current = stack.pop()!;

    // 检查是否存在对应的补数
    if (complementSet.has(current.val)) {
      return true;
    }

    // 将当前节点值的补数加入集合
    complementSet.add(k - current.val);

    // 移动到右子树
    current = current.right;
  }

  return false;
};

/**
 * 方法二：深度优先搜索 + 哈希表（递归）
 *
 * 算法思路：
 * 1. 递归遍历BST的所有节点
 * 2. 对每个节点，检查是否存在complement = k - node.val
 * 3. 如果找到complement，返回true
 * 4. 将当前节点值加入哈希表，继续搜索子树
 *
 * 优点：代码简洁，易于理解
 * 缺点：递归栈可能导致栈溢出（对于很深的树）
 */
var findTarget = function (root: TreeNode | null, k: number): boolean {
  const visitedValues: Set<number> = new Set();
  return dfsSearch(root, k);

  /**
   * DFS搜索函数
   * @param node 当前搜索的节点
   * @param target 目标和
   * @returns 是否找到满足条件的两个节点
   */
  function dfsSearch(node: TreeNode | null, target: number): boolean {
    if (!node) {
      return false;
    }

    // 检查是否存在complement
    const complement = target - node.val;
    if (visitedValues.has(complement)) {
      return true;
    }

    // 将当前节点值加入已访问集合
    visitedValues.add(node.val);

    // 递归搜索左右子树
    return dfsSearch(node.left, target) || dfsSearch(node.right, target);
  }
};

/**
 * 方法三：双指针法（利用BST有序性）
 *
 * 算法思路：
 * 1. 先通过中序遍历获得有序数组
 * 2. 使用双指针在有序数组中查找两数之和
 * 3. 利用BST的有序性质优化查找过程
 *
 * 注意：这种方法需要O(n)额外空间存储数组
 */
var findTargetTwoPointers = function (
  root: TreeNode | null,
  k: number
): boolean {
  if (!root) return false;

  // 中序遍历获取有序数组
  const sortedValues: number[] = [];
  inorderTraversal(root, sortedValues);

  // 双指针查找
  let left = 0;
  let right = sortedValues.length - 1;

  while (left < right) {
    const sum = sortedValues[left] + sortedValues[right];
    if (sum === k) {
      return true;
    } else if (sum < k) {
      left++;
    } else {
      right--;
    }
  }

  return false;

  /**
   * 中序遍历获取有序数组
   * @param node 当前节点
   * @param result 结果数组
   */
  function inorderTraversal(node: TreeNode | null, result: number[]): void {
    if (node) {
      inorderTraversal(node.left, result);
      result.push(node.val);
      inorderTraversal(node.right, result);
    }
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在BST中找到两个节点，使得它们的值之和等于目标值k
   - 不能使用同一个节点两次
   - 充分利用BST的有序性质

2. 三种解法对比：

   方法一：中序遍历 + 哈希表（迭代）
   - 时间复杂度：O(n)
   - 空间复杂度：O(n) - 哈希表 + 栈
   - 优点：不需要预处理，边遍历边查找
   - 缺点：需要额外的栈空间

   方法二：DFS + 哈希表（递归）  
   - 时间复杂度：O(n)
   - 空间复杂度：O(n) - 哈希表 + 递归栈
   - 优点：代码简洁直观
   - 缺点：深度很深时可能栈溢出

   方法三：中序遍历 + 双指针
   - 时间复杂度：O(n)
   - 空间复杂度：O(n) - 存储有序数组
   - 优点：充分利用BST有序性
   - 缺点：需要两次遍历，空间开销大

3. 核心算法思想：
   - 两数之和的经典思路：complement = target - current
   - 哈希表快速查找：O(1)时间复杂度查找complement
   - BST的有序性：可以考虑双指针等优化方法

4. 实现细节：
   - 哈希表存储：可以存储已访问的值或对应的补数
   - 边界处理：空树、单节点、不存在解的情况
   - 去重考虑：同一节点不能使用两次

5. BST特性的利用：
   - 中序遍历得到有序序列
   - 可以考虑类似二分查找的优化
   - 左子树值 < 根节点值 < 右子树值

6. 空间优化的可能性：
   - Morris遍历：O(1)空间的中序遍历
   - 但仍需要O(n)空间存储哈希表
   - 总体空间复杂度难以优化到O(1)

7. 与普通数组两数之和的区别：
   - 普通数组：可以使用双指针（需要排序）或哈希表
   - BST：天然有序，但是树结构访问不如数组方便
   - 树结构：需要考虑遍历策略

8. 测试用例：
   - [5,3,6,2,4,null,7], k=9 -> true (3+6=9)
   - [5,3,6,2,4,null,7], k=28 -> false  
   - [2,1,3], k=4 -> true (1+3=4)
   - [2,1,3], k=1 -> false
   - [2,1,3], k=3 -> true (1+2=3)

9. 扩展应用：
   - 三数之和：在BST中找三个数的和
   - K数之和：推广到k个数的情况
   - 范围查询：在BST中查找和在某个范围内的数对

10. 算法选择建议：
    - 一般情况：推荐方法二（DFS + 哈希表），代码简洁
    - 深度很大：使用方法一（迭代），避免栈溢出
    - 强调BST特性：考虑方法三（双指针），体现有序性
*/
