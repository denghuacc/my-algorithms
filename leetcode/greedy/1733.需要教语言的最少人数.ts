/*
 * @lc app=leetcode.cn id=1733 lang=typescript
 *
 * [1733] 需要教语言的最少人数
 *
 * https://leetcode.cn/problems/minimum-number-of-people-to-teach/description/
 *
 * algorithms
 * Medium (49.43%)
 * Likes:    41
 * Dislikes: 0
 * Total Accepted:    7.9K
 * Total Submissions: 14K
 * Testcase Example:  '2\n[[1],[2],[1,2]]\n[[1,2],[1,3],[2,3]]'
 *
 * 在一个由 m 个用户组成的社交网络里，我们获取到一些用户之间的好友关系。两个用户之间可以相互沟通的条件是他们都掌握同一门语言。
 *
 * 给你一个整数 n ，数组 languages 和数组 friendships ，它们的含义如下：
 *
 *
 * 总共有 n 种语言，编号从 1 到 n 。
 * languages[i] 是第 i 位用户掌握的语言集合。
 * friendships[i] = [u​​​​​​i​​​, v​​​​​​i] 表示 u^​​​​​​​​​​​i​​​​​ 和 vi
 * 为好友关系。
 *
 *
 * 你可以选择 一门 语言并教会一些用户，使得所有好友之间都可以相互沟通。请返回你 最少 需要教会多少名用户。
 * 请注意，好友关系没有传递性，也就是说如果 x 和 y 是好友，且 y 和 z 是好友， x 和 z 不一定是好友。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
 * 输出：1
 * 解释：你可以选择教用户 1 第二门语言，也可以选择教用户 2 第一门语言。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3, languages = [[2],[1,3],[1,2],[3]], friendships =
 * [[1,4],[1,2],[3,4],[2,3]]
 * 输出：2
 * 解释：教用户 1 和用户 3 第三门语言，需要教 2 名用户。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * languages.length == m
 * 1
 * 1
 * 1
 * 1 ​​​​​​i < v​​​​​​i
 * 1
 * 所有的好友关系 (u​​​​​i, v​​​​​​i) 都是唯一的。
 * languages[i] 中包含的值互不相同。
 *
 *
 */

// @lc code=start
function minimumTeachings(
  n: number,
  languages: number[][],
  friendships: number[][]
): number {
  // 第一步：找出所有无法沟通的用户对中涉及的用户
  // 使用Set避免重复添加同一个用户
  const unconnectedPersons = new Set<number>();

  // 遍历所有好友关系，检查是否能够沟通
  for (const [a, b] of friendships) {
    // 使用Set存储用户a掌握的所有语言，便于快速查找
    const languagesOfA = new Set<number>();
    let canCommunicate = false;

    // 将用户a掌握的所有语言加入Set（注意：用户编号从1开始，数组索引从0开始）
    for (const lang of languages[a - 1]) {
      languagesOfA.add(lang);
    }

    // 检查用户b掌握的语言中是否有与用户a相同的
    for (const lang of languages[b - 1]) {
      if (languagesOfA.has(lang)) {
        canCommunicate = true;
        break; // 找到一种共同语言即可沟通，直接跳出
      }
    }

    // 如果两个好友无法沟通，将他们都加入无法沟通的用户集合
    if (!canCommunicate) {
      unconnectedPersons.add(a - 1); // 转换为0-based索引
      unconnectedPersons.add(b - 1);
    }
  }

  // 第二步：统计无法沟通用户中每种语言的掌握人数
  // 目标是找到被最多人掌握的语言，教会不掌握该语言的人
  let maxLanguageCount = 0;
  const languageCount = new Array(n + 1).fill(0); // 语言编号从1开始，所以需要n+1长度

  // 遍历所有无法沟通的用户
  for (const personIndex of unconnectedPersons) {
    // 统计该用户掌握的每种语言
    for (const lang of languages[personIndex]) {
      languageCount[lang]++;
      // 实时更新最大语言掌握人数
      maxLanguageCount = Math.max(maxLanguageCount, languageCount[lang]);
    }
  }

  // 第三步：计算最少需要教会的人数
  // 总的无法沟通用户数 - 已经掌握最优语言的用户数 = 需要教会的用户数
  return unconnectedPersons.size - maxLanguageCount;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在社交网络中，找到最少需要教会多少用户一门语言，使得所有好友对都能沟通
   - 好友能沟通的条件：他们至少掌握一种相同的语言

2. 算法分析：
   - 时间复杂度：O(F × L + P × L)，其中F是好友关系数，L是平均每人掌握的语言数，P是无法沟通的用户数
   - 空间复杂度：O(P + n)，其中P是无法沟通的用户数，n是语言总数
   - 算法类型：贪心算法 + 集合操作

3. 实现要点：
   - 关键数据结构：Set用于快速查找和去重，数组用于计数
   - 核心算法步骤：找出问题用户 → 统计语言分布 → 选择最优语言
   - 边界情况处理：用户编号从1开始需要转换为0-based索引

4. 优化思路：
   - 性能优化：使用Set进行O(1)查找，避免嵌套循环
   - 空间优化：只统计无法沟通用户的语言，而非所有用户
   - 逻辑优化：一旦发现共同语言立即跳出，避免不必要的遍历

5. 算法优势：
   - 贪心策略保证全局最优：选择被最多问题用户掌握的语言
   - 时间复杂度相对较低，适合处理大规模数据
   - 逻辑清晰，易于理解和实现

6. 核心算法步骤：
   - 步骤1：遍历所有好友关系，找出无法沟通的用户对
   - 步骤2：收集所有无法沟通用户（去重）
   - 步骤3：统计这些用户中每种语言的掌握人数
   - 步骤4：选择掌握人数最多的语言作为教学语言
   - 步骤5：计算需要教会的人数 = 总问题用户数 - 已掌握最优语言人数

7. 示例分析：
   示例1：n=2, languages=[[1],[2],[1,2]], friendships=[[1,2],[1,3],[2,3]]
   
   第一步：检查好友关系
   - 用户1和用户2：languages[0]=[1], languages[1]=[2] → 无共同语言
   - 用户1和用户3：languages[0]=[1], languages[2]=[1,2] → 有共同语言1
   - 用户2和用户3：languages[1]=[2], languages[2]=[1,2] → 有共同语言2
   
   第二步：收集无法沟通用户
   - unconnectedPersons = {0, 1} (用户1和用户2，转换为0-based索引)
   
   第三步：统计语言分布
   - 用户1掌握语言[1]，用户2掌握语言[2]
   - languageCount[1] = 1, languageCount[2] = 1
   - maxLanguageCount = 1
   
   第四步：计算结果
   - 需要教会的人数 = 2 - 1 = 1
   
   解释：可以教用户1语言2，或教用户2语言1，只需要教1个人

8. 边界情况：
   - 所有好友都能沟通：返回0
   - 只有一对好友且无法沟通：根据语言分布决定
   - 某些用户不掌握任何语言：需要特殊处理（题目保证每人至少掌握一种语言）

9. 常见错误：
   - 忘记用户编号从1开始，数组索引从0开始的转换
   - 重复统计同一个用户（使用Set避免）
   - 没有考虑好友关系的对称性
   - 错误理解题意：以为需要让所有人都会同一种语言

10. 扩展思考：
    - 如果允许教多种语言如何优化？
    - 如果教不同语言的成本不同如何处理？
    - 如何处理动态添加好友关系的情况？
    - 能否用并查集或图算法来解决类似问题？
*/
