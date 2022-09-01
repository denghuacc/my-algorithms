/*
 * @lc app=leetcode.cn id=318 lang=rust
 *
 * [318] 最大单词长度乘积
 *
 * https://leetcode-cn.com/problems/maximum-product-of-word-lengths/description/
 *
 * algorithms
 * Medium (68.92%)
 * Likes:    224
 * Dislikes: 0
 * Total Accepted:    26.5K
 * Total Submissions: 37.3K
 * Testcase Example:  '["abcw","baz","foo","bar","xtfn","abcdef"]'
 *
 * 给定一个字符串数组 words，找到 length(word[i]) * length(word[j])
 * 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
 * 输出: 16
 * 解释: 这两个单词为 "abcw", "xtfn"。
 *
 * 示例 2:
 *
 *
 * 输入: ["a","ab","abc","d","cd","bcd","abcd"]
 * 输出: 4
 * 解释: 这两个单词为 "ab", "cd"。
 *
 * 示例 3:
 *
 *
 * 输入: ["a","aa","aaa","aaaa"]
 * 输出: 0
 * 解释: 不存在这样的两个单词。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 * words[i] 仅包含小写字母
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn max_product(words: Vec<String>) -> i32 {
        let mut map = vec![0; words.len()];
        for (i, word) in words.iter().enumerate() {
            for c in word.chars() {
                map[i] |= 1 << (c as usize - 'a' as usize);
            }
        }
        let mut res = 0;
        for i in 0..words.len() {
            for j in i + 1..words.len() {
                if map[i] & map[j] == 0 {
                    res = std::cmp::max(res, words[i].len() as i32 * words[j].len() as i32);
                }
            }
        }
        res
    }
}
// @lc code=end
