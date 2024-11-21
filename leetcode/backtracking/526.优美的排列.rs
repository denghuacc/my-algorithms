/*
 * @lc app=leetcode.cn id=526 lang=rust
 *
 * [526] 优美的排列
 *
 * https://leetcode-cn.com/problems/beautiful-arrangement/description/
 *
 * algorithms
 * Medium (73.49%)
 * Likes:    265
 * Dislikes: 0
 * Total Accepted:    34.3K
 * Total Submissions: 46.7K
 * Testcase Example:  '2'
 *
 * 假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 perm（下标从 1 开始），只要满足下述条件 之一 ，该数组就是一个 优美的排列
 * ：
 *
 *
 * perm[i] 能够被 i 整除
 * i 能够被 perm[i] 整除
 *
 *
 * 给你一个整数 n ，返回可以构造的 优美排列 的 数量 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2
 * 输出：2
 * 解释：
 * 第 1 个优美的排列是 [1,2]：
 * ⁠   - perm[1] = 1 能被 i = 1 整除
 * ⁠   - perm[2] = 2 能被 i = 2 整除
 * 第 2 个优美的排列是 [2,1]:
 * ⁠   - perm[1] = 2 能被 i = 1 整除
 * ⁠   - i = 2 能被 perm[2] = 1 整除
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 15
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn count_arrangement(n: i32) -> i32 {
        fn dfs(i: i32, n: i32, used: &mut Vec<bool>) -> i32 {
            if i > n {
                return 1;
            }
            let mut sum = 0;
            for j in 1..=n {
                if !used[j as usize] && (j % i == 0 || i % j == 0) {
                    used[j as usize] = true;
                    sum += dfs(i + 1, n, used);
                    used[j as usize] = false;
                }
            }
            sum
        }
        dfs(1, n, &mut vec![false; n as usize + 1])
    }
}
// @lc code=end
