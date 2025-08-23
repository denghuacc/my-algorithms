/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] 子集
 *
 * https://leetcode-cn.com/problems/subsets/description/
 *
 * algorithms
 * Medium (70.51%)
 * Likes:    620
 * Dislikes: 0
 * Total Accepted:    100.6K
 * Total Submissions: 129.9K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
 *
 * 说明：解集不能包含重复的子集。
 *
 * 示例:
 *
 * 输入: nums = [1,2,3]
 * 输出:
 * [
 *  [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 *
 */

export {};

// @lc code=start
/**
 * 子集 - 回溯算法（按长度生成）
 *
 * 核心思想：
 * 先生成长度为0的子集，再生成长度为1的子集，以此类推
 * 对每个长度k，使用回溯算法生成所有可能的组合
 */
function subsets(nums: number[]): number[][] {
  const ret: number[][] = [];
  const n = nums.length;

  // 生成不同长度的子集
  for (let k = 0; k <= n; k++) {
    dfs([], 0);
  }
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的子集
   * @param start - 当前可选择的起始索引
   */
  function dfs(subset: number[], start: number) {
    // 找到一个指定长度的子集
    if (subset.length === k) {
      ret.push(subset.slice());
      return;
    }

    // 从start开始选择数字
    for (let i = start; i < n; i++) {
      subset.push(nums[i]);
      dfs(subset, i + 1);
      subset.pop(); // 回溯
    }
  }
}

/**
 * 子集 - 回溯算法（选择/不选择）
 *
 * 核心思想：
 * 对每个元素，可以选择或不选择
 * 通过递归生成所有可能的子集
 */
function subsets2(nums: number[]): number[][] {
  const ret: number[][] = [];
  const n = nums.length;
  dfs([], 0);
  return ret;

  /**
   * 深度优先搜索函数
   * @param subset - 当前正在构建的子集
   * @param idx - 当前处理的元素索引
   */
  function dfs(subset: number[], idx: number) {
    // 处理完所有元素，添加当前子集
    if (idx === n) {
      ret.push(subset.slice());
      return;
    }

    // 选择当前元素
    subset.push(nums[idx]);
    dfs(subset, idx + 1);
    subset.pop();

    // 不选择当前元素
    dfs(subset, idx + 1);
  }
}

/**
 * 子集 - 迭代算法（逐步构建）
 *
 * 核心思想：
 * 从空集开始，逐步添加每个元素
 * 每添加一个元素，就生成包含该元素的所有新子集
 */
function subsets3(nums: number[]): number[][] {
  const ret: number[][] = [];
  ret.push([]); // 添加空集

  // 逐个添加元素
  for (const num of nums) {
    const newSubsets: number[][] = [];

    // 为每个现有子集添加当前元素
    for (const subset of ret) {
      newSubsets.push([...subset, num]);
    }

    // 将新生成的子集添加到结果中
    for (const subset of newSubsets) {
      ret.push(subset);
    }
  }

  return ret;
}

/**
 * 子集 - 位运算算法
 *
 * 核心思想：
 * 使用二进制位表示每个元素是否被选择
 * 从0到2^n-1遍历所有可能的位模式
 */
function subsets4(nums: number[]): number[][] {
  const ret: number[][] = [];
  const n = nums.length;

  // 遍历所有可能的位模式（0到2^n-1）
  for (let mask = 0; mask < 1 << n; mask++) {
    const subset: number[] = [];

    // 检查每一位，如果为1则选择对应元素
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }

    ret.push(subset);
  }

  return ret;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 生成数组的所有可能子集（幂集）
   - 子集数量为2^n，其中n是数组长度

2. 算法分析：
   - 时间复杂度：O(2^n * n)，2^n个子集，每个需要O(n)时间复制
   - 空间复杂度：O(n)，递归深度为n
   - 算法类型：回溯算法 / 迭代算法 / 位运算算法

3. 四种实现方法对比：
   - 方法1：按长度生成，先0个元素，再1个元素...
   - 方法2：选择/不选择，对每个元素做选择决策
   - 方法3：迭代构建，逐步添加元素
   - 方法4：位运算，用二进制表示选择状态

4. 实现要点：
   - 使用start参数避免重复子集
   - 选择/不选择模式更直观易懂
   - 位运算方法效率最高，但可读性较差
   - 迭代方法空间效率好，易于理解

5. 优化思路：
   - 位运算：避免递归调用，直接生成所有子集
   - 剪枝：在方法1中可以提前结束不可能的分支
   - 空间优化：使用引用传递减少数组复制
*/
