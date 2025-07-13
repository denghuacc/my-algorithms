/*
 * @lc app=leetcode.cn id=3169 lang=typescript
 *
 * [3169] 无需开会的工作日
 *
 * https://leetcode.cn/problems/count-days-without-meetings/description/
 *
 * algorithms
 * Medium (39.86%)
 * Likes:    24
 * Dislikes: 0
 * Total Accepted:    13.5K
 * Total Submissions: 29.6K
 * Testcase Example:  '10\n[[5,7],[1,3],[9,10]]'
 *
 * 给你一个正整数 days，表示员工可工作的总天数（从第 1 天开始）。另给你一个二维数组 meetings，长度为 n，其中 meetings[i] =
 * [start_i, end_i] 表示第 i 次会议的开始和结束天数（包含首尾）。
 *
 * 返回员工可工作且没有安排会议的天数。
 *
 * 注意：会议时间可能会有重叠。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：days = 10, meetings = [[5,7],[1,3],[9,10]]
 *
 * 输出：2
 *
 * 解释：
 *
 * 第 4 天和第 8 天没有安排会议。
 *
 *
 * 示例 2：
 *
 *
 * 输入：days = 5, meetings = [[2,4],[1,3]]
 *
 * 输出：1
 *
 * 解释：
 *
 * 第 5 天没有安排会议。
 *
 *
 * 示例 3：
 *
 *
 * 输入：days = 6, meetings = [[1,6]]
 *
 * 输出：0
 *
 * 解释：
 *
 * 所有工作日都安排了会议。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= days <= 10^9
 * 1 <= meetings.length <= 10^5
 * meetings[i].length == 2
 * 1 <= meetings[i][0] <= meetings[i][1] <= days
 *
 *
 */

export {};

// @lc code=start
/**
 * 方法一：区间合并法
 * 先将所有会议时间段合并成不重叠的区间，然后计算剩余天数
 */
var countDays = function (days: number, meetings: number[][]): number {
  // 按会议开始时间排序，便于后续合并重叠区间
  meetings.sort((a, b) => a[0] - b[0]);

  // 用数组存储合并后的不重叠会议区间
  const mergedMeetings = [meetings[0]];

  // 遍历所有会议，合并重叠的时间段
  for (let i = 1; i < meetings.length; i++) {
    const lastMeeting = mergedMeetings[mergedMeetings.length - 1];
    const currentMeeting = meetings[i];

    // 如果当前会议与上一个会议重叠或相邻（end >= start），则合并
    if (lastMeeting[1] >= currentMeeting[0]) {
      // 更新合并区间的结束时间为两个区间结束时间的最大值
      lastMeeting[1] = Math.max(lastMeeting[1], currentMeeting[1]);
    } else {
      // 不重叠，直接添加新的会议区间
      mergedMeetings.push(currentMeeting);
    }
  }

  // 计算所有会议占用的总天数
  let meetingDays = 0;
  for (const [start, end] of mergedMeetings) {
    meetingDays += end - start + 1; // +1 因为包含首尾
  }

  // 返回无会议的工作日数量
  return days - meetingDays;
};

/**
 * 方法二：双指针优化法
 * 在遍历过程中直接计算，无需额外存储合并后的区间
 */
var countDays = function (days: number, meetings: number[][]): number {
  // 按会议开始时间排序
  meetings.sort((a, b) => a[0] - b[0]);

  // left: 当前合并区间的开始位置，right: 当前合并区间的结束位置
  let left = 1;
  let right = 0;

  // 遍历所有会议时间段
  for (const [start, end] of meetings) {
    // 如果当前会议开始时间大于已合并区间的结束时间
    if (start > right) {
      // 先减去之前合并区间占用的天数（如果right >= left）
      if (right >= left) {
        days -= right - left + 1;
      }
      // 开始新的合并区间
      left = start;
    }
    // 更新合并区间的结束时间
    right = Math.max(right, end);
  }

  // 处理最后一个合并区间
  if (right >= left) {
    days -= right - left + 1;
  }

  return days;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定总工作天数和多个会议时间段，计算没有安排会议的天数
   - 关键难点是处理会议时间段的重叠问题
   - 需要将重叠的会议时间段合并，避免重复计算

2. 算法分析：
   - 时间复杂度：O(n log n) - 主要消耗在排序上
   - 空间复杂度：O(1) 到 O(n) - 取决于采用的方法
   - 算法类型：区间处理、贪心算法

3. 实现要点：

   **方法一：区间合并法**
   - 先对会议按开始时间排序
   - 遍历会议，将重叠或相邻的区间合并
   - 合并条件：当前会议开始时间 <= 上一个合并区间的结束时间
   - 最后统计所有合并区间占用的天数

   **方法二：双指针优化法**
   - 同样先排序，但在遍历过程中直接计算
   - 使用left和right维护当前合并区间的边界
   - 当遇到不连续的会议时，立即减去当前合并区间的天数
   - 空间复杂度更优，为O(1)

4. 关键观察：
   - 排序是必需的，确保我们能按时间顺序处理会议
   - 区间合并的判断条件：end1 >= start2（包含相邻情况）
   - 计算天数时要注意包含首尾：end - start + 1

5. 边界情况：
   - 所有天都有会议：返回0
   - 没有会议：返回总天数
   - 只有一个会议：直接计算
   - 会议完全重叠：正确合并区间

6. 优化要点：
   - 方法二避免了额外的存储空间
   - 排序后的贪心策略确保了最优解
   - 及时计算避免了二次遍历

7. 算法应用：
   - 类似问题：合并区间、插入区间
   - 适用场景：任何涉及时间段重叠处理的问题
   - 扩展思路：可用于资源调度、时间管理等场景
*/
