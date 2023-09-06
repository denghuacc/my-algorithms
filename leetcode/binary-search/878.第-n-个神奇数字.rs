/*
 * @lc app=leetcode.cn id=878 lang=rust
 *
 * [878] 第 N 个神奇数字
 *
 * https://leetcode.cn/problems/nth-magical-number/description/
 *
 * algorithms
 * Hard (30.37%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    9.5K
 * Total Submissions: 27.3K
 * Testcase Example:  '1\n2\n3'
 *
 * 一个正整数如果能被 a 或 b 整除，那么它是神奇的。
 *
 * 给定三个整数 n , a , b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 10^9 + 7 取模 后的值。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 1, a = 2, b = 3
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 4, a = 2, b = 3
 * 输出：6
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 * 2 <= a, b <= 4 * 10^4
 *
 *
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn nth_magical_number(n: i32, a: i32, b: i32) -> i32 {
        let a = a as i64;
        let b = b as i64;
        let n = n as i64;
        const MOD: i64 = 1_000_000_007;
        let mut l = a.min(b);
        let mut r = n * l;
        let c = lcm(a, b);
        while l <= r {
            let mid = l + (r - l) / 2;
            let cnt = mid / a + mid / b - mid / c;
            if cnt >= n {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        ((r + 1) % MOD) as i32
    }
}

fn lcm(a: i64, b: i64) -> i64 {
    (a * b) / gcd(a, b)
}

fn gcd(a: i64, b: i64) -> i64 {
    if b != 0 {
        gcd(b, a % b)
    } else {
        a
    }
}
// @lc code=end
