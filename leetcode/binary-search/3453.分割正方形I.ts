/*
 * @lc app=leetcode.cn id=3453 lang=typescript
 *
 * [3453] 分割正方形 I
 *
 * https://leetcode.cn/problems/separate-squares-i/description/
 *
 * algorithms
 * Medium (39.38%)
 * Likes:    406
 * Dislikes: 82
 * Total Accepted:    65.1K
 * Total Submissions: 126K
 * Testcase Example:  '[[0,0,1],[2,2,1]]'
 *
 * 给你一个二维整数数组 squares，每个 squares[i] = [xi, yi, li] 表示
 * 一个与 x 轴平行的正方形，其左下角坐标为 (xi, yi)，边长为 li。
 *
 * 找到一个水平直线 y = k，使得直线上方的正方形总面积与直线下方的正方形
 * 总面积相等，并返回最小的 k。
 *
 * 允许误差在 10^-5 以内。
 *
 * 注意：正方形可能重叠，重叠部分要重复计入面积。
 *
 *
 * 示例 1：
 *
 *
 * 输入：squares = [[0,0,1],[2,2,1]]
 * 输出：1.00000
 * 解释：在 y = 1 到 y = 2 之间任意水平线都能平分面积，最小值为 1。
 *
 *
 * 示例 2：
 *
 *
 * 输入：squares = [[0,0,2],[1,1,1]]
 * 输出：1.16667
 * 解释：
 * 直线下方面积为 15/6，上方面积也为 15/6，因此答案为 7/6。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= squares.length <= 5 * 10^4
 * squares[i] = [xi, yi, li]
 * squares[i].length == 3
 * 0 <= xi, yi <= 10^9
 * 1 <= li <= 10^9
 * 所有正方形面积总和不超过 10^12
 *
 *
 */

// @lc code=start
/**
 * 求最小的水平直线 y，使上下方面积相等。
 *
 * @param squares - 每个正方形的 [x, y, 边长]
 * @returns 满足条件的最小 y
 */
function separateSquares(squares: number[][]): number {
  let maxY = 0;
  let totalArea = 0;
  for (const [, y, l] of squares) {
    // 最高点用于确定二分上界
    maxY = Math.max(maxY, y + l);
    // 总面积用于判断是否平分
    totalArea += l * l;
  }

  let lo = 0;
  let hi = maxY;
  // 二分查找最小 y，使得下方面积 >= 总面积的一半
  while (Math.abs(hi - lo) > 1e-5) {
    const mid = (lo + hi) / 2;
    if (check(mid)) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return hi;

  function check(limitY: number): boolean {
    let area = 0;
    for (const [, y, l] of squares) {
      if (y < limitY) {
        // 正方形落在直线下方的高度为 min(l, limitY - y)
        area += l * Math.min(l, limitY - y);
      }
    }
    // 下方面积至少一半，说明还可以向下收缩
    return area * 2 >= totalArea;
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：找到最小的水平线 y，使得上下方面积相等。
   - 关键特点：面积随 y 单调不减，可用二分。
   - 目标：求满足条件的最小 y，允许 1e-5 精度误差。

2. 解题思路
   核心思想
   - 对任意 y，计算所有正方形在 y 以下的面积。
   - 随着 y 增大，下方面积单调增加，因此可二分搜索。

   算法步骤
   1) 计算总面积 totalArea 和所有正方形的最高点 maxY。
   2) 在区间 [0, maxY] 上二分 y。
   3) 对每个 mid 计算下方面积：
      - 若下方面积 >= 总面积一半，说明 y 可以更小，收缩右边界。
      - 否则增大 y。
   4) 收敛到精度阈值后返回 hi。

3. 代码实现
   实现步骤
   - 用 check(mid) 判断下方面积是否达到一半。
   - 计算正方形贡献时，高度为 min(l, mid - y)。
   - 重叠面积按题意重复计数。

   关键函数说明
   - separateSquares：主函数，执行二分搜索。
   - check：计算给定 y 下方面积是否达到一半。

4. 复杂度分析
   - 时间复杂度：O(n log R)，R 为 y 范围精度。
   - 空间复杂度：O(1) 额外空间。
   - 关键观察：下方面积关于 y 单调，适合二分查找。

5. 示例分析
   示例一：squares = [[0,0,1],[2,2,1]]
   - y=1 时，下方面积为 1，上方面积为 1，满足条件。
   - y=1 为最小值。

   示例二：squares = [[0,0,2],[1,1,1]]
   - 二分得到 y=7/6，正好平分面积。

   边界情况
   - 正方形全部在同一高度范围内，y 可能落在某个边界处。
   - 只有一个正方形时，y 为其中心高度。

6. 算法要点总结
   核心技巧
   - 利用面积随 y 单调性，二分定位最小平分线。
   - 下方面积计算使用 min(l, y - yi)。

   优化要点
   - 仅需 O(1) 额外空间。
   - 精度要求用 1e-5 控制二分终止。

   类似问题
   - 平分面积的二分搜索类题目。
   - 单调函数求根问题。

7. 常见错误
   - 忽略重叠区域需重复计入。
   - 误用严格相等判断，导致无法收敛。
   - 二分边界设置不正确，遗漏可行区间。
*/
