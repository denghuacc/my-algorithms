/*
 * @lc app=leetcode.cn id=2438 lang=typescript
 *
 * [2438] 二的幂数组中查询范围内的乘积
 *
 * https://leetcode.cn/problems/range-product-queries-of-powers/description/
 *
 * algorithms
 * Medium (44.82%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    17.2K
 * Total Submissions: 33.4K
 * Testcase Example:  '15\n[[0,1],[2,2],[0,3]]'
 *
 * 给你一个正整数 n ，你需要找到一个下标从 0 开始的数组 powers ，它包含 最少 数目的 2 的幂，且它们的和为 n 。powers 数组是
 * 非递减 顺序的。根据前面描述，构造 powers 数组的方法是唯一的。
 *
 * 同时给你一个下标从 0 开始的二维整数数组 queries ，其中 queries[i] = [lefti, righti] ，其中
 * queries[i] 表示请你求出满足 lefti <= j <= righti 的所有 powers[j] 的乘积。
 *
 * 请你返回一个数组 answers ，长度与 queries 的长度相同，其中 answers[i]是第 i
 * 个查询的答案。由于查询的结果可能非常大，请你将每个 answers[i] 都对 10^9 + 7 取余 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 15, queries = [[0,1],[2,2],[0,3]]
 * 输出：[2,4,64]
 * 解释：
 * 对于 n = 15 ，得到 powers = [1,2,4,8] 。没法得到元素数目更少的数组。
 * 第 1 个查询的答案：powers[0] * powers[1] = 1 * 2 = 2 。
 * 第 2 个查询的答案：powers[2] = 4 。
 * 第 3 个查询的答案：powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 =
 * 64 。
 * 每个答案对 10^9 + 7 取余得到的结果都相同，所以返回 [2,4,64] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 2, queries = [[0,0]]
 * 输出：[2]
 * 解释：
 * 对于 n = 2, powers = [2] 。
 * 唯一一个查询的答案是 powers[0] = 2 。答案对 10^9 + 7 取余后结果相同，所以返回 [2] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 * 1 <= queries.length <= 10^5
 * 0 <= starti <= endi < powers.length
 *
 *
 */

export {};

// @lc code=start
function productQueries(n: number, queries: number[][]): number[] {
  const MOD = 1e9 + 7;

  // 步骤1: 将n转换为二进制表示，构建powers数组
  // 通过不断除以2，检查余数来确定哪些2的幂次需要包含
  const bins: number[] = [];
  let rep = 1; // 当前2的幂次值

  while (n > 0) {
    if (n % 2 === 1) {
      // 如果当前位为1，说明需要包含这个2的幂次
      bins.push(rep);
    }
    n = n >> 1; // 右移一位
    rep *= 2; // 下一个2的幂次
  }

  // 步骤2: 处理每个查询，计算指定范围内的乘积
  const res: number[] = [];
  for (const [start, end] of queries) {
    let cur = 1; // 当前查询的乘积结果

    // 遍历指定范围内的所有元素
    for (let i = start; i <= end; i++) {
      cur = (cur * bins[i]) % MOD; // 累乘并取模，防止溢出
    }
    res.push(cur);
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：将正整数n表示为最少数量的2的幂次之和，然后计算指定范围内幂次的乘积
   - 关键特点：n的二进制表示中1的个数就是所需2的幂次的数量
   - 目标：高效处理大量查询，每个查询计算指定范围内的乘积

2. 算法分析：
   - 时间复杂度：O(log n + q * L)，其中q是查询数量，L是平均查询长度
   - 空间复杂度：O(log n)，用于存储powers数组
   - 算法类型：位运算 + 前缀积优化

3. 实现要点：
   - 关键数据结构：使用数组存储2的幂次值
   - 核心算法步骤：
     a) 将n转换为二进制，提取所有为1的位对应的2的幂次
     b) 对每个查询，计算指定范围内的乘积
   - 边界情况处理：使用模运算防止整数溢出

4. 优化思路：
   - 性能优化点：可以预处理前缀积，将查询复杂度从O(L)优化到O(1)
   - 代码简化技巧：直接使用位运算和模运算
   - 内存优化策略：powers数组大小最多为log2(n)，空间效率很高

5. 算法要点总结：
   - 核心技巧：利用二进制表示的唯一性，每个正整数都有唯一的2的幂次表示
   - 优化要点：模运算防止溢出，位运算提高效率
   - 类似问题：二进制表示、位运算、范围查询问题

6. 常见错误：
   - 忘记处理模运算导致整数溢出
   - 对二进制转换的理解错误
   - 查询范围边界处理不当
*/
