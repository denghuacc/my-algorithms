/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (52.95%)
 * Likes:    274
 * Dislikes: 0
 * Total Accepted:    59.7K
 * Total Submissions: 96.8K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用一次。
 *
 * 说明：
 *
 *
 * 所有数字（包括目标数）都是正整数。
 * 解集不能包含重复的组合。
 *
 *
 * 示例 1:
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 所求解集为:
 * [
 *  [1, 7],
 *  [1, 2, 5],
 *  [2, 6],
 *  [1, 1, 6]
 * ]
 *
 *
 * 示例 2:
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 所求解集为:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 组合总和 II - 回溯算法（基础版本）
 *
 * 核心思想：
 * 在组合总和I的基础上，添加去重逻辑
 * 每个数字只能使用一次，且需要避免重复组合
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  const ret: number[][] = [];
  if (candidates.length === 0) return ret;

  candidates.sort((a, b) => a - b); // 排序，便于去重
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

      // 去重剪枝：跳过相同数字，避免重复组合
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      subset.push(candidates[i]);
      // 注意：这里传递i+1，因为每个数字只能使用一次
      dfs(subset, residue - candidates[i], i + 1);
      subset.pop(); // 回溯
    }
  }
}

/**
 * 组合总和 II - 回溯算法（频率统计版本）
 *
 * 核心思想：
 * 先统计每个数字的出现频率，然后按频率进行选择
 * 这样可以更好地处理重复数字的去重问题
 */
function combinationSum2Freq(candidates: number[], target: number): number[][] {
  const ret: number[][] = [];
  if (candidates.length === 0) return ret;

  const freq: [number, number][] = []; // [数字，出现频率][]
  const subset: number[] = [];
  candidates.sort((a, b) => a - b);

  // 统计每个数字的出现频率
  for (const num of candidates) {
    const size = freq.length;
    if (freq.length === 0 || num !== freq[size - 1][0]) {
      freq.push([num, 1]);
    } else {
      ++freq[size - 1][1];
    }
  }

  dfs(0, target);
  return ret;

  /**
   * 深度优先搜索函数
   * @param pos - 当前处理的数字在freq中的位置
   * @param rest - 剩余需要达到的目标值
   */
  function dfs(pos: number, rest: number) {
    // 找到一个有效组合
    if (rest === 0) {
      ret.push(subset.slice());
      return;
    }

    // 处理完所有数字或剩余值太小
    if (pos === freq.length || rest < freq[pos][0]) return;

    // 不选择当前数字
    dfs(pos + 1, rest);

    // 选择当前数字（可以选择1到most次）
    const most = Math.min(Math.floor(rest / freq[pos][0]), freq[pos][1]);
    for (let i = 1; i <= most; i++) {
      subset.push(freq[pos][0]);
      dfs(pos + 1, rest - i * freq[pos][0]);
    }

    // 回溯：移除所有添加的数字
    for (let i = 1; i <= most; i++) {
      subset.pop();
    }
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从candidates中选择数字，使它们的和等于target
   - 每个数字只能使用一次，需要避免重复组合
   - 关键区别：不能重复使用同一个数字

2. 算法分析：
   - 时间复杂度：O(2^n * n)，其中n是candidates的长度
   - 空间复杂度：O(n)，递归深度为n
   - 算法类型：回溯算法 + 去重优化

3. 实现要点：
   - 排序预处理：便于去重判断
   - 去重剪枝：跳过相同数字，避免重复组合
   - 单次使用：传递i+1而不是i给下一层递归
   - 频率统计：更好地处理重复数字

4. 两种实现方法对比：
   - 方法1：直接去重，简单易懂
   - 方法2：频率统计，更高效处理大量重复数字
   - 方法2在空间效率上更好，因为避免了重复计算

5. 去重原理：
   - 对于相同数字，我们规定它们的相对顺序必须保持一致
   - 例如：[1,1,2]中，第一个1必须在第二个1之前被使用
   - 这样可以避免生成[1,1,2]和[1,1,2]这样的重复组合

6. 优化思路：
   - 排序剪枝：提前退出不可能的分支
   - 去重：通过相对顺序确保组合的唯一性
   - 频率统计：减少重复计算
   - 提前返回：当剩余值小于当前数字时立即退出

7. 关键技巧：
   - 单次使用：递归时传递i+1
   - 避免重复组合：只从当前索引开始选择
   - 剪枝优化：利用排序后的单调性
   - 频率处理：按频率选择，避免重复计算
*/
