/*
 * @lc app=leetcode.cn id=483 lang=rust
 *
 * [483] 最小好进制
 *
 * https://leetcode-cn.com/problems/smallest-good-base/description/
 *
 * algorithms
 * Hard (56.72%)
 * Likes:    120
 * Dislikes: 0
 * Total Accepted:    12.1K
 * Total Submissions: 21K
 * Testcase Example:  '"13"'
 *
 * 对于给定的整数 n, 如果n的k（k>=2）进制数的所有数位全为1，则称 k（k>=2）是 n 的一个好进制。
 *
 * 以字符串的形式给出 n, 以字符串的形式返回 n 的最小好进制。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入："13"
 * 输出："3"
 * 解释：13 的 3 进制是 111。
 *
 *
 * 示例 2：
 *
 *
 * 输入："4681"
 * 输出："8"
 * 解释：4681 的 8 进制是 11111。
 *
 *
 * 示例 3：
 *
 *
 * 输入："1000000000000000000"
 * 输出："999999999999999999"
 * 解释：1000000000000000000 的 999999999999999999 进制是 11。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n的取值范围是 [3, 10^18]。
 * 输入总是有效且没有前导 0。
 *
 *
 *
 *
 */

// @lc code=start
// binary search
impl Solution {
    pub fn smallest_good_base(n: String) -> String {
        let n = n.parse::<i64>().unwrap();

        fn check(n: i64, len: u32) -> i64 {
            let mut l = 2;
            let mut r = n;

            while l <= r {
                let mid = (l + r) / 2;
                let mut sum = 0_i64;
                let mut overflow = false;
                for i in 0..len {
                    if overflow {
                        break;
                    }
                    if let Some(val) = mid.checked_pow(i) {
                        if let Some(val) = sum.checked_add(val) {
                            sum = val
                        } else {
                            overflow = true;
                        }
                    } else {
                        overflow = true;
                    }
                }
                if overflow || sum > n {
                    r = mid - 1
                } else {
                    l = mid + 1
                }
                if sum == n {
                    return mid;
                }
            }

            i64::MAX
        }

        (1u32..=64)
            .map(|len| check(n, len))
            .min()
            .unwrap()
            .to_string()
    }
}
// @lc code=end
