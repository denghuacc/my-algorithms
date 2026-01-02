/*
 * @lc app=leetcode.cn id=2483 lang=typescript
 *
 * [2483] 商店的最少代价
 *
 * https://leetcode.cn/problems/minimum-penalty-for-a-shop/description/
 *
 * algorithms
 * Medium (67.79%)
 * Likes:    2132
 * Dislikes: 112
 * Total Accepted:    141K
 * Total Submissions: 206.5K
 * Testcase Example:  '"YYNY"'
 *
 * 给你一个 0 下标字符串 customers，仅包含 'N' 和 'Y'：
 *
 *
 * customers[i] = 'Y' 表示第 i 小时有顾客到访；
 * customers[i] = 'N' 表示第 i 小时没有顾客。
 *
 *
 * 如果商店在第 j 小时关门（0 <= j <= n），代价计算如下：
 *
 *
 * 对于开门且无顾客的每个小时，代价 +1；
 * 对于关门且有顾客到访的每个小时，代价 +1。
 *
 *
 * 返回使总代价最小的最早关门时间 j。
 *
 * 说明：在第 j 小时关门，表示第 j 小时起商店关闭。
 *
 *
 * 示例 1：
 *
 *
 * 输入：customers = "YYNY"
 * 输出：2
 * 解释：
 * - j = 0，代价 1+1+0+1 = 3
 * - j = 1，代价 0+1+0+1 = 2
 * - j = 2，代价 0+0+0+1 = 1
 * - j = 3，代价 0+0+1+1 = 2
 * - j = 4，代价 0+0+1+0 = 1
 * 最小代价为 1，最早的关门时间是 2。
 *
 *
 * 示例 2：
 *
 *
 * 输入：customers = "NNNNN"
 * 输出：0
 * 解释：第 0 小时关门最佳。
 *
 *
 * 示例 3：
 *
 *
 * 输入：customers = "YYYY"
 * 输出：4
 * 解释：第 4 小时关门最佳。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= customers.length <= 10^5
 * customers 仅包含 'Y' 和 'N'
 *
 *
 */

// @lc code=start
/**
 * 计算最早的关门时间，使代价最小。
 *
 * @param customers - 顾客到访日志，由 'Y' 和 'N' 构成
 * @returns 代价最小的最早关门时间
 */
function bestClosingTime(customers: string): number {
  // yRemain：当前关门时间之后仍会到访的顾客数量
  // nPassed：当前关门时间之前已开门且无顾客的小时数
  let yRemain = 0;
  for (const ch of customers) {
    if (ch === "Y") {
      yRemain++;
    }
  }

  let nPassed = 0;
  // 初始关门时间 j=0：代价为所有 'Y'（都被拒之门外）
  let minCost = yRemain;
  let bestTime = 0;

  for (let i = 0; i < customers.length; i++) {
    if (customers[i] === "Y") {
      // 当前小时有顾客，若继续营业则不会产生关闭代价，未来剩余 Y 减一
      yRemain--;
    } else {
      // 当前小时无顾客，但仍在营业，会产生开门无客的代价
      nPassed++;
    }

    // 关门于 i+1 时刻的代价：之前无客开门代价 + 之后有客关门代价
    const cost = nPassed + yRemain;
    if (cost < minCost) {
      minCost = cost;
      bestTime = i + 1;
    }
  }

  return bestTime;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：选择一个关门时间 j，使“开门无客”与“关门有客”的次数之和最小。
   - 关键特点：代价可分为“左侧 N 的个数”和“右侧 Y 的个数”之和。
   - 目标：找到总代价最小的最早 j。

2. 解题思路
   核心思想
   - 关门于 j 时的代价 = 0..j-1 区间的 'N' 数量 + j..n-1 区间的 'Y' 数量。
   - 左右前缀可随时间线一次扫描更新：向右移动一位，只会把一个字符从右区间移到左区间。

   算法步骤
   1) 预处理 yRemain：字符串中 'Y' 的总数，表示初始时右侧 Y 数量。
   2) 扫描字符串：
      - 遇到 'Y'，右侧 Y 数量减一（因为该小时改为左侧）。
      - 遇到 'N'，左侧 N 数量加一（因为该小时变为开门且无客）。
      - 计算当前关门时间（i+1）的代价 = leftN + rightY。
      - 若代价更小，则记录最优时间。若相等，保持较早时间不变。
   3) 关门时间 j=0 的代价是全体 Y 数量，作为初始值。

3. 代码实现
   实现步骤
   - 初始化 yRemain 为总 Y 数；nPassed 为 0；minCost = yRemain；bestTime = 0。
   - 从左到右遍历 customers：
     - 根据当前字符更新 yRemain 或 nPassed。
     - 计算 cost = nPassed + yRemain，对比并更新最优解。
   - 返回 bestTime。

   关键函数说明
   - bestClosingTime：主函数，前缀/后缀计数滚动更新，O(n) 求最优关门时间。

4. 复杂度分析
   - 时间复杂度：O(n)，单次线性扫描。
   - 空间复杂度：O(1)，仅用常数计数器。
   - 关键观察：代价可分解为“前缀 N + 后缀 Y”，可在扫描中动态维护。

5. 示例分析
   示例一：customers = "YYNY"
   - 初始 yRemain=3，nPassed=0，cost=3（j=0）。
   - i=0:'Y' -> yRemain=2，cost=2（j=1），更新。
   - i=1:'Y' -> yRemain=1，cost=1（j=2），更新。
   - i=2:'N' -> nPassed=1，cost=2（j=3），不更优。
   - i=3:'Y' -> yRemain=0，cost=1（j=4），与最优持平，但保留最早 j=2。

   示例二：customers = "NNNNN"
   - 初始 yRemain=0，minCost=0（j=0 即最优）。
   - 之后 cost 只增不减，答案 0。

   示例三：customers = "YYYY"
   - 初始 cost=4（j=0）。
   - 每移动一位 cost 依次 3、2、1、0，最优在 j=4。

   边界情况
   - 全是 'N'：关门于 0 最优。
   - 全是 'Y'：关门于 n 最优。
   - 长度 1：直接比较 j=0 与 j=1。

6. 算法要点总结
   核心技巧
   - 将代价拆成“左 N + 右 Y”，用前缀/后缀计数滚动更新。
   - 单次扫描即可找到最早最优解。

   优化要点
   - 先统计总 Y，避免重复计数。
   - 相等时不更新，自动保证最早时间。

   类似问题
   - 需要最小化“前缀某属性 + 后缀某属性”的分割点选择问题。
   - 使用前缀/后缀计数滚动更新的一次扫描最优化问题。

7. 常见错误
   - 未先统计总 Y，导致初始代价错误。
   - 将相等代价也更新，丢失“最早”要求。 
   - 误把关门时间理解为包含当前小时，导致区间划分偏移。
*/
