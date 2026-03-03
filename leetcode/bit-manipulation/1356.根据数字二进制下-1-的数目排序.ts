/*
 * @lc app=leetcode.cn id=1356 lang=typescript
 *
 * [1356] 根据数字二进制下 1 的数目排序
 *
 * https://leetcode-cn.com/problems/sort-integers-by-the-number-of-1-bit/description/
 *
 * algorithms
 * Easy (67.86%)
 * Likes:    41
 * Dislikes: 0
 * Total Accepted:    13.6K
 * Total Submissions: 19.2K
 * Testcase Example:  '[0,1,2,3,4,5,6,7,8]'
 *
 * 给你一个整数数组 arr 。请你将数组中的元素按照其二进制表示中数字 1 的数目升序排序。
 *
 * 如果存在多个数字二进制中 1 的数目相同，则必须将它们按照数值大小升序排列。
 *
 * 请你返回排序后的数组。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [0,1,2,3,4,5,6,7,8]
 * 输出：[0,1,2,4,8,3,5,6,7]
 * 解释：[0] 是唯一一个有 0 个 1 的数。
 * [1,2,4,8] 都有 1 个 1 。
 * [3,5,6] 有 2 个 1 。
 * [7] 有 3 个 1 。
 * 按照 1 的个数排序得到的结果数组为 [0,1,2,4,8,3,5,6,7]
 *
 *
 * 示例 2：
 *
 * 输入：arr = [1024,512,256,128,64,32,16,8,4,2,1]
 * 输出：[1,2,4,8,16,32,64,128,256,512,1024]
 * 解释：数组中所有整数二进制下都只有 1 个 1 ，所以你需要按照数值大小将它们排序。
 *
 *
 * 示例 3：
 *
 * 输入：arr = [10000,10000]
 * 输出：[10000,10000]
 *
 *
 * 示例 4：
 *
 * 输入：arr = [2,3,5,7,11,13,17,19]
 * 输出：[2,3,5,17,7,11,13,19]
 *
 *
 * 示例 5：
 *
 * 输入：arr = [10,100,1000,10000]
 * 输出：[10,100,10000,1000]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 500
 * 0 <= arr[i] <= 10^4
 *
 *
 */

// @lc code=start
/**
 * 解法一：逐个计算每个数字的二进制 1 的个数，再排序。
 *
 * @param arr - 待排序数组，元素范围是 [0, 10^4]
 * @returns 按“1 的个数优先、数值次之”排序后的数组
 *
 * 核心思路：
 * 1) 先预处理 arr 中每个数的 bitCount（1 的个数）。
 * 2) 排序时优先比较 bitCount；若相同，再比较数值本身。
 */
var sortByBits = function (arr: number[]): number[] {
  // 题目给出上界为 10^4，因此开 10001 长度即可 O(1) 索引。
  const MAX_VALUE = 10000;
  const bitCountByValue: number[] = new Array(MAX_VALUE + 1).fill(0);

  // 只为 arr 中实际出现的数计算 bitCount，减少无效计算。
  for (const num of arr) {
    bitCountByValue[num] = countOnesByDivision(num);
  }

  return arr.sort((a, b) => {
    // 第一关键字：二进制 1 的个数（升序）。
    if (bitCountByValue[a] !== bitCountByValue[b]) {
      return bitCountByValue[a] - bitCountByValue[b];
    }
    // 第二关键字：数值大小（升序）。
    return a - b;
  });

  /**
   * 用“除 2 取余”方式统计二进制 1 的个数。
   *
   * @param num - 非负整数
   * @returns num 的 popcount（置位数量）
   */
  function countOnesByDivision(num: number): number {
    let ones = 0;
    // 不断取最低位并右移（这里用除法等价实现）。
    while (num !== 0) {
      ones += num % 2;
      num = Math.floor(num / 2);
    }
    return ones;
  }
};

/**
 * 解法二：位运算 + 动态规划预处理 popcount，再排序。（推荐）
 *
 * @param arr - 待排序数组
 * @returns 按题意排序后的数组
 *
 * 状态转移：
 * bitCount[i] = bitCount[i >> 1] + (i & 1)
 * 含义：
 * - i >> 1：去掉 i 的最低位
 * - (i & 1)：i 的最低位是 0 或 1
 * 二者相加即可得到 i 的 1 的总个数。
 */
var sortByBits = function (arr: number[]): number[] {
  const MAX_VALUE = 10000;
  const bitCountByValue: number[] = new Array(MAX_VALUE + 1).fill(0);

  // 预处理 [1..10000] 每个整数的 popcount。
  for (let value = 1; value <= MAX_VALUE; value++) {
    bitCountByValue[value] = bitCountByValue[value >> 1] + (value & 1);
  }

  // 排序规则与解法一一致：先按 bitCount，再按数值。
  return arr.sort((a, b) => {
    if (bitCountByValue[a] !== bitCountByValue[b]) {
      return bitCountByValue[a] - bitCountByValue[b];
    }
    return a - b;
  });
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：对数组做“二关键字排序”。
   - 第一关键字是每个数二进制表示里 1 的个数（升序）。
   - 第二关键字是数值大小（升序）。

2. 算法分析
   - 解法一：边遍历边计算 bitCount，再排序。
     时间复杂度：O(n log n + n * logV)，V=10^4。
     空间复杂度：O(V)（bitCount 表）。
   - 解法二：先 DP 预处理 [0..V] 的 bitCount，再排序。
     时间复杂度：O(V + n log n)。
     空间复杂度：O(V)。
   - 在本题固定上界 V=10^4 下，解法二常数更稳定，推荐使用。

3. 核心思想
   - 排序本身不是难点，关键是高效得到每个数的 popcount。
   - 解法一直接算：对每个数做除 2 取余统计。
   - 解法二预处理：利用递推式一次性算出全部 bitCount。

4. 实现步骤（非代码粘贴）
   - 第一步：准备 `bitCountByValue` 数组，支持 O(1) 查询某个值的 popcount。
   - 第二步：
     解法一仅为 arr 内元素计算 popcount；
     解法二为 [1..10000] 全量预处理 popcount。
   - 第三步：调用排序，比较器按“bitCount -> 数值”顺序比较。
   - 第四步：返回排序后的原数组引用（`sort` 原地排序）。

5. 示例分析
   - 示例 arr = [0,1,2,3,4,5,6,7,8]
     popcount 分别为 [0,1,1,2,1,2,2,3,1]
     先按 popcount 分组：0组[0]，1组[1,2,4,8]，2组[3,5,6]，3组[7]
     组内按数值升序，得到结果 [0,1,2,4,8,3,5,6,7]。
   - 示例 arr = [1024,512,256,128,64,32,16,8,4,2,1]
     每个数都只有 1 个 bit 为 1，因此按数值升序即可。

6. 常见错误
   - 错误一：比较器只比较 popcount，
     忘记处理“相同 popcount 时按数值排序”。
   - 错误二：把 `i >> 1` 写成 `i << 1`，导致递推错误。
   - 错误三：误以为 `sort` 返回新数组，忽略它是原地排序的副作用。

7. 优化要点
   - 利用题目上界（10^4）预处理 popcount，避免排序过程中重复计算。
   - 比较器里只做 O(1) 数组查询，让 `n log n` 排序阶段尽可能轻量。
*/
