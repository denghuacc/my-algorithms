/*
 * @lc app=leetcode.cn id=56 lang=typescript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (34.27%)
 * Likes:    469
 * Dislikes: 0
 * Total Accepted:    108.5K
 * Total Submissions: 254.4K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 给出一个区间的集合，请合并所有重叠的区间。
 *
 * 示例 1:
 *
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 *
 * 示例 2:
 *
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 */

// @lc code=start
/**
 * 合并重叠区间的第一种实现方法
 * 核心思想：先排序，然后遍历合并重叠区间
 */
var merge = function (intervals: number[][]): number[][] {
  const n = intervals.length;

  // 按区间起始位置排序，确保处理顺序
  intervals.sort((a, b) => a[0] - b[0]);

  const res: number[][] = [];
  res.push(intervals[0]); // 将第一个区间加入结果集

  // 遍历剩余区间，检查是否需要合并
  for (let i = 1; i < n; i++) {
    const current = intervals[i];
    const last = res[res.length - 1];

    // 如果当前区间与最后一个区间不重叠，直接添加
    if (current[0] > last[1]) {
      res.push(current);
    } else {
      // 如果重叠，更新最后一个区间的结束位置
      if (current[1] > last[1]) {
        last[1] = current[1];
      }
    }
  }
  return res;
};

/**
 * 合并重叠区间的第二种实现方法（优化版本）
 * 核心思想：使用索引变量跟踪结果集，避免频繁的数组访问
 */
var merge = function (intervals: number[][]): number[][] {
  // 按区间起始位置排序
  intervals.sort((a, b) => a[0] - b[0]);

  const res: number[][] = [];
  let idx = -1; // 跟踪结果集中最后一个区间的索引

  for (const interval of intervals) {
    // 如果是第一个区间，或者当前区间与最后一个区间不重叠
    if (idx === -1 || interval[0] > res[idx][1]) {
      res.push(interval);
      idx++;
    } else {
      // 如果重叠，更新最后一个区间的结束位置（取最大值）
      res[idx][1] = Math.max(res[idx][1], interval[1]);
    }
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：将重叠的区间合并成不重叠的区间集合
   - 关键特点：区间可能部分重叠或完全重叠，需要按起始位置排序后处理
   - 目标：返回合并后的不重叠区间列表

2. 算法分析：
   - 时间复杂度：O(n log n) - 主要来自排序操作
   - 空间复杂度：O(1) - 原地修改，不考虑排序的额外空间
   - 算法类型：排序 + 贪心算法

3. 实现要点：
   - 关键数据结构：按区间起始位置排序的数组
   - 核心算法步骤：
     1. 按区间起始位置排序，确保处理顺序
     2. 遍历排序后的区间，检查与结果集中最后一个区间的关系
     3. 如果当前区间与最后一个区间重叠，则合并；否则添加新区间
   - 边界情况处理：空数组、单个区间、完全重叠的区间

4. 优化思路：
   - 使用原地排序减少空间复杂度
   - 通过比较区间起始位置和结束位置来判断重叠关系
   - 合并时取两个区间结束位置的最大值作为新区间的结束位置
   - 使用索引变量跟踪结果集，避免频繁的数组操作

5. 核心技巧：
   - 排序是解决区间合并问题的关键预处理步骤
   - 贪心策略：每次处理当前区间时，尽可能与前面的区间合并
   - 重叠判断：当前区间起始位置 <= 前一个区间结束位置时发生重叠

6. 类似问题：
   - 插入区间：在已排序的区间列表中插入新区间
   - 会议室安排：判断是否能安排所有会议
   - 无重叠区间：找到最多的不重叠区间数量
*/
