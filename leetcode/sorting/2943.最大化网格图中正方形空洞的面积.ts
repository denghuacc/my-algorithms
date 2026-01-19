/*
 * @lc app=leetcode.cn id=2943 lang=typescript
 *
 * [2943] 最大化网格图中正方形空洞的面积
 *
 * https://leetcode.cn/problems/maximize-area-of-square-hole-in-grid/description/
 *
 * algorithms
 * Medium (37.62%)
 * Likes:    266
 * Dislikes: 162
 * Total Accepted:    18.2K
 * Total Submissions: 43.6K
 * Testcase Example:  '2\n1\n[2,3]\n[2]'
 *
 * 给你两个整数 n 和 m，以及两个整数数组 hBars 和 vBars。
 * 网格有 n + 2 条水平栏和 m + 2 条垂直栏，形成 1 x 1 的单元格，
 * 栏从 1 开始编号。
 *
 * 你可以移除 hBars 中的一些水平栏，以及 vBars 中的一些垂直栏，
 * 其余栏是固定的，不能移除。
 *
 * 返回移除后网格中可形成的最大正方形孔的面积。
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2, m = 1, hBars = [2,3], vBars = [2]
 * 输出：4
 * 解释：移除水平栏 2 和垂直栏 2，可得到最大正方形孔。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1, m = 1, hBars = [2], vBars = [2]
 * 输出：4
 * 解释：移除水平栏 2 和垂直栏 2，可得到最大正方形孔。
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 2, m = 3, hBars = [2,3], vBars = [2,4]
 * 输出：4
 * 解释：移除水平栏 3 和垂直栏 4，可得到最大正方形孔。
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 * 1 <= m <= 10^9
 * 1 <= hBars.length <= 100
 * 2 <= hBars[i] <= n + 1
 * 1 <= vBars.length <= 100
 * 2 <= vBars[i] <= m + 1
 * hBars 和 vBars 中的值互不相同
 *
 *
 */

// @lc code=start
function maximizeSquareHoleArea(
  n: number,
  m: number,
  hBars: number[],
  vBars: number[]
): number {
  // 水平和垂直方向的最大连续可移除栏数
  const maxHorizontal = maxConsecutiveLength(hBars);
  const maxVertical = maxConsecutiveLength(vBars);
  // 正方形边长由较短方向决定，实际边长 = 连续栏数 + 1
  const side = Math.min(maxHorizontal, maxVertical) + 1;
  return side * side;

  /**
   * 求可连续移除的最长栏段长度。
   *
   * 连续移除 k 条相邻栏，会把相邻的 k + 1 个 1x1 单元合并成长度 k + 1 的孔。
   */
  function maxConsecutiveLength(bars: number[]): number {
    bars.sort((a, b) => a - b);
    let longest = 1;
    let current = 1;
    for (let i = 1; i < bars.length; i++) {
      if (bars[i] === bars[i - 1] + 1) {
        current++;
      } else {
        current = 1;
      }
      longest = Math.max(longest, current);
    }
    return longest;
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：移除部分水平/垂直栏，使形成的最大正方形孔面积最大化。
   - 关键特点：移除相邻栏会把相邻的 1x1 单元合并成更大的孔。
   - 目标：最大化正方形孔的边长，再返回其面积。

2. 解题思路
   核心思想
   - 连续移除 k 条相邻水平栏，可得到垂直方向长度为 k+1 的孔。
   - 连续移除 k 条相邻垂直栏，可得到水平方向长度为 k+1 的孔。
   - 最大正方形边长由两个方向的最小可扩展长度决定。

   算法步骤
   1) 对 hBars 排序，统计最长连续段长度 maxHorizontal。
   2) 对 vBars 排序，统计最长连续段长度 maxVertical。
   3) 正方形边长为 min(maxHorizontal, maxVertical) + 1。
   4) 返回边长平方作为面积。

3. 代码实现
   实现步骤
   - 用 maxConsecutiveLength 计算有序数组的最长连续段。
   - 分别计算水平与垂直方向的最大连续可移除栏数。
   - 由较短方向决定边长并返回面积。

   关键函数说明
   - maximizeSquareHoleArea：主函数，组织计算与结果返回。
   - maxConsecutiveLength：计算最长连续栏段长度。

4. 复杂度分析
   - 时间复杂度：O(h log h + v log v)，排序为主。
   - 空间复杂度：O(1) 额外空间（排序为就地）。
   - 关键观察：最大孔边长只取决于最长连续可移除栏段。

5. 示例分析
   示例一：n=2,m=1,hBars=[2,3],vBars=[2]
   - 水平最长连续段为 2，垂直为 1。
   - 边长 min(2,1)+1=2，面积 4。

   示例二：n=1,m=1,hBars=[2],vBars=[2]
   - 水平最长连续段为 1，垂直为 1。
   - 边长 2，面积 4。

   示例三：n=2,m=3,hBars=[2,3],vBars=[2,4]
   - 水平最长连续段为 2，垂直最长连续段为 1。
   - 边长 2，面积 4。

   边界情况
   - 只有 1 条可移除栏：最长连续段为 1，边长至少为 2。
   - 只有一个方向可连续移除多条，正方形仍受另一方向限制。

6. 算法要点总结
   核心技巧
   - 连续可移除栏数 + 1 即合并后的孔长度。
   - 正方形边长由两方向的最短长度决定。

   优化要点
   - 排序后一次遍历即可统计最长连续段。
   - 不需要构造网格，直接在索引层面计算。

   类似问题
   - 连续区间合并求最大长度问题。
   - 通过单调段统计最大可扩展长度的问题。

7. 常见错误
   - 忘记边长是连续栏数 + 1，导致面积偏小。
   - 未排序直接统计连续段，结果不正确。
   - 只取最大连续段而忽略另一方向限制。
*/
