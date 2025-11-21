/*
 * @lc app=leetcode.cn id=1930 lang=typescript
 *
 * [1930] 长度为 3 的不同回文子序列
 *
 * https://leetcode.cn/problems/unique-length-3-palindromic-subsequences/description/
 *
 * algorithms
 * Medium (58.46%)
 * Likes:    94
 * Dislikes: 0
 * Total Accepted:    23.7K
 * Total Submissions: 37.3K
 * Testcase Example:  '"aabca"'
 *
 * 给你一个字符串 s ，返回 s 中 长度为 3 的不同回文子序列 的个数。
 *
 * 即便存在多种方法来构建相同的子序列，但相同的子序列只计数一次。
 *
 * 回文 是正着读和反着读一样的字符串。
 *
 * 子序列 是由原字符串删除其中部分字符（也可以不删除）且不改变剩余字符之间相对顺序形成的一个新字符串。
 *
 *
 * 例如，"ace" 是 "abcde" 的一个子序列。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aabca"
 * 输出：3
 * 解释：长度为 3 的 3 个回文子序列分别是：
 * - "aba" ("aabca" 的子序列)
 * - "aaa" ("aabca" 的子序列)
 * - "aca" ("aabca" 的子序列)
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "adc"
 * 输出：0
 * 解释："adc" 不存在长度为 3 的回文子序列。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "bbcbaba"
 * 输出：4
 * 解释：长度为 3 的 4 个回文子序列分别是：
 * - "bbb" ("bbcbaba" 的子序列)
 * - "bcb" ("bbcbaba" 的子序列)
 * - "bab" ("bbcbaba" 的子序列)
 * - "aba" ("bbcbaba" 的子序列)
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 计算长度为 3 的不同回文子序列数量。
 *
 * @param s - 仅包含小写字母的字符串
 * @returns 不同回文子序列的个数
 *
 * @timeComplexity O(26 * n) - 一次遍历记录首尾，再按字符统计中间去重元素
 * @spaceComplexity O(1) - 固定 26 长度的辅助数组与临时去重集合
 */
function countPalindromicSubsequence(s: string): number {
  const n = s.length;
  let res = 0;

  // 记录每个字符的首次和末次出现位置，初始化为未出现的状态
  const first = new Array<number>(26).fill(Number.MAX_SAFE_INTEGER);
  const last = new Array<number>(26).fill(-1);

  for (let i = 0; i < n; i++) {
    const idx = s.charCodeAt(i) - 97;
    first[idx] = Math.min(first[idx], i); // 记录最左位置
    last[idx] = i; // 始终更新到最新的最右位置
  }

  // 遍历所有可能的回文子序列的首尾字符
  for (let i = 0; i < 26; i++) {
    if (first[i] < last[i]) {
      const uniqueChars = new Set<string>();
      // 统计首尾之间出现过的不同字符；每种字符对应一个回文子序列
      for (let k = first[i] + 1; k < last[i]; k++) {
        uniqueChars.add(s[k]);
      }
      res += uniqueChars.size;
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 需要统计形如 x y x 的长度为 3 的回文子序列数量。
   - 只需关心两端字符相同，中间字符任意且位置在两端之间。
   - 目标是以 O(26 * n) 的方式遍历，避免三重循环。

2. 算法分析：
   - 时间复杂度：O(26 * n)。
     扫描一次获取首尾，再对每个字母扫描中间区间。
   - 空间复杂度：O(1)。仅使用 26 长度数组和临时集合。
   - 算法类型：哈希集合 + 枚举字符。

3. 解题思路：
   - 核心思想：固定两端字符，统计首尾之间出现的不同字符数量。
   - 推导过程：任意长度为 3 的回文子序列由两端相同字符和一个中间字符组成。
   - 主要步骤概述：
     1) 单次遍历记录每个字母的首尾位置。
     2) 枚举 26 个字母，若首尾存在且间距大于 1，则统计中间不同字符。
     3) 将中间不同字符数量累加即为答案。

4. 实现要点：
   - 首尾位置：first 和 last 数组在一次循环中完成更新。
   - 中间字符统计：使用 Set 去重，最多 26 个字符，保持 O(1) 空间。
   - 边界情况处理：当首尾相邻或只出现一次时跳过，不会贡献回文子序列。

5. 算法优势（可选）
   - 固定 26 个字符，时间与字符集相关而非指数级。
   - 单次扫描预处理首尾，避免多次全量搜索。

6. 核心算法步骤（可选）
   - 预处理首尾位置。
   - 枚举字符并统计中间不同字符。
   - 累加得到结果。

7. 示例分析
   - s = "aabca"：a 的首尾是 0 和 4，中间字符 {a, b, c}，贡献 3；其余字符不足
     两次，答案 3。
   - s = "bbcbaba"：b 首尾 0、6，中间 {b, c, a} 贡献 3；a 首尾 4、5 不足；c 首尾
     2、3 中间为空；总计 4。
   - s = "adc"：任何字母不足两次，结果 0。

8. 常见错误
   - 忽略首尾之间是空区间，导致错误计数。
   - 未去重中间字符，重复计入同一个回文子序列。
   - 漏掉字符首尾位置在一次循环内更新，导致额外 O(26 * n^2) 的复杂度风险。

10. 扩展思考
   - 优化思路：若字符集更大，可用位掩码或前缀频次加速统计去重。
   - 类似问题：长度为 k 的回文子序列统计可用首尾固定 + 中间状态压缩的思路
     扩展。
   - 实际应用：适合在固定字符集的字符串上做子序列去重统计。
*/
