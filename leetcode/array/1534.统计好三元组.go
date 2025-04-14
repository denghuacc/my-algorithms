/*
 * @lc app=leetcode.cn id=1534 lang=golang
 *
 * [1534] 统计好三元组
 *
 * https://leetcode.cn/problems/count-good-triplets/description/
 *
 * algorithms
 * Easy (75.48%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    75.2K
 * Total Submissions: 98.3K
 * Testcase Example:  '[3,0,1,1,9,7]\n7\n2\n3'
 *
 * 给你一个整数数组 arr ，以及 a、b 、c 三个整数。请你统计其中好三元组的数量。
 *
 * 如果三元组 (arr[i], arr[j], arr[k]) 满足下列全部条件，则认为它是一个 好三元组 。
 *
 *
 * 0 <= i < j < k < arr.length
 * |arr[i] - arr[j]| <= a
 * |arr[j] - arr[k]| <= b
 * |arr[i] - arr[k]| <= c
 *
 *
 * 其中 |x| 表示 x 的绝对值。
 *
 * 返回 好三元组的数量 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
 * 输出：4
 * 解释：一共有 4 个好三元组：[(3,0,1), (3,0,1), (3,1,1), (0,1,1)] 。
 *
 *
 * 示例 2：
 *
 * 输入：arr = [1,1,2,2,3], a = 0, b = 0, c = 1
 * 输出：0
 * 解释：不存在满足所有条件的三元组。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= arr.length <= 100
 * 0 <= arr[i] <= 1000
 * 0 <= a, b, c <= 1000
 *
 *
 */

package leetcode

// @lc code=start
func countGoodTriplets(arr []int, a int, b int, c int) int {
	n := len(arr)
	res := 0
	sum := make([]int, 1001)
	for j := 0; j < n; j++ {
		for k := j + 1; k < n; k++ {
			if abs(arr[j]-arr[k]) <= b {
				lj, lr := arr[j]-a, arr[j]+a
				lk, kr := arr[k]-c, arr[k]+c
				l, r := max(0, max(lj, lk)), min(1000, min(lr, kr))
				if l <= r {
					if l == 0 {
						res += sum[r]
					} else {
						res += sum[r] - sum[l-1]
					}
				}
			}
		}
		for k := arr[j]; k <= 1000; k++ {
			sum[k]++
		}
	}
	return res
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// @lc code=end
