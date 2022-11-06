fn main() {
    println!("Hello, world!");
}

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
