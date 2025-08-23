/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (61.77%)
 * Likes:    693
 * Dislikes: 0
 * Total Accepted:    97.6K
 * Total Submissions: 141.6K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的数字可以无限制重复被选取。
 *
 * 说明：
 *
 *
 * 所有数字（包括 target）都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: candidates = [2,3,6,7], target = 7,
 * 所求解集为:
 * [
 *  [7],
 *  [2,2,3]
 * ]
 *
 *
 * 示例 2:
 *
 * 输入: candidates = [2,3,5], target = 8,
 * 所求解集为:
 * [
 * [2,2,2,2],
 * [2,3,3],
 * [3,5]
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 组合总和 - 回溯算法（基础版本）
 *
 * 核心思想：
 * 使用回溯算法，从candidates中选择数字，使它们的和等于target
 * 每个数字可以重复使用，通过start参数避免重复组合
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const ret: number[][] = [];
  if (candidates.length === 0) return ret;

  candidates.sort((a, b) => a - b); // 排序是剪枝的前提
  dfs([], target, 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的组合
   * @param residue - 剩余需要达到的目标值
   * @param start - 当前可选择的起始索引
   */
  function dfs(subset: number[], residue: number, start: number) {
    // 找到一个有效组合
    if (residue === 0) {
      ret.push(subset.slice());
      return;
    }

    // 从start开始选择数字
    for (let i = start; i < candidates.length; i++) {
      // 剪枝：如果当前数字已经超过剩余值，后续更大，直接退出
      if (residue - candidates[i] < 0) break;

      subset.push(candidates[i]);
      // 注意：这里传递i而不是i+1，因为可以重复使用同一个数字
      dfs(subset, residue - candidates[i], i);
      subset.pop(); // 回溯
    }
  }
}

/**
 * 组合总和 - 回溯算法（选择/不选择版本）
 *
 * 核心思想：
 * 对每个数字，可以选择使用或不使用
 * 如果选择使用，可以继续使用同一个数字
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  const ret: number[][] = [];
  if (candidates.length === 0) return ret;

  dfs(target, [], 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param target - 剩余需要达到的目标值
   * @param subset - 当前正在构建的组合
   * @param idx - 当前处理的数字索引
   */
  function dfs(target: number, subset: number[], idx: number) {
    // 处理完所有数字
    if (idx === candidates.length) return;

    // 找到一个有效组合
    if (target === 0) {
      ret.push(subset);
      return;
    }

    // 不选择当前数字
    dfs(target, subset, idx + 1);

    // 选择当前数字（如果可以的话）
    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...subset, candidates[idx]], idx);
    }
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从candidates中选择数字，使它们的和等于target
   - 每个数字可以重复使用，需要避免重复组合

2. 算法分析：
   - 时间复杂度：O(S)，其中S是所有可行解的长度之和
   - 空间复杂度：O(target)，递归深度最多为target
   - 算法类型：回溯算法

3. 实现要点：
   - 排序预处理：便于剪枝优化
   - 使用start参数：避免生成重复组合
   - 剪枝条件：当剩余值小于当前数字时提前退出
   - 重复使用：传递i而不是i+1给下一层递归

4. 两种实现方法对比：
   - 方法1：直接选择数字，使用for循环遍历
   - 方法2：选择/不选择模式，更直观易懂
   - 方法2在空间效率上更好，因为使用扩展运算符创建新数组

5. 优化思路：
   - 排序剪枝：提前退出不可能的分支
   - 去重：通过start参数确保组合的唯一性
   - 空间优化：使用引用传递减少数组复制
   - 提前返回：当剩余值小于0时立即退出

6. 关键技巧：
   - 重复使用数字：递归时传递相同的索引
   - 避免重复组合：只从当前索引开始选择
   - 剪枝优化：利用排序后的单调性
*/
