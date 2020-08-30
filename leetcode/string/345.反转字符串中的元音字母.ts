/*
 * @lc app=leetcode.cn id=345 lang=typescript
 *
 * [345] 反转字符串中的元音字母
 *
 * https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/
 *
 * algorithms
 * Easy (50.61%)
 * Likes:    112
 * Dislikes: 0
 * Total Accepted:    45.4K
 * Total Submissions: 89.8K
 * Testcase Example:  '"hello"'
 *
 * 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
 *
 *
 *
 * 示例 1：
 *
 * 输入："hello"
 * 输出："holle"
 *
 *
 * 示例 2：
 *
 * 输入："leetcode"
 * 输出："leotcede"
 *
 *
 *
 * 提示：
 *
 *
 * 元音字母不包含字母 "y" 。
 *
 *
 */

// @lc code=start
function reverseVowels(s: string): string {
  const vowelList = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  const indexList = [];

  for (let i = 0; i < s.length; i++) {
    if (vowelList.includes(s[i])) {
      indexList.push(i);
    }
  }

  let left = 0;
  let right = indexList.length - 1;
  const arr = s.split("");
  while (left < right) {
    [arr[indexList[left]], arr[indexList[right]]] = [
      arr[indexList[right]],
      arr[indexList[left]],
    ];
    left++;
    right--;
  }

  return arr.join("");
}
// @lc code=end
