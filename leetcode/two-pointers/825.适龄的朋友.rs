/*
 * @lc app=leetcode.cn id=825 lang=rust
 *
 * [825] 适龄的朋友
 *
 * https://leetcode-cn.com/problems/friends-of-appropriate-ages/description/
 *
 * algorithms
 * Medium (42.36%)
 * Likes:    98
 * Dislikes: 0
 * Total Accepted:    11.2K
 * Total Submissions: 26.5K
 * Testcase Example:  '[16,16]'
 *
 * 在社交媒体网站上有 n 个用户。给你一个整数数组 ages ，其中 ages[i] 是第 i 个用户的年龄。
 *
 * 如果下述任意一个条件为真，那么用户 x 将不会向用户 y（x != y）发送好友请求：
 *
 *
 * age[y] <= 0.5 * age[x] + 7
 * age[y] > age[x]
 * age[y] > 100 && age[x] < 100
 *
 *
 * 否则，x 将会向 y 发送一条好友请求。
 *
 * 注意，如果 x 向 y 发送一条好友请求，y 不必也向 x 发送一条好友请求。另外，用户不会向自己发送好友请求。
 *
 * 返回在该社交媒体网站上产生的好友请求总数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：ages = [16,16]
 * 输出：2
 * 解释：2 人互发好友请求。
 *
 *
 * 示例 2：
 *
 *
 * 输入：ages = [16,17,18]
 * 输出：2
 * 解释：产生的好友请求为 17 -> 16 ，18 -> 17 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：ages = [20,30,100,110,120]
 * 输出：3
 * 解释：产生的好友请求为 110 -> 100 ，120 -> 110 ，120 -> 100 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == ages.length
 * 1 <= n <= 2 * 10^4
 * 1 <= ages[i] <= 120
 *
 *
 */

// @lc code=start
impl Solution {
    // two pointers
    // pub fn num_friend_requests(ages: Vec<i32>) -> i32 {
    //     let n = ages.len();
    //     let mut ages = ages;
    //     ages.sort();
    //     let mut res = 0;
    //     let mut left = 0;
    //     let mut right = 0;

    //     for i in 0..n {
    //         if ages[i] < 15 {
    //             continue;
    //         }
    //         while ages[left] <= (0.5 * (ages[i]) as f64) as i32 + 7 {
    //             left += 1;
    //         }
    //         while right + 1 < n && ages[right + 1] <= ages[i] {
    //             right += 1;
    //         }
    //         res += right - left;
    //     }
    //     res as i32
    // }

    // prefix sum
    pub fn num_friend_requests(ages: Vec<i32>) -> i32 {
        let mut cnt = vec![0; 121];
        for age in ages {
            cnt[age as usize] += 1;
        }
        let mut pre_sum = vec![0; 121];
        for i in 1..=120 {
            pre_sum[i] = pre_sum[i - 1] + cnt[i];
        }
        let mut res = 0;
        for i in 15..=120 {
            if cnt[i] > 0 {
                let bound = (0.5 * i as f64) as i32 + 8;
                res += cnt[i] * (pre_sum[i] - pre_sum[bound as usize - 1] - 1)
            }
        }
        res
    }
}

// @lc code=end
