/*
 * @lc app=leetcode.cn id=539 lang=typescript
 *
 * [539] 最小时间差
 *
 * https://leetcode-cn.com/problems/minimum-time-difference/description/
 *
 * algorithms
 * Medium (64.01%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    23K
 * Total Submissions: 36K
 * Testcase Example:  '["23:59","00:00"]'
 *
 * 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：timePoints = ["23:59","00:00"]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：timePoints = ["00:00","23:59","00:00"]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * timePoints[i] 格式为 "HH:MM"
 *
 *
 */

// @lc code=start
/**
 * 最小时间差
 * 核心思路：将时间转换为分钟数，排序后计算相邻时间差，考虑跨天的情况
 *
 * 算法步骤：
 * 1. 鸽笼原理优化：如果时间点超过1440个（24*60），必然有重复，最小差为0
 * 2. 将时间字符串排序，确保按时间顺序处理
 * 3. 计算相邻时间点的差值，找出最小值
 * 4. 特别处理：计算最后一个时间点到第一个时间点的跨天差值
 * 5. 返回所有差值中的最小值
 *
 * 时间复杂度：O(n log n)，主要是排序的时间复杂度
 * 空间复杂度：O(1)，只使用常数额外空间
 */
function findMinDifference(timePoints: string[]): number {
  const n = timePoints.length;
  const MINUTES_PER_DAY = 24 * 60; // 一天总共1440分钟

  // 鸽笼原理：如果时间点数量超过一天的分钟数，必然有重复时间
  if (n > MINUTES_PER_DAY) {
    return 0;
  }

  // 将时间字符串排序，确保按时间顺序计算差值
  timePoints.sort();

  let minDifference = Infinity;

  // 计算相邻时间点之间的差值
  for (let i = 0; i < n - 1; i++) {
    const diff = getTimeDifference(timePoints[i], timePoints[i + 1]);
    minDifference = Math.min(minDifference, diff);
  }

  // 计算最后一个时间点到第一个时间点的跨天差值
  // 例如：23:59 到 00:01 的差值是 2 分钟，而不是 23小时58分钟
  const crossDayDiff =
    MINUTES_PER_DAY - getTimeDifference(timePoints[0], timePoints[n - 1]);

  return Math.min(minDifference, crossDayDiff);

  /**
   * 计算两个时间点之间的分钟差
   * @param time1 第一个时间点 (HH:MM格式)
   * @param time2 第二个时间点 (HH:MM格式)
   * @returns 两个时间点的分钟差（绝对值）
   */
  function getTimeDifference(time1: string, time2: string): number {
    // 解析第一个时间点
    const [hour1, minute1] = time1.split(":").map((s) => parseInt(s, 10));
    // 解析第二个时间点
    const [hour2, minute2] = time2.split(":").map((s) => parseInt(s, 10));

    // 计算分钟差
    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;

    return Math.abs(totalMinutes2 - totalMinutes1);
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在24小时制的时间列表中找出任意两个时间的最小差值
   - 关键是理解时间的环形特性：23:59和00:00只差1分钟

2. 算法分析：
   - 时间复杂度：O(n log n)，主要来自字符串排序
   - 空间复杂度：O(1)，只使用常数额外空间
   - 算法类型：排序 + 贪心算法

3. 实现要点：
   - 鸽笼原理优化：一天只有1440分钟，如果时间点超过1440个必有重复
   - 时间排序：确保按时间顺序比较相邻时间点
   - 跨天处理：最后一个时间到第一个时间的跨天距离
   - 时间转换：将HH:MM格式转换为总分钟数便于计算

4. 核心洞察：
   - 最小时间差一定出现在排序后的相邻时间点之间
   - 或者是最后一个时间点到第一个时间点的跨天距离
   - 时间具有环形特性，需要考虑24小时的循环

5. 边界情况：
   - 重复时间：返回0
   - 只有两个时间点：比较直接差和跨天差
   - 极端情况：00:00和23:59的差值是1分钟

6. 优化思路：
   - 可以用桶排序代替字符串排序，时间复杂度降到O(n)
   - 如果允许修改输入，可以原地转换时间为分钟数
   - 提前终止：如果找到差值为1的情况可以直接返回
*/
