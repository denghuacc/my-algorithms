/*
 * @lc app=leetcode.cn id=372 lang=rust
 *
 * [372] 超级次方
 *
 * https://leetcode-cn.com/problems/super-pow/description/
 *
 * algorithms
 * Medium (53.04%)
 * Likes:    171
 * Dislikes: 0
 * Total Accepted:    18.8K
 * Total Submissions: 35.4K
 * Testcase Example:  '2\n[3]'
 *
 * 你的任务是计算 a^b 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：a = 2, b = [3]
 * 输出：8
 *
 *
 * 示例 2：
 *
 *
 * 输入：a = 2, b = [1,0]
 * 输出：1024
 *
 *
 * 示例 3：
 *
 *
 * 输入：a = 1, b = [4,3,3,8,5,2]
 * 输出：1
 *
 *
 * 示例 4：
 *
 *
 * 输入：a = 2147483647, b = [2,0,0]
 * 输出：1198
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
 * b 不含前导 0
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn super_pow(a: i32, b: Vec<i32>) -> i32 {
        return Self::dfs(a, b.clone(), b.len() as i32 - 1);
    }
    fn dfs(a: i32, b: Vec<i32>, u: i32) -> i32 {
        if u == -1 {
            return 1;
        }
        return Self::pow(Self::dfs(a, b.clone(), u - 1), 10) * Self::pow(a, b[u as usize]) % 1337;
    }
    fn pow(mut a: i32, mut b: i32) -> i32 {
        let mut ret = 1;
        a %= 1337;
        while b > 0 {
            if b % 2 == 1 {
                ret = ret * a % 1337;
            }
            a = a * a % 1337;
            b /= 2;
        }
        return ret;
    }
}
// @lc code=end
