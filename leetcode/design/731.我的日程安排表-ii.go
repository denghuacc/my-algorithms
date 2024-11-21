/*
 * @lc app=leetcode.cn id=731 lang=golang
 *
 * [731] 我的日程安排表 II
 *
 * https://leetcode.cn/problems/my-calendar-ii/description/
 *
 * algorithms
 * Medium (54.67%)
 * Likes:    141
 * Dislikes: 0
 * Total Accepted:    11.5K
 * Total Submissions: 19.5K
 * Testcase Example:  '["MyCalendarTwo","book","book","book","book","book","book"]\n' +
  '[[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]'
 *
 * 实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内不会导致三重预订时，则可以存储这个新的日程安排。
 *
 * MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end
 * 时间内增加一个日程安排，注意，这里的时间是半开区间，即 [start, end), 实数 x 的范围为，  start <= x < end。
 *
 * 当三个日程安排有一些时间上的交叉时（例如三个日程安排都在同一时间内），就会产生三重预订。
 *
 * 每次调用 MyCalendar.book方法时，如果可以将日程安排成功添加到日历中而不会导致三重预订，返回 true。否则，返回 false
 * 并且不要将该日程安排添加到日历中。
 *
 * 请按照以下步骤调用MyCalendar 类: MyCalendar cal = new MyCalendar();
 * MyCalendar.book(start, end)
 *
 *
 *
 * 示例：
 *
 * MyCalendar();
 * MyCalendar.book(10, 20); // returns true
 * MyCalendar.book(50, 60); // returns true
 * MyCalendar.book(10, 40); // returns true
 * MyCalendar.book(5, 15); // returns false
 * MyCalendar.book(5, 10); // returns true
 * MyCalendar.book(25, 55); // returns true
 * 解释：
 * 前两个日程安排可以添加至日历中。 第三个日程安排会导致双重预订，但可以添加至日历中。
 * 第四个日程安排活动（5,15）不能添加至日历中，因为它会导致三重预订。
 * 第五个日程安排（5,10）可以添加至日历中，因为它未使用已经双重预订的时间10。
 * 第六个日程安排（25,55）可以添加至日历中，因为时间 [25,40] 将和第三个日程安排双重预订；
 * 时间 [40,50] 将单独预订，时间 [50,55）将和第二个日程安排双重预订。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 每个测试用例，调用 MyCalendar.book 函数最多不超过 1000次。
 * 调用函数 MyCalendar.book(start, end)时， start 和 end 的取值范围为 [0, 10^9]。
 *
 *
*/

package leetcode

// @lc code=start
type MyCalendarTwo struct {
	booked   [][]int
	overlaps [][]int
}

func Constructor() MyCalendarTwo {
	return MyCalendarTwo{
		booked:   [][]int{},
		overlaps: [][]int{},
	}

}

func (mc *MyCalendarTwo) Book(start int, end int) bool {
	for _, r := range mc.overlaps {
		s, e := r[0], r[1]
		if s < end && start < e {
			return false
		}
	}
	for _, r := range mc.booked {
		s, e := r[0], r[1]
		if s < end && start < e {
			mc.overlaps = append(mc.overlaps, []int{
				max(s, start),
				min(e, end),
			})
		}
	}
	mc.booked = append(mc.booked, []int{
		start, end,
	})
	return true
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

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Book(start,end);
 */
// @lc code=end
