/*
 * @lc app=leetcode.cn id=722 lang=golang
 *
 * [722] 删除注释
 *
 * https://leetcode.cn/problems/remove-comments/description/
 *
 * algorithms
 * Medium (38.56%)
 * Likes:    99
 * Dislikes: 0
 * Total Accepted:    11.6K
 * Total Submissions: 30.1K
 *
 * 给一个 C++ 程序，删除程序中的注释。这个程序source是一个数组，其中source[i]表示第 i 行源码。 这表示每行源码由 '\n' 分隔。
 *
 * 在 C++ 中有两种注释风格，行内注释和块注释。
 *
 */

/**/

package leetcode

// @lc code=start
func removeComments(source []string) []string {
	res := []string{}
	newLine := []byte{}
	inBlock := false
	for _, line := range source {
		for i := 0; i < len(line); i++ {
			if inBlock {
				if i+1 < len(line) && line[i] == '*' && line[i+1] == '/' {
					inBlock = false
					i++
				}
			} else {
				if i+1 < len(line) && line[i] == '/' && line[i+1] == '*' {
					inBlock = true
					i++
				} else if i+1 < len(line) && line[i] == '/' && line[i+1] == '/' {
					break
				} else {
					newLine = append(newLine, line[i])
				}
			}
		}
		if !inBlock && len(newLine) > 0 {
			res = append(res, string(newLine))
			newLine = []byte{}
		}
	}
	return res
}

// @lc code=end
