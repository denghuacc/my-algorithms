/*
 * @lc app=leetcode.cn id=1044 lang=rust
 *
 * [1044] 最长重复子串
 *
 * https://leetcode-cn.com/problems/longest-duplicate-substring/description/
 *
 * algorithms
 * Hard (21.23%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    16.1K
 * Total Submissions: 50.6K
 * Testcase Example:  '"banana"'
 *
 * 给你一个字符串 s ，考虑其所有 重复子串 ：即，s 的连续子串，在 s 中出现 2 次或更多次。这些出现之间可能存在重叠。
 *
 * 返回 任意一个 可能具有最长长度的重复子串。如果 s 不含重复子串，那么答案为 "" 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "banana"
 * 输出："ana"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abcd"
 * 输出：""
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= s.length <= 3 * 10^4
 * s 由小写英文字母组成
 *
 *
 */

// @lc code=start
use std::collections::HashMap;
impl Solution {
    pub fn longest_dup_substring(s: String) -> String {
        let mut l = 0;
        let mut r = s.len() - 1;
        while l < r {
            let m = l + ((r - l + 1) >> 1);
            if is_duplicate_present(&s, m) {
                l = m;
            } else {
                r = m - 1;
            }
        }
        return find_duplicate(&s, l).unwrap();

        fn find_duplicate(s: &String, length: usize) -> Option<String> {
            let mut hash: u64 = 0;
            let prime = 29;
            let mut first_entry_power = 1;
            let mut map: HashMap<u64, usize> = HashMap::new();

            let s_arr = s.as_bytes();

            for i in 0..length {
                first_entry_power *= prime;
                hash = hash * prime + (s_arr[i] as u64 - 'a' as u64);
            }
            map.insert(hash, 0);
            for i in length..s.len() {
                hash = hash * prime + s_arr[i] as u64 - 'a' as u64;
                hash -= first_entry_power * (s_arr[i - length] as u64 - 'a' as u64);

                if map.contains_key(&hash) {
                    let idx = *map.get(&hash).unwrap();
                    return Some(s[idx..idx + length].to_string());
                }
                map.insert(hash, i - length + 1);
            }
            None
        }

        fn is_duplicate_present(s: &String, length: usize) -> bool {
            if length == 0 {
                return true;
            }
            !find_duplicate(s, length).is_none()
        }
    }
}
// @lc code=end
