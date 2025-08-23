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

export {};

// @lc code=start
/**
 * 复原IP地址 - 回溯算法
 *
 * 核心思想：
 * 使用回溯算法，将字符串分割成4段，每段代表IP地址的一个部分
 * 通过深度优先搜索尝试所有可能的分割方式
 */
function restoreIpAddresses(s: string): string[] {
  const SEG_COUNT = 4; // IP地址由4段组成
  const segments: number[] = new Array(SEG_COUNT); // 存储当前IP地址的4段
  const ret: string[] = []; // 存储所有有效的IP地址

  dfs(0, 0); // 从第0段，字符串位置0开始
  return ret;

  /**
   * 深度优先搜索函数
   * @param segId - 当前处理的是第几段IP地址 (0-3)
   * @param segStart - 当前段在字符串中的起始位置
   */
  function dfs(segId: number, segStart: number) {
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
      dfs(segId + 1, segStart + 1);
    }

    // 一般情况，枚举每一种可能性并递归
    let addr = 0;
    for (let i = segStart; i < s.length; i++) {
      addr = addr * 10 + parseInt(s[i]);
      if (addr > 0 && addr <= 255) {
        segments[segId] = addr;
        dfs(segId + 1, i + 1);
      } else {
        break; // 超过255，后续更大，直接退出
      }
    }
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将数字字符串分割成4段，每段代表IP地址的一个部分
   - 每段必须在0-255范围内，且不能有前导零（除非是0本身）

2. 算法分析：
   - 时间复杂度：O(3^4) = O(81)，每段最多3位数字，4段
   - 空间复杂度：O(4) = O(1)，递归深度最多4层
   - 算法类型：回溯算法

3. 实现要点：
   - 使用segId跟踪当前处理第几段IP地址
   - 使用segStart跟踪当前段在字符串中的起始位置
   - 特殊处理前导零的情况：如果当前位是0，只能单独作为一段
   - 剪枝优化：当数值超过255时立即停止当前分支

4. 优化思路：
   - 提前判断字符串长度是否合理（4-12位）
   - 使用数字计算而不是字符串拼接提高效率
   - 剪枝条件：数值范围检查、长度检查
*/
