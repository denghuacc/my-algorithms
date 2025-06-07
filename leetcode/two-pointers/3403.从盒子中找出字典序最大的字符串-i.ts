/*
 * @lc app=leetcode.cn id=3403 lang=typescript
 *
 * [3403] 从盒子中找出字典序最大的字符串 I
 *
 * https://leetcode.cn/problems/find-the-lexicographically-largest-string-from-the-box-i/description/
 *
 * algorithms
 * Medium (30.11%)
 * Likes:    15
 * Dislikes: 0
 * Total Accepted:    6K
 * Total Submissions: 16.3K
 * Testcase Example:  '"dbca"\n2'
 *
 * 给你一个字符串 word 和一个整数 numFriends。
 *
 * Alice 正在为她的 numFriends 位朋友组织一个游戏。游戏分为多个回合，在每一回合中：
 *
 *
 * word 被分割成 numFriends 个 非空 字符串，且该分割方式与之前的任意回合所采用的都 不完全相同 。
 * 所有分割出的字符串都会被放入一个盒子中。
 *
 *
 * 在所有回合结束后，找出盒子中 字典序最大的 字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: word = "dbca", numFriends = 2
 *
 * 输出: "dbc"
 *
 * 解释:
 *
 * 所有可能的分割方式为：
 *
 *
 * "d" 和 "bca"。
 * "db" 和 "ca"。
 * "dbc" 和 "a"。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入: word = "gggg", numFriends = 4
 *
 * 输出: "g"
 *
 * 解释:
 *
 * 唯一可能的分割方式为："g", "g", "g", 和 "g"。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= word.length <= 5 * 10^3
 * word 仅由小写英文字母组成。
 * 1 <= numFriends <= word.length
 *
 *
 */

// @lc code=start
// method 1: brute force
var answerString = function (word: string, numFriends: number): string {
  // 特殊情况：如果只有一个朋友，直接返回整个字符串
  if (numFriends === 1) {
    return word;
  }

  const n = word.length;
  let res = "";

  // 遍历每个可能的起始位置
  for (let i = 0; i < n; i++) {
    // 计算从位置i开始能取到的最长子字符串
    // 限制条件：需要为其他(numFriends-1)个朋友至少各留一个字符
    // 所以最多能取 n - (numFriends - 1) = n - numFriends + 1 个字符
    const maxLen = n - numFriends + 1;
    const endPos = Math.min(i + maxLen, n);
    const s = word.slice(i, endPos);

    // 更新字典序最大的字符串
    if (s > res) {
      res = s;
    }
  }

  return res;
};

// method 2: 最大后缀 + 双指针优化
var answerString = function (word: string, numFriends: number): string {
  // 特殊情况：只有一个朋友时直接返回整个字符串
  if (numFriends === 1) {
    return word;
  }

  const n = word.length;
  // 核心洞察：字典序最大的子字符串一定是某个后缀的前缀
  // 先找到字典序最大的后缀，再截取合法长度
  const last = lastSubstring(word);
  const m = last.length;
  // 截取长度不能超过 n - numFriends + 1（需要为其他朋友留位置）
  return last.slice(0, Math.min(m, n - numFriends + 1));

  /**
   * 使用双指针算法找到字典序最大的后缀
   * 算法思想：比较所有后缀，找出字典序最大的那个
   * 时间复杂度：O(n)，通过巧妙的跳跃策略避免重复比较
   */
  function lastSubstring(s: string): string {
    const n = s.length;
    let i = 0; // 当前候选的最大后缀起始位置
    let j = 1; // 正在比较的后缀起始位置

    while (j < n) {
      let k = 0; // 比较的偏移量

      // 从位置i和j开始，逐字符比较相同的前缀长度
      while (j + k < n && s[i + k] === s[j + k]) {
        k++;
      }

      // 比较结束时有两种情况：
      // 1. j+k >= n：j位置的后缀是i位置后缀的前缀，j不可能更大
      // 2. s[i+k] != s[j+k]：需要根据字符大小关系决定谁更大

      if (j + k < n && s[i + k] < s[j + k]) {
        // j位置开始的后缀字典序更大，更新候选位置
        const t = i;
        i = j;
        // 关键优化：j的下一个位置不需要从j+1开始
        // 因为从t到j+k-1的位置都不可能产生更大的后缀
        j = Math.max(j + 1, t + k + 1);
      } else {
        // i位置开始的后缀字典序更大或相等，j位置被淘汰
        // 同样的优化：跳过已知不可能更优的位置
        j = j + k + 1;
      }
    }

    // 返回从最优位置i开始到末尾的后缀
    return s.slice(i, n);
  }
};

// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将字符串分割成numFriends个非空部分的所有可能方式
   - 从所有分割产生的子字符串中找出字典序最大的
   - 关键洞察：要让某个子字符串字典序最大，应该尽可能让它更长，且从字典序大的字符开始

2. 方法一：贪心 + 枚举
   - 时间复杂度：O(n²) - 外层循环O(n)，内层字符串比较O(n)
   - 空间复杂度：O(n) - 存储临时字符串
   - 算法类型：贪心算法 + 枚举
   - 核心思想：枚举每个起始位置，取最长的合法前缀

3. 方法二：最大后缀 + 双指针优化
   - 时间复杂度：O(n) - 双指针遍历一次字符串，巧妙跳跃避免重复
   - 空间复杂度：O(n) - 存储最大后缀字符串
   - 算法类型：双指针 + 字符串算法
   - 核心洞察：字典序最大的子字符串一定是某个位置开始到末尾的后缀的前缀
   - 关键思想：
     * 先用双指针算法找到字典序最大的后缀
     * 再截取符合长度限制的前缀部分

4. 最大后缀算法要点：
   - i指针：当前候选的最大后缀起始位置
   - j指针：正在比较的后缀起始位置  
   - k变量：比较时的偏移量，用于逐字符比较
   - 关键优化：当某个位置被淘汰时，跳过已知不可能更优的中间位置
   - 算法保证：每个字符最多被比较常数次，总体O(n)复杂度

5. 双指针跳跃策略：
   - 当s[i+k] < s[j+k]时：i位置被淘汰，更新i=j，j跳到合适位置
   - 当s[i+k] >= s[j+k]时：j位置被淘汰，j跳过k+1个位置
   - 跳跃的原理：利用已比较的相同前缀信息，避免重复比较
   - 类似于KMP算法的思想，但应用在后缀比较上

6. 两种方法对比：
   - 方法一：O(n²)复杂度，思路直观，适合理解题意
   - 方法二：O(n)复杂度，算法精妙，利用了字符串的深层性质
   - 核心区别：方法二发现了"最优解必然是某个后缀的前缀"这一关键性质
   - 实际应用：方法二更优，是字符串算法的经典应用

7. 示例分析（最大后缀视角）：
   - word = "dbca", numFriends = 2
   - 所有后缀：["dbca", "bca", "ca", "a"]
   - lastSubstring过程：
     * i=0("dbca"), j=1("bca"): 'd'>'b'，j被淘汰，j跳到2
     * i=0("dbca"), j=2("ca"): 'd'>'c'，j被淘汰，j跳到3  
     * i=0("dbca"), j=3("a"): 'd'>'a'，j被淘汰，j跳到4结束
   - 最大后缀："dbca"，截取前3个字符得到"dbc"

8. 优化要点与技巧总结：
   - 方法一的优化：可以考虑从字典序大的字符开始枚举，提前剪枝
   - 方法二的核心优化：
     * 关键洞察：答案必然是某个后缀的前缀（避免了枚举所有子字符串）
     * 双指针跳跃：利用字符串比较的中间结果，避免重复比较
     * 时间复杂度从O(n²)优化到O(n)
   - 算法选择建议：
     * 理解题意阶段：使用方法一，逻辑清晰
     * 追求性能时：使用方法二，充分利用字符串性质
     * 面试场景：先展示方法一思路，再优化到方法二
*/
