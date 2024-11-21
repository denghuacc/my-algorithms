/*
 * @lc app=leetcode.cn id=472 lang=rust
 *
 * [472] 连接词
 *
 * https://leetcode-cn.com/problems/concatenated-words/description/
 *
 * algorithms
 * Hard (42.31%)
 * Likes:    153
 * Dislikes: 0
 * Total Accepted:    8.9K
 * Total Submissions: 21.1K
 * Testcase Example:  '["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]'
 *
 * 给你一个 不含重复 单词的字符串数组 words ，请你找出并返回 words 中的所有 连接词 。
 *
 * 连接词 定义为：一个完全由给定数组中的至少两个较短单词组成的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words =
 * ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
 * 输出：["catsdogcats","dogcatsdog","ratcatdogcat"]
 * 解释："catsdogcats" 由 "cats", "dog" 和 "cats" 组成;
 * ⁠    "dogcatsdog" 由 "dog", "cats" 和 "dog" 组成;
 * ⁠    "ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["cat","dog","catdog"]
 * 输出：["catdog"]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 10^4
 * 0 <= words[i].length <= 1000
 * words[i] 仅由小写字母组成
 * 0 <= sum(words[i].length) <= 10^5
 *
 *
 */

// @lc code=start
use std::collections::HashSet;
impl Solution {
    pub fn find_all_concatenated_words_in_a_dict(words: Vec<String>) -> Vec<String> {
        let mut set = HashSet::new();
        let mut res = vec![];
        words.iter().for_each(|w| {
            set.insert(w);
        });
        for word in words.iter() {
            if word == "" {
                continue;
            }
            set.remove(word);
            if can_break(word, &set) {
                res.push(word.clone());
            }
            set.insert(&word);
        }
        return res;

        fn can_break(s: &String, set: &HashSet<&String>) -> bool {
            let n = s.len();
            if set.is_empty() || n == 0 {
                return false;
            }
            let mut dp = vec![false; n + 1];
            dp[0] = true;
            for i in 1..=n {
                for j in 0..i {
                    if !dp[j] {
                        continue;
                    }
                    if set.contains(&s[j..i].to_string()) {
                        dp[i] = true;
                        break;
                    }
                }
            }
            dp[n]
        }
    }
}

// @lc code=end
