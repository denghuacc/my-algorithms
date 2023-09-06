/*
 * @lc app=leetcode.cn id=66 lang=rust
 *
 * [66] 加一
 *
 * https://leetcode-cn.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (45.70%)
 * Likes:    790
 * Dislikes: 0
 * Total Accepted:    366.6K
 * Total Submissions: 797.4K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 *
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 *
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：digits = [1,2,3]
 * 输出：[1,2,4]
 * 解释：输入数组表示数字 123。
 *
 *
 * 示例 2：
 *
 *
 * 输入：digits = [4,3,2,1]
 * 输出：[4,3,2,2]
 * 解释：输入数组表示数字 4321。
 *
 *
 * 示例 3：
 *
 *
 * 输入：digits = [0]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn plus_one(digits: Vec<i32>) -> Vec<i32> {
    //     let mut digits = digits;
    //     let mut i = digits.len() - 1;
    //     let mut out_bounds = false;
    //     while i >= 0 {
    //         if digits[i] == 9 {
    //             digits[i] = 0;
    //         } else {
    //             digits[i] += 1;
    //             break;
    //         }
    //         if i > 0 {
    //             i -= 1
    //         } else {
    //             // i will be -1 if minus 1
    //             out_bounds = true;
    //             break;
    //         }
    //     }
    //     if out_bounds {
    //         digits.insert(0, 1);
    //     }
    //     digits
    // }

    pub fn plus_one(digits: Vec<i32>) -> Vec<i32> {
        let mut digits = digits;
        let n = digits.len();
        for i in (0..n).rev() {
            digits[i] += 1;
            digits[i] %= 10;
            if digits[i] != 0 {
                return digits;
            }
        }
        let mut digits = vec![0; n + 1];
        digits[0] = 1;
        digits
    }
}
// @lc code=end
