/*
 * @lc app=leetcode.cn id=1185 lang=rust
 *
 * [1185] 一周中的第几天
 *
 * https://leetcode-cn.com/problems/day-of-the-week/description/
 *
 * algorithms
 * Easy (60.06%)
 * Likes:    74
 * Dislikes: 0
 * Total Accepted:    20.1K
 * Total Submissions: 32.2K
 * Testcase Example:  '31\n8\n2019'
 *
 * 给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。
 *
 * 输入为三个整数：day、month 和 year，分别表示日、月、年。
 *
 * 您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
 * "Friday", "Saturday"}。
 *
 *
 *
 * 示例 1：
 *
 * 输入：day = 31, month = 8, year = 2019
 * 输出："Saturday"
 *
 *
 * 示例 2：
 *
 * 输入：day = 18, month = 7, year = 1999
 * 输出："Sunday"
 *
 *
 * 示例 3：
 *
 * 输入：day = 15, month = 8, year = 1993
 * 输出："Sunday"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给出的日期一定是在 1971 到 2100 年之间的有效日期。
 *
 *
 */

// @lc code=start
// math
impl Solution {
    pub fn day_of_the_week(day: i32, month: i32, year: i32) -> String {
        let mut days = 0;
        for y in 1971..year {
            if y % 4 == 0 && (y % 100 != 0 || y % 400 == 0) {
                days += 366;
            } else {
                days += 365;
            }
        }
        for m in 1..month {
            if m == 2 {
                if year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) {
                    days += 29;
                } else {
                    days += 28;
                }
            } else if m == 4 || m == 6 || m == 9 || m == 11 {
                days += 30;
            } else {
                days += 31;
            }
        }
        days += day;
        let mut days = (days + 3) % 7;
        match days {
            0 => "Monday".to_string(),
            1 => "Tuesday".to_string(),
            2 => "Wednesday".to_string(),
            3 => "Thursday".to_string(),
            4 => "Friday".to_string(),
            5 => "Saturday".to_string(),
            _ => "Sunday".to_string(),
        }
    }
}
// @lc code=end
