/*
 * @lc app=leetcode.cn id=592 lang=typescript
 *
 * [592] 分数加减运算
 *
 * https://leetcode.cn/problems/fraction-addition-and-subtraction/description/
 *
 * algorithms
 * Medium (52.88%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    9.7K
 * Total Submissions: 16.8K
 * Testcase Example:  '"-1/2+1/2"'
 *
 * 给定一个表示分数加减运算的字符串 expression ，你需要返回一个字符串形式的计算结果。
 *
 * 这个结果应该是不可约分的分数，即最简分数。 如果最终结果是一个整数，例如 2，你需要将它转换成分数形式，其分母为 1。所以在上述例子中, 2
 * 应该被转换为 2/1。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: expression = "-1/2+1/2"
 * 输出: "0/1"
 *
 *
 * 示例 2:
 *
 *
 * 输入: expression = "-1/2+1/2+1/3"
 * 输出: "1/3"
 *
 *
 * 示例 3:
 *
 *
 * 输入: expression = "1/3-1/2"
 * 输出: "-1/6"
 *
 *
 *
 *
 * 提示:
 *
 *
 * 输入和输出字符串只包含 '0' 到 '9' 的数字，以及 '/', '+' 和 '-'。
 * 输入和输出分数格式均为 ±分子/分母。如果输入的第一个分数或者输出的分数是正数，则 '+' 会被省略掉。
 * 输入只包含合法的最简分数，每个分数的分子与分母的范围是  [1,10]。 如果分母是1，意味着这个分数实际上是一个整数。
 * 输入的分数个数范围是 [1,10]。
 * 最终结果的分子与分母保证是 32 位整数范围内的有效整数。
 *
 *
 */

// @lc code=start
// simulate1
var fractionAddition = function (expression: string): string {
  let i = 0;
  const n = expression.length;
  const fractionArr: [number, number][] = [];
  while (i < n) {
    let fractionStr = "";
    if (i === 0 || isAddOrMinus(expression[i])) {
      fractionStr += expression[i];
      i++;
    }
    while (i < n && !isAddOrMinus(expression[i])) {
      fractionStr += expression[i];
      i++;
    }
    const [numerator, denominator] = fractionStr.split("/");
    fractionArr.push([parseInt(numerator), parseInt(denominator)]);
    fractionStr = "";
  }

  let total = fractionArr[0];
  for (let i = 1; i < fractionArr.length; i++) {
    total = operate(total, fractionArr[i]);
  }
  const [numerator, denominator] = reduction(total);
  return `${numerator}/${denominator}`;

  function isAddOrMinus(ch: string): boolean {
    return ch === "+" || ch === "-";
  }

  function operate(
    fraction1: [number, number],
    fraction2: [number, number]
  ): [number, number] {
    const [n1, d1] = fraction1;
    const [n2, d2] = fraction2;
    if (d1 === d2) {
      return [n1 + n2, d1];
    } else {
      return [n1 * d2 + n2 * d1, d1 * d2];
    }
  }

  function reduction(fraction: [number, number]): [number, number] {
    let [numerator, denominator] = fraction;
    if (numerator === 0) {
      return [0, 1];
    }
    const negative = numerator < 0;
    if (negative) {
      numerator = -numerator;
    }
    let reducer: [number, number];
    if (numerator > denominator) {
      if (numerator % denominator === 0) {
        reducer = [numerator / denominator, 1];
      } else {
        reducer = reduce([numerator, denominator]);
      }
    } else if (numerator < denominator) {
      if (denominator % numerator === 0) {
        reducer = [1, denominator / numerator];
      } else {
        reducer = reduce([numerator, denominator]);
      }
    } else {
      reducer = [1, 1];
    }
    return negative ? [-reducer[0], reducer[1]] : reducer;
  }

  function reduce(fraction: [number, number]): [number, number] {
    let i = 2;
    let [numerator, denominator] = fraction;
    while (i < numerator || i < denominator) {
      while (numerator % i === 0 && denominator % i === 0) {
        numerator /= i;
        denominator /= i;
      }
      i++;
    }
    return [numerator, denominator];
  }
};

// simulate2 ✅
var fractionAddition = function (expression: string): string {
  let numerator = 0;
  let denominator = 1;
  let idx = 0;
  const n = expression.length;
  while (idx < n) {
    let sign = 1;
    let numerator1 = 0;
    if (expression[idx] === "-" || expression[idx] === "+") {
      sign = expression[idx] === "-" ? -1 : 1;
      idx++;
    }
    while (idx < n && isDigit(expression[idx])) {
      numerator1 =
        numerator1 * 10 + expression.charCodeAt(idx) - "0".charCodeAt(0);
      idx++;
    }
    numerator1 = sign * numerator1;
    idx++;

    let denominator1 = 0;
    while (idx < n && isDigit(expression[idx])) {
      denominator1 =
        denominator1 * 10 + expression.charCodeAt(idx) - "0".charCodeAt(0);
      idx++;
    }

    numerator = numerator * denominator1 + numerator1 * denominator;
    denominator *= denominator1;
  }
  if (numerator === 0) {
    return "0/1";
  }
  const gcd = getGcd(Math.abs(numerator), denominator);
  return `${Math.floor(numerator / gcd)}/${Math.floor(denominator / gcd)}`;

  function isDigit(ch: string): boolean {
    return parseFloat(ch).toString() === "NaN" ? false : true;
  }

  // 求最大公约数
  function getGcd(a: number, b: number): number {
    let remainder = a % b;
    while (remainder !== 0) {
      a = b;
      b = remainder;
      remainder = a % b;
    }
    return b;
  }
};
// @lc code=end
