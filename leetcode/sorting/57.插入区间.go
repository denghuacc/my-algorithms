/*
 * @lc app=leetcode.cn id=57 lang=golang
 *
 * [57] 插入区间
 *
 * https://leetcode.cn/problems/insert-interval/description/
 *
 * algorithms
 * Medium (41.79%)
 * Likes:    634
 * Dislikes: 0
 * Total Accepted:    124.2K
 * Total Submissions: 297.2K
 * Testcase Example:  '[[1,3],[6,9]]\n[2,5]'
 *
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表。
 *
 * 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出：[[1,2],[3,10],[12,16]]
 * 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 *
 * 示例 3：
 *
 *
 * 输入：intervals = [], newInterval = [5,7]
 * 输出：[[5,7]]
 *
 *
 * 示例 4：
 *
 *
 * 输入：intervals = [[1,5]], newInterval = [2,3]
 * 输出：[[1,5]]
 *
 *
 * 示例 5：
 *
 *
 * 输入：intervals = [[1,5]], newInterval = [2,7]
 * 输出：[[1,7]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * intervals[i].length == 2
 * 0
 * intervals 根据 intervals[i][0] 按 升序 排列
 * newInterval.length == 2
 * 0
 *
 *
 */

package leetcode

// @lc code=start
// the same as leetcode 56
// func insert(intervals [][]int, newInterval []int) (res [][]int) {
// 	intervals = append(intervals, newInterval)
// 	sort.Slice(intervals, func(i, j int) bool { return intervals[i][0] < intervals[j][0] })
// 	idx := -1
// 	for _, interval := range intervals {
// 		if idx == -1 || interval[0] > res[idx][1] {
// 			res = append(res, interval)
// 			idx++
// 		} else {
// 			res[idx][1] = max(res[idx][1], interval[1])
// 		}
// 	}
// 	return
// }

func insert(intervals [][]int, newInterval []int) (res [][]int) {
	if len(intervals) == 0 {
		return [][]int{newInterval}
	}
	placed := false
	for _, interval := range intervals {
		if interval[1] < newInterval[0] {
			res = append(res, interval)
		} else if interval[0] > newInterval[1] {
			if !placed {
				res = append(res, newInterval)
				placed = true
			}
			res = append(res, interval)
		} else {
			newInterval[0] = min(newInterval[0], interval[0])
			newInterval[1] = max(newInterval[1], interval[1])
		}
	}
	if !placed {
		res = append(res, newInterval)
	}
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// @lc code=end
