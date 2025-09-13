/*
 * @lc app=leetcode.cn id=3541 lang=typescript
 *
 * [3541] 找到频率最高的元音和辅音
 *
 * https://leetcode.cn/problems/find-most-frequent-vowel-and-consonant/description/
 *
 * algorithms
 * Easy (87.68%)
 * Likes:    14
 * Dislikes: 0
 * Total Accepted:    10.3K
 * Total Submissions: 11.6K
 * Testcase Example:  '"successes"'
 *
 * 给你一个由小写英文字母（'a' 到 'z'）组成的字符串 s。你的任务是找出出现频率 最高 的元音（'a'、'e'、'i'、'o'、'u'
 * 中的一个）和出现频率最高的辅音（除元音以外的所有字母），并返回这两个频率之和。
 *
 * 注意：如果有多个元音或辅音具有相同的最高频率，可以任选其中一个。如果字符串中没有元音或没有辅音，则其频率视为 0。
 * 一个字母 x 的 频率 是它在字符串中出现的次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "successes"
 *
 * 输出: 6
 *
 * 解释:
 *
 *
 * 元音有：'u' 出现 1 次，'e' 出现 2 次。最大元音频率 = 2。
 * 辅音有：'s' 出现 4 次，'c' 出现 2 次。最大辅音频率 = 4。
 * 输出为 2 + 4 = 6。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入: s = "aeiaeia"
 *
 * 输出: 3
 *
 * 解释:
 *
 *
 * 元音有：'a' 出现 3 次，'e' 出现 2 次，'i' 出现 2 次。最大元音频率 = 3。
 * s 中没有辅音。因此，最大辅音频率 = 0。
 * 输出为 3 + 0 = 3。
 *
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length <= 100
 * s 只包含小写英文字母
 *
 *
 */

// @lc code=start
/**
 * 找到字符串中频率最高的元音和辅音，并返回其频率之和
 *
 * @param s - 只包含小写英文字母的字符串
 * @returns 最高元音频率与最高辅音频率之和
 *
 * @example
 * ```typescript
 * maxFreqSum("successes"); // 6
 * maxFreqSum("aeiaeia"); // 3
 * ```
 */
function maxFreqSum(s: string): number {
  // 统计每个字母出现的频率
  const freqMap = new Map<string, number>();
  for (const c of s) {
    freqMap.set(c, (freqMap.get(c) ?? 0) + 1);
  }

  // 定义元音集合，便于判断
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let maxVowel = 0; // 记录最高元音频率
  let maxConsonant = 0; // 记录最高辅音频率

  // 遍历频率表，分别统计元音和辅音的最大频率
  for (const [char, freq] of freqMap) {
    if (vowels.has(char)) {
      maxVowel = Math.max(maxVowel, freq);
    } else {
      maxConsonant = Math.max(maxConsonant, freq);
    }
  }

  // 返回最高元音频率与最高辅音频率之和
  return maxVowel + maxConsonant;
}

/*
解题思路详解：

1. 问题本质：
  - 统计字符串中出现频率最高的元音和辅音，返回二者频率之和
  - 元音：a, e, i, o, u；辅音：其余小写字母

2. 算法分析：
  - 时间复杂度：O(n)，n为字符串长度（一次遍历统计频率+一次遍历查最大值）
  - 空间复杂度：O(1)，最多26个字母的频率表
  - 算法类型：哈希表计数

3. 核心算法步骤：
  - 步骤1：遍历字符串，统计每个字母出现的次数
  - 步骤2：遍历频率表，分别找出元音和辅音的最大频率
  - 步骤3：返回二者之和

4. 示例分析：
  - 示例1：s = "successes"
    - 频率表：s(4), u(1), c(2), e(2)
    - 元音最大频率：e(2)
    - 辅音最大频率：s(4)
    - 返回 2 + 4 = 6
  - 示例2：s = "aeiaeia"
    - 频率表：a(3), e(2), i(2)
    - 元音最大频率：a(3)
    - 辅音最大频率：0（无辅音）
    - 返回 3 + 0 = 3

5. 边界情况：
  - 没有元音：最大元音频率为0
  - 没有辅音：最大辅音频率为0
  - 所有字母频率都为1：返回2

6. 常见错误：
  - 忽略了元音/辅音可能不存在的情况
  - 频率统计时未正确初始化计数

7. 扩展思考：
  - 如果要求返回所有最高频率的元音/辅音字符，可以用数组收集
  - 如果字符串很长，可用定长数组代替Map进一步优化
*/
// @lc code=end
