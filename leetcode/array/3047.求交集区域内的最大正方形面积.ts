/*
 * @lc app=leetcode.cn id=3047 lang=typescript
 *
 * [3047] 求交集区域内的最大正方形面积
 *
 * https://leetcode.cn/problems/find-the-largest-area-of-square-inside-two-rectangles/description/
 *
 * algorithms
 * Medium (45.72%)
 * Likes:    287
 * Dislikes: 65
 * Total Accepted:    52K
 * Total Submissions: 87.6K
 * Testcase Example:  '[[1,1],[2,2],[3,1]]\n[[3,3],[4,4],[6,6]]'
 *
 * 平面上有 n 个与坐标轴平行的矩形。给你两个二维整数数组 bottomLeft 和
 * topRight，其中 bottomLeft[i] = [a_i, b_i]，topRight[i] = [c_i, d_i]
 * 分别表示第 i 个矩形的左下角与右上角坐标。
 *
 * 你需要找到可以放入至少两个矩形交集区域内的最大正方形面积。如果不存在，
 * 返回 0。
 *
 *
 * 示例 1：
 *
 * 输入：bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]
 * 输出：1
 * 解释：
 * 边长为 1 的正方形可以放入矩形 0 和 1 的交集，或矩形 1 和 2 的交集。
 *
 * 示例 2：
 *
 * 输入：bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]
 * 输出：4
 * 解释：
 * 边长为 2 的正方形可以放入矩形 0 和 1 的交集，或矩形 1 和 2 的交集。
 *
 * 示例 3：
 *
 * 输入：bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]
 * 输出：1
 * 解释：
 * 任意两个矩形的交集中都能放入边长为 1 的正方形。
 *
 * 示例 4：
 *
 * 输入：bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]
 * 输出：0
 * 解释：没有任何两矩形相交。
 *
 *
 * 提示：
 *
 *
 * n == bottomLeft.length == topRight.length
 * 2 <= n <= 10^3
 * bottomLeft[i].length == topRight[i].length == 2
 * 1 <= bottomLeft[i][0], bottomLeft[i][1] <= 10^7
 * 1 <= topRight[i][0], topRight[i][1] <= 10^7
 * bottomLeft[i][0] < topRight[i][0]
 * bottomLeft[i][1] < topRight[i][1]
 *
 *
 */

// @lc code=start
function largestSquareArea(
  bottomLeft: number[][],
  topRight: number[][]
): number {
  const n = bottomLeft.length;
  let maxSide = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 计算第 i 和 j 个矩形的重叠区域
      const x1 = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
      const y1 = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
      const x2 = Math.min(topRight[i][0], topRight[j][0]);
      const y2 = Math.min(topRight[i][1], topRight[j][1]);

      // 计算重叠区域的宽度和高度
      const width = x2 - x1;
      const height = y2 - y1;

      // 如果有重叠区域，计算可放入的最大正方形边长
      if (width > 0 && height > 0) {
        const side = Math.min(width, height);
        maxSide = Math.max(maxSide, side);
      }
    }
  }

  return maxSide * maxSide;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：求任意两矩形交集区域内可放入的最大正方形面积。
   - 关键特点：矩形与坐标轴平行，交集仍为矩形或为空。
   - 目标：最大化正方形边长的平方，无法形成则返回 0。

2. 解题思路
   核心思想
   - 两矩形交集的宽高为
     width = min(x2) - max(x1)，height = min(y2) - max(y1)。
   - 若 width 与 height 均为正，则交集为矩形，可放入边长为 min(width, height)
     的正方形。
   - 枚举所有矩形对，更新最大边长。

   算法步骤
   1) 遍历所有矩形对 (i, j)。
   2) 计算交集矩形的宽度与高度。
   3) 若交集非空，更新最大边长为 min(width, height)。
   4) 返回最大边长的平方。

3. 代码实现
   实现步骤
   - 双重循环枚举所有矩形对。
   - 用 max/min 计算交集的四条边界。
   - 对合法交集更新 maxSide。

   关键函数说明
   - largestSquareArea：主函数，计算最大可放入正方形面积。

4. 复杂度分析
   - 时间复杂度：O(n^2)，枚举矩形对。
   - 空间复杂度：O(1)，仅使用常数额外变量。
   - 关键观察：交集计算为 O(1)。

5. 示例分析
   示例一：
   - 交集矩形边长最小值为 1，面积为 1。

   示例二：
   - 交集矩形最小边为 2，面积为 4。

   示例三：
   - 多个矩形对均能放入边长 1 的正方形，最大面积为 1。

   边界情况
   - 任意两矩形都不相交：返回 0。
   - 交集宽度或高度为 0：无法形成正方形。

6. 算法要点总结
   核心技巧
   - 交集矩形边长的最小值即最大正方形边长。
   - 枚举所有矩形对即可覆盖至少两个矩形交集的情况。

   优化要点
   - 提前比较宽高是否为正，过滤无效交集。
   - 只维护最大边长，避免保存所有结果。

   类似问题
   - 两矩形交集面积计算问题。
   - 交集区域内最大内接正方形问题。

7. 常见错误
   - 把交集边界写反，导致宽高为负。
   - 忽略“至少两个矩形”的条件，误用单矩形尺寸。
   - 将面积计算为 width * height，而不是正方形边长的平方。
*/
