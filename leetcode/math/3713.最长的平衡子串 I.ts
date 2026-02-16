/*
 * @lc app=leetcode.cn id=3713 lang=typescript
 *
 * [3713] 最长的平衡子串 I
 *
 * https://leetcode.cn/problems/longest-balanced-substring-i/description/
 *
 * algorithms
 * Medium (52.41%)
 * Likes:    253
 * Dislikes: 20
 * Total Accepted:    74.6K
 * Total Submissions: 114.8K
 * Testcase Example:  '"abbac"'
 *
 * 给你一个仅由小写英文字母组成的字符串 s。
 *
 * 如果一个子字符串中所有“不同字符”的出现次数都相同，则称该子字符串为平衡子字符串。
 *
 * 返回 s 的最长平衡子字符串长度。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abbac"
 * 输出：4
 * 解释：最长平衡子字符串是 "abba"，其中 'a' 与 'b' 都出现 2 次。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "zzabccy"
 * 输出：4
 * 解释：最长平衡子字符串是 "zabc"，其中 'z'、'a'、'b'、'c' 都出现 1 次。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "aba"
 * 输出：2
 * 解释："ab" 和 "ba" 都是最长平衡子字符串，长度为 2。
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 枚举所有子字符串，返回最长平衡子字符串长度。
 *
 * @param s - 仅由小写字母组成的字符串
 * @returns 最长平衡子字符串长度
 */
function longestBalanced(s: string): number {
  const n = s.length;
  let maxLength = 0;

  for (let i = 0; i < n; i++) {
    // 剪枝：从 i 出发的最长长度若不可能超过当前答案，直接结束
    if (n - i <= maxLength) {
      break;
    }
    // cnt[k] 表示当前子串中字符 ('a' + k) 的出现次数
    const cnt = new Array(26).fill(0);
    for (let j = i; j < n; j++) {
      const charIndex = s.charCodeAt(j) - 97;
      cnt[charIndex]++;

      // 判定当前子串是否平衡：所有非 0 频次必须相等
      let balanced = true;
      let targetFreq = 0;
      for (const frequency of cnt) {
        if (frequency === 0) {
          continue;
        }
        if (targetFreq === 0) {
          targetFreq = frequency;
        } else if (frequency !== targetFreq) {
          balanced = false;
          break;
        }
      }
      if (balanced) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }

  return maxLength;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：找到一个最长子字符串，使其中所有“出现过的字符”频次完全相同。
   - 关键特点：比较的是“不同字符的出现次数”，不要求字符种类固定。
   - 目标：最大化满足条件子字符串的长度。

2. 解题思路
   核心思想
   - 使用双层循环枚举每个子字符串 [i..j]。
   - 维护长度为 26 的频次数组 cnt。
   - 每次扩展 j 后，检查 cnt 中所有非 0 频次是否相等。

   算法步骤
   1) 枚举左端点 i。
   2) 固定 i 后，右端点 j 从 i 向右扩展：
      - 更新 s[j] 的频次。
      - 扫描 cnt，判断所有非 0 频次是否一致。
      - 若一致，更新答案。
   3) 返回最大长度。

3. 代码实现
   实现步骤
   - `cnt[26]` 记录当前窗口字符频次。
   - `targetFreq` 记录第一个非 0 频次作为基准值。
   - 出现任何不同频次即判定当前子串不平衡。
   - 增加剪枝：若 `n - i <= maxLength`，后续不可能得到更长答案。

   关键函数说明
   - `longestBalanced`：主函数，负责枚举、统计和判定。

4. 复杂度分析
   - 时间复杂度：O(n^2 * 26)，n 为字符串长度。
     枚举 O(n^2) 个子串，每次判定扫 26 个字母。
   - 空间复杂度：O(26) = O(1)。
   - 关键观察：字母表固定为 26，判定开销是常数级。

5. 示例分析
   示例一：s = "abbac"
   - 子串 "abba" 中 a=2, b=2，平衡，长度 4。
   - 含 c 的更长子串会破坏频次一致性，答案为 4。

   示例二：s = "zzabccy"
   - 子串 "zabc" 中 z=1, a=1, b=1, c=1，平衡，长度 4。
   - 更长区间会引入频次不一致，答案为 4。

   示例三：s = "aba"
   - "ab" 与 "ba" 都平衡且长度为 2。
   - 全串 "aba" 中 a=2, b=1，不平衡，答案为 2。

   边界情况
   - n=1：任意单字符子串都平衡，答案为 1。
   - 所有字符相同：整串平衡，答案为 n。
   - 所有字符互不相同：整串也平衡（频次都为 1）。

6. 算法要点总结
   核心技巧
   - 使用固定长度频次数组快速统计。
   - 用“非 0 频次全相等”作为平衡判定条件。

   优化要点
   - 字母表固定，判定常数小，便于直接枚举。
   - 左端点层面的长度剪枝可减少不必要循环。

   类似问题
   - 最长满足频次约束的子字符串问题。
   - 需要维护字符频次并做等值判断的窗口/枚举问题。

7. 常见错误
   - 把“所有字符频次相同”误写成“奇偶数量相同”。
   - 忽略“仅比较出现过的字符”，错误把 0 也参与比较。
   - 频次基准值没有正确初始化，导致误判平衡。
*/
