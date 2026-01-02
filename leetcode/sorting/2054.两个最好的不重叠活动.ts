/*
 * @lc app=leetcode.cn id=2054 lang=typescript
 *
 * [2054] 两个最好的不重叠活动
 *
 * https://leetcode.cn/problems/two-best-non-overlapping-events/description/
 *
 * algorithms
 * Medium (60.81%)
 * Likes:    1586
 * Dislikes: 62
 * Total Accepted:    115.8K
 * Total Submissions: 188.5K
 * Testcase Example:  '[[1,3,2],[4,5,2],[2,4,3]]'
 *
 * 给你一个下标从 0 开始的二维整数数组 events，其中 events[i] =
 * [startTimei, endTimei, valuei]。第 i 个活动从 startTimei 开始，到
 * endTimei 结束，参加该活动可获得价值 valuei。
 *
 * 你最多可以参加两个互不重叠的活动，使得价值和最大。返回这个最大和。
 *
 * 注意时间区间是闭区间：如果一个活动在时间 t 结束，下一个活动必须在
 * t + 1 或之后开始，才能视为不重叠。
 *
 *
 * 示例 1：
 *
 *
 * 输入：events = [[1,3,2],[4,5,2],[2,4,3]]
 * 输出：4
 * 解释：选择活动 0 和 1，总价值为 2 + 2 = 4。
 *
 *
 * 示例 2：
 *
 *
 * 输入：events = [[1,3,2],[4,5,2],[1,5,5]]
 * 输出：5
 * 解释：只选活动 2，总价值为 5。
 *
 *
 * 示例 3：
 *
 *
 * 输入：events = [[1,5,3],[1,5,1],[6,6,5]]
 * 输出：8
 * 解释：选择活动 0 和 2，总价值为 3 + 5 = 8。
 *
 *
 * 提示：
 *
 *
 * 2 <= events.length <= 10^5
 * events[i].length == 3
 * 1 <= startTimei <= endTimei <= 10^9
 * 1 <= valuei <= 10^6
 *
 *
 */

// @lc code=start
/**
 * 选择最多两个不重叠活动的最大价值。
 *
 * @param events - 活动数组，元素为 [startTime, endTime, value]
 * @returns 最大价值和
 */
function maxTwoEvents(events: number[][]): number {
  // 将每个活动拆为“开始点”和“结束点”，用于时间线扫描
  const timeline: number[][] = [];
  for (const [s, e, v] of events) {
    // type = 0 表示开始点，type = 1 表示结束点
    timeline.push([s, v, 0]);
    timeline.push([e, v, 1]);
  }
  // 按时间升序排序，同一时刻优先处理开始点
  // 这样结束于 t 的活动不会与开始于 t 的活动配对，符合闭区间要求
  timeline.sort((a, b) => a[0] - b[0] || a[2] - b[2]);
  let bestSum = 0;
  // bestFirst 记录在当前时间点之前已结束活动中的最大价值
  let bestFirst = 0;
  for (const [, value, type] of timeline) {
    if (type === 0) {
      // 以当前活动作为第二个活动，尝试与历史最优结束活动配对
      bestSum = Math.max(bestSum, bestFirst + value);
    } else {
      // 活动结束后，才可以作为后续活动的前置选择
      bestFirst = Math.max(bestFirst, value);
    }
  }
  return bestSum;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在时间轴上选择最多两个互不重叠的活动，使价值和最大。
   - 关键特点：时间区间为闭区间，结束时间与开始时间相同视为重叠。
   - 目标：最大化两场活动的价值和，允许只选一场。

2. 解题思路
   核心思想
   - 将每个活动拆成“开始点”和“结束点”，按时间顺序扫描。
   - 维护“已结束活动的最大价值”，作为第二场活动的最优搭配。
   - 同一时刻先处理开始点，避免与同刻结束的活动配对。

   算法步骤
   1) 生成时间线数组：每个活动贡献一个开始点和一个结束点。
   2) 按时间升序排序，若时间相同先处理开始点。
   3) 扫描时间线：
      - 碰到开始点，用当前活动价值与 bestFirst 组合更新答案。
      - 碰到结束点，更新 bestFirst 为已结束活动价值的最大值。
   4) 返回记录到的最大价值和。

3. 代码实现
   实现步骤
   1) 用 timeline 存储 [time, value, type]，type=0 表示开始，type=1 表示结束。
   2) 排序时确保同一时刻开始点在前，保证闭区间不重叠要求。
   3) 扫描时用 bestFirst 表示当前时间点之前的最优已结束活动价值。
   4) 用 bestSum 维护全局最大价值和。

   关键函数说明
   - maxTwoEvents：主函数，完成时间线构建、排序与扫描更新。
   - bestFirst：历史最优已结束活动价值，用于配对第二个活动。

4. 复杂度分析
   - 时间复杂度：O(n log n)，排序占主导，扫描为 O(n)。
   - 空间复杂度：O(n)，存储 2n 个时间点。
   - 关键观察：单次扫描即可完成最优配对，无需双重枚举。

5. 示例分析
   示例一：events = [[1,3,2],[4,5,2],[2,4,3]]
   - 时间线中先遇到活动 0 开始，可与 bestFirst=0 配对，bestSum=2。
   - 活动 0 结束后 bestFirst=2。
   - 活动 1 开始，bestSum 更新为 2 + 2 = 4，最终答案 4。

   示例二：events = [[1,3,2],[4,5,2],[1,5,5]]
   - 活动 2 跨越时间长，单场价值 5 已是最优。
   - 扫描过程中 bestSum 保持 5。

   示例三：events = [[1,5,3],[1,5,1],[6,6,5]]
   - 活动 0 结束后 bestFirst=3。
   - 活动 2 开始时 bestSum=3 + 5 = 8。

   边界情况
   - 只有一个活动能参加时，答案等于该活动价值最大值。
   - 大量活动同一时刻结束与开始，需确保开始点先处理。
   - 活动时间跨度极大，仍可通过排序一次完成。

6. 算法要点总结
   核心技巧
   - 以时间线扫描替代双重枚举。
   - 维护“已结束活动最大值”，实现 O(1) 配对。

   优化要点
   - 同刻开始点优先处理，精确匹配闭区间不重叠约束。
   - 只记录最大值，不保留所有历史活动，节省空间。

   类似问题
   - 选择 k 个不重叠区间的最大价值（需 DP）。
   - 会议室安排与区间调度类贪心问题。

7. 常见错误
   - 将结束点与开始点同刻视为可配对，导致答案偏大。
   - 没有正确维护 bestFirst，误用当前活动参与更新。
   - 排序时未处理同刻顺序，破坏闭区间约束。
*/
