/*
 * @lc app=leetcode.cn id=1036 lang=rust
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
use std::collections::{HashSet, VecDeque};
const FOUND: i32 = 1;
const OVER: i32 = 2;
const BLOCKED: i32 = 3;
const BOUNDARY: i32 = 1_000_000;
const DIRS: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];

impl Solution {
    pub fn is_escape_possible(blocked: Vec<Vec<i32>>, source: Vec<i32>, target: Vec<i32>) -> bool {
        let n = blocked.len();
        if n <= 1 {
            return true;
        }
        let max = n * (n - 1) / 2;

        let mut blocked_set = HashSet::new();
        for i in 0..n {
            blocked_set.insert((blocked[i][0], blocked[i][1]));
        }
        let result = bfs(&blocked_set, &source, &target, max);
        if result == FOUND {
            return true;
        } else if result == BLOCKED {
            return false;
        } else {
            let result = bfs(&blocked_set, &target, &source, max);
            return result != BLOCKED;
        }
    }
}

fn bfs(blocked_set: &HashSet<(i32, i32)>, start: &Vec<i32>, end: &Vec<i32>, max: usize) -> i32 {
    let mut visited = HashSet::new();
    visited.insert((start[0], start[1]));
    let mut queue = VecDeque::new();
    queue.push_back((start[0], start[1]));

    while !queue.is_empty() {
        let pos = queue.pop_front().unwrap();
        for i in 0..4 {
            let dir = DIRS[i];
            let nx = pos.0 + dir.0;
            let ny = pos.1 + dir.1;
            let new_pos = (nx, ny);
            if nx >= 0
                && nx < BOUNDARY
                && ny >= 0
                && ny < BOUNDARY
                && !blocked_set.contains(&new_pos)
                && !visited.contains(&new_pos)
            {
                if new_pos == (end[0], end[1]) {
                    return FOUND;
                }
                visited.insert(new_pos);
                if visited.len() > max {
                    return OVER;
                }
                queue.push_back(new_pos);
            }
        }
    }
    BLOCKED
}
// @lc code=end
