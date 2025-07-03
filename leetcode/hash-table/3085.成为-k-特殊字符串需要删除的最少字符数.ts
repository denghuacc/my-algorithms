/*
 * @lc app=leetcode.cn id=3085 lang=typescript
 *
 * [3085] 成为 K 特殊字符串需要删除的最少字符数
 *
 * https://leetcode.cn/problems/minimum-deletions-to-make-string-k-special/description/
 *
 * algorithms
 * Medium (42.63%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    13.2K
 * Total Submissions: 24.3K
 * Testcase Example:  '"aabcaba"\n0'
 *
 * 给你一个字符串 word 和一个整数 k。
 *
 * 如果 |freq(word[i]) - freq(word[j])| <= k 对于字符串中所有下标 i 和 j 都成立，则认为 word 是 k
 * 特殊字符串。
 *
 * 此处，freq(x) 表示字符 x 在 word 中的出现频率，而 |y| 表示 y 的绝对值。
 *
 * 返回使 word 成为 k 特殊字符串 需要删除的字符的最小数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：word = "aabcaba", k = 0
 *
 * 输出：3
 *
 * 解释：可以删除 2 个 "a" 和 1 个 "c" 使 word 成为 0 特殊字符串。word 变为 "baba"，此时 freq('a') ==
 * freq('b') == 2。
 *
 *
 * 示例 2：
 *
 *
 * 输入：word = "dabdcbdcdcd", k = 2
 *
 * 输出：2
 *
 * 解释：可以删除 1 个 "a" 和 1 个 "d" 使 word 成为 2 特殊字符串。word 变为 "bdcbdcdcd"，此时 freq('b')
 * == 2，freq('c') == 3，freq('d') == 4。
 *
 *
 * 示例 3：
 *
 *
 * 输入：word = "aaabaaa", k = 2
 *
 * 输出：1
 *
 * 解释：可以删除 1 个 "b" 使 word 成为 2特殊字符串。因此，word 变为 "aaaaaa"，此时每个字母的频率都是 6。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= word.length <= 10^5
 * 0 <= k <= 10^5
 * word 仅由小写英文字母组成。
 *
 *
 */

export {};

// @lc code=start
function minimumDeletions(word: string, k: number): number {
  // 统计每个字符的出现频率
  const cnt = new Map<string, number>();
  for (const ch of word) {
    cnt.set(ch, (cnt.get(ch) || 0) + 1);
  }

  // 初始化结果为最大可能值（删除所有字符）
  let res = word.length;

  // 枚举每个字符的频率作为基准频率
  for (const a of cnt.values()) {
    let deleted = 0;

    // 遍历所有字符频率，计算以 a 为基准时需要删除的字符数
    for (const b of cnt.values()) {
      if (a > b) {
        // 如果基准频率 a 大于当前频率 b，需要删除频率为 b 的所有字符
        // 因为无法增加字符，只能通过删除来满足频率差不超过 k 的条件
        deleted += b;
      } else if (b > a + k) {
        // 如果当前频率 b 超过了基准频率 a + k，需要删除多余的字符
        // 删除 (b - a - k) 个字符，使频率变为 a + k
        deleted += b - a - k;
      }
      // 如果 a <= b <= a + k，则不需要删除任何字符
    }

    // 更新最小删除数量
    res = Math.min(res, deleted);
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 使字符串成为 k 特殊字符串，即任意两个字符的频率差绝对值不超过 k
   - 只能通过删除字符来调整频率，不能增加字符
   - 求最少删除的字符数量

2. 算法分析：
   - 时间复杂度：O(n + m²)，其中 n 是字符串长度，m 是不同字符的数量（最多 26）
   - 空间复杂度：O(m)，用于存储字符频率
   - 算法类型：枚举 + 贪心

3. 实现要点：
   - **频率统计**：使用 Map 统计每个字符的出现频率
   - **枚举基准**：以每个字符的频率作为基准频率，计算最优解
   - **贪心策略**：
     * 对于频率小于基准的字符：删除所有该字符（无法增加频率）
     * 对于频率超过基准+k的字符：删除多余部分，保留基准+k个
     * 对于在[基准, 基准+k]范围内的字符：不需要删除

4. 核心思想：
   - k 特殊字符串要求所有字符频率在一个长度为 k 的区间内
   - 枚举每个可能的区间下界（即某个字符的频率），计算该区间下的最小删除数
   - 区间为 [基准频率, 基准频率 + k]
   - 对于每个基准频率，贪心地调整其他字符的频率

5. 示例分析：
   - 示例1: word="aabcaba", k=0
     * 频率统计：a:4, b:2, c:1
     * 以频率2为基准：删除2个a + 1个c = 3（最优）
     * 以频率4为基准：删除2个b + 1个c = 3
     * 以频率1为基准：删除3个a + 1个b = 4
   
6. 优化要点：
   - 由于只能删除字符，基准频率只需要考虑已存在的字符频率
   - 贪心策略保证了局部最优解
   - 枚举所有可能的基准频率确保找到全局最优解

7. 边界情况：
   - k=0：所有字符频率必须相同
   - 只有一种字符：无需删除任何字符
   - k很大：可能所有字符都不需要删除
*/
