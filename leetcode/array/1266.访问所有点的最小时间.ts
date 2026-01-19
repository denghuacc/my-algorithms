/*
 * @lc app=leetcode.cn id=1266 lang=typescript
 *
 * [1266] 访问所有点的最小时间
 *
 * https://leetcode.cn/problems/minimum-time-visiting-all-points/description/
 *
 * algorithms
 * Easy (82.63%)
 * Likes:    2570
 * Dislikes: 259
 * Total Accepted:    344.7K
 * Total Submissions: 410.3K
 * Testcase Example:  '[[1,1],[3,4],[-1,0]]'
 *
 * 在二维平面上有 n 个点，points[i] = [xi, yi]。按给定顺序访问所有点，
 * 返回所需的最小时间（秒）。
 *
 * 每秒你可以选择：
 *
 *
 * 垂直移动 1 个单位；
 * 水平移动 1 个单位；
 * 对角移动 sqrt(2) 个单位（相当于 1 秒内同时移动 1 个单位的水平和垂直）。
 *
 *
 * 必须按 points 中的顺序依次访问点。
 * 允许经过后面的点，但经过不计作访问。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[3,4],[-1,0]]
 * 输出：7
 * 解释：一种最优路径为
 * [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]
 * [1,1] 到 [3,4] 用时 3 秒，[3,4] 到 [-1,0] 用时 4 秒，总计 7 秒。
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[3,2],[-2,2]]
 * 输出：5
 *
 *
 *
 * 提示：
 *
 *
 * points.length == n
 * 1 <= n <= 100
 * points[i].length == 2
 * -1000 <= points[i][0], points[i][1] <= 1000
 *
 *
 */

// @lc code=start
/**
 * 计算按顺序访问所有点的最小时间。
 *
 * @param points - 按顺序排列的点坐标
 * @returns 最小访问时间
 */
function minTimeToVisitAllPoints(points: number[][]): number {
  // 从第一个点出发，逐段累加最短时间
  let x0 = points[0][0];
  let y0 = points[0][1];
  let totalTime = 0;
  for (let i = 1; i < points.length; ++i) {
    const x1 = points[i][0];
    const y1 = points[i][1];
    const dx = Math.abs(x0 - x1);
    const dy = Math.abs(y0 - y1);
    // 对角移动可同时减少 dx 和 dy，最短时间为 max(dx, dy)
    totalTime += Math.max(dx, dy);
    x0 = x1;
    y0 = y1;
  }
  return totalTime;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：按顺序从点到点移动，计算总最短时间。
   - 关键特点：每秒可水平、垂直或对角移动一步。
   - 目标：累计每一段最短时间，得到总时间。

2. 解题思路
   核心思想
   - 从点 A 到点 B，若水平差为 dx，垂直差为 dy：
     - 对角移动可同时缩小 dx 与 dy。
     - 最短时间等于 max(dx, dy)。
   - 总时间是所有相邻点之间最短时间之和。

   算法步骤
   1) 从第一个点开始，依次遍历后续点。
   2) 计算相邻两点的 dx、dy。
   3) 累加 max(dx, dy) 作为该段最短时间。
   4) 返回累计总和。

3. 代码实现
   实现步骤
   - 保存当前点坐标 (x0, y0)。
   - 对每个下一个点计算 dx、dy。
   - 用 Math.max(dx, dy) 更新总时间。

   关键函数说明
   - minTimeToVisitAllPoints：主函数，线性累加每段最短时间。

4. 复杂度分析
   - 时间复杂度：O(n)，每个点访问一次。
   - 空间复杂度：O(1)，只使用常数变量。
   - 关键观察：两点间最短时间由 Chebyshev 距离决定。

5. 示例分析
   示例一：points = [[1,1],[3,4],[-1,0]]
   - 段 1：dx=2, dy=3，时间 3。
   - 段 2：dx=4, dy=4，时间 4。
   - 总时间 7。

   示例二：points = [[3,2],[-2,2]]
   - dx=5, dy=0，时间 5。

   边界情况
   - 只有一个点：无需移动，时间为 0。
   - 所有点共线：时间等于每段绝对差。

6. 算法要点总结
   核心技巧
   - 允许对角移动等价于使用 Chebyshev 距离。
   - 逐段累加即可，不需全局优化。

   优化要点
   - 直接计算 dx、dy，避免模拟路径。
   - 使用常数空间，线性复杂度。

   类似问题
   - 网格中允许对角移动的最短步数问题。
   - 按序访问点的距离累加问题。

7. 常见错误
   - 使用曼哈顿距离 dx + dy，导致时间偏大。
   - 忽略可以对角移动，误以为必须分开走。
   - 漏掉按顺序访问的约束条件。
*/
