/*
 * @lc app=leetcode.cn id=1791 lang=rust
 *
 * [1791] 找出星型图的中心节点
 *
 * https://leetcode-cn.com/problems/find-center-of-star-graph/description/
 *
 * algorithms
 * Easy (83.63%)
 * Likes:    26
 * Dislikes: 0
 * Total Accepted:    21K
 * Total Submissions: 25.2K
 * Testcase Example:  '[[1,2],[2,3],[4,2]]'
 *
 * 有一个无向的 星型 图，由 n 个编号从 1 到 n 的节点组成。星型图有一个 中心 节点，并且恰有 n - 1
 * 条边将中心节点与其他每个节点连接起来。
 *
 * 给你一个二维整数数组 edges ，其中 edges[i] = [ui, vi] 表示在节点 ui 和 vi 之间存在一条边。请你找出并返回 edges
 * 所表示星型图的中心节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：edges = [[1,2],[2,3],[4,2]]
 * 输出：2
 * 解释：如上图所示，节点 2 与其他每个节点都相连，所以节点 2 是中心节点。
 *
 *
 * 示例 2：
 *
 *
 * 输入：edges = [[1,2],[5,1],[1,3],[1,4]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3
 * edges.length == n - 1
 * edges[i].length == 2
 * 1 i, vi
 * ui != vi
 * 题目数据给出的 edges 表示一个有效的星型图
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn find_center(edges: Vec<Vec<i32>>) -> i32 {
    //     let n = edges.len();
    //     let mut map = std::collections::HashMap::new();
    //     for edge in edges {
    //         let (u, v) = (edge[0], edge[1]);
    //         let u_count = map.entry(u).or_insert(0);
    //         *u_count += 1;
    //         let v_count = map.entry(v).or_insert(0);
    //         *v_count += 1;
    //     }
    //     let mut center = 0;
    //     for (k, v) in map.into_iter() {
    //         if v == n {
    //             center = k;
    //         }
    //     }
    //     center
    // }

    pub fn find_center(edges: Vec<Vec<i32>>) -> i32 {
        let n = edges.len();
        let (u1, v1) = (edges[0][0], edges[0][1]);
        let (u2, v2) = (edges[1][0], edges[1][1]);

        if u1 == u2 || u1 == v2 {
            return u1;
        }
        v1
    }
}
// @lc code=end
