/*
 * @lc app=leetcode.cn id=65 lang=typescript
 *
 * [65] 有效数字
 *
 * https://leetcode-cn.com/problems/valid-number/description/
 *
 * algorithms
 * Hard (13.55%)
 * Likes:    109
 * Dislikes: 0
 * Total Accepted:    12.3K
 * Total Submissions: 64.8K
 * Testcase Example:  '"0"'
 *
 * 验证给定的字符串是否可以解释为十进制数字。
 *
 * 例如:
 *
 * "0" => true
 * " 0.1 " => true
 * "abc" => false
 * "1 a" => false
 * "2e10" => true
 * " -90e3   " => true
 * " 1e" => false
 * "e3" => false
 * " 6e-1" => true
 * " 99e2.5 " => false
 * "53.5e93" => true
 * " --6 " => false
 * "-+3" => false
 * "95a54e53" => false
 *
 * 说明: 我们有意将问题陈述地比较模糊。在实现代码之前，你应当事先思考所有可能的情况。这里给出一份可能存在于有效十进制数字中的字符列表：
 *
 *
 * 数字 0-9
 * 指数 - "e"
 * 正/负号 - "+"/"-"
 * 小数点 - "."
 *
 *
 * 当然，在输入中，这些字符的上下文也很重要。
 *
 * 更新于 2015-02-10:
 * C++函数的形式已经更新了。如果你仍然看见你的函数接收 const char * 类型的参数，请点击重载按钮重置你的代码。
 *
 */

// @lc code=start
// 状态机
var isNumber = function (s: string): boolean {
  let state = 0;
  const finals = [0, 0, 0, 1, 0, 1, 1, 0, 1];
  const transfer = [
    [0, 1, 6, 2, -1, -1],
    [-1, -1, 6, 2, -1, -1],
    [-1, -1, 3, -1, -1, -1],
    [8, -1, 3, -1, 4, -1],
    [-1, 7, 5, -1, -1, -1],
    [8, -1, 5, -1, -1, -1],
    [8, -1, 6, 3, 4, -1],
    [-1, -1, 5, -1, -1, -1],
    [8, -1, -1, -1, -1, -1],
  ];

  for (let i = 0; i < s.length; ++i) {
    state = transfer[state][make(s[i])];
    if (state < 0) return false;
  }

  return Boolean(finals[state]);

  function make(c: string) {
    switch (c) {
      case " ":
        return 0;
      case "+":
      case "-":
        return 1;
      case ".":
        return 3;
      case "e":
      case "E":
        return 4;
      default:
        let code = c.charCodeAt(0);
        if (code >= 48 && code <= 57) return 2;
        else return 5;
    }
  }
};

// string simulation
var isNumber = function (s: string): boolean {
  const n = s.length;
  let idx = -1;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === "e" || c === "E") {
      if (idx === -1) {
        idx = i;
      } else {
        return false;
      }
    }
  }

  let ret = true;
  if (idx !== -1) {
    ret &&= check(s, 0, idx - 1, false);
    ret &&= check(s, idx + 1, n - 1, true);
  } else {
    ret &&= check(s, 0, n - 1, false);
  }

  return ret;

  function check(
    s: string,
    start: number,
    end: number,
    mustInteger: boolean
  ): boolean {
    if (start > end) {
      return false;
    }
    if (s[start] === "+" || s[start] === "-") {
      start++;
    }

    let hasDot = false;
    let hasNum = false;

    for (let i = start; i <= end; i++) {
      if (s[i] === ".") {
        if (mustInteger || hasDot) {
          return false;
        }
        hasDot = true;
      } else if (s[i] >= "0" && s[i] <= "9") {
        hasNum = true;
      } else {
        return false;
      }
    }

    return hasNum;
  }
};
// @lc code=end
