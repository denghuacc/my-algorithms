/*
 * @lc app=leetcode.cn id=383 lang=rust
 *
 * [383] 赎金信
 *
 * https://leetcode-cn.com/problems/ransom-note/description/
 *
 * algorithms
 * Easy (61.03%)
 * Likes:    216
 * Dislikes: 0
 * Total Accepted:    88.7K
 * Total Submissions: 143.1K
 * Testcase Example:  '"a"\n"b"'
 *
 * 为了不在赎金信中暴露字迹，从杂志上搜索各个需要的字母，组成单词来表达意思。
 *
 * 给你一个赎金信 (ransomNote) 字符串和一个杂志(magazine)字符串，判断 ransomNote 能不能由 magazines
 * 里面的字符构成。
 *
 * 如果可以构成，返回 true ；否则返回 false 。
 *
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：ransomNote = "aa", magazine = "ab"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：ransomNote = "aa", magazine = "aab"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= ransomNote.length, magazine.length <= 10^5
 * ransomNote 和 magazine 由小写英文字母组成
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn can_construct(ransom_note: String, magazine: String) -> bool {
        let mut map = vec![0; 26];
        for c in magazine.chars() {
            map[(c as u8 - b'a') as usize] += 1;
        }
        for c in ransom_note.chars() {
            if map[(c as u8 - b'a') as usize] == 0 {
                return false;
            }
            map[(c as u8 - b'a') as usize] -= 1;
        }
        true
    }
}
// @lc code=end
