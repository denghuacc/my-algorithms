/*
 * @lc app=leetcode.cn id=1079 lang=typescript
 *
 * [1079] 活字印刷
 *
 * https://leetcode.cn/problems/letter-tile-possibilities/description/
 *
 * algorithms
 * Medium (73.90%)
 * Likes:    185
 * Dislikes: 0
 * Total Accepted:    21.3K
 * Total Submissions: 27.9K
 * Testcase Example:  '"AAB"'
 *
 * 你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。
 *
 * 注意：本题中，每个活字字模只能使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入："AAB"
 * 输出：8
 * 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
 *
 *
 * 示例 2：
 *
 *
 * 输入："AAABBC"
 * 输出：188
 *
 *
 * 示例 3：
 *
 *
 * 输入："V"
 * 输出：1
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= tiles.length <= 7
 * tiles 由大写英文字母组成
 *
 *
 */

// @lc code=start
function numTilePossibilities(tiles: string): number {
  const cnt: Map<string, number> = new Map();
  for (const tile of tiles) {
    cnt.set(tile, (cnt.get(tile) || 0) + 1);
  }
  const set: Set<string> = new Set(tiles);
  const n = tiles.length;
  return dfs(0) - 1;

  function dfs(i: number): number {
    if (i === n) return 1;
    let res = 1;
    for (const tile of set) {
      if (cnt.get(tile)! > 0) {
        cnt.set(tile, cnt.get(tile)! - 1);
        res += dfs(i + 1);
        cnt.set(tile, cnt.get(tile)! + 1);
      }
    }
    return res;
  }
}
// @lc code=end
