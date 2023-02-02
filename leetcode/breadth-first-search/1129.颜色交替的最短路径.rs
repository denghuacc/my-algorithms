/*
 * @lc app=leetcode.cn id=1129 lang=rust
 *
 * [1129] 颜色交替的最短路径
 *
 * https://leetcode.cn/problems/shortest-path-with-alternating-colors/description/
 *
 * algorithms
 * Medium (40.81%)
 * Likes:    156
 * Dislikes: 0
 * Total Accepted:    13.2K
 * Total Submissions: 30.3K
 * Testcase Example:  '3\n[[0,1],[1,2]]\n[]'
 *
 * 在一个有向图中，节点分别标记为 0, 1, ..., n-1。图中每条边为红色或者蓝色，且存在自环或平行边。
 *
 * red_edges 中的每一个 [i, j] 对表示从节点 i 到节点 j 的红色有向边。类似地，blue_edges 中的每一个 [i, j]
 * 对表示从节点 i 到节点 j 的蓝色有向边。
 *
 * 返回长度为 n 的数组 answer，其中 answer[X] 是从节点 0 到节点 X
 * 的红色边和蓝色边交替出现的最短路径的长度。如果不存在这样的路径，那么 answer[x] = -1。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3, red_edges = [[0,1],[1,2]], blue_edges = []
 * 输出：[0,1,-1]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3, red_edges = [[0,1]], blue_edges = [[2,1]]
 * 输出：[0,1,-1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 3, red_edges = [[1,0]], blue_edges = [[2,1]]
 * 输出：[0,-1,-1]
 *
 *
 * 示例 4：
 *
 *
 * 输入：n = 3, red_edges = [[0,1]], blue_edges = [[1,2]]
 * 输出：[0,1,2]
 *
 *
 * 示例 5：
 *
 *
 * 输入：n = 3, red_edges = [[0,1],[0,2]], blue_edges = [[1,0]]
 * 输出：[0,1,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 100
 * red_edges.length <= 400
 * blue_edges.length <= 400
 * red_edges[i].length == blue_edges[i].length == 2
 * 0 <= red_edges[i][j], blue_edges[i][j] < n
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn shortest_alternating_paths(
        n: i32,
        red_edges: Vec<Vec<i32>>,
        blue_edges: Vec<Vec<i32>>,
    ) -> Vec<i32> {
        use std::collections::VecDeque;
        let mut next = vec![vec![vec![]; n as usize]; 2];
        for edge in red_edges {
            let x = edge[0] as usize;
            let y = edge[1] as usize;
            next[0][x].push(y);
        }
        for edge in blue_edges {
            let x = edge[0] as usize;
            let y = edge[1] as usize;
            next[1][x].push(y);
        }
        let mut dist = vec![vec![i32::MAX; n as usize]; 2];
        dist[0][0] = 0;
        dist[1][0] = 0;
        let mut queue = VecDeque::new();
        queue.push_back((0, 0));
        queue.push_back((0, 1));
        while !queue.is_empty() {
            if let Some((x, t)) = queue.pop_front() {
                for y in next[1 - t][x].clone() {
                    if dist[1 - t][y] != i32::MAX {
                        continue;
                    }
                    dist[1 - t][y] = dist[t][x] + 1;
                    queue.push_back((y, 1 - t));
                }
            }
        }

        let mut res = vec![0; n as usize];
        for i in 0..n as usize {
            res[i] = dist[0][i].min(dist[1][i]);
            if res[i] == i32::MAX {
                res[i] = -1;
            }
        }
        res
    }
}
// @lc code=end
