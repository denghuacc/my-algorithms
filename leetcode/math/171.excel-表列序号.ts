/*
 * @lc app=leetcode.cn id=171 lang=typescript
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

// @lc code=start
// math
function titleToNumber(columnTitle: string): number {
  const n = columnTitle.length;
  let ret = 0;
  let digit = 1;

  for (let i = n - 1; i >= 0; i--) {
    const letter = columnTitle[i];
    ret += getNumber(letter) * digit;
    digit *= 26;
  }

  return ret;

  function getNumber(letter: string): number {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 1;
  }
}
// @lc code=end
