/*
 * @lc app=leetcode.cn id=29 lang=typescript
 *
 * [29] 两数相除
 *
 * https://leetcode-cn.com/problems/divide-two-integers/description/
 *
 * algorithms
 * Medium (17.27%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    46.6K
 * Total Submissions: 237.2K
 * Testcase Example:  '10\n3'
 *
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 *
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 *
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
 * -2
 *
 *
 *
 * 示例 1:
 *
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 *
 * 示例 2:
 *
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 *
 *
 *
 * 提示：
 *
 *
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
 *
 *
 */

// @lc code=start
/**
 * 解法一：数学方法 - 快速幂思想
 *
 * 核心思想：
 * 使用快速幂的思想，通过不断翻倍来加速除法运算
 * 每次将除数翻倍，直到超过被除数，然后递归处理剩余部分
 *
 * 算法步骤：
 * 1. 处理边界情况：0、1、-1、溢出
 * 2. 确定符号：异号结果为负
 * 3. 转换为正数进行运算
 * 4. 使用快速幂思想计算商
 * 5. 处理溢出情况
 *
 * 时间复杂度：O(log n)，每次递归除数翻倍
 * 空间复杂度：O(log n)，递归调用栈深度
 *
 * 优点：时间复杂度优秀，思路清晰
 * 缺点：需要处理复杂的边界情况
 */
var divide = function (dividend: number, divisor: number): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);

  // 处理边界情况
  if (dividend === 0) return 0;
  if (divisor === 1) return dividend;
  if (divisor === -1) {
    if (dividend > MIN) {
      return -dividend;
    }
    return MAX;
  }

  let a = dividend;
  let b = divisor;
  let sign = 1;

  // 确定符号
  if ((a > 0 && b < 0) || (a < 0 && b > 0)) {
    sign = -1;
  }

  // 转换为正数
  a = a > 0 ? a : -a;
  b = b > 0 ? b : -b;

  const res = div(a, b);
  if (sign > 0) return res > MAX ? MAX : res;
  return -res;

  /**
   * 递归计算除法
   * @param a 被除数
   * @param b 除数
   * @returns 商
   */
  function div(a: number, b: number): number {
    if (a < b) return 0;
    let count = 1;
    let tb = b;
    // 不断翻倍，直到超过被除数
    while (tb * 2 <= a) {
      count = count * 2;
      tb = tb * 2;
    }
    // 递归处理剩余部分
    return count + div(a - tb, b);
  }
};

/**
 * 解法二：二分查找 - 位运算优化
 *
 * 核心思想：
 * 使用二分查找的思想，通过位运算来加速
 * 将除法转换为查找最大的k，使得k * divisor <= dividend
 *
 * 算法步骤：
 * 1. 处理边界情况和符号
 * 2. 转换为负数运算（避免溢出）
 * 3. 使用二分查找找到商
 * 4. 处理结果符号和溢出
 *
 * 时间复杂度：O(log n)，二分查找
 * 空间复杂度：O(1)，只使用常数空间
 *
 * 优点：空间复杂度优秀，位运算高效
 * 缺点：逻辑相对复杂
 */
var divide = function (dividend: number, divisor: number): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);

  // 处理边界情况
  if (dividend === MIN) {
    if (divisor === 1) {
      return MIN;
    }
    if (divisor === -1) {
      return MAX;
    }
  }

  if (divisor === MIN) {
    return dividend === MIN ? 1 : 0;
  }

  if (divisor === 0) {
    return 0;
  }

  // 转换为负数运算，避免溢出
  let rev = false;
  if (dividend > 0) {
    dividend = -dividend;
    rev = !rev;
  }
  if (divisor > 0) {
    divisor = -divisor;
    rev = !rev;
  }

  // 构建候选值数组
  const candidates: number[] = [];
  candidates.push(divisor);
  let index = 0;
  // 不断翻倍，直到超过被除数
  while (candidates[index] >= dividend - candidates[index]) {
    candidates.push(candidates[index] * 2);
    index++;
  }

  // 从大到小尝试每个候选值
  let res = 0;
  for (let i = candidates.length - 1; i >= 0; i--) {
    if (candidates[i] >= dividend) {
      res += 1 << i;
      dividend -= candidates[i];
    }
  }

  return rev ? -res : res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 不使用乘法、除法、mod运算实现整数除法
   - 需要处理溢出和边界情况
   - 要求高效的时间复杂度

2. 算法分析：
   - 解法一（快速幂）：O(log n) 时间，O(log n) 空间
   - 解法二（二分查找）：O(log n) 时间，O(1) 空间
   - 两种方法都避免了暴力减法，时间复杂度优秀

3. 实现要点：
   - 边界处理：0、1、-1、溢出情况
   - 符号处理：异号结果为负
   - 溢出处理：结果超出32位整数范围
   - 负数运算：避免正数溢出

4. 快速幂思想详解：
   - 每次将除数翻倍：b, 2b, 4b, 8b, ...
   - 找到最大的2^k * b <= a
   - 递归处理剩余部分：a - 2^k * b
   - 总商 = 2^k + div(a - 2^k * b, b)

5. 示例分析：
   - 10 ÷ 3：
     * 3 < 10，翻倍：6 < 10，再翻倍：12 > 10
     * 商 = 2 + div(10-6, 3) = 2 + div(4, 3) = 2 + 1 = 3

6. 边界情况：
   - dividend = 0：返回0
   - divisor = 1：返回dividend
   - divisor = -1：返回-dividend（注意溢出）
   - 结果溢出：返回MAX或MIN
   - 负数处理：转换为正数或负数运算

7. 类似问题：
   - 快速幂算法
   - 二分查找变种
   - 大数运算
   - 位运算优化

8. 优化技巧：
   - 使用负数运算避免溢出
   - 位运算代替乘法：x * 2 = x << 1
   - 提前处理边界情况
   - 使用二分查找加速

9. 扩展思考：
   - 可以扩展到浮点数除法
   - 可以处理任意进制的除法
   - 位运算在数学运算中非常有用
   - 快速幂思想可以应用到其他问题

10. 常见错误：
    - 忘记处理溢出情况
    - 符号处理错误
    - 递归终止条件错误
    - 负数运算溢出
*/
