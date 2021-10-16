/*
 * @lc app=leetcode.cn id=282 lang=typescript
 *
 * [282] 给表达式添加运算符
 *
 * https://leetcode-cn.com/problems/expression-add-operators/description/
 *
 * algorithms
 * Hard (39.39%)
 * Likes:    276
 * Dislikes: 0
 * Total Accepted:    9.1K
 * Total Submissions: 21.7K
 * Testcase Example:  '"123"\n6'
 *
 * 给定一个仅包含数字 0-9 的字符串 num 和一个目标值整数 target ，在 num 的数字之间添加 二元 运算符（不是一元）+、- 或 *
 * ，返回所有能够得到目标值的表达式。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: num = "123", target = 6
 * 输出: ["1+2+3", "1*2*3"]
 *
 *
 * 示例 2:
 *
 *
 * 输入: num = "232", target = 8
 * 输出: ["2*3+2", "2+3*2"]
 *
 * 示例 3:
 *
 *
 * 输入: num = "105", target = 5
 * 输出: ["1*0+5","10-5"]
 *
 * 示例 4:
 *
 *
 * 输入: num = "00", target = 0
 * 输出: ["0+0", "0-0", "0*0"]
 *
 *
 * 示例 5:
 *
 *
 * 输入: num = "3456237490", target = 9191
 * 输出: []
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num.length <= 10
 * num 仅含数字
 * -2^31 <= target <= 2^31 - 1
 *
 *
 */

// @lc code=start
// backtracking
function addOperators(num: string, target: number): string[] {
  const n = num.length;
  const ret: string[] = [];
  const expr: string[] = [];

  backtrack(expr, 0, 0, 0);
  return ret;

  function backtrack(expr: string[], idx: number, res: number, mul: number) {
    if (idx === n) {
      if (res === target) {
        ret.push(expr.join(""));
      }
      return;
    }
    const signIndex = expr.length;
    if (idx > 0) {
      expr.push(""); // 占位
    }
    let val = 0;
    // 枚举截取的数字长度（取多少位），注意数字可以是单个 0 但不能有前导零
    for (let j = idx; j < n && (j === idx || num[idx] !== "0"); j++) {
      val = val * 10 + num[j].charCodeAt(0) - "0".charCodeAt(0);
      expr.push(num[j]);
      // 表达式开头不能添加符号
      if (idx === 0) {
        backtrack(expr, j + 1, val, val);
      }
      // 枚举符号
      else {
        expr[signIndex] = "+";
        backtrack(expr, j + 1, res + val, val);
        expr[signIndex] = "-";
        backtrack(expr, j + 1, res - val, -val);
        expr[signIndex] = "*";
        backtrack(expr, j + 1, res - mul + mul * val, mul * val);
      }
    }
    expr = expr.splice(signIndex, expr.length - signIndex);
  }
}
// @lc code=end
