/*
 * @lc app=leetcode.cn id=2055 lang=rust
 *
 * [2055] 蜡烛之间的盘子
 *
 * https://leetcode-cn.com/problems/plates-between-candles/description/
 *
 * algorithms
 * Medium (39.27%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    6K
 * Total Submissions: 14K
 * Testcase Example:  '"**|**|***|"\n[[2,5],[5,9]]'
 *
 * 给你一个长桌子，桌子上盘子和蜡烛排成一列。给你一个下标从 0 开始的字符串 s ，它只包含字符 '*' 和 '|' ，其中 '*' 表示一个 盘子
 * ，'|' 表示一支 蜡烛 。
 *
 * 同时给你一个下标从 0 开始的二维整数数组 queries ，其中 queries[i] = [lefti, righti] 表示 子字符串
 * s[lefti...righti] （包含左右端点的字符）。对于每个查询，你需要找到 子字符串中 在 两支蜡烛之间 的盘子的 数目 。如果一个盘子在
 * 子字符串中 左边和右边 都 至少有一支蜡烛，那么这个盘子满足在 两支蜡烛之间 。
 *
 *
 * 比方说，s = "||**||**|*" ，查询 [3, 8] ，表示的是子字符串 "*||**|" 。子字符串中在两支蜡烛之间的盘子数目为 2
 * ，子字符串中右边两个盘子在它们左边和右边 都 至少有一支蜡烛。
 *
 *
 * 请你返回一个整数数组 answer ，其中 answer[i] 是第 i 个查询的答案。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 * 输入：s = "**|**|***|", queries = [[2,5],[5,9]]
 * 输出：[2,3]
 * 解释：
 * - queries[0] 有两个盘子在蜡烛之间。
 * - queries[1] 有三个盘子在蜡烛之间。
 *
 *
 * 示例 2:
 *
 *
 *
 * 输入：s = "***|**|*****|**||**|*", queries =
 * [[1,17],[4,5],[14,17],[5,11],[15,16]]
 * 输出：[9,0,0,0,0]
 * 解释：
 * - queries[0] 有 9 个盘子在蜡烛之间。
 * - 另一个查询没有盘子在蜡烛之间。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= s.length <= 10^5
 * s 只包含字符 '*' 和 '|' 。
 * 1 <= queries.length <= 10^5
 * queries[i].length == 2
 * 0 <= lefti <= righti < s.length
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn plates_between_candles(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = s.len();
        let mut s = s.chars().collect::<Vec<char>>();
        let mut pre_sum = vec![0; n];
        let mut sum = 0;
        for i in 0..n {
            if s[i] == '*' {
                sum += 1;
            }
            pre_sum[i] = sum;
        }
        let mut left: Vec<i32> = vec![0; n];
        let mut l: i32 = -1;
        for i in 0..n {
            if s[i] != '*' {
                l = i as i32;
            }
            left[i] = l;
        }
        let mut right: Vec<i32> = vec![0; n];
        let mut r: i32 = -1;
        for i in (0..n).rev() {
            if s[i] != '*' {
                r = i as i32;
            }
            right[i] = r;
        }
        let q_len = queries.len();
        let mut res = vec![0; q_len];
        for i in 0..q_len {
            let x = right[queries[i][0] as usize];
            let y = left[queries[i][1] as usize];
            res[i] = if x == -1 || y == -1 || x >= y {
                0
            } else {
                pre_sum[y as usize] - pre_sum[x as usize]
            }
        }
        res
    }
}
// @lc code=end
