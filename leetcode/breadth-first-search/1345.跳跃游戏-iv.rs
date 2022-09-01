/*
 * @lc app=leetcode.cn id=1345 lang=rust
 *
 * [1345] 跳跃游戏 IV
 *
 * https://leetcode-cn.com/problems/jump-game-iv/description/
 *
 * algorithms
 * Hard (36.73%)
 * Likes:    106
 * Dislikes: 0
 * Total Accepted:    9.2K
 * Total Submissions: 22.5K
 * Testcase Example:  '[100,-23,-23,404,100,23,23,23,3,404]'
 *
 * 给你一个整数数组 arr ，你一开始在数组的第一个元素处（下标为 0）。
 *
 * 每一步，你可以从下标 i 跳到下标：
 *
 *
 * i + 1 满足：i + 1 < arr.length
 * i - 1 满足：i - 1 >= 0
 * j 满足：arr[i] == arr[j] 且 i != j
 *
 *
 * 请你返回到达数组最后一个元素的下标处所需的 最少操作次数 。
 *
 * 注意：任何时候你都不能跳到数组外面。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [100,-23,-23,404,100,23,23,23,3,404]
 * 输出：3
 * 解释：那你需要跳跃 3 次，下标依次为 0 --> 4 --> 3 --> 9 。下标 9 为数组的最后一个元素的下标。
 *
 *
 * 示例 2：
 *
 * 输入：arr = [7]
 * 输出：0
 * 解释：一开始就在最后一个元素处，所以你不需要跳跃。
 *
 *
 * 示例 3：
 *
 * 输入：arr = [7,6,9,6,9,6,9,7]
 * 输出：1
 * 解释：你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。
 *
 *
 * 示例 4：
 *
 * 输入：arr = [6,1,9]
 * 输出：2
 *
 *
 * 示例 5：
 *
 * 输入：arr = [11,22,7,7,7,7,7,7,7,22,13]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 5 * 10^4
 * -10^8 <= arr[i] <= 10^8
 *
 *
 */

// @lc code=start
use std::collections::HashMap;
use std::collections::HashSet;
use std::collections::VecDeque;
impl Solution {
    pub fn min_jumps(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        let mut map: HashMap<i32, Vec<i32>> = HashMap::new();
        for i in 0..n {
            if let Some(list) = map.get_mut(&arr[i]) {
                list.push(i as i32);
            } else {
                map.insert(arr[i], vec![i as i32]);
            }
        }
        let mut visited = HashSet::new();
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((0, 0));
        visited.insert(0);
        while !queue.is_empty() {
            if let Some((idx, step)) = queue.pop_front() {
                if idx == n as i32 - 1 {
                    return step;
                }
                if let Some(val) = arr.get(idx as usize) {
                    if let Some(v) = map.get(val) {
                        for &i in v {
                            if !visited.contains(&i) {
                                visited.insert(i);
                                queue.push_back((i, step + 1));
                            }
                        }
                        map.remove(val);
                    }
                }
                if idx + 1 < n as i32 && !visited.contains(&(idx + 1)) {
                    visited.insert(idx + 1);
                    queue.push_back((idx + 1, step + 1));
                }
                if idx - 1 >= 0 && !visited.contains(&(idx - 1)) {
                    visited.insert(idx - 1);
                    queue.push_back((idx - 1, step + 1));
                }
            }
        }
        -1
    }
}
// @lc code=end
