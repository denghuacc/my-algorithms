/*
 * @lc app=leetcode.cn id=93 lang=typescript
 *
 * [93] 复原IP地址
 *
 * https://leetcode-cn.com/problems/restore-ip-addresses/description/
 *
 * algorithms
 * Medium (47.21%)
 * Likes:    329
 * Dislikes: 0
 * Total Accepted:    57.9K
 * Total Submissions: 122.2K
 * Testcase Example:  '"25525511135"'
 *
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 *
 * 有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。
 *
 *
 *
 * 示例:
 *
 * 输入: "25525511135"
 * 输出: ["255.255.11.135", "255.255.111.35"]
 *
 */

// @lc code=start
// backtracking
function restoreIpAddresses(s: string): string[] {
  const SEG_COUNT = 4;
  const segments: number[] = new Array(SEG_COUNT);
  const ret: string[] = [];

  dfs(s, 0, 0);
  return ret;

  function dfs(s: string, segId: number, segStart: number) {
    // 找到四段 IP 并且遍历完字符串，那么就是一种答案
    if (segId === SEG_COUNT) {
      if (segStart === s.length) {
        ret.push(segments.join("."));
      }
      return;
    }

    // 没找到但是遍历完字符串，提前回溯
    if (segStart === s.length) return;

    // 如果当前数字为 0，那么这一段 IP 地址只能为 0
    if (s[segStart] === "0") {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
    }

    // 一般情况，枚举每一种可能性并递归
    let addr = 0;
    for (let i = segStart; i < s.length; i++) {
      addr = addr * 10 + parseInt(s[i]);
      if (addr > 0 && addr <= 255) {
        segments[segId] = addr;
        dfs(s, segId + 1, i + 1);
      } else {
        break;
      }
    }
  }
}
// @lc code=end
