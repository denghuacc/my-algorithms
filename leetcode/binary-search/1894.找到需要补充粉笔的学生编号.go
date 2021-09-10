/*
 * @lc app=leetcode.cn id=1894 lang=golang
 *
 * [1894] 找到需要补充粉笔的学生编号
 *
 * https://leetcode-cn.com/problems/find-the-student-that-will-replace-the-chalk/description/
 *
 * algorithms
 * Medium (43.25%)
 * Likes:    28
 * Dislikes: 0
 * Total Accepted:    12.6K
 * Total Submissions: 27.4K
 * Testcase Example:  '[5,1,5]\n22'
 *
 * 一个班级里有 n 个学生，编号为 0 到 n - 1 。每个学生会依次回答问题，编号为 0 的学生先回答，然后是编号为 1 的学生，以此类推，直到编号为
 * n - 1 的学生，然后老师会重复这个过程，重新从编号为 0 的学生开始回答问题。
 *
 * 给你一个长度为 n 且下标从 0 开始的整数数组 chalk 和一个整数 k 。一开始粉笔盒里总共有 k 支粉笔。当编号为 i
 * 的学生回答问题时，他会消耗 chalk[i] 支粉笔。如果剩余粉笔数量 严格小于 chalk[i] ，那么学生 i 需要 补充 粉笔。
 *
 * 请你返回需要 补充 粉笔的学生 编号 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：chalk = [5,1,5], k = 22
 * 输出：0
 * 解释：学生消耗粉笔情况如下：
 * - 编号为 0 的学生使用 5 支粉笔，然后 k = 17 。
 * - 编号为 1 的学生使用 1 支粉笔，然后 k = 16 。
 * - 编号为 2 的学生使用 5 支粉笔，然后 k = 11 。
 * - 编号为 0 的学生使用 5 支粉笔，然后 k = 6 。
 * - 编号为 1 的学生使用 1 支粉笔，然后 k = 5 。
 * - 编号为 2 的学生使用 5 支粉笔，然后 k = 0 。
 * 编号为 0 的学生没有足够的粉笔，所以他需要补充粉笔。
 *
 * 示例 2：
 *
 * 输入：chalk = [3,4,1,2], k = 25
 * 输出：1
 * 解释：学生消耗粉笔情况如下：
 * - 编号为 0 的学生使用 3 支粉笔，然后 k = 22 。
 * - 编号为 1 的学生使用 4 支粉笔，然后 k = 18 。
 * - 编号为 2 的学生使用 1 支粉笔，然后 k = 17 。
 * - 编号为 3 的学生使用 2 支粉笔，然后 k = 15 。
 * - 编号为 0 的学生使用 3 支粉笔，然后 k = 12 。
 * - 编号为 1 的学生使用 4 支粉笔，然后 k = 8 。
 * - 编号为 2 的学生使用 1 支粉笔，然后 k = 7 。
 * - 编号为 3 的学生使用 2 支粉笔，然后 k = 5 。
 * - 编号为 0 的学生使用 3 支粉笔，然后 k = 2 。
 * 编号为 1 的学生没有足够的粉笔，所以他需要补充粉笔。
 *
 *
 *
 *
 * 提示：
 *
 *
 * chalk.length == n
 * 1 <= n <= 10^5
 * 1 <= chalk[i] <= 10^5
 * 1 <= k <= 10^9
 *
 *
 */

package leetcode

// @lc code=start
// simulation
func chalkReplacer2(chalk []int, k int) (idx int) {
	total := 0
	for _, c := range chalk {
		total += c
	}
	k %= total

	for i, c := range chalk {
		if c > k {
			idx = i
			break
		}
		k -= c
	}
	return
}

// binary search
func chalkReplacer(chalk []int, k int) int {
	n := len(chalk)
	if chalk[0] > k {
		return 0
	}

	for i := 1; i < n; i++ {
		chalk[i] += chalk[i-1]
		if chalk[i] > k {
			return i
		}
	}

	k %= chalk[n-1]

	var bs func(arr []int, target int) int
	bs = func(arr []int, target int) int {
		l, r := 0, len(arr)-1
		for l < r {
			m := l + (r-l)/2
			if target >= arr[m] {
				l = m + 1
			} else {
				r = m
			}
		}
		return l
	}

	return bs(chalk, k)
}

// @lc code=end
