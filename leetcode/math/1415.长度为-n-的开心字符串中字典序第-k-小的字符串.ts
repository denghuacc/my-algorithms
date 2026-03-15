/*
 * @lc app=leetcode.cn id=1415 lang=typescript
 *
 * [1415] 长度为 n 的开心字符串中字典序第 k 小的字符串
 *
 * https://leetcode.cn/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/description/
 *
 * algorithms
 * Medium (71.38%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    19.4K
 * Total Submissions: 25.7K
 * Testcase Example:  '1\n3'
 *
 * 一个 「开心字符串」定义为：
 *
 *
 * 仅包含小写字母 ['a', 'b', 'c'].
 * 对所有在 1 到 s.length - 1 之间的 i ，满足 s[i] != s[i + 1] （字符串的下标从 1 开始）。
 *
 *
 * 比方说，字符串 "abc"，"ac"，"b" 和 "abcbabcbcb" 都是开心字符串，但是 "aa"，"baa" 和 "ababbc"
 * 都不是开心字符串。
 *
 * 给你两个整数 n 和 k ，你需要将长度为 n 的所有开心字符串按字典序排序。
 *
 * 请你返回排序后的第 k 个开心字符串，如果长度为 n 的开心字符串少于 k 个，那么请你返回 空字符串 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 1, k = 3
 * 输出："c"
 * 解释：列表 ["a", "b", "c"] 包含了所有长度为 1 的开心字符串。按照字典序排序后第三个字符串为 "c" 。
 *
 *
 * 示例 2：
 *
 * 输入：n = 1, k = 4
 * 输出：""
 * 解释：长度为 1 的开心字符串只有 3 个。
 *
 *
 * 示例 3：
 *
 * 输入：n = 3, k = 9
 * 输出："cab"
 * 解释：长度为 3 的开心字符串总共有 12 个 ["aba", "abc", "aca", "acb", "bab", "bac", "bca",
 * "bcb", "cab", "cac", "cba", "cbc"] 。第 9 个字符串为 "cab"
 *
 *
 * 示例 4：
 *
 * 输入：n = 2, k = 7
 * 输出：""
 *
 *
 * 示例 5：
 *
 * 输入：n = 10, k = 100
 * 输出："abacbabacb"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10
 * 1 <= k <= 100
 *
 *
 *
 *
 */

// @lc code=start
/**
 * 返回长度为 n 的开心字符串中字典序第 k 小的字符串。
 *
 * 核心思路：
 * - 不回溯生成全部字符串，而是按“分块计数”逐位确定字符。
 * - 在第 i 位固定某个字符后，后续可行方案数是固定的 2^(n-1-i)。
 * - 用 k 落在哪个块中，决定当前位选哪个字符。
 *
 * @param n - 开心字符串长度
 * @param k - 目标字典序排名（1-based）
 * @returns 第 k 小的开心字符串；若不存在则返回空串
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function getHappyString(n: number, k: number): string {
  const chars = ["a", "b", "c"];
  const result: string[] = [];

  // 总数：首位 3 种，后续每位 2 种 -> 3 * 2^(n-1)。
  const totalCount = 3 * (1 << (n - 1));
  if (k > totalCount) {
    return "";
  }

  for (let i = 0; i < n; i++) {
    // 在当前位固定一个合法字符后，剩余位的可行方案数（块大小）。
    const blockSize = 1 << (n - 1 - i);

    for (const ch of chars) {
      // 开心字符串要求相邻字符不同。
      if (result.length > 0 && result[result.length - 1] === ch) {
        continue;
      }

      // k 落在当前字符对应的块内，当前位就选择它。
      if (k <= blockSize) {
        result.push(ch);
        break;
      }

      // 否则跳过整个块，去看后续字符的块。
      k -= blockSize;
    }
  }

  return result.join("");
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 开心字符串只允许字符来自 {'a','b','c'}，且相邻字符不能相同。
   - 目标是找“长度为 n 的所有开心字符串按字典序排序后的第 k 个”。
   - 若总数不足 k，返回空串。

2. 关键计数结论
   - 长度为 n 的开心字符串总数：
     首位有 3 种选择；
     后续每一位都不能等于前一位，所以每位只有 2 种选择。
   - 总数 = 3 * 2^(n - 1)。

3. 为什么可以贪心逐位确定
   - 固定到第 i 位时，若当前位选定某个合法字符，
     剩下 n - i - 1 位的可行数量恒为 2^(n - i - 1)。
   - 这意味着每个候选字符对应一个“等大小的字典序块”。
   - 于是可以像找第 k 个排列那样：
     1) 看 k 落在哪个块；
     2) 确定当前位字符；
     3) 若未命中前面块，就把 k 减去对应块大小后继续。

4. 算法步骤
   1. 先算总数 total = 3 * 2^(n-1)，若 k > total 直接返回空串。
   2. 从左到右确定每一位：
      - 计算当前块大小 blockSize = 2^(n-1-i)。
      - 按字典序尝试 'a'、'b'、'c'，跳过与前一位相同的字符。
      - 若 k <= blockSize，当前位选该字符；
        否则 k -= blockSize，尝试下一个字符。
   3. 拼接并返回结果。

5. 复杂度分析
   - 时间复杂度：O(n)
     每一位最多检查 3 个字符，常数很小。
   - 空间复杂度：O(n)
     用于保存答案字符。

6. 示例分析
   - 例：n=3, k=9
   - 总数 3*2^2=12，存在第 9 个。
   - i=0，blockSize=4：
     'a' 块是第 1~4 个，'b' 块是第 5~8 个，'c' 块是第 9~12 个。
     k=9 落在 'c' 块，首位选 'c'，k 变为 1（跳过前 8 个）。
   - i=1，blockSize=2：
     不能选 'c'，按字典序先看 'a'，k=1 落入，选 'a'。
   - i=2，blockSize=1：
     不能选 'a'，先看 'b'，k=1 落入，选 'b'。
   - 答案是 "cab"。

7. 常见错误
   - 忘记先判断总数是否小于 k，导致构造过程越界。
   - 把 blockSize 写错（应为 2^(n-1-i)）。
   - 漏掉“相邻字符不能相同”的过滤条件。
   - 把 k 当成 0-based 使用，导致整体偏移一位。
*/
