/*
 * @lc app=leetcode.cn id=1185 lang=typescript
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
var dayOfTheWeek = function (day: number, month: number, year: number): string {
  const date = new Date(year, month - 1, day);
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
};

var dayOfTheWeek = function (day: number, month: number, year: number): string {
  const weeks = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let days = 365 * (year - 1971) + Math.floor((year - 1969) / 4);
  for (let i = 0; i < month - 1; i++) {
    days += monthDays[i];
  }
  // is leap year
  if (
    (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) &&
    month >= 3
  ) {
    days += 1;
  }
  days += day;
  return weeks[(days + 3) % 7];
};
// @lc code=end
