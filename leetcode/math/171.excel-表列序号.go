/*
 * @lc app=leetcode.cn id=171 lang=golang
 *
 * [171] Excel 表列序号
 *
 * https://leetcode-cn.com/problems/excel-sheet-column-number/description/
 *
 * algorithms
 * Easy (70.34%)
 * Likes:    258
 * Dislikes: 0
 * Total Accepted:    83.6K
 * Total Submissions: 119K
 * Testcase Example:  '"A"'
 *
 * 给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回该列名称对应的列序号。
 *
 *
 *
 * 例如，
 *
 *
 * ⁠   A -> 1
 * ⁠   B -> 2
 * ⁠   C -> 3
 * ⁠   ...
 * ⁠   Z -> 26
 * ⁠   AA -> 27
 * ⁠   AB -> 28
 * ⁠   ...
 *
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: columnTitle = "A"
 * 输出: 1
 *
 *
 * 示例 2:
 *
 *
 * 输入: columnTitle = "AB"
 * 输出: 28
 *
 *
 * 示例 3:
 *
 *
 * 输入: columnTitle = "ZY"
 * 输出: 701
 *
 * 示例 4:
 *
 *
 * 输入: columnTitle = "FXSHRXW"
 * 输出: 2147483647
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= columnTitle.length <= 7
 * columnTitle 仅由大写英文组成
 * columnTitle 在范围 ["A", "FXSHRXW"] 内
 *
 *
 */

package leetcode

// @lc code=start
// math
func titleToNumber(columnTitle string) (ret int) {
	for i, multiple := len(columnTitle)-1, 1; i >= 0; i-- {
		k := columnTitle[i] - 'A' + 1
		ret += int(k) * multiple
		multiple *= 26
	}
	return
}

// @lc code=end
