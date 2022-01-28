/*
 * @lc app=leetcode.cn id=1996 lang=typescript
 *
 * [1996] 游戏中弱角色的数量
 *
 * https://leetcode-cn.com/problems/the-number-of-weak-characters-in-the-game/description/
 *
 * algorithms
 * Medium (25.96%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    9.1K
 * Total Submissions: 28.6K
 * Testcase Example:  '[[5,5],[6,3],[3,6]]'
 *
 * 你正在参加一个多角色游戏，每个角色都有两个主要属性：攻击 和 防御 。给你一个二维整数数组 properties ，其中 properties[i] =
 * [attacki, defensei] 表示游戏中第 i 个角色的属性。
 *
 * 如果存在一个其他角色的攻击和防御等级 都严格高于 该角色的攻击和防御等级，则认为该角色为 弱角色 。更正式地，如果认为角色 i 弱于 存在的另一个角色
 * j ，那么 attackj > attacki 且 defensej > defensei 。
 *
 * 返回 弱角色 的数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：properties = [[5,5],[6,3],[3,6]]
 * 输出：0
 * 解释：不存在攻击和防御都严格高于其他角色的角色。
 *
 *
 * 示例 2：
 *
 *
 * 输入：properties = [[2,2],[3,3]]
 * 输出：1
 * 解释：第一个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。
 *
 *
 * 示例 3：
 *
 *
 * 输入：properties = [[1,5],[10,4],[4,3]]
 * 输出：1
 * 解释：第三个角色是弱角色，因为第二个角色的攻击和防御严格大于该角色。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= properties.length <= 10^5
 * properties[i].length == 2
 * 1 <= attacki, defensei <= 10^5
 *
 *
 */

// @lc code=start
// sort
var numberOfWeakCharacters = function (properties: number[][]): number {
  // attack descending sort and defense ascending sort when attack is equal
  properties.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]));
  let res = 0;
  let maxDefense = 0;
  for (let i = 0; i < properties.length; i++) {
    const [, defense] = properties[i];
    if (defense < maxDefense) {
      res++;
    }
    maxDefense = Math.max(maxDefense, defense);
  }
  return res;
};

// sort + stack
var numberOfWeakCharacters = function (properties: number[][]): number {
  // attack ascending sort and defense descending sort when attack is equal
  properties.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
  let res = 0;
  let stack: number[] = [];
  for (let i = 0; i < properties.length; i++) {
    const [, defense] = properties[i];
    while (stack.length && stack[stack.length - 1] < defense) {
      stack.pop();
      res++;
    }
    stack.push(defense);
  }
  return res;
};
// @lc code=end
