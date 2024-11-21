/*
 * @lc app=leetcode.cn id=1250 lang=rust
 *
 * [1250] 检查「好数组」
 *
 * https://leetcode.cn/problems/check-if-it-is-a-good-array/description/
 *
 * algorithms
 * Hard (59.82%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    8.6K
 * Total Submissions: 12.8K
 * Testcase Example:  '[12,5,7,23]'
 *
 * 给你一个正整数数组 nums，你需要从中任选一些子集，然后将子集中每一个数乘以一个 任意整数，并求出他们的和。
 *
 * 假如该和结果为 1，那么原数组就是一个「好数组」，则返回 True；否则请返回 False。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [12,5,7,23]
 * 输出：true
 * 解释：挑选数字 5 和 7。
 * 5*3 + 7*(-2) = 1
 *
 *
 * 示例 2：
 *
 * 输入：nums = [29,6,10]
 * 输出：true
 * 解释：挑选数字 29, 6 和 10。
 * 29*1 + 6*(-3) + 10*(-1) = 1
 *
 *
 * 示例 3：
 *
 * 输入：nums = [3,6]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn is_good_array(nums: Vec<i32>) -> bool {
        let mut divisor = nums[0];
        for num in nums {
            divisor = gcd(divisor, num);
            if divisor == 1 {
                break;
            }
        }
        divisor == 1
    }
}

fn gcd(a: i32, b: i32) -> i32 {
    if b != 0 {
        gcd(b, a % b)
    } else {
        a
    }
}
// @lc code=end
