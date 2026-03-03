/*
 * @lc app=leetcode.cn id=1461 lang=typescript
 *
 * [1461] 检查一个字符串是否包含所有长度为 K 的二进制子串
 *
 * https://leetcode.cn/problems/check-if-a-string-contains-all-binary-codes-of-size-k/description/
 *
 * algorithms
 * Medium (56.84%)
 * Likes:    2345
 * Dislikes: 100
 * Total Accepted:    145K
 * Total Submissions: 253.3K
 * Testcase Example:  '"00110110"\n2'
 *
 * 给你一个二进制字符串 s 和一个整数 k，若长度为 k 的所有二进制编码都在 s 中
 * 作为子串出现，则返回 true；否则返回 false。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "00110110", k = 2
 * 输出：true
 * 解释：长度为 2 的二进制编码为 "00"、"01"、"10"、"11"，都出现在 s 中。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "0110", k = 1
 * 输出：true
 * 解释：长度为 1 的二进制编码 "0" 和 "1" 都出现了。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "0110", k = 2
 * 输出：false
 * 解释：长度为 2 的编码 "00" 未出现。
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 5 * 10^5
 * s[i] 为 '0' 或 '1'
 * 1 <= k <= 20
 *
 *
 */

// @lc code=start
/**
 * 判断字符串 s 是否包含所有长度为 k 的二进制编码。
 *
 * @param s - 二进制字符串
 * @param k - 目标编码长度
 * @returns 是否包含全部 2^k 种编码
 */
function hasAllCodes(s: string, k: number): boolean {
  const need = 1 << k;
  // 必要条件：若要覆盖 2^k 个不同长度为 k 的子串，字符串长度至少为 2^k + k - 1
  if (s.length < need + k - 1) {
    return false;
  }

  // 位掩码窗口：用整数表示当前长度为 k 的二进制子串
  const mask = need - 1;
  const seen = new Uint8Array(need);
  let value = 0;
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    // 左移一位并加入当前 bit，再用 mask 仅保留低 k 位
    value = ((value << 1) & mask) | (s.charCodeAt(i) - 48);
    // 当窗口长度达到 k 后，开始记录编码
    if (i >= k - 1 && seen[value] === 0) {
      seen[value] = 1;
      count++;
      // 提前结束：所有编码都出现了
      if (count === need) {
        return true;
      }
    }
  }
  return false;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：检查 s 是否覆盖了全部长度为 k 的二进制模式。
   - 关键特点：需要覆盖的模式数量固定为 2^k。
   - 目标：判断是否“全覆盖”。

2. 解题思路
   核心思想
   - 用长度为 k 的滑动窗口扫描 s。
   - 将每个窗口编码映射为 [0, 2^k - 1] 的整数。
   - 记录出现过的编码数量，达到 2^k 即返回 true。

   算法步骤
   1) 先做长度下界剪枝：若 s 太短，直接返回 false。
   2) 初始化窗口值 value、掩码 mask、访问标记数组 seen。
   3) 逐字符更新窗口编码：
      - value 左移一位并加入当前 bit；
      - 与 mask 按位与，保留低 k 位。
   4) 当 i >= k-1 时，窗口合法：
      - 若该编码首次出现，计数加一。
      - 当计数达到 2^k，提前返回 true。
   5) 扫描结束仍未覆盖全部编码则返回 false。

3. 代码实现
   实现步骤
   - 使用 `Uint8Array` 作为访问标记，避免 Set<string> 的切片开销。
   - 使用滚动位窗口替代 `slice` + 字符串哈希。

   关键函数说明
   - hasAllCodes：主函数，负责剪枝、滚动编码与覆盖计数。

4. 复杂度分析
   - 时间复杂度：O(n)，n 为字符串长度。
   - 空间复杂度：O(2^k)，用于记录编码是否出现。
   - 关键观察：每个字符只处理一次，窗口更新是 O(1)。

5. 示例分析
   示例一：s="00110110", k=2
   - 窗口编码依次覆盖 00、01、11、10，共 4 种，返回 true。

   示例二：s="0110", k=1
   - 覆盖 0 和 1 两种编码，返回 true。

   示例三：s="0110", k=2
   - 仅出现 01、11、10，缺少 00，返回 false。

   边界情况
   - k=1：只需检查是否同时出现 '0' 与 '1'。
   - s 很长但模式重复：仍按首次出现计数。

6. 算法要点总结
   核心技巧
   - 固定窗口 + 位编码映射。
   - 覆盖计数达到目标后可提前结束。

   优化要点
   - 位运算滚动窗口优于字符串切片。
   - 使用字节数组做访问标记降低常数。

   类似问题
   - 滑动窗口去重统计。
   - 二进制状态压缩与覆盖判定问题。

7. 常见错误
   - 窗口未满 k 时就记录，导致误计数。
   - 忘记 `& mask`，窗口编码会无限增长。
   - 用 Set 存字符串导致性能偏高。
*/
