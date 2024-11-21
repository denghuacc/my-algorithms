/*
 * @lc app=leetcode.cn id=2427 lang=rust
 *
 * [2427] 公因子的数目
 *
 * https://leetcode.cn/problems/number-of-common-factors/description/
 *
 * algorithms
 * Easy (81.03%)
 * Likes:    40
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 28.4K
 * Testcase Example:  '12\n6'
 *
 * 给你两个正整数 a 和 b ，返回 a 和 b 的 公 因子的数目。
 *
 * 如果 x 可以同时整除 a 和 b ，则认为 x 是 a 和 b 的一个 公因子 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：a = 12, b = 6
 * 输出：4
 * 解释：12 和 6 的公因子是 1、2、3、6 。
 *
 *
 * 示例 2：
 *
 * 输入：a = 25, b = 30
 * 输出：2
 * 解释：25 和 30 的公因子是 1、5 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= a, b <= 1000
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn common_factors(a: i32, b: i32) -> i32 {
        let mut res = 0;
        let c = gcd(a, b);
        let mut i = 1;
        while i * i <= c {
            if c % i == 0 {
                res += 1;
                if i * i < c {
                    res += 1;
                }
            }
            i += 1;
        }
        return res;

        fn gcd(a: i32, b: i32) -> i32 {
            if b != 0 {
                gcd(b, a % b)
            } else {
                a
            }
        }
    }
}
// @lc code=end
