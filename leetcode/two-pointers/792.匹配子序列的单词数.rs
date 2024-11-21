/*
 * @lc app=leetcode.cn id=792 lang=rust
 *
 * [792] 匹配子序列的单词数
 *
 * https://leetcode.cn/problems/number-of-matching-subsequences/description/
 *
 * algorithms
 * Medium (47.71%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    18.4K
 * Total Submissions: 37.4K
 * Testcase Example:  '"abcde"\n["a","bb","acd","ace"]'
 *
 * 给定字符串 s 和字符串数组 words, 返回  words[i] 中是s的子序列的单词个数 。
 *
 * 字符串的 子序列 是从原始字符串中生成的新字符串，可以从中删去一些字符(可以是none)，而不改变其余字符的相对顺序。
 *
 *
 * 例如， “ace” 是 “abcde” 的子序列。
 *
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcde", words = ["a","bb","acd","ace"]
 * 输出: 3
 * 解释: 有三个是 s 的子序列的单词: "a", "acd", "ace"。
 *
 *
 * Example 2:
 *
 *
 * 输入: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
 * 输出: 2
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length <= 5 * 10^4
 * 1 <= words.length <= 5000
 * 1 <= words[i].length <= 50
 * words[i]和 s 都只由小写字母组成。
 *
 * ​​​​
 */

// @lc code=start
use std::collections::VecDeque;
impl Solution {
    pub fn num_matching_subseq(s: String, words: Vec<String>) -> i32 {
        let mut res = 0;
        let mut list = VecDeque::new();
        let mut bucket: Vec<VecDeque<(usize, usize)>> = vec![list; 26];
        for i in 0..words.len() {
            bucket[words[i].chars().nth(0).unwrap() as usize - 97].push_back((i, 0));
        }
        for ch in s.bytes() {
            let n = bucket[ch as usize - 97].len();
            for i in 0..n {
                if let Some((i, j)) = bucket[ch as usize - 97].pop_front() {
                    if j == words[i].len() - 1 {
                        res += 1;
                    } else {
                        let j = j + 1;
                        bucket[words[i].chars().nth(j).unwrap() as usize - 97].push_back((i, j))
                    }
                }
            }
        }
        res
    }
}
// @lc code=end
