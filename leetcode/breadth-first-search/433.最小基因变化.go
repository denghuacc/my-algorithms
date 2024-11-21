/*
 * @lc app=leetcode.cn id=433 lang=golang
 *
 * [433] 最小基因变化
 *
 * https://leetcode-cn.com/problems/minimum-genetic-mutation/description/
 *
 * algorithms
 * Medium (53.54%)
 * Likes:    137
 * Dislikes: 0
 * Total Accepted:    23.8K
 * Total Submissions: 43.9K
 * Testcase Example:  '"AACCGGTT"\n"AACCGGTA"\n["AACCGGTA"]'
 *
 * 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。
 *
 * 假设我们需要调查从基因序列 start 变为 end 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。
 *
 *
 * 例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
 *
 *
 * 另有一个基因库 bank 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。
 *
 * 给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end
 * 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。
 *
 * 注意：起始基因序列 start 默认是有效的，但是它并不一定会出现在基因库中。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：start = "AACCGGTT", end = "AAACGGTA", bank =
 * ["AACCGGTA","AACCGCTA","AAACGGTA"]
 * 输出：2
 *
 *
 * 示例 3：
 *
 *
 * 输入：start = "AAAAACCC", end = "AACCCCCC", bank =
 * ["AAAACCCC","AAACCCCC","AACCCCCC"]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * start.length == 8
 * end.length == 8
 * 0 <= bank.length <= 10
 * bank[i].length == 8
 * start、end 和 bank[i] 仅由字符 ['A', 'C', 'G', 'T'] 组成
 *
 *
 */

package leetcode

// @lc code=start
func minMutation(start string, end string, bank []string) int {
	if start == end {
		return 0
	}
	visited := make(map[string]bool)
	visited[start] = true
	bankSet := make(map[string]bool)
	for _, v := range bank {
		bankSet[v] = true
	}
	if !bankSet[end] {
		return -1
	}
	queue := []string{start}
	step := 1
	keys := []byte{'A', 'C', 'G', 'T'}
	for len(queue) > 0 {
		size := len(queue)
		for i := 0; i < size; i++ {
			cur := queue[0]
			queue = queue[1:]
			for j := 0; j < 8; j++ {
				for _, k := range keys {
					if cur[j] != k {
						next := cur[:j] + string(k) + cur[j+1:]
						if !visited[next] && bankSet[next] {
							if next == end {
								return step
							}
							visited[next] = true
							queue = append(queue, next)
						}
					}
				}
			}
		}
		step++
	}
	return -1
}

// @lc code=end
