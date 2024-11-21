/*
 * @lc app=leetcode.cn id=913 lang=rust
 *
 * [913] 猫和老鼠
 *
 * https://leetcode-cn.com/problems/cat-and-mouse/description/
 *
 * algorithms
 * Hard (53.30%)
 * Likes:    140
 * Dislikes: 0
 * Total Accepted:    4.5K
 * Total Submissions: 8.4K
 * Testcase Example:  '[[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]'
 *
 * 两位玩家分别扮演猫和老鼠，在一张 无向 图上进行游戏，两人轮流行动。
 *
 * 图的形式是：graph[a] 是一个列表，由满足 ab 是图中的一条边的所有节点 b 组成。
 *
 * 老鼠从节点 1 开始，第一个出发；猫从节点 2 开始，第二个出发。在节点 0 处有一个洞。
 *
 * 在每个玩家的行动中，他们 必须 沿着图中与所在当前位置连通的一条边移动。例如，如果老鼠在节点 1 ，那么它必须移动到 graph[1] 中的任一节点。
 *
 * 此外，猫无法移动到洞中（节点 0）。
 *
 * 然后，游戏在出现以下三种情形之一时结束：
 *
 *
 * 如果猫和老鼠出现在同一个节点，猫获胜。
 * 如果老鼠到达洞中，老鼠获胜。
 * 如果某一位置重复出现（即，玩家的位置和移动顺序都与上一次行动相同），游戏平局。
 *
 *
 * 给你一张图 graph ，并假设两位玩家都都以最佳状态参与游戏：
 *
 *
 * 如果老鼠获胜，则返回 1；
 * 如果猫获胜，则返回 2；
 * 如果平局，则返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
 * 输出：0
 *
 *
 * 示例 2：
 *
 *
 * 输入：graph = [[1,3],[0],[3],[0,2]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= graph.length <= 50
 * 1 <= graph[i].length < graph.length
 * 0 <= graph[i][j] < graph.length
 * graph[i][j] != i
 * graph[i] 互不相同
 * 猫和老鼠在游戏中总是移动
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn cat_mouse_game(graph: Vec<Vec<i32>>) -> i32 {
        let n = graph.len();
        // dp[i][j][k] -> 老鼠位于节点 i 点，猫位于节点 j 点，游戏已经进行了 k 轮的状态的游戏结果
        let mut dp = vec![vec![vec![-1; n * 2]; n]; n];
        return Self::get_result(1, 2, 0, n, &mut dp, &graph);
    }

    fn get_result(
        i: usize,
        j: usize,
        k: usize,
        n: usize,
        dp: &mut Vec<Vec<Vec<i32>>>,
        graph: &Vec<Vec<i32>>,
    ) -> i32 {
        if k == n * 2 {
            return 0;
        }
        if dp[i][j][k] < 0 {
            if i == 0 {
                dp[i][j][k] = 1;
            } else if i == j {
                dp[i][j][k] = 2;
            } else {
                Self::get_next_result(i, j, k, n, dp, graph);
            }
        }
        dp[i][j][k]
    }

    fn get_next_result(
        i: usize,
        j: usize,
        k: usize,
        n: usize,
        dp: &mut Vec<Vec<Vec<i32>>>,
        graph: &Vec<Vec<i32>>,
    ) {
        let cur_move = if k % 2 == 0 { i } else { j };
        let default_result = if cur_move == i { 2 } else { 1 };
        let mut result = default_result;
        if let Some(next_nodes) = graph.get(cur_move) {
            for &next_node in next_nodes {
                if cur_move == j && next_node == 0 {
                    continue;
                }
                let next_mouse = if cur_move == i { next_node } else { i as i32 };
                let next_cat = if cur_move == j { next_node } else { j as i32 };
                let next_result =
                    Self::get_result(next_mouse as usize, next_cat as usize, k + 1, n, dp, graph);
                if next_result != default_result {
                    result = next_result;
                    if result != 0 {
                        break;
                    }
                }
            }
        }
        dp[i][j][k] = result;
    }
}
// @lc code=end
