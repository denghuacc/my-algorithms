/*
 * @lc app=leetcode.cn id=187 lang=typescript
 *
 * [187] 重复的DNA序列
 *
 * https://leetcode-cn.com/problems/repeated-dna-sequences/description/
 *
 * algorithms
 * Medium (50.07%)
 * Likes:    235
 * Dislikes: 0
 * Total Accepted:    52.2K
 * Total Submissions: 104.3K
 * Testcase Example:  '"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"'
 *
 * 所有 DNA 都由一系列缩写为 'A'，'C'，'G' 和 'T' 的核苷酸组成，例如："ACGAATTCCG"。在研究 DNA 时，识别 DNA
 * 中的重复序列有时会对研究非常有帮助。
 *
 * 编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 s 中出现次数超过一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
 * 输出：["AAAAACCCCC","CCCCCAAAAA"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "AAAAAAAAAAAAA"
 * 输出：["AAAAAAAAAA"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * s[i] 为 'A'、'C'、'G' 或 'T'
 *
 *
 */

// @lc code=start
// hash table
var findRepeatedDnaSequences = function (s: string): string[] {
  const ret: string[] = [];
  const L = 10;
  const n = s.length;
  const cnt: Map<string, number> = new Map();

  for (let i = 0; i <= n - L; i++) {
    const sub = s.slice(i, i + L);
    cnt.set(sub, (cnt.get(sub) ?? 0) + 1);
    if (cnt.get(sub) === 2) {
      ret.push(sub);
    }
  }

  return ret;
};

// hash table2
var findRepeatedDnaSequences = function (s: string): string[] {
  const ret: string[] = [];
  const L = 10;
  const n = s.length;
  const bin: Map<string, number> = new Map();

  bin.set("A", 0);
  bin.set("C", 1);
  bin.set("G", 2);
  bin.set("T", 3);

  if (n < L) {
    return ret;
  }

  let x = 0;
  for (let i = 0; i < L - 1; i++) {
    x = (x << 2) | bin.get(s[i])!;
  }

  const cnt: Map<number, number> = new Map();
  for (let i = 0; i <= n - L; i++) {
    x = ((x << 2) | bin.get(s[i + L - 1])!) & ((1 << (L * 2)) - 1);
    cnt.set(x, (cnt.get(x) ?? 0) + 1);
    if (cnt.get(x) === 2) {
      ret.push(s.slice(i, i + L));
    }
  }

  return ret;
};
// @lc code=end
