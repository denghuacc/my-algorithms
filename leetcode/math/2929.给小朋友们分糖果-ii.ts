/*
 * @lc app=leetcode.cn id=2929 lang=typescript
 *
 * [2929] 给小朋友们分糖果 II
 *
 * https://leetcode.cn/problems/distribute-candies-among-children-ii/description/
 *
 * algorithms
 * Medium (42.17%)
 * Likes:    26
 * Dislikes: 0
 * Total Accepted:    7.4K
 * Total Submissions: 15.6K
 * Testcase Example:  '5\n2'
 *
 * 给你两个正整数 n 和 limit 。
 *
 * 请你将 n 颗糖果分给 3 位小朋友，确保没有任何小朋友得到超过 limit 颗糖果，请你返回满足此条件下的 总方案数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, limit = 2
 * 输出：3
 * 解释：总共有 3 种方法分配 5 颗糖果，且每位小朋友的糖果数不超过 2 ：(1, 2, 2) ，(2, 1, 2) 和 (2, 2, 1) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3, limit = 3
 * 输出：10
 * 解释：总共有 10 种方法分配 3 颗糖果，且每位小朋友的糖果数不超过 3 ：(0, 0, 3) ，(0, 1, 2) ，(0, 2, 1) ，(0,
 * 3, 0) ，(1, 0, 2) ，(1, 1, 1) ，(1, 2, 0) ，(2, 0, 1) ，(2, 1, 0) 和 (3, 0, 0)
 * 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^6
 * 1 <= limit <= 10^6
 *
 *
 */

export {};

// @lc code=start
/**
 * 枚举法求解糖果分配方案数
 * 时间复杂度：O(min(n, limit)^2)
 * 空间复杂度：O(1)
 */
var distributeCandies = function (n: number, limit: number): number {
  let count = 0;

  // 枚举第一个小朋友得到的糖果数 x
  for (let x = 0; x <= Math.min(n, limit); x++) {
    // 枚举第二个小朋友得到的糖果数 y
    for (let y = 0; y <= Math.min(n - x, limit); y++) {
      // 第三个小朋友得到的糖果数 z 被前两个确定
      const z = n - x - y;

      // 检查第三个小朋友的糖果数是否合法
      if (z >= 0 && z <= limit) {
        count++;
      }
    }
  }

  return count;
};

// simple loop
var distributeCandies = function (n: number, limit: number): number {
  let count = 0;

  // 单循环优化：只枚举第一个小朋友的糖果数 x
  for (let x = 0; x <= Math.min(n, limit); x++) {
    // 对于固定的x，计算第二个小朋友y的合法取值范围
    // 约束条件：
    // 1. 0 ≤ y ≤ limit
    // 2. 0 ≤ z = n - x - y ≤ limit
    //    即：n - x - limit ≤ y ≤ n - x

    // y的下界：max(0, n - x - limit)
    const minY = Math.max(0, n - x - limit);
    // y的上界：min(limit, n - x)
    const maxY = Math.min(limit, n - x);

    // 如果存在合法的y值范围
    if (minY <= maxY) {
      // 合法的y值个数 = maxY - minY + 1
      count += maxY - minY + 1;
    }
  }

  return count;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将n颗糖果分配给3个小朋友，每人最多得到limit颗
   - 求满足条件的分配方案总数
   - 本质是带约束的整数分割问题

2. 算法分析：
   - 时间复杂度：O(min(n, limit)^2) - 双重循环枚举前两个变量
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：枚举法 + 数学约束检查

3. 实现要点：
   
   a) 约束条件分析：
      - x + y + z = n (糖果总数固定)
      - 0 ≤ x, y, z ≤ limit (每人糖果数限制)
      - 其中x, y, z为非负整数
   
   b) 枚举策略：
      - 枚举前两个变量x和y的所有可能取值
      - 第三个变量z = n - x - y被确定
      - 只需检查z是否满足约束条件
   
   c) 边界优化：
      - x的范围：[0, min(n, limit)]
      - y的范围：[0, min(n-x, limit)]
      - 避免无效枚举，提高效率

4. 优化思路：
   
   a) 枚举边界优化：
      - 第一个小朋友最多得到min(n, limit)颗糖果
      - 第二个小朋友最多得到min(n-x, limit)颗糖果
      - 减少不必要的循环次数
   
   b) 数学公式优化（容斥原理）：
      - 不考虑limit时：C(n+2, 2)种方案
      - 用容斥原理减去违反约束的方案
      - 时间复杂度可优化到O(1)
   
   c) 对称性优化：
      - 三个小朋友地位相等，可能存在对称性
      - 但直接枚举更直观易懂

算法正确性证明：
1. 完备性：枚举了所有可能的(x,y)组合
2. 无重复：每个(x,y,z)三元组只被计算一次
3. 约束满足：显式检查了所有约束条件

复杂度分析：
- 最坏情况：limit很大时，需要枚举O(n^2)种组合
- 一般情况：limit较小时，复杂度为O(limit^2)
- 对于本题数据范围(n,limit ≤ 10^6)，该方法可以通过

扩展思考：
1. 如果小朋友数量不是3而是k，可以用递归或动态规划
2. 如果有其他约束条件，可以在检查阶段添加
3. 容斥原理方法可以处理更大的数据规模
*/
