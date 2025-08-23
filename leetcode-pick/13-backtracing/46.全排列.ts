/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (65.67%)
 * Likes:    756
 * Dislikes: 0
 * Total Accepted:    143.2K
 * Total Submissions: 187.8K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 *
 * 示例:
 *
 * 输入: [1,2,3]
 * 输出:
 * [
 *  [1,2,3],
 *  [1,3,2],
 *  [2,1,3],
 *  [2,3,1],
 *  [3,1,2],
 *  [3,2,1]
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 全排列 - 回溯算法（交换法）
 *
 * 核心思想：
 * 使用交换的方式生成全排列
 * 通过交换数组中的元素来生成不同的排列
 * 每次固定一个位置，然后递归处理剩余位置
 */
function permute(nums: number[]): number[][] {
  const ret: number[][] = [];
  const subset: number[] = nums.slice(); // 复制原数组
  const len = nums.length;

  dfs(subset, 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的排列
   * @param idx - 当前要固定的位置索引
   */
  function dfs(subset: number[], idx: number) {
    // 找到一个完整的排列
    if (idx === len) {
      ret.push(subset.slice());
      return;
    }

    // 尝试将每个位置的数字放到idx位置
    for (let i = idx; i < len; i++) {
      swap(subset, idx, i); // 交换位置
      dfs(subset, idx + 1); // 递归处理下一个位置
      swap(subset, idx, i); // 回溯：恢复原状
    }
  }

  /**
   * 交换数组中两个位置的元素
   * @param arr - 要交换的数组
   * @param i - 第一个位置
   * @param j - 第二个位置
   */
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 生成数组的所有可能排列
   - 排列考虑顺序，[1,2,3]和[2,1,3]是不同的排列
   - 排列数量为n!，其中n是数组长度

2. 算法分析：
   - 时间复杂度：O(n! * n)，n!种排列，每种需要O(n)时间复制
   - 空间复杂度：O(n)，递归深度为n
   - 算法类型：回溯算法（交换法）

3. 实现要点：
   - 使用交换法：通过交换数组元素生成不同排列
   - 固定位置：每次固定一个位置，递归处理剩余位置
   - 回溯恢复：确保状态正确恢复
   - 复制数组：避免修改原数组

4. 交换法原理：
   - 对于位置idx，尝试将idx到len-1的每个数字放到idx位置
   - 每次交换后，递归处理idx+1位置
   - 递归返回后，再次交换恢复原状
   - 这样可以生成所有可能的排列

5. 优化思路：
   - 使用交换法避免额外的空间开销
   - 直接在原数组上操作，减少内存使用
   - 使用解构赋值简化交换操作
   - 提前返回：当idx达到len时立即添加结果

6. 关键技巧：
   - 交换法：通过交换生成不同排列
   - 固定位置：每次固定一个位置
   - 回溯恢复：确保状态正确恢复
   - 边界处理：当idx达到len时添加结果

7. 与其他方法的对比：
   - 交换法：空间效率高，直接在原数组操作
   - 选择法：需要used数组标记已使用元素
   - 字典序法：需要额外的算法复杂度
*/
