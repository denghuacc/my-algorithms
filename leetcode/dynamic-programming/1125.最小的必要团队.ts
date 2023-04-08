/*
 * @lc app=leetcode.cn id=1125 lang=typescript
 *
 * [1125] 最小的必要团队
 *
 * https://leetcode.cn/problems/smallest-sufficient-team/description/
 *
 * algorithms
 * Hard (51.10%)
 * Likes:    118
 * Dislikes: 0
 * Total Accepted:    7.2K
 * Total Submissions: 12.8K
 * Testcase Example:  '["java","nodejs","reactjs"]\n[["java"],["nodejs"],["nodejs","reactjs"]]'
 *
 * 作为项目经理，你规划了一份需求的技能清单 req_skills，并打算从备选人员名单 people 中选出些人组成一个「必要团队」（ 编号为 i
 * 的备选人员 people[i] 含有一份该备选人员掌握的技能列表）。
 *
 * 所谓「必要团队」，就是在这个团队中，对于所需求的技能列表 req_skills
 * 中列出的每项技能，团队中至少有一名成员已经掌握。可以用每个人的编号来表示团队中的成员：
 *
 *
 * 例如，团队 team = [0, 1, 3] 表示掌握技能分别为 people[0]，people[1]，和 people[3] 的备选人员。
 *
 *
 * 请你返回 任一 规模最小的必要团队，团队成员用人员编号表示。你可以按 任意顺序 返回答案，题目数据保证答案存在。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：req_skills = ["java","nodejs","reactjs"], people =
 * [["java"],["nodejs"],["nodejs","reactjs"]]
 * 输出：[0,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：req_skills = ["algorithms","math","java","reactjs","csharp","aws"],
 * people =
 * [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * reqSkills[i] 由小写英文字母组成
 * reqSkills 中的所有字符串 互不相同
 * 1
 * 0
 * 1
 * people[i][j] 由小写英文字母组成
 * people[i] 中的所有字符串 互不相同
 * people[i] 中的每个技能是 reqSkills 中的技能
 * 题目数据保证「必要团队」一定存在
 *
 *
 */

// @lc code=start
// dp cv
function smallestSufficientTeam(
  reqSkills: string[],
  people: string[][]
): number[] {
  const n = reqSkills.length;
  const m = people.length;
  const skillIndex: Map<string, number> = new Map();
  for (let i = 0; i < n; i++) {
    skillIndex.set(reqSkills[i], i);
  }
  // dp[i] -> 技能集合为 i 的最小人数的数组
  const dp: number[][] = new Array(1 << n);
  dp[0] = [];
  for (let i = 0; i < m; i++) {
    let curSkill = 0;
    for (const s of people[i]) {
      curSkill |= 1 << skillIndex.get(s)!;
    }
    for (let prev = 0; prev < dp.length; prev++) {
      if (dp[prev] === undefined) {
        continue;
      }
      const comb = prev | curSkill;
      if (dp[comb] === undefined || dp[prev].length + 1 < dp[comb].length) {
        dp[comb] = [...dp[prev], i];
      }
    }
  }
  return dp[(1 << n) - 1];
}
// @lc code=end
