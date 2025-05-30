/*
 * @lc app=leetcode.cn id=2359 lang=typescript
 *
 * [2359] 找到离给定两个节点最近的节点
 *
 * https://leetcode.cn/problems/find-closest-node-to-given-two-nodes/description/
 *
 * algorithms
 * Medium (33.01%)
 * Likes:    39
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 36.6K
 * Testcase Example:  '[2,2,3,-1]\n0\n1'
 *
 * 给你一个 n 个节点的有向图，节点编号为 0 到 n - 1，每个节点至多有一条出边。
 *
 * 有向图用大小为 n 下标从 0 开始的数组 edges 表示，表示节点 i 有一条有向边指向 edges[i]。如果节点 i 没有出边，那么
 * edges[i] == -1。
 *
 * 同时给你两个节点 node1 和 node2。
 *
 * 请你返回一个从 node1 和 node2 都能到达节点的编号，使节点 node1 和节点 node2 到这个节点的距离
 * 较大值最小化。如果有多个答案，请返回最小的节点编号。如果答案不存在，返回 -1。
 *
 * 注意 edges 可能包含环。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：edges = [2,2,3,-1], node1 = 0, node2 = 1
 * 输出：2
 * 解释：从节点 0 到节点 2 的距离为 1，从节点 1 到节点 2 的距离为 1。
 * 两个距离的较大值为 1。我们无法得到一个比 1 更小的较大值，所以我们返回节点 2。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：edges = [1,2,-1], node1 = 0, node2 = 2
 * 输出：2
 * 解释：节点 0 到节点 2 的距离为 2，节点 2 到它自己的距离为 0。
 * 两个距离的较大值为 2。我们无法得到一个比 2 更小的较大值，所以我们返回节点 2。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == edges.length
 * 2 <= n <= 10^5
 * -1 <= edges[i] < n
 * edges[i] != i
 * 0 <= node1, node2 < n
 *
 *
 */

export {};

// @lc code=start
function closestMeetingNode(
  edges: number[],
  node1: number,
  node2: number
): number {
  const n = edges.length;

  /**
   * 计算从起始节点到所有可达节点的距离
   * @param start 起始节点
   * @returns 距离数组，-1表示不可达
   */
  const getDistances = (start: number): number[] => {
    const distances = new Array(n).fill(-1); // -1表示未访问/不可达
    let current = start;
    let distance = 0;

    // 沿着路径前进，直到遇到死胡同(-1)或环(已访问节点)
    while (current !== -1 && distances[current] === -1) {
      distances[current] = distance;
      current = edges[current];
      distance++;
    }

    return distances;
  };

  // 分别计算从两个起始节点出发的距离
  const dist1 = getDistances(node1);
  const dist2 = getDistances(node2);

  let minMaxDist = Infinity; // 记录最小的最大距离
  let result = -1; // 结果节点

  // 遍历所有节点，寻找两个起始节点都能到达的节点
  for (let node = 0; node < n; node++) {
    // 只考虑两个起始节点都能到达的节点
    if (dist1[node] !== -1 && dist2[node] !== -1) {
      // 计算到当前节点的最大距离
      const maxDist = Math.max(dist1[node], dist2[node]);

      // 更新最优解（距离更小，或距离相同但节点编号更小）
      if (maxDist < minMaxDist) {
        minMaxDist = maxDist;
        result = node;
      }
    }
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个在功能图中寻找最优汇聚点的问题
   - 每个节点最多一条出边，形成链状结构或环状结构
   - 目标是最小化从两个起点到汇聚点的最大距离

2. 算法分析：
   - 时间复杂度：O(n)，每个节点最多被访问常数次
   - 空间复杂度：O(n)，存储距离数组
   - 关键观察：由于图的特殊性质，从任一点出发的路径是唯一的

3. 边界情况：
   - 如果两个起点没有共同可达节点，返回-1
   - 如果起点就是最优解，也能正确处理
   - 环的情况通过检查已访问节点来处理

4. 优化要点：
   - 使用数组代替Map提高性能
   - 用-1标记未访问，避免额外的visited集合
   - 按节点编号顺序遍历，自动保证返回最小编号
*/
