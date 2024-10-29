/*
 * @lc app=leetcode.cn id=3211 lang=typescript
 *
 * [3211] 生成不含相邻零的二进制字符串
 *
 * https://leetcode.cn/problems/generate-binary-strings-without-adjacent-zeros/description/
 *
 * algorithms
 * Medium (83.44%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    18.5K
 * Total Submissions: 20.9K
 * Testcase Example:  '3'
 *
 * 给你一个正整数 n。
 *
 * 如果一个二进制字符串 x 的所有长度为 2 的子字符串中包含 至少 一个 "1"，则称 x 是一个 有效 字符串。
 *
 * 返回所有长度为 n 的 有效 字符串，可以以任意顺序排列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： n = 3
 *
 * 输出： ["010","011","101","110","111"]
 *
 * 解释：
 *
 * 长度为 3 的有效字符串有："010"、"011"、"101"、"110" 和 "111"。
 *
 *
 * 示例 2：
 *
 *
 * 输入： n = 1
 *
 * 输出： ["0","1"]
 *
 * 解释：
 *
 * 长度为 1 的有效字符串有："0" 和 "1"。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 18
 *
 *
 */

// @lc code=start
function validStrings(n: number): string[] {
  const res: string[] = [];
  dfs([]);
  return res;

  function dfs(arr: string[]) {
    if (arr.length === n) {
      res.push(arr.join(""));
      return;
    }
    if (arr.length === 0 || arr[arr.length - 1] === "1") {
      arr.push("0");
      dfs(arr);
      arr.pop();
    }
    arr.push("1");
    dfs(arr);
    arr.pop();
  }
}
// @lc code=end
