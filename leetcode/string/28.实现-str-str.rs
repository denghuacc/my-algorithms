/*
 * @lc app=leetcode.cn id=28 lang=rust
 *
 * [28] 实现 strStr()
 *
 * https://leetcode-cn.com/problems/implement-strstr/description/
 *
 * algorithms
 * Easy (40.36%)
 * Likes:    1134
 * Dislikes: 0
 * Total Accepted:    506.5K
 * Total Submissions: 1.3M
 * Testcase Example:  '"hello"\n"ll"'
 *
 * 实现 strStr() 函数。
 *
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0
 * 开始）。如果不存在，则返回  -1 。
 *
 *
 *
 * 说明：
 *
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 *
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf()
 * 定义相符。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：haystack = "hello", needle = "ll"
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：haystack = "aaaaa", needle = "bba"
 * 输出：-1
 *
 *
 * 示例 3：
 *
 *
 * 输入：haystack = "", needle = ""
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * haystack 和 needle 仅由小写英文字符组成
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn str_str(haystack: String, needle: String) -> i32 {
    //     if needle.is_empty() {
    //         return 0;
    //     }
    //     let n = haystack.len();
    //     for i in 0..n {
    //         if haystack[i..].starts_with(&needle) {
    //             return i as i32;
    //         }
    //     }
    //     -1
    // }

    pub fn str_str(haystack: String, needle: String) -> i32 {
        let n1 = haystack.len();
        let n2 = needle.len();
        if n1 < n2 {
            return -1;
        }
        if n2 == 0 {
            return 0;
        }
        let mut p1 = 0;
        while p1 < n1 - n2 + 1 {
            while p1 < n1 - n2 + 1 && haystack.as_bytes()[p1] != needle.as_bytes()[0] {
                p1 += 1;
            }
            let mut cur_len = 0;
            let mut p2 = 0;
            while p2 < n2 && p1 < n1 && haystack.as_bytes()[p1] == needle.as_bytes()[p2] {
                p1 += 1;
                p2 += 1;
                cur_len += 1;
            }
            if cur_len == n2 {
                return (p1 - n2) as i32;
            }
            p1 = p1 - cur_len + 1
        }

        -1
    }
}
// @lc code=end
