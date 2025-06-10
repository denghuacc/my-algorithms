/*
 * @lc app=leetcode.cn id=3442 lang=typescript
 *
 * [3442] 奇偶频次间的最大差值 I
 *
 * https://leetcode.cn/problems/maximum-difference-between-even-and-odd-frequency-i/description/
 *
 * algorithms
 * Easy (61.00%)
 * Likes:    10
 * Dislikes: 0
 * Total Accepted:    12.8K
 * Total Submissions: 19.6K
 * Testcase Example:  '"aaaaabbc"'
 *
 * 给你一个由小写英文字母组成的字符串 s 。
 *
 * 请你找出字符串中两个字符 a1 和 a2 的出现频次之间的 最大 差值 diff = a1 - a2，这两个字符需要满足：
 *
 *
 * a1 在字符串中出现 奇数次 。
 * a2 在字符串中出现 偶数次 。
 *
 *
 * 返回 最大 差值。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aaaaabbc"
 *
 * 输出：3
 *
 * 解释：
 *
 *
 * 字符 'a' 出现 奇数次 ，次数为 5 ；字符 'b' 出现 偶数次 ，次数为 2 。
 * 最大差值为 5 - 2 = 3 。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abcabcab"
 *
 * 输出：1
 *
 * 解释：
 *
 *
 * 字符 'a' 出现 奇数次 ，次数为 3 ；字符 'c' 出现 偶数次 ，次数为 2 。
 * 最大差值为 3 - 2 = 1 。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= s.length <= 100
 * s 仅由小写英文字母组成。
 * s 至少由一个出现奇数次的字符和一个出现偶数次的字符组成。
 *
 *
 */

// @lc code=start
function maxDifference(s: string): number {
  // 1. 统计每个字符的出现频次
  const cnt = new Map<string, number>();
  for (const c of s) {
    cnt.set(c, (cnt.get(c) || 0) + 1);
  }

  // 2. 分别找出奇数频次的最大值和偶数频次的最小值
  let maxOdd = -1; // 奇数频次的最大值
  let minEven = Infinity; // 偶数频次的最小值

  for (const c of cnt.values()) {
    if (c % 2 === 0) {
      // 偶数频次：找最小值
      minEven = Math.min(minEven, c);
    } else {
      // 奇数频次：找最大值
      maxOdd = Math.max(maxOdd, c);
    }
  }

  // 3. 返回最大差值：奇数频次最大值 - 偶数频次最小值
  return maxOdd - minEven;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在字符串中找到出现奇数次的字符的最大频次和出现偶数次的字符的最小频次
   - 计算这两个频次之间的最大差值

2. 算法分析：
   - 时间复杂度：O(n) - 需要遍历字符串一次统计频次，再遍历频次值一次
   - 空间复杂度：O(k) - k 为字符串中不同字符的数量，最多 26 个小写字母
   - 算法类型：哈希表统计 + 贪心选择

3. 实现要点：
   - 使用 Map 统计每个字符的出现频次
   - 遍历所有频次值，按奇偶性分类处理：
     * 奇数频次：记录最大值（要使差值最大）
     * 偶数频次：记录最小值（要使差值最大）
   - 返回 maxOdd - minEven

4. 关键观察：
   - 要使差值最大，需要选择奇数频次中的最大值
   - 要使差值最大，需要选择偶数频次中的最小值
   - 题目保证至少存在一个奇数频次字符和一个偶数频次字符

5. 边界情况：
   - 字符串长度最小为 3，保证了至少有字符存在
   - 题目保证奇数和偶数频次字符都存在，无需特殊处理空集情况

6. 优化思路：
   - 可以在统计频次的同时就进行奇偶分类，减少一次遍历
   - 由于字符集有限（26个小写字母），空间复杂度已经很优
*/
