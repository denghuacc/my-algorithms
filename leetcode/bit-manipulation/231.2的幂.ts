/*
 * @lc app=leetcode.cn id=231 lang=typescript
 *
 * [231] 2的幂
 *
 * https://leetcode-cn.com/problems/power-of-two/description/
 *
 * algorithms
 * Easy (43.77%)
 * Likes:    218
 * Dislikes: 0
 * Total Accepted:    67.5K
 * Total Submissions: 139.7K
 * Testcase Example:  '1'
 *
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
 *
 * 示例 1:
 *
 * 输入: 1
 * 输出: true
 * 解释: 2^0 = 1
 *
 * 示例 2:
 *
 * 输入: 16
 * 输出: true
 * 解释: 2^4 = 16
 *
 * 示例 3:
 *
 * 输入: 218
 * 输出: false
 *
 */

// @lc code=start
// math: 反复整除 2，最终应当能整除到 1（n <= 0 直接返回 false）
var isPowerOfTwo = function (n: number): boolean {
  if (n <= 0) return false;
  while (n % 2 === 0) {
    n /= 2;
  }
  return n === 1;
};

// bit manipulation: 若 n 是 2 的幂，则二进制只有一个 1，恒有 n & (n - 1) === 0（前提 n > 0）
var isPowerOfTwo = function (n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断整数 n 是否为 2 的幂（n = 1, 2, 4, 8, ...）。
   - 特征：二进制表示中只有一个位为 1。

2. 算法分析：
   - 时间复杂度：
     - 位运算法：O(1)，常数时间判断。
     - 数学法（反复除 2）：O(log n)，最多除到 1。
   - 空间复杂度：O(1)。
   - 算法类型：位运算 / 数学。

3. 实现要点：
   - 位运算性质：当且仅当 n 为 2 的幂时，n & (n - 1) === 0（需保证 n > 0）。
   - 边界处理：n <= 0 时直接返回 false。
   - JS/TS 注意：按位运算按 32 位有符号整数进行，但本题范围内结论仍成立。

4. 优化思路：
   - 首选 O(1) 位运算法：n > 0 && (n & (n - 1)) === 0。
   - 数学法可作为直观备选方案，便于理解与对拍。
*/
