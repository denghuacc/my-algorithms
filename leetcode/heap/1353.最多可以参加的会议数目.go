/*
 * @lc app=leetcode.cn id=1353 lang=golang
 *
 * [1353] 最多可以参加的会议数目
 *
 * https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/description/
 *
 * algorithms
 * Medium (30.95%)
 * Likes:    310
 * Dislikes: 0
 * Total Accepted:    25.8K
 * Total Submissions: 80.7K
 * Testcase Example:  '[[1,2],[2,3],[3,4]]'
 *
 * 给你一个数组 events，其中 events[i] = [startDayi, endDayi] ，表示会议 i 开始于 startDayi ，结束于
 * endDayi 。
 *
 * 你可以在满足 startDayi <= d <= endDayi 中的任意一天 d 参加会议 i 。在任意一天 d 中只能参加一场会议。
 *
 * 请你返回你可以参加的 最大 会议数目。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：events = [[1,2],[2,3],[3,4]]
 * 输出：3
 * 解释：你可以参加所有的三个会议。
 * 安排会议的一种方案如上图。
 * 第 1 天参加第一个会议。
 * 第 2 天参加第二个会议。
 * 第 3 天参加第三个会议。
 *
 *
 * 示例 2：
 *
 *
 * 输入：events= [[1,2],[2,3],[3,4],[1,2]]
 * 输出：4
 *
 *
 *
 *
 * 提示：​​​​​​
 *
 *
 * 1 <= events.length <= 10^5
 * events[i].length == 2
 * 1 <= startDayi <= endDayi <= 10^5
 *
 *
 */

package leetcode

import (
	"container/heap"
	"sort"
)

// @lc code=start
func maxEvents(events [][]int) int {
	maxDay := 0
	for _, event := range events {
		if event[1] > maxDay {
			maxDay = event[1]
		}
	}
	sort.Slice(events, func(i, j int) bool {
		return events[i][0] < events[j][0]
	})
	pq := &intHeap{}
	heap.Init(pq)
	res := 0
	for i, j := 1, 0; i <= maxDay; i++ {
		for j < len(events) && events[j][0] <= i {
			heap.Push(pq, events[j][1])
			j++
		}
		for pq.Len() > 0 && (*pq)[0] < i {
			heap.Pop(pq)
		}
		if pq.Len() > 0 {
			heap.Pop(pq)
			res++
		}
	}
	return res
}

type intHeap []int

func (h intHeap) Len() int            { return len(h) }
func (h intHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h intHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *intHeap) Push(v interface{}) { *h = append(*h, v.(int)) }
func (h *intHeap) Pop() interface{}   { a := *h; v := a[len(a)-1]; *h = a[:len(a)-1]; return v }

// @lc code=end
