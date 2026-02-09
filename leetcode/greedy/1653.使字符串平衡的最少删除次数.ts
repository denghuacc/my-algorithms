/*
 * @lc app=leetcode.cn id=1653 lang=typescript
 *
 * [1653] 使字符串平衡的最少删除次数
 *
 * https://leetcode.cn/problems/minimum-deletions-to-make-string-balanced/description/
 *
 * algorithms
 * Medium (55.13%)
 * Likes:    81
 * Dislikes: 0
 * Total Accepted:    14.2K
 * Total Submissions: 23.5K
 * Testcase Example:  '"aababbab"'
 *
 * 给你一个字符串 s ，它仅包含字符 'a' 和 'b'​​​​ 。
 *
 * 你可以删除 s 中任意数目的字符，使得 s 平衡 。当不存在下标对 (i,j) 满足 i < j ，且 s[i] = 'b' 的同时 s[j]= 'a'
 * ，此时认为 s 是 平衡 的。
 *
 * 请你返回使 s 平衡 的 最少 删除次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aababbab"
 * 输出：2
 * 解释：你可以选择以下任意一种方案：
 * 下标从 0 开始，删除第 2 和第 6 个字符（"aababbab" -> "aaabbb"），
 * 下标从 0 开始，删除第 3 和第 6 个字符（"aababbab" -> "aabbbb"）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "bbaaaaabb"
 * 输出：2
 * 解释：唯一的最优解是删除最前面两个字符。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s[i] 要么是 'a' 要么是 'b'​ 。​
 *
 *
 */

// @lc code=start
/**
 * 方法一：枚举分割点，统计左右删除代价的最小值。
 *
 * @param s - 仅包含 'a' 与 'b' 的字符串
 * @returns 使字符串平衡的最少删除次数
 */
var minimumDeletions = function (s: string): number {
  let minDeletions = 0;
  let suffixA = 0;
  for (const ch of s) {
    if (ch === "a") {
      suffixA++;
    }
  }
  // 分割点在最左侧时，需要删除所有 'a'
  minDeletions = suffixA;
  for (const ch of s) {
    if (ch === "a") {
      // 左侧多一个 'a'，右侧少一个 'a'
      suffixA--;
    } else {
      // 若把当前 'b' 放在左侧，需要删除它
      suffixA++;
    }
    // 维护最小删除次数
    minDeletions = Math.min(minDeletions, suffixA);
  }
  return minDeletions;
};

/**
 * 方法二：动态规划，贪心更新最优删除次数。
 *
 * @param s - 仅包含 'a' 与 'b' 的字符串
 * @returns 使字符串平衡的最少删除次数
 */
var minimumDeletions = function (s: string): number {
  // deletionsB：将当前前缀变成平衡串的最少删除数
  let deletionsB = 0;
  // countB：当前前缀中 'b' 的数量
  let countB = 0;
  for (const ch of s) {
    if (ch === "a") {
      // 遇到 'a'：要么删掉该 'a'（deletionsB + 1），要么删掉之前的所有 'b'
      deletionsB = Math.min(countB, deletionsB + 1);
    } else {
      // 遇到 'b'：保留它不会破坏平衡，只需计数
      countB += 1;
    }
  }
  return deletionsB;
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：删除尽可能少的字符，使得字符串中不出现 "ba" 的逆序对。
   - 关键特点：仅有 'a' 与 'b'，平衡串等价于形如 "aaaa...bbbb"。
   - 目标：最小删除次数。

2. 解题思路
   核心思想
   - 方法一：枚举分割点，左侧只保留 'a'，右侧只保留 'b'。
   - 方法二：动态规划滚动维护“当前前缀的最小删除数”。

   算法步骤（方法一）
   1) 统计全串 'a' 的数量作为初始删除数。
   2) 从左到右移动分割点：
      - 遇到 'a'：右侧 'a' 数量减少。
      - 遇到 'b'：若放在左侧必须删除，删除数 +1。
   3) 取所有分割点的最小值。

   算法步骤（方法二）
   1) countB 记录前缀中 'b' 的数量。
   2) deletionsB 记录前缀变平衡所需的最小删除数。
   3) 遇到 'a' 时：要么删掉该 'a'，要么删掉之前所有 'b'。
   4) 遇到 'b' 时：保留并增加 countB。

3. 代码实现
   实现步骤
   - 方法一通过 suffixA 的变化快速计算每个分割点的删除数。
   - 方法二使用两个变量滚动更新，空间为 O(1)。

   关键函数说明
   - minimumDeletions（方法一）：枚举分割点，计算最小删除数。
   - minimumDeletions（方法二）：DP 滚动更新最优解。

4. 复杂度分析
   - 时间复杂度：O(n)，两种方法均为单次扫描。
   - 空间复杂度：O(1)。
   - 关键观察：平衡串结构固定为全 'a' 在前，'b' 在后。

5. 示例分析
   示例一：s = "aababbab"
   - 方法二递推后得到最小删除数 2。

   示例二：s = "bbaaaaabb"
   - 删除前两个 'b' 即可，最小删除数为 2。

   示例三：s = "aaaa"
   - 已平衡，删除数为 0。

   边界情况
   - 全是 'a' 或全是 'b'：无需删除。
   - 长度为 1：天然平衡。

6. 算法要点总结
   核心技巧
   - “平衡”等价于没有 "ba" 逆序对。
   - 分割点或动态规划都可在线性时间解决。

   优化要点
   - 使用滚动变量避免数组 DP。
   - 单次扫描即可得答案。

   类似问题
   - 最少删除使字符串满足单调性的题目。
   - 将字符串变成 "000...111" 的最少翻转/删除问题。

7. 常见错误
   - 混淆“删除 'a'”与“删除之前的 'b'”的取舍。
   - 忘记更新分割点对应的删除数。
   - 误以为需要双指针或栈，导致复杂度不必要增大。
*/
