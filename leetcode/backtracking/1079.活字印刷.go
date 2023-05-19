/*
 * @lc app=leetcode.cn id=1079 lang=golang
 *
 * [1079] 活字印刷
 *
 * https://leetcode.cn/problems/letter-tile-possibilities/description/
 *
 * algorithms
 * Medium (73.90%)
 * Likes:    185
 * Dislikes: 0
 * Total Accepted:    21.3K
 * Total Submissions: 27.9K
 * Testcase Example:  '"AAB"'
 *
 * 你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。
 *
 * 注意：本题中，每个活字字模只能使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入："AAB"
 * 输出：8
 * 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
 *
 *
 * 示例 2：
 *
 *
 * 输入："AAABBC"
 * 输出：188
 *
 *
 * 示例 3：
 *
 *
 * 输入："V"
 * 输出：1
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= tiles.length <= 7
 * tiles 由大写英文字母组成
 *
 *
 */

package leetcode

// @lc code=start
func numTilePossibilities(tiles string) int {
	cnt := make(map[rune]int)
	set := make(map[rune]interface{})
	for _, tile := range tiles {
		cnt[tile]++
		set[tile] = struct{}{}
	}
	n := len(tiles)
	var dfs func(i int) int
	dfs = func(i int) int {
		if i == n {
			return 1
		}
		res := 1
		for tile := range set {
			if cnt[tile] > 0 {
				cnt[tile]--
				res += dfs(i + 1)
				cnt[tile]++
			}
		}
		return res
	}
	return dfs(0) - 1
}

// @lc code=end
