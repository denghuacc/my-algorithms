/*
 * @lc app=leetcode.cn id=1654 lang=rust
 *
 * [1654] 到家的最少跳跃次数
 *
 * https://leetcode.cn/problems/minimum-jumps-to-reach-home/description/
 *
 * algorithms
 * Medium (31.24%)
 * Likes:    123
 * Dislikes: 0
 * Total Accepted:    13.1K
 * Total Submissions: 38.4K
 * Testcase Example:  '[14,4,18,1,15]\n3\n15\n9'
 *
 * 有一只跳蚤的家在数轴上的位置 x 处。请你帮助它从位置 0 出发，到达它的家。
 *
 * 跳蚤跳跃的规则如下：
 *
 *
 * 它可以 往前 跳恰好 a 个位置（即往右跳）。
 * 它可以 往后 跳恰好 b 个位置（即往左跳）。
 * 它不能 连续 往后跳 2 次。
 * 它不能跳到任何 forbidden 数组中的位置。
 *
 *
 * 跳蚤可以往前跳 超过 它的家的位置，但是它 不能跳到负整数 的位置。
 *
 * 给你一个整数数组 forbidden ，其中 forbidden[i] 是跳蚤不能跳到的位置，同时给你整数 a， b 和 x
 * ，请你返回跳蚤到家的最少跳跃次数。如果没有恰好到达 x 的可行方案，请你返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9
 * 输出：3
 * 解释：往前跳 3 次（0 -> 3 -> 6 -> 9），跳蚤就到家了。
 *
 *
 * 示例 2：
 *
 *
 * 输入：forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11
 * 输出：-1
 *
 *
 * 示例 3：
 *
 *
 * 输入：forbidden = [1,6,2,14,5,17,4], a = 16, b = 9, x = 7
 * 输出：2
 * 解释：往前跳一次（0 -> 16），然后往回跳一次（16 -> 7），跳蚤就到家了。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 0
 * forbidden 中所有位置互不相同。
 * 位置 x 不在 forbidden 中。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn minimum_jumps(forbidden: Vec<i32>, a: i32, b: i32, x: i32) -> i32 {
        use std::collections::{HashSet, VecDeque};
        let lower = 0;
        let mut upper = 0;
        for &val in forbidden.iter() {
            upper = upper.max(val);
        }
        upper = (upper + a).max(x) + b;
        let mut visited: HashSet<i32> = HashSet::new();
        visited.insert(0);
        let mut forbidden: HashSet<i32> = forbidden.into_iter().collect();
        let mut queue = VecDeque::new();
        queue.push_back((0, 1, 0));
        while !queue.is_empty() {
            if let Some((position, direction, step)) = queue.pop_front() {
                if position == x {
                    return step;
                }
                let next_position = position + a;
                let next_direction = 1;
                if lower <= next_position
                    && next_position <= upper
                    && !visited.contains(&(next_position * next_direction))
                    && !forbidden.contains(&next_position)
                {
                    visited.insert(next_position * next_direction);
                    queue.push_back((next_position, next_direction, step + 1));
                }
                if direction == 1 {
                    let next_position = position - b;
                    let next_direction = -1;
                    if lower <= next_position
                        && next_position <= upper
                        && !visited.contains(&(next_position * next_direction))
                        && !forbidden.contains(&next_position)
                    {
                        visited.insert(next_position * next_direction);
                        queue.push_back((next_position, next_direction, step + 1));
                    }
                }
            }
        }
        -1
    }
}
// @lc code=end
