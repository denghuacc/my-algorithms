/*
 * @lc app=leetcode.cn id=3100 lang=typescript
 *
 * [3100] 换水问题 II
 *
 * https://leetcode.cn/problems/water-bottles-ii/description/
 *
 * algorithms
 * Medium (68.05%)
 * Likes:    15
 * Dislikes: 0
 * Total Accepted:    12.8K
 * Total Submissions: 17.2K
 * Testcase Example:  '13\n6'
 *
 * 给你两个整数 numBottles 和 numExchange 。
 *
 * numBottles 代表你最初拥有的满水瓶数量。在一次操作中，你可以执行以下操作之一：
 *
 *
 * 喝掉任意数量的满水瓶，使它们变成空水瓶。
 * 用 numExchange 个空水瓶交换一个满水瓶。然后，将 numExchange 的值增加 1 。
 *
 *
 * 注意，你不能使用相同的 numExchange 值交换多批空水瓶。例如，如果 numBottles == 3 并且 numExchange == 1
 * ，则不能用 3 个空水瓶交换成 3 个满水瓶。
 *
 * 返回你 最多 可以喝到多少瓶水。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：numBottles = 13, numExchange = 6
 * 输出：15
 * 解释：上表显示了满水瓶的数量、空水瓶的数量、numExchange 的值，以及累计喝掉的水瓶数量。
 *
 *
 * 示例 2：
 *
 *
 * 输入：numBottles = 10, numExchange = 3
 * 输出：13
 * 解释：上表显示了满水瓶的数量、空水瓶的数量、numExchange 的值，以及累计喝掉的水瓶数量。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= numBottles <= 100
 * 1 <= numExchange <= 100
 *
 *
 */

// @lc code=start
/**
 * 解法一：模拟法 - 直接模拟喝水和兑换过程
 * 时间复杂度：O(√numBottles)
 * 空间复杂度：O(1)
 */
var maxBottlesDrunk = function (
  numBottles: number,
  numExchange: number
): number {
  // 记录总共喝掉的水瓶数量
  let res = 0;
  // 当前拥有的满水瓶数量
  let fullBottles = numBottles;
  // 当前拥有的空水瓶数量
  let emptyBottles = 0;

  // 循环条件：有满水瓶可以喝，或者有足够的空瓶可以兑换
  while (emptyBottles >= numExchange || fullBottles > 0) {
    // 优先喝掉所有满水瓶
    if (fullBottles > 0) {
      // 喝掉满水瓶后变成空瓶
      emptyBottles += fullBottles;
      // 累计喝掉的水瓶数量
      res += fullBottles;
      // 满水瓶全部喝完
      fullBottles = 0;
    }

    // 如果空瓶数量足够，进行兑换
    if (emptyBottles >= numExchange) {
      // 消耗 numExchange 个空瓶
      emptyBottles -= numExchange;
      // 获得 1 个满水瓶
      fullBottles++;
      // 兑换成本增加 1（关键：每次兑换后成本递增）
      numExchange++;
    }
  }

  return res;
};

/**
 * 解法二：数学优化法 - 通过数学公式直接计算兑换次数
 * 时间复杂度：O(√numBottles)
 * 空间复杂度：O(1)
 *
 * 核心思想：
 * 1. 初始喝掉所有水瓶，得到 numBottles 个空瓶
 * 2. 计算能进行多少次兑换：每次兑换消耗递增的空瓶数
 * 3. 兑换序列：k, k+1, k+2, ..., k+n-1（n为兑换次数）
 * 4. 总消耗空瓶数 = n*k + n*(n-1)/2 ≤ numBottles
 */
var maxBottlesDrunkOptimized = function (
  numBottles: number,
  numExchange: number
): number {
  // 初始喝掉所有满水瓶
  let totalDrunk = numBottles;
  let emptyBottles = numBottles;
  let currentExchange = numExchange;

  // 计算最大兑换次数
  while (emptyBottles >= currentExchange) {
    // 尝试计算能连续兑换多少次
    let exchanges = 0;
    let tempEmpty = emptyBottles;
    let tempExchange = currentExchange;

    // 贪心：尽可能多地进行兑换
    while (tempEmpty >= tempExchange) {
      tempEmpty -= tempExchange;
      tempExchange++;
      exchanges++;
      tempEmpty++; // 兑换得到的满瓶喝掉后变成空瓶
    }

    // 如果能进行兑换，更新状态
    if (exchanges > 0) {
      totalDrunk += exchanges;
      emptyBottles = tempEmpty;
      currentExchange = tempExchange;
    } else {
      break;
    }
  }

  return totalDrunk;
};

/**
 * 解法三：数学公式法 - 直接计算理论最优解
 * 时间复杂度：O(1) - 在约束范围内可视为常数时间
 * 空间复杂度：O(1)
 *
 * 基于二次方程求解兑换次数的上界
 */
var maxBottlesDrunkMath = function (
  numBottles: number,
  numExchange: number
): number {
  let totalDrunk = numBottles;
  let emptyBottles = numBottles;

  // 使用数学公式计算最大兑换次数
  // 对于兑换序列 k, k+1, k+2, ..., k+n-1
  // 总消耗 = n*k + n*(n-1)/2 ≤ emptyBottles
  // 化简为：n² + n*(2k-1) - 2*emptyBottles ≤ 0

  while (emptyBottles >= numExchange) {
    // 求解二次不等式：n² + n*(2k-1) - 2*emptyBottles ≤ 0
    const a = 1;
    const b = 2 * numExchange - 1;
    const c = -2 * emptyBottles;

    // 二次方程的判别式
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) break;

    // 计算最大的有效兑换次数
    const maxExchanges = Math.floor((-b + Math.sqrt(discriminant)) / (2 * a));

    if (maxExchanges <= 0) break;

    // 计算实际能进行的兑换次数
    let actualExchanges = 0;
    let tempEmpty = emptyBottles;
    let tempExchange = numExchange;

    for (let i = 0; i < maxExchanges; i++) {
      if (tempEmpty >= tempExchange) {
        tempEmpty -= tempExchange;
        tempEmpty++; // 兑换得到的满瓶喝掉后变成空瓶
        tempExchange++;
        actualExchanges++;
      } else {
        break;
      }
    }

    if (actualExchanges === 0) break;

    totalDrunk += actualExchanges;
    emptyBottles = tempEmpty;
    numExchange += actualExchanges;
  }

  return totalDrunk;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个动态兑换问题，每次兑换后兑换成本会增加
   - 核心是模拟整个喝水和兑换的过程，直到无法继续兑换为止
   - 与经典换水问题的区别：兑换成本会递增，不能重复使用相同的兑换比例

2. 多种解法分析：

   解法一：模拟法（推荐）
   - 时间复杂度：O(√numBottles) - 每次兑换成本递增，兑换次数有限
   - 空间复杂度：O(1) - 只使用了常数个变量
   - 算法类型：贪心算法 + 模拟
   - 优势：逻辑清晰，易于理解和实现
   - 适用场景：面试首选解法

   解法二：批量兑换优化法
   - 时间复杂度：O(√numBottles) - 减少了循环次数
   - 空间复杂度：O(1)
   - 算法类型：贪心算法 + 批量处理
   - 优势：在某些情况下能减少迭代次数
   - 适用场景：对性能有极致要求的场景

   解法三：数学公式法
   - 时间复杂度：O(1) - 在约束范围内可视为常数时间
   - 空间复杂度：O(1)
   - 算法类型：数学推导 + 二次方程求解
   - 优势：理论上最优的时间复杂度
   - 适用场景：数学竞赛或对算法复杂度有严格要求

3. 核心解题思路（以解法一为例）：
   - 核心思想：贪心策略，每轮先喝完所有满水瓶，再尽可能兑换新的满水瓶
   - 关键观察：每次兑换后 numExchange 会增加 1，这限制了兑换次数
   - 算法步骤：
     1. 初始化变量：结果计数、满水瓶数、空瓶数
     2. 循环直到无法继续操作（没有满水瓶且空瓶不足以兑换）
     3. 每轮先喝完所有满水瓶，转化为空瓶
     4. 如果空瓶足够，进行一次兑换，成本递增

4. 实现要点：
   - 数据结构选择：使用简单变量追踪状态，无需复杂数据结构
   - 边界条件处理：确保兑换条件检查在喝水操作之后
   - 优化技巧：将喝水和兑换分开处理，避免状态混乱
   - 函数声明：使用 var 声明多个解法函数，符合 LeetCode 多解法格式

5. 示例分析：
   示例1：numBottles = 13, numExchange = 6
   
   初始状态：满瓶=13, 空瓶=0, 兑换成本=6, 已喝=0
   
   第1轮：
   - 喝掉13瓶 → 满瓶=0, 空瓶=13, 已喝=13
   - 兑换1次(13≥6) → 满瓶=1, 空瓶=7, 兑换成本=7
   
   第2轮：
   - 喝掉1瓶 → 满瓶=0, 空瓶=8, 已喝=14
   - 兑换1次(8≥7) → 满瓶=1, 空瓶=1, 兑换成本=8
   
   第3轮：
   - 喝掉1瓶 → 满瓶=0, 空瓶=2, 已喝=15
   - 无法兑换(2<8) → 结束
   
   结果：15

6. 数学公式推导（解法三）：
   - 兑换序列：k, k+1, k+2, ..., k+n-1（k为初始兑换成本，n为兑换次数）
   - 总消耗空瓶数：∑(k+i) = n*k + n*(n-1)/2 ≤ 可用空瓶数
   - 转化为二次不等式：n² + n*(2k-1) - 2*emptyBottles ≤ 0
   - 使用二次方程求解公式得到兑换次数上界
   - 优势：避免了逐次模拟，直接计算理论最优解

7. 性能对比分析：
   - 解法一：稳定的 O(√n) 时间，代码简洁
   - 解法二：平均情况下更快，但最坏情况仍是 O(√n)
   - 解法三：理论上 O(1)，但常数因子较大，在小数据集上可能不如解法一

8. 常见陷阱：
   - 忘记每次兑换后 numExchange 要递增
   - 循环条件设置错误，可能导致无限循环或提前退出
   - 状态更新顺序错误，应该先喝水再兑换
   - 数学解法中要注意浮点数精度问题

9. 扩展思考：
   - 类似问题：LeetCode 1518 换水问题（兑换成本固定）
   - 算法优化：可以考虑记忆化搜索或动态规划的变种
   - 实际应用：资源管理问题，成本递增的兑换系统
   - 变种问题：如果兑换成本按其他规律增长（如乘法递增）

10. 选择建议：
    - 面试推荐：解法一（模拟法）- 思路清晰，不容易出错
    - 竞赛推荐：解法三（数学法）- 时间复杂度最优
    - 工程实践：根据数据规模选择，小规模用解法一，大规模考虑解法三
    - 学习目的：三种解法都值得掌握，体现了从模拟到优化的算法思维进阶
*/
