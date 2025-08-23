/*
 * @lc app=leetcode.cn id=47 lang=typescript
 *
 * [47] 全排列 II
 *
 * https://leetcode-cn.com/problems/permutations-ii/description/
 *
 * algorithms
 * Medium (50.13%)
 * Likes:    320
 * Dislikes: 0
 * Total Accepted:    65.9K
 * Total Submissions: 111.4K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个可包含重复数字的序列，返回所有不重复的全排列。
 *
 * 示例:
 *
 * 输入: [1,1,2]
 * 输出:
 * [
 * ⁠ [1,1,2],
 * ⁠ [1,2,1],
 * ⁠ [2,1,1]
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 全排列 II - 回溯算法（去重版本）
 *
 * 核心思想：
 * 在标准全排列基础上，添加去重逻辑
 * 通过排序和剪枝条件避免生成重复的排列
 */
function permuteUnique(nums: number[]): number[][] {
  const ret: number[][] = [];
  const n = nums.length;
  if (n === 0) return ret;

  nums.sort((a, b) => a - b); // 排序，便于去重
  const used: boolean[] = new Array(n).fill(false); // 记录每个位置是否被使用
  const subset: number[] = []; // 当前排列

  dfs(subset, 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的排列
   * @param idx - 当前要填充的位置索引
   */
  function dfs(subset: number[], idx: number) {
    // 找到一个完整的排列
    if (idx === n) {
      ret.push(subset.slice()); // 复制数组，避免引用问题
      return;
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue; // 跳过已使用的元素

      // 去重剪枝：相同数字的相对顺序必须保持一致
      // 如果当前数字与前一个相同，且前一个未被使用，则跳过
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      // 选择当前数字
      subset.push(nums[i]);
      used[i] = true;

      // 递归填充下一个位置
      dfs(subset, idx + 1);

      // 回溯：撤销选择
      used[i] = false;
      subset.pop();
    }
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 生成数组的所有可能排列，但要去除重复的排列
   - 关键是如何在回溯过程中避免生成重复结果

2. 算法分析：
   - 时间复杂度：O(n! * n)，n!种排列，每种需要O(n)时间复制
   - 空间复杂度：O(n)，递归深度为n，used数组和subset数组
   - 算法类型：回溯算法 + 剪枝优化

3. 实现要点：
   - 先对数组排序，使相同数字相邻
   - 使用used数组标记已使用的元素
   - 关键剪枝条件：相同数字的相对顺序必须保持一致
   - 剪枝逻辑：if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue

4. 去重原理：
   - 对于相同数字，我们规定它们的相对顺序必须保持一致
   - 例如：[1,1,2]中，第一个1必须在第二个1之前被使用
   - 这样可以避免生成[1,1,2]和[1,1,2]这样的重复排列

5. 优化思路：
   - 排序预处理，便于去重判断
   - 使用剪枝条件减少不必要的递归
   - 使用slice()复制数组，避免引用问题
*/
