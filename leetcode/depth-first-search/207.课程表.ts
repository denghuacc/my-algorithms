/*
 * @lc app=leetcode.cn id=207 lang=typescript
 *
 * [207] 课程表
 *
 * https://leetcode-cn.com/problems/course-schedule/description/
 *
 * algorithms
 * Medium (43.30%)
 * Likes:    404
 * Dislikes: 0
 * Total Accepted:    45.8K
 * Total Submissions: 88.2K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。
 *
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]
 *
 * 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？
 *
 *
 *
 * 示例 1:
 *
 * 输入: 2, [[1,0]]
 * 输出: true
 * 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
 *
 * 示例 2:
 *
 * 输入: 2, [[1,0],[0,1]]
 * 输出: false
 * 解释: 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
 *
 *
 *
 * 提示：
 *
 *
 * 输入的先决条件是由 边缘列表 表示的图形，而不是 邻接矩阵 。详情请参见图的表示法。
 * 你可以假定输入的先决条件中没有重复的边。
 * 1 <= numCourses <= 10^5
 *
 *
 */

// @lc code=start
// graph dfs
var canFinish = function (
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const adjacency: number[][] = [];
  for (let i = 0; i < numCourses; i++) {
    adjacency.push([]);
  }

  const flags: number[] = new Array(numCourses).fill(0);
  for (const cp of prerequisites) {
    adjacency[cp[1]].push(cp[0]);
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(adjacency, flags, i)) return false;
  }
  return true;

  function dfs(adjacency: number[][], flags: number[], i: number) {
    if (flags[i] === 1) return false;
    if (flags[i] === -1) return true;
    flags[i] = 1;
    for (const j of adjacency[i]) {
      if (!dfs(adjacency, flags, j)) return false;
    }
    flags[i] = -1;
    return true;
  }
};

// graph bfs
var canFinish = function (
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const adjacency: number[][] = [];
  for (let i = 0; i < numCourses; i++) {
    adjacency.push([]);
  }

  const indegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];

  for (const cp of prerequisites) {
    indegree[cp[0]]++;
    adjacency[cp[1]].push(cp[0]);
  }

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const pre = queue.shift()!;
    numCourses--;
    for (const cur of adjacency[pre]) {
      if (--indegree[cur] === 0) queue.push(cur);
    }
  }

  return numCourses === 0;
};
// @lc code=end
