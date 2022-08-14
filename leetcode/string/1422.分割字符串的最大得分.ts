/*
 * @lc app=leetcode.cn id=1422 lang=typescript
 *
 * [1422] 分割字符串的最大得分
 *
 * https://leetcode.cn/problems/maximum-score-after-splitting-a-string/description/
 *
 * algorithms
 * Easy (54.35%)
 * Likes:    63
 * Dislikes: 0
 * Total Accepted:    22.4K
 * Total Submissions: 39.9K
 * Testcase Example:  '"011101"'
 *
 * 给你一个由若干 0 和 1 组成的字符串 s ，请你计算并返回将该字符串分割成两个 非空 子字符串（即 左 子字符串和 右
 * 子字符串）所能获得的最大得分。
 *
 * 「分割字符串的得分」为 左 子字符串中 0 的数量加上 右 子字符串中 1 的数量。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "011101"
 * 输出：5
 * 解释：
 * 将字符串 s 划分为两个非空子字符串的可行方案有：
 * 左子字符串 = "0" 且 右子字符串 = "11101"，得分 = 1 + 4 = 5
 * 左子字符串 = "01" 且 右子字符串 = "1101"，得分 = 1 + 3 = 4
 * 左子字符串 = "011" 且 右子字符串 = "101"，得分 = 1 + 2 = 3
 * 左子字符串 = "0111" 且 右子字符串 = "01"，得分 = 1 + 1 = 2
 * 左子字符串 = "01110" 且 右子字符串 = "1"，得分 = 2 + 1 = 3
 *
 *
 * 示例 2：
 *
 * 输入：s = "00111"
 * 输出：5
 * 解释：当 左子字符串 = "00" 且 右子字符串 = "111" 时，我们得到最大得分 = 2 + 3 = 5
 *
 *
 * 示例 3：
 *
 * 输入：s = "1111"
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= s.length <= 500
 * 字符串 s 仅由字符 '0' 和 '1' 组成。
 *
 *
 */

export {};

// @lc code=start
// string
var maxScore = function (s: string): number {
  const n = s.length;
  let val = 0;
  let maxVal = -Infinity;
  let maxIdx = 0;

  for (let i = 0; i < n; i++) {
    if (s[i] === "0") {
      val += 1;
    }
    if (s[i] === "1") {
      val -= 1;
    }
    if (val > maxVal) {
      maxVal = val;
      maxIdx = i;
    }
  }

  let res = 0;
  for (let i = 0; i < n - 1; i++) {
    if (i <= maxIdx) {
      if (s[i] === "0") {
        res += 1;
      }
    } else {
      if (s[i] === "1") {
        res += 1;
      }
    }
  }
  return s.at(-1)! === "1" ? res + 1 : res;
};

// string
var maxScore = function (s: string): number {
  const n = s.length;
  let score = 0;

  if (s[0] === "0") {
    score++;
  }
  for (let i = 1; i < n; i++) {
    if (s[i] === "1") {
      score++;
    }
  }

  let res = score;
  for (let i = 1; i < n - 1; i++) {
    if (s[i] === "0") {
      score++;
    } else {
      score--;
    }
    res = Math.max(res, score);
  }
  return res;
};
// @lc code=end
