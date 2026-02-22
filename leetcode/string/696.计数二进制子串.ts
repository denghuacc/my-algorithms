/*
 * @lc app=leetcode.cn id=696 lang=typescript
 *
 * [696] 计数二进制子串
 *
 * https://leetcode-cn.com/problems/count-binary-substrings/description/
 *
 * algorithms
 * Easy (53.65%)
 * Likes:    187
 * Dislikes: 0
 * Total Accepted:    15.9K
 * Total Submissions: 28K
 * Testcase Example:  '"00110"'
 *
 * 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。
 *
 * 重复出现的子串要计算它们出现的次数。
 *
 * 示例 1 :
 *
 *
 * 输入: "00110011"
 * 输出: 6
 * 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
 *
 * 请注意，一些重复出现的子串要计算它们出现的次数。
 *
 * 另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: "10101"
 * 输出: 4
 * 解释: 有4个子串：“10”，“01”，“10”，“01”，它们具有相同数量的连续1和0。
 *
 *
 * 注意：
 *
 *
 * s.length 在1到50,000之间。
 * s 只包含“0”或“1”字符。
 *
 *
 */

// @lc code=start
// string
/**
 * 解法一：先统计每段连续相同字符的长度，再累加相邻段的最小值。
 *
 * @param s - 二进制字符串
 * @returns 满足条件的子串数量
 */
var countBinarySubstrings = function (s: string): number {
  // counts 存储每一段连续字符的长度，例如 "001110" -> [2,3,1]
  const counts: number[] = [];
  let ptr = 0;
  const n = s.length;

  while (ptr < n) {
    const c = s[ptr];
    let count = 0;
    // 统计当前连续段长度
    while (ptr < n && s[ptr] === c) {
      ptr++;
      count++;
    }
    counts.push(count);
  }

  let result = 0;
  // 相邻两段可形成的有效子串数量为两段长度的较小值
  for (let i = 1; i < counts.length; i++) {
    result += Math.min(counts[i], counts[i - 1]);
  }

  return result;
};

// string 2 optimize
/**
 * 解法二：滚动维护“上一段长度”和“当前段长度”，省去数组存储。
 *
 * @param s - 二进制字符串
 * @returns 满足条件的子串数量
 */
var countBinarySubstrings = function (s: string): number {
  let ptr = 0;
  const n = s.length;
  // last: 上一段连续字符长度
  let last = 0;
  let result = 0;

  while (ptr < n) {
    const c = s[ptr];
    let count = 0;
    // 统计当前段长度
    while (ptr < n && s[ptr] === c) {
      ptr++;
      count++;
    }
    // 当前段与上一段形成的有效子串数量
    result += Math.min(count, last);
    last = count;
  }

  return result;
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：统计子串中 0 与 1 数量相同，且 0 与 1 各自连续成段的个数。
   - 关键特点：合法子串一定由两段连续字符组成，如 "0011"、"01"。
   - 目标：返回所有合法子串出现次数（重复位置要计数）。

2. 解题思路
   核心思想
   - 把字符串按连续相同字符分组，得到每段长度。
   - 任意相邻两段长度为 a、b 时，可形成 min(a, b) 个合法子串。
   - 将所有相邻段贡献求和即答案。

   算法步骤（解法一）
   1) 扫描字符串，记录每段连续字符长度到 counts。
   2) 遍历 counts 的相邻元素，累加 min(counts[i-1], counts[i])。
   3) 返回总和。

   算法步骤（解法二）
   1) 不保存全量 counts，只维护上一段长度 last。
   2) 每统计出当前段长度 count，就累加 min(last, count)。
   3) 更新 last = count，继续下一段。

3. 代码实现
   实现步骤
   - 双层 while：外层逐段推进，内层统计当前段长度。
   - 解法二通过滚动变量将空间从 O(g) 压到 O(1)（g 为分组数）。

   关键函数说明
   - countBinarySubstrings（解法一）：分组数组法，直观易理解。
   - countBinarySubstrings（解法二）：滚动统计法，空间更优。

4. 复杂度分析
   - 解法一时间复杂度：O(n)，空间复杂度：O(g)。
   - 解法二时间复杂度：O(n)，空间复杂度：O(1)。
   - 关键观察：每个字符只被扫描一次。

5. 示例分析
   示例一：s = "00110011"
   - 分组长度：[2,2,2,2]
   - 贡献：2 + 2 + 2 = 6，答案 6。

   示例二：s = "10101"
   - 分组长度：[1,1,1,1,1]
   - 相邻贡献为 1 + 1 + 1 + 1 = 4，答案 4。

   示例三：s = "0001111"
   - 分组长度：[3,4]
   - 贡献 min(3,4)=3，对应 "01"、"0011"、"000111"。

   边界情况
   - 长度为 1：无合法子串，答案 0。
   - 全是 0 或全是 1：答案 0。

6. 算法要点总结
   核心技巧
   - 将“子串条件”转化为“相邻分组最小值求和”。
   - 分组统计避免枚举所有子串。

   优化要点
   - 滚动记录上一段长度可省去分组数组。
   - 线性扫描即可完成。

   类似问题
   - 基于分组压缩（RLE）的字符串统计问题。
   - 相邻段贡献累加类题目。

7. 常见错误
   - 误把不连续的 0/1 组合也计入答案。
   - 忘记重复子串按出现位置计数。
   - 分组边界推进错误导致漏统或重统。
*/
