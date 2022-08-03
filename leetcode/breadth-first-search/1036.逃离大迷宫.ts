/*
 * @lc app=leetcode.cn id=1036 lang=typescript
 *
 * [1036] 逃离大迷宫
 *
 * https://leetcode-cn.com/problems/escape-a-large-maze/description/
 *
 * algorithms
 * Hard (30.54%)
 * Likes:    143
 * Dislikes: 0
 * Total Accepted:    14.2K
 * Total Submissions: 31.6K
 * Testcase Example:  '[[0,1],[1,0]]\n[0,0]\n[0,2]'
 *
 * 在一个 10^6 x 10^6 的网格中，每个网格上方格的坐标为 (x, y) 。
 *
 * 现在从源方格 source = [sx, sy] 开始出发，意图赶往目标方格 target = [tx, ty] 。数组 blocked
 * 是封锁的方格列表，其中每个 blocked[i] = [xi, yi] 表示坐标为 (xi, yi) 的方格是禁止通行的。
 *
 * 每次移动，都可以走到网格中在四个方向上相邻的方格，只要该方格 不 在给出的封锁列表 blocked 上。同时，不允许走出网格。
 *
 * 只有在可以通过一系列的移动从源方格 source 到达目标方格 target 时才返回 true。否则，返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
 * 输出：false
 * 解释：
 * 从源方格无法到达目标方格，因为我们无法在网格中移动。
 * 无法向北或者向东移动是因为方格禁止通行。
 * 无法向南或者向西移动是因为不能走出网格。
 *
 * 示例 2：
 *
 *
 * 输入：blocked = [], source = [0,0], target = [999999,999999]
 * 输出：true
 * 解释：
 * 因为没有方格被封锁，所以一定可以到达目标方格。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * blocked[i].length == 2
 * 0 i, yi < 10^6
 * source.length == target.length == 2
 * 0 x, sy, tx, ty < 10^6
 * source != target
 * 题目数据保证 source 和 target 不在封锁列表内
 *
 *
 */

// @lc code=start
function isEscapePossible(
  blocked: number[][],
  source: number[],
  target: number[]
): boolean {
  const FOUND = 1;
  const OVER = 2;
  const BLOCKED = 3;
  const BOUNDARY = 1_000_000;
  const DIRS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const n = blocked.length;
  if (n <= 1) {
    return true;
  }
  const max = (n * (n - 1)) >> 1;
  const blockedSet: Set<string> = new Set();
  for (const pos of blocked) {
    blockedSet.add(pos.join(","));
  }
  const result = bfs(blockedSet, source, target, max);
  if (result === FOUND) {
    return true;
  } else if (result === BLOCKED) {
    return false;
  } else {
    const res = bfs(blockedSet, target, source, max);
    return res !== BLOCKED;
  }

  function bfs(
    blockedSet: Set<string>,
    start: number[],
    end: number[],
    max: number
  ): number {
    const visited: Set<string> = new Set();
    visited.add(start.join(","));
    const queue: number[][] = [];
    queue.push(start);

    while (queue.length) {
      const pos = queue.shift()!;
      for (const [x, y] of DIRS) {
        const nx = pos[0] + x;
        const ny = pos[1] + y;
        const newPos = [nx, ny];
        if (
          nx >= 0 &&
          nx < BOUNDARY &&
          ny >= 0 &&
          ny < BOUNDARY &&
          !blockedSet.has(newPos.join(",")) &&
          !visited.has(newPos.join(","))
        ) {
          if (newPos.join(",") === end.join(",")) {
            return FOUND;
          }
          visited.add(newPos.join(","));
          if (visited.size > max) {
            return OVER;
          }
          queue.push(newPos);
        }
      }
    }
    return BLOCKED;
  }
}
// @lc code=end
