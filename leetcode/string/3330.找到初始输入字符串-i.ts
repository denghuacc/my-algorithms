/*
 * @lc app=leetcode.cn id=3330 lang=typescript
 *
 * [3330] 找到初始输入字符串 I
 *
 * https://leetcode.cn/problems/find-the-original-typed-string-i/description/
 *
 * algorithms
 * Easy (69.19%)
 * Likes:    13
 * Dislikes: 0
 * Total Accepted:    12.1K
 * Total Submissions: 16.1K
 * Testcase Example:  '"abbcccc"'
 *
 * Alice 正在她的电脑上输入一个字符串。但是她打字技术比较笨拙，她 可能 在一个按键上按太久，导致一个字符被输入 多次 。
 *
 * 尽管 Alice 尽可能集中注意力，她仍然可能会犯错 至多 一次。
 *
 * 给你一个字符串 word ，它表示 最终 显示在 Alice 显示屏上的结果。
 *
 * 请你返回 Alice 一开始可能想要输入字符串的总方案数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：word = "abbcccc"
 *
 * 输出：5
 *
 * 解释：
 *
 * 可能的字符串包括："abbcccc" ，"abbccc" ，"abbcc" ，"abbc" 和 "abcccc" 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：word = "abcd"
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一可能的字符串是 "abcd" 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：word = "aaaa"
 *
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= word.length <= 100
 * word 只包含小写英文字母。
 *
 *
 */

// @lc code=start
function possibleStringCount(word: string): number {
  const n = word.length;

  // 初始化结果为1，表示原始字符串本身就是一种可能
  let res = 1;

  // 遍历字符串，寻找连续相同的字符
  for (let i = 1; i < n; i++) {
    // 如果当前字符与前一个字符相同，说明可能是按键太久导致的重复
    // 这种情况下，我们可以选择删除当前字符，增加一种可能的原始字符串
    if (word[i] === word[i - 1]) {
      res++;
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定一个可能包含重复字符的字符串，求Alice原始想要输入的字符串可能方案数
   - 关键约束：Alice最多犯一次错误（按键太久导致字符重复）
   - 每个连续的相同字符组合都提供了删除字符的机会

2. 算法分析：
   - 时间复杂度：O(n) - 只需要遍历一次字符串
   - 空间复杂度：O(1) - 只使用了常数级别的额外空间
   - 算法类型：贪心算法/计数

3. 实现要点：
   - 核心观察：每当遇到连续相同的字符时，我们就有一种额外的选择
   - 对于连续的k个相同字符，我们可以选择保留1到k个字符
   - 但由于Alice最多犯一次错误，所以每个连续字符段最多贡献一种额外可能
   - 遍历过程中，每发现一对相邻相同字符，就增加一种可能

4. 示例分析：
   - "abbcccc": 
     * 原字符串: "abbcccc" (1种)
     * 删除一个'b': "abcccc" (1种)  
     * 删除一个'c': "abbccc", "abbcc", "abbc" (3种)
     * 总计: 5种可能
   
   - "abcd": 没有相邻相同字符，只有1种可能
   
   - "aaaa": 有3对相邻相同字符，所以有4种可能

5. 优化要点：
   - 一次遍历即可完成计算，无需额外存储
   - 直接计数相邻相同字符对，避免复杂的字符串操作
   - 贪心策略：每个连续字符段都尽可能提供删除选择

6. 边界情况：
   - 单字符字符串：只有1种可能
   - 全部字符相同：可能数 = 字符串长度
   - 全部字符不同：只有1种可能
*/

export {};
