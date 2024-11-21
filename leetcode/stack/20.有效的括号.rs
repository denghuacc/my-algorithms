/*
 * @lc app=leetcode.cn id=20 lang=rust
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (44.15%)
 * Likes:    2440
 * Dislikes: 0
 * Total Accepted:    653.5K
 * Total Submissions: 1.5M
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()"
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "()[]{}"
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "(]"
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "([)]"
 * 输出：false
 *
 *
 * 示例 5：
 *
 *
 * 输入：s = "{[]}"
 * 输出：true
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由括号 '()[]{}' 组成
 *
 *
 */

// @lc code=start
// stack
impl Solution {
    pub fn is_valid(s: String) -> bool {
        if s.len() % 2 == 1 {
            return false;
        }

        let match_map = {
            let mut m = std::collections::HashMap::new();
            m.insert(')', '(');
            m.insert(']', '[');
            m.insert('}', '{');
            m
        };

        let mut stack = vec![];

        for c in s.chars() {
            if let Some(&val) = match_map.get(&c) {
                match stack.pop() {
                    None => return false,
                    Some(pop) => {
                        if pop == val {
                            continue;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                stack.push(c)
            }
        }

        stack.len() == 0
    }
}
// @lc code=end
