/*
 * @lc app=leetcode.cn id=1002 lang=typescript
 *
 * [1002] 查找常用字符
 *
 * https://leetcode-cn.com/problems/find-common-characters/description/
 *
 * algorithms
 * Easy (68.96%)
 * Likes:    169
 * Dislikes: 0
 * Total Accepted:    38.1K
 * Total Submissions: 51.7K
 * Testcase Example:  '["bella","label","roller"]'
 *
 * 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3
 * 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
 *
 * 你可以按任意顺序返回答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：["bella","label","roller"]
 * 输出：["e","l","l"]
 *
 *
 * 示例 2：
 *
 * 输入：["cool","lock","cook"]
 * 输出：["c","o"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= A.length <= 100
 * 1 <= A[i].length <= 100
 * A[i][j] 是小写字母
 *
 *
 */

// @lc code=start
// array
function commonChars(A: string[]): string[] {
  const ret: string[] = [];
  // traverse the first string
  for (let i = 0; i < A[0].length; i++) {
    const char = A[0][i];
    let freq = 1;
    // traverse next other string
    for (let j = 1; j < A.length; j++) {
      let pos = A[j].indexOf(char);
      if (pos !== -1) {
        freq++;
        // remove char
        const strArr = A[j].split("");
        strArr.splice(pos, 1);
        A[j] = strArr.join("");
      } else {
        continue;
      }
    }
    if (freq === A.length) {
      ret.push(char);
    }
  }
  return ret;
}
// @lc code=end
