/*
 * @lc app=leetcode.cn id=693 lang=typescript
 *
 * [693] 交替位二进制数
 *
 * https://leetcode-cn.com/problems/binary-number-with-alternating-bits/description/
 *
 * algorithms
 * Easy (63.21%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    39.4K
 * Total Submissions: 62.4K
 * Testcase Example:  '5'
 *
 * 给定一个正整数，检查它的二进制表示是否总是 0、1 交替出现：换句话说，就是二进制表示中相邻两位的数字永不相同。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5
 * 输出：true
 * 解释：5 的二进制表示是：101
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 7
 * 输出：false
 * 解释：7 的二进制表示是：111.
 *
 * 示例 3：
 *
 *
 * 输入：n = 11
 * 输出：false
 * 解释：11 的二进制表示是：1011.
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2^31 - 1
 *
 *
 */

// @lc code=start
// simulation
/**
 * 解法一：转二进制字符串后检查是否出现相邻相同位。
 *
 * @param n - 正整数
 * @returns 是否为交替位二进制数
 */
var hasAlternatingBits = function (n: number): boolean {
  const binary = n.toString(2);
  return !(binary.includes("00") || binary.includes("11"));
};

// simulation 2
/**
 * 解法二：逐位取模模拟，比较当前位与上一位是否相同。
 *
 * @param n - 正整数
 * @returns 是否为交替位二进制数
 */
var hasAlternatingBits = function (n: number): boolean {
  // prev 初始化为 2（非法位值），用于首位比较时避免误判
  let prev = 2;
  while (n > 0) {
    // 取最低位
    const cur = n % 2;
    if (prev === cur) {
      return false;
    }
    prev = cur;
    // 整除 2，相当于右移一位
    n = Math.floor(n / 2);
  }
  return true;
};

// bit manipulation
/**
 * 解法三：位运算性质。
 *
 * 若 n 是交替位，则 n ^ (n >> 1) 会变成形如 111...111 的数。
 * 对于全 1 数 x，恒有 x & (x + 1) == 0。
 *
 * @param n - 正整数
 * @returns 是否为交替位二进制数
 */
var hasAlternatingBits = function (n: number): boolean {
  // 将相邻位是否不同映射为全 1 检查
  const a = n ^ (n >> 1);
  return (a & (a + 1)) === 0;
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：判断 n 的二进制中任意相邻两位是否都不同。
   - 关键特点：只要出现 "00" 或 "11" 就不满足。
   - 目标：返回布尔值 true/false。

2. 解题思路
   核心思想
   - 解法一：字符串法，直观检查是否出现连续相同字符。
   - 解法二：按位模拟法，逐位比较相邻位。
   - 解法三：位运算法，利用 XOR 与全 1 判定性质。

   算法步骤（解法二）
   1) 取最低位作为当前位 cur。
   2) 与上一位 prev 比较，相同则返回 false。
   3) 更新 prev，并将 n 右移一位继续。
   4) 循环结束仍未冲突则返回 true。

   算法步骤（解法三）
   1) 计算 a = n ^ (n >> 1)。
   2) 若 n 交替，则 a 为形如 111...111。
   3) 用 (a & (a + 1)) == 0 判断是否全 1。

3. 代码实现
   实现步骤
   - 保留三种风格：字符串、模拟、位运算。
   - 位运算解法最精炼，适合作为主推答案。

   关键函数说明
   - hasAlternatingBits（解法一）：字符串查找连续位。
   - hasAlternatingBits（解法二）：逐位比较相邻位。
   - hasAlternatingBits（解法三）：位运算性质判定。

4. 复杂度分析
   - 解法一时间复杂度：O(log n)，空间复杂度：O(log n)（二进制字符串）。
   - 解法二时间复杂度：O(log n)，空间复杂度：O(1)。
   - 解法三时间复杂度：O(1)，空间复杂度：O(1)（固定几次位运算）。
   - 关键观察：位运算能直接把“交替”映射为“全 1”判定。

5. 示例分析
   示例一：n = 5（二进制 101）
   - 相邻位都不同，返回 true。

   示例二：n = 7（二进制 111）
   - 出现相邻 "11"，返回 false。

   示例三：n = 11（二进制 1011）
   - 末尾出现 "11"，返回 false。

   边界情况
   - n = 1（二进制 1）：单个位天然满足，返回 true。
   - 很大的 n：位运算方案仍是常数次操作。

6. 算法要点总结
   核心技巧
   - 逐位比较是通用模板。
   - n ^ (n >> 1) 的“全 1”性质是本题关键捷径。

   优化要点
   - 若追求性能与简洁，优先位运算解法。
   - 字符串法适合初学者快速验证思路。

   类似问题
   - 判断位模式是否满足某种规律（如连续 1、交替位）。
   - 全 1 判定技巧：x & (x + 1) == 0。

7. 常见错误
   - 忘记处理首位，导致 prev 初值冲突。
   - 在位运算中误用左移/无符号右移。
   - 把“包含 01/10”误当成条件，忽略要覆盖全部相邻位。
*/
