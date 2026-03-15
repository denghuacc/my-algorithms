/*
 * @lc app=leetcode.cn id=476 lang=typescript
 *
 * [476] 数字的补数
 *
 * https://leetcode-cn.com/problems/number-complement/description/
 *
 * algorithms
 * Easy (70.87%)
 * Likes:    241
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 61.2K
 * Testcase Example:  '5'
 *
 * 给你一个 正 整数 num ，输出它的补数。补数是对该数的二进制表示取反。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 5
 * 输出：2
 * 解释：5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 1
 * 输出：0
 * 解释：1 的二进制表示为 1（没有前导零位），其补数为 0。所以你需要输出 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定的整数 num 保证在 32 位带符号整数的范围内。
 * num >= 1
 * 你可以假定二进制数不包含前导零位。
 * 本题与 1009 https://leetcode-cn.com/problems/complement-of-base-10-integer/ 相同
 *
 *
 */

// @lc code=start
/**
 * 方法一：字符串模拟取反
 *
 * 思路：
 * 1. 先把十进制数转换成无前导零的二进制字符串。
 * 2. 对每一位做字符翻转：'0' -> '1'，'1' -> '0'。
 * 3. 再把翻转后的二进制字符串转回十进制。
 *
 * @param num - 正整数
 * @returns num 的二进制补数
 *
 * 时间复杂度：O(k)，k 为 num 的二进制位数
 * 空间复杂度：O(k)
 */
var findComplement = function (num: number): number {
  return binaryStringToDecimal(flipBinaryDigits(decimalToBinaryString(num)));

  /**
   * 十进制转二进制字符串。
   * 由于题目保证 num >= 1，这里得到的字符串不会是空串。
   */
  function decimalToBinaryString(decimal: number): string {
    return (decimal >>> 0).toString(2);
  }

  /**
   * 把二进制字符串按位翻转：
   * 例如 "101" -> "010"。
   */
  function flipBinaryDigits(binary: string): string {
    const flipped: string[] = [];
    for (const bit of binary) {
      flipped.push(bit === "0" ? "1" : "0");
    }
    return flipped.join("");
  }

  /**
   * 二进制字符串转十进制。
   */
  function binaryStringToDecimal(binary: string): number {
    return parseInt(binary, 2);
  }
};

/**
 * 方法二：位运算掩码（推荐）
 *
 * 核心思路：
 * - 先找到 num 最高有效位 highBit。
 * - 构造掩码 mask，使其在 [0..highBit] 位全为 1，其余位为 0。
 * - `num ^ mask` 即可把有效位全部翻转，得到补数。
 *
 * 例如 num = 5(101)：
 * - highBit = 2，mask = 111(二进制) = 7
 * - 101 ^ 111 = 010 = 2
 *
 * @param num - 正整数
 * @returns num 的二进制补数
 *
 * 时间复杂度：O(1)（最多扫描 31 位）
 * 空间复杂度：O(1)
 */
var findComplement = function (num: number): number {
  // highBit 表示 num 的最高 1 位下标（从 0 开始）。
  let highBit = 0;

  // 题目给定 32 位有符号整数范围，正数最高只会用到第 30 位。
  for (let i = 1; i <= 30; i++) {
    if (num >= 1 << i) {
      highBit = i;
    } else {
      break;
    }
  }

  // 构造低 (highBit + 1) 位全 1 的掩码。
  // i=30 时，1 << 31 会变成负数，因此单独处理为 0x7fffffff。
  const mask = highBit === 30 ? 0x7fffffff : (1 << (highBit + 1)) - 1;

  // 只翻转有效位，前导 0 不参与翻转。
  return num ^ mask;
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：
     对正整数 num 的二进制表示（不含前导零）按位取反。
   - 关键点：
     1) 只翻转有效位，不能把更高位的前导 0 也翻转进来。
     2) `num >= 1`，因此至少有 1 位有效二进制位。

2. 方法一：字符串模拟

   核心思想：
   - 把问题转成字符串处理，按字符翻转后再转回数字。
   - 这是一种直观实现，适合理解“只翻转有效位”的含义。
   - 它的优势是思路非常直接，
     缺点是要经历“数字 -> 字符串 -> 数字”的转换。

   算法步骤：
   1. `num -> binaryString`，例如 5 -> "101"。
   2. 按位翻转字符，"101" -> "010"。
   3. 将 "010" 解析成十进制得到 2。

   复杂度：
   - 时间 O(k)，空间 O(k)，k 是二进制位数。

3. 方法二：位运算掩码（推荐）

   核心思想：
   - 补数本质上是“在有效位范围内全部翻转”。
   - 如果有效位长度是 L，那么构造一个低 L 位全 1 的掩码：
     mask = (1 << L) - 1
   - 结果就是 `num ^ mask`。

   关键观察：
   - 题目要求翻转的是“二进制表示”，
     而不是语言内部固定宽度的整型表示。
   - 因此真正需要翻转的，只有从最高有效位到最低位这一段。
   - 掩码的作用，就是精确圈定这段“应该被翻转的范围”。

   为什么正确：
   - XOR 性质：
     1 ^ 1 = 0，0 ^ 1 = 1。
   - 当 mask 的有效位都是 1，num 在这些位会全部翻转；
     mask 更高位为 0，不会影响前导位。

   关键实现细节：
   - 先找到最高位下标 highBit，再得到 L = highBit + 1。
   - 当 highBit = 30 时，`1 << 31` 在 JS/TS 32 位有符号运算中会溢出为负，
     因此需特判使用 `0x7fffffff`。

   复杂度：
   - 时间 O(1)（最多遍历 31 次）
   - 空间 O(1)

4. 示例分析

   示例 1：num = 5
   - 二进制：101
   - 补数：010
   - 十进制结果：2

   示例 2：num = 1
   - 二进制：1
   - 补数：0
   - 十进制结果：0

   示例 3：num = 10
   - 二进制：1010
   - 有效位长度 L=4，mask=1111
   - 1010 ^ 1111 = 0101 = 5

5. 常见错误
   - 直接写 `~num`：
     会把 32 位全部翻转，包含前导位，结果不符合题意。
     例如 `num = 5` 时，`~5` 在 JS/TS 中不是 2，而是负数。
   - 忘记“只翻转有效位”：
     掩码长度构造错误会导致结果偏大或负数。
   - 位移边界处理不当：
     在 JS/TS 中 `1 << 31` 会变成负值，需要特判。

6. 总结
   - 学习和讲解可用方法一（直观）。
   - 面试和实战更推荐方法二（位运算掩码），更高效且更“位运算题”。
   - 这题的关键不是“如何取反”，而是“如何只取反有效位”。
*/
