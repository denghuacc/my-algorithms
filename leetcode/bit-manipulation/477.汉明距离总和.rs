/*
 * @lc app=leetcode.cn id=477 lang=rust
 *
 * [477] 汉明距离总和
 *
 * https://leetcode-cn.com/problems/total-hamming-distance/description/
 *
 * algorithms
 * Medium (60.34%)
 * Likes:    239
 * Dislikes: 0
 * Total Accepted:    39.7K
 * Total Submissions: 65.9K
 * Testcase Example:  '[4,14,2]'
 *
 * 两个整数的 汉明距离 指的是这两个数字的二进制数对应位不同的数量。
 *
 * 给你一个整数数组 nums，请你计算并返回 nums 中任意两个数之间 汉明距离的总和 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,14,2]
 * 输出：6
 * 解释：在二进制表示中，4 表示为 0100 ，14 表示为 1110 ，2表示为 0010 。（这样表示是为了体现后四位之间关系）
 * 所以答案为：
 * HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2
 * + 2 + 2 = 6
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,14,4]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^4
 * 0 <= nums[i] <= 10^9
 * 给定输入的对应答案符合 32-bit 整数范围
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn total_hamming_distance(nums: Vec<i32>) -> i32 {
    //     let mut res = 0;
    //     let mut n = nums.len();
    //     let mut a = 0;
    //     let mut b = 0;
    //     for i in 0..32 {
    //         a = 0;
    //         b = 0;
    //         for j in 0..n {
    //             if (nums[j] >> i) & 1 == 1 {
    //                 a += 1;
    //             } else {
    //                 b += 1;
    //             }
    //         }
    //         res += a * b;
    //     }
    //     res
    // }

    pub fn total_hamming_distance(nums: Vec<i32>) -> i32 {
        let mut res = 0;
        let n = nums.len();
        for i in 0..30 {
            let mut c = 0;
            for num in nums.iter() {
                c += (num >> i) & 1
            }
            res += c * (n as i32 - c);
        }
        res
    }
}
// @lc code=end
