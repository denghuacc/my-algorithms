/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (65.02%)
 * Likes:    294
 * Dislikes: 0
 * Total Accepted:    57.5K
 * Total Submissions: 77.8K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 *
 * 示例:
 *
 * 输入: n = 4, k = 2
 * 输出:
 * [
 *  [2,4],
 *  [3,4],
 *  [2,3],
 *  [1,2],
 *  [1,3],
 *  [1,4],
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 组合 - 回溯算法（基础版本）
 *
 * 核心思想：
 * 使用回溯算法，从1到n中选择k个数字
 * 通过start参数避免重复组合
 */
function combine(n: number, k: number): number[][] {
  const ret: number[][] = [];
  dfs([], 1);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的组合
   * @param start - 当前可选择的起始数字
   */
  function dfs(subset: number[], start: number) {
    // 找到一个完整的组合
    if (subset.length === k) {
      ret.push(subset.slice());
      return;
    }

    // 从start开始选择数字，避免重复
    for (let i = start; i <= n; i++) {
      subset.push(i);
      dfs(subset, i + 1); // 下一个数字必须大于当前数字
      subset.pop(); // 回溯
    }
  }
}

/**
 * 组合 - 回溯算法（剪枝优化版本）
 *
 * 核心思想：
 * 在基础版本上添加剪枝条件
 * 提前判断是否可能构造出长度为k的组合
 */
function combine2(n: number, k: number): number[][] {
  const ret: number[][] = [];
  dfs([], 1);
  return ret;

  /**
   * 深度优先搜索函数（带剪枝）
   * @param subset - 当前正在构建的组合
   * @param start - 当前可选择的起始数字
   */
  function dfs(subset: number[], start: number) {
    // 剪枝：subset长度加上剩余可选数字数量小于k
    // 不可能构造出长度为k的组合
    if (subset.length + (n - start + 1) < k) return;

    // 找到一个完整的组合
    if (subset.length === k) {
      ret.push(subset.slice());
      return;
    }

    // 选择当前数字
    dfs([...subset, start], start + 1);
    // 不选择当前数字
    dfs(subset, start + 1);
  }
}

/**
 * 组合 - 字典序算法（迭代版本）
 *
 * 核心思想：
 * 使用字典序生成下一个组合
 * 通过修改数组中的元素来生成所有组合
 */
function combine3(n: number, k: number): number[][] {
  const ret: number[][] = [];
  const subset: number[] = [];

  // 初始化：前k个位置放[1,2,...,k]，最后加一个哨兵n+1
  for (let i = 1; i <= k; i++) {
    subset.push(i);
  }
  subset.push(n + 1); // 哨兵

  let j = 0;
  while (j < k) {
    ret.push(subset.slice(0, k)); // 添加当前组合（不包含哨兵）
    j = 0;

    // 寻找第一个需要更新的位置
    // 将[0, j-1]区间重置为[1, 2, ..., j]
    while (j < k && subset[j + 1] === subset[j] + 1) {
      subset[j] = j + 1;
      j++;
    }
    subset[j]++; // 更新第j个位置
  }

  return ret;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从1到n中选择k个数字的所有可能组合
   - 组合不考虑顺序，[1,2]和[2,1]是同一个组合

2. 算法分析：
   - 时间复杂度：O(C(n,k))，即组合数
   - 空间复杂度：O(k)，递归深度为k
   - 算法类型：回溯算法 / 字典序算法

3. 实现要点：
   - 使用start参数避免重复组合
   - 剪枝条件：剩余数字数量不足以构成k个组合
   - 字典序算法通过修改数组元素生成下一个组合

4. 三种实现方法对比：
   - 方法1：基础回溯，简单易懂
   - 方法2：剪枝优化，性能更好
   - 方法3：字典序算法，迭代实现，空间效率最高

5. 优化思路：
   - 剪枝：提前判断是否可能构造出目标长度的组合
   - 字典序：避免递归调用，使用迭代方式
   - 哨兵技巧：简化边界条件处理
*/
