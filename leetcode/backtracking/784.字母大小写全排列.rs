/*
 * @lc app=leetcode.cn id=784 lang=rust
 *
 * [784] 字母大小写全排列
 *
 * https://leetcode.cn/problems/letter-case-permutation/description/
 *
 * algorithms
 * Medium (70.34%)
 * Likes:    468
 * Dislikes: 0
 * Total Accepted:    89.8K
 * Total Submissions: 124.8K
 * Testcase Example:  '"a1b2"'
 *
 * 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。
 *
 * 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "a1b2"
 * 输出：["a1b2", "a1B2", "A1b2", "A1B2"]
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "3z4"
 * 输出: ["3z4","3Z4"]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length <= 12
 * s 由小写英文字母、大写英文字母和数字组成
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn letter_case_permutation(s: String) -> Vec<String> {
        fn dfs(arr: &mut Vec<char>, res: &mut Vec<String>, idx: usize) {
            if arr.len() == idx {
                res.push(arr.iter().collect::<String>());
                return;
            }
            if arr[idx].is_ascii_digit() {
                dfs(arr, res, idx + 1);
                return;
            }
            arr[idx] = arr[idx].to_ascii_uppercase();
            dfs(arr, res, idx + 1);
            arr[idx] = arr[idx].to_ascii_lowercase();
            dfs(arr, res, idx + 1);
        }
        let mut res = vec![];
        dfs(&mut s.chars().collect::<Vec<_>>(), &mut res, 0);
        res
    }
}
// @lc code=end
