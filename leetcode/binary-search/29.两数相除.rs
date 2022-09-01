/*
 * @lc app=leetcode.cn id=29 lang=rust
 *
 * [29] 两数相除
 *
 * https://leetcode-cn.com/problems/divide-two-integers/description/
 *
 * algorithms
 * Medium (22.00%)
 * Likes:    777
 * Dislikes: 0
 * Total Accepted:    137.3K
 * Total Submissions: 624.2K
 * Testcase Example:  '10\n3'
 *
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 *
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 *
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
 * -2
 *
 *
 *
 * 示例 1:
 *
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 *
 * 示例 2:
 *
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 *
 *
 *
 * 提示：
 *
 *
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn divide(dividend: i32, divisor: i32) -> i32 {
        let mut dividend = dividend;
        let mut divisor = divisor;
        if dividend == i32::MIN {
            if divisor == -1 {
                return i32::MAX;
            }
            if divisor == 1 {
                return dividend;
            }
        }
        if divisor == i32::MIN {
            if dividend == i32::MIN {
                return 1;
            } else {
                return 0;
            }
        }
        if divisor == 0 {
            return 0;
        }

        let mut rev = false;
        if dividend > 0 {
            dividend = -dividend;
            rev = !rev;
        }
        if divisor > 0 {
            divisor = -divisor;
            rev = !rev;
        }

        let mut candidates = vec![];
        candidates.push(divisor);
        let mut index = 0;
        while candidates[index] >= dividend - candidates[index] {
            candidates.push(candidates[index] + candidates[index]);
            index += 1;
        }
        let mut res = 0;
        for i in (0..=candidates.len() - 1).rev() {
            if candidates[i] >= dividend {
                res += 1 << i;
                dividend -= candidates[i];
            }
        }

        if rev {
            -res
        } else {
            res
        }
    }
}
// @lc code=end
