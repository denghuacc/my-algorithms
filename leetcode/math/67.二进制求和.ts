/*
 * @lc app=leetcode.cn id=67 lang=typescript
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (46.00%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    74K
 * Total Submissions: 141.4K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
/**
 * 解法一：使用 BigInt + 进制转换（代码最短）。
 *
 * @param a - 二进制字符串
 * @param b - 二进制字符串
 * @returns 二进制和字符串
 */
var addBinary = function (a: string, b: string): string {
  // "0b" 前缀可将二进制字符串直接转为 BigInt
  return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
};

/**
 * 解法二：按位模拟加法（通用做法，不依赖大整数进制解析）。
 *
 * @param a - 二进制字符串
 * @param b - 二进制字符串
 * @returns 二进制和字符串
 */
var addBinary = function (a: string, b: string): string {
  let result = "";
  let carry = 0;
  for (
    let i = a.length - 1, j = b.length - 1;
    i >= 0 || j >= 0;
    i--, j--
  ) {
    let sum = carry;
    // charCodeAt - 48 可将字符 '0'/'1' 转换为数值 0/1
    sum += i >= 0 ? a.charCodeAt(i) - 48 : 0;
    sum += j >= 0 ? b.charCodeAt(j) - 48 : 0;
    // 当前位（二进制）写入结果
    result += sum % 2;
    // 进位只有 0 或 1
    carry = sum >= 2 ? 1 : 0;
  }
  if (carry === 1) {
    result += "1";
  }
  // 当前 result 为逆序，翻转后返回
  return result.split("").reverse().join("");
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：模拟二进制加法并输出二进制字符串结果。
   - 关键特点：输入是字符串，长度可达 10^4，不能直接用普通整数类型。
   - 目标：返回 a + b 的二进制表示。

2. 解题思路
   核心思想
   - 解法一：用 BigInt 直接解析并相加，最后转回二进制字符串。
   - 解法二：从低位到高位逐位相加，维护进位 carry。

   算法步骤（解法二）
   1) 指针 i、j 指向 a、b 末尾。
   2) 每轮求 sum = carry + a[i] + b[j]。
   3) 写入当前位 sum % 2，更新 carry（sum >= 2 时为 1）。
   4) 所有位处理完后若 carry 仍为 1，再补一位。
   5) 由于写入顺序是低位到高位，最后翻转结果字符串。

3. 代码实现
   实现步骤
   - 解法一依赖 BigInt 的 `"0b"` 二进制解析能力。
   - 解法二完全按位模拟，适合面试与跨语言实现。

   关键函数说明
   - addBinary（解法一）：内置高精度 + 进制转换。
   - addBinary（解法二）：双指针 + 进位模拟。

4. 复杂度分析
   - 解法一时间复杂度：O(n)，空间复杂度：O(n)（与实现细节相关）。
   - 解法二时间复杂度：O(max(m, n))，空间复杂度：O(max(m, n))。
   - 关键观察：逐位处理每个字符一次即可。

5. 示例分析
   示例一：a = "11", b = "1"
   - 低位：1 + 1 = 10，写 0，进位 1。
   - 高位：1 + 0 + 进位 1 = 10，写 0，进位 1。
   - 结束补进位 1，结果 "100"。

   示例二：a = "1010", b = "1011"
   - 按位求和后得到逆序结果，翻转为 "10101"。

   边界情况
   - 一方长度远大于另一方。
   - 最终产生额外进位（如 "1" + "1"）。

6. 算法要点总结
   核心技巧
   - 进位制加法模板：`sum = x + y + carry`。
   - 二进制位：当前位 `sum % 2`，进位 `sum / 2`。

   优化要点
   - 使用 `charCodeAt - 48` 比 `parseInt` 更直接。
   - BigInt 解法更短，但面试场景更推荐手写按位模拟。

   类似问题
   - 字符串加法（十进制）。
   - 大整数加法与进制转换问题。

7. 常见错误
   - 忘记处理最后的进位。
   - 混淆结果顺序，忘记翻转。
   - 用普通 Number 直接转整型导致溢出。
*/
