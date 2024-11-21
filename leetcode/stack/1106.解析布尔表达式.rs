/*
 * @lc app=leetcode.cn id=1106 lang=rust
 *
 * [1106] 解析布尔表达式
 *
 * https://leetcode.cn/problems/parsing-a-boolean-expression/description/
 *
 * algorithms
 * Hard (58.78%)
 * Likes:    120
 * Dislikes: 0
 * Total Accepted:    12.4K
 * Total Submissions: 18.7K
 * Testcase Example:  '"&(|(f))"'
 *
 * 给你一个以字符串形式表述的 布尔表达式（boolean） expression，返回该式的运算结果。
 *
 * 有效的表达式需遵循以下约定：
 *
 *
 * "t"，运算结果为 True
 * "f"，运算结果为 False
 * "!(expr)"，运算过程为对内部表达式 expr 进行逻辑 非的运算（NOT）
 * "&(expr1,expr2,...)"，运算过程为对 2 个或以上内部表达式 expr1, expr2, ... 进行逻辑 与的运算（AND）
 * "|(expr1,expr2,...)"，运算过程为对 2 个或以上内部表达式 expr1, expr2, ... 进行逻辑 或的运算（OR）
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：expression = "!(f)"
 * 输出：true
 *
 *
 * 示例 2：
 *
 * 输入：expression = "|(f,t)"
 * 输出：true
 *
 *
 * 示例 3：
 *
 * 输入：expression = "&(t,f)"
 * 输出：false
 *
 *
 * 示例 4：
 *
 * 输入：expression = "|(&(t,f,t),!(t))"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= expression.length <= 20000
 * expression[i] 由 {'(', ')', '&', '|', '!', 't', 'f', ','} 中的字符组成。
 * expression 是以上述形式给出的有效表达式，表示一个布尔值。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn parse_bool_expr(expression: String) -> bool {
        let mut stack = vec![];
        let n = expression.len();
        for ch in expression.chars() {
            if ch == ',' {
                continue;
            } else if ch != ')' {
                stack.push(ch);
            } else {
                let mut t = 0;
                let mut f = 0;
                while !stack.is_empty() && *stack.last().unwrap() != '(' {
                    if let Some(val) = stack.pop() {
                        if val == 't' {
                            t += 1;
                        } else {
                            f += 1;
                        }
                    }
                }
                stack.pop();
                if let Some(operator) = stack.pop() {
                    if operator == '!' {
                        stack.push(if f == 1 { 't' } else { 'f' })
                    } else if operator == '&' {
                        stack.push(if f == 0 { 't' } else { 'f' })
                    } else if operator == '|' {
                        stack.push(if t > 0 { 't' } else { 'f' })
                    }
                }
            }
        }
        stack.pop() == Some('t')
    }
}
// @lc code=end
