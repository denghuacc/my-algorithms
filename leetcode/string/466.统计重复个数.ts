/*
 * @lc app=leetcode.cn id=466 lang=typescript
 *
 * [466] 统计重复个数
 *
 * https://leetcode.cn/problems/count-the-repetitions/description/
 *
 * algorithms
 * Hard (37.76%)
 * Likes:    215
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 41.7K
 * Testcase Example:  '"acb"\n4\n"ab"\n2'
 *
 * 定义 str = [s, n] 表示 str 由 n 个字符串 s 连接构成。
 *
 *
 * 例如，str == ["abc", 3] =="abcabcabc" 。
 *
 *
 * 如果可以从 s2 中删除某些字符使其变为 s1，则称字符串 s1 可以从字符串 s2 获得。
 *
 *
 * 例如，根据定义，s1 = "abc" 可以从 s2 = "abdbec" 获得，仅需要删除加粗且用斜体标识的字符。
 *
 *
 * 现在给你两个字符串 s1 和 s2 和两个整数 n1 和 n2 。由此构造得到两个字符串，其中 str1 = [s1, n1]、str2 = [s2,
 * n2] 。
 *
 * 请你找出一个最大整数 m ，以满足 str = [str2, m] 可以从 str1 获得。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s1 和 s2 由小写英文字母组成
 * 1
 *
 *
 */

// @lc code=start
// cv
function getMaxRepetitions(
  s1: string,
  n1: number,
  s2: string,
  n2: number
): number {
  if (n1 === 0) {
    return 0;
  }
  let s1cnt = 0;
  let s2cnt = 0;
  let index = 0;
  const recall = new Map<number, number[]>();
  let preLoop = [];
  let inLoop = [];
  while (true) {
    s1cnt++;
    for (let i = 0; i < s1.length; i++) {
      const ch = s1[i];
      if (ch === s2[index]) {
        index++;
        if (index === s2.length) {
          s2cnt++;
          index = 0;
        }
      }
    }
    if (s1cnt === n1) {
      return Math.floor(s2cnt / n2);
    }
    if (recall.has(index)) {
      const [s1cntPrime, s2cntPrime] = recall.get(index)!;
      preLoop = [s1cntPrime, s2cntPrime];
      inLoop = [s1cnt - s1cntPrime, s2cnt - s2cntPrime];
      break;
    } else {
      recall.set(index, [s1cnt, s2cnt]);
    }
  }
  let res = preLoop[1] + Math.floor((n1 - preLoop[0]) / inLoop[0]) * inLoop[1];
  const rest = (n1 - preLoop[0]) % inLoop[0];
  for (let i = 0; i < rest; i++) {
    for (let j = 0; j < s1.length; j++) {
      const ch = s1[j];
      if (ch === s2[index]) {
        index++;
        if (index === s2.length) {
          res++;
          index = 0;
        }
      }
    }
  }
  return Math.floor(res / n2);
}
// @lc code=end
