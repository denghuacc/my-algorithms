/*
 * @lc app=leetcode.cn id=1317 lang=typescript
 *
 * [1317] 将整数转换为两个无零整数的和
 *
 * https://leetcode.cn/problems/convert-integer-to-the-sum-of-two-no-zero-integers/description/
 *
 * algorithms
 * Easy (62.98%)
 * Likes:    49
 * Dislikes: 0
 * Total Accepted:    26K
 * Testcase Example:  '2'

 * 输入：n = 10000
 * 输出：[1,9999]
 *
 *
 * 示例 4：
 *
 *
 * 输入：n = 69
 * 输出：[1,68]
 *
 *
 * 示例 5：
 *
 *
 * 输入：n = 1010
 * 输出：[11,999]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 10^4
 *
 *
 */

// @lc code=start

// 方法一：从 n-1 和 1 开始，依次递减/递增，直到找到无零整数对
var getNoZeroIntegers = function (n: number): number[] {
  let a = n - 1; // 初始化a为n-1
  let b = 1; // 初始化b为1
  // 不断调整a和b，直到都不含0
  while (check(a) || check(b)) {
    a--; // a递减，尝试下一个可能的a
    b++; // b递增，保证a+b始终等于n
  }
  // 返回找到的无零整数对
  return [a, b];

  // 判断一个数num是否包含数字0
  function check(num: number): boolean {
    // 将数字转为字符串，判断是否包含字符'0'
    const str = String(num);
    return str.includes("0");
  }
};

// 方法二：从1和n-1开始，依次递增/递减，直到找到无零整数对
var getNoZeroIntegers2 = function (n: number): number[] {
  let a = 1; // 初始化a为1
  let b = n - 1; // 初始化b为n-1
  // 不断调整a和b，直到都不含0
  while (check(a) || check(b)) {
    a++; // a递增，尝试下一个可能的a
    b--; // b递减，保证a+b始终等于n
  }
  // 返回找到的无零整数对
  return [a, b];

  // 判断一个数num是否包含数字0（逐位判断）
  function check(num: number): boolean {
    // 逐位取出数字，判断每一位是否为0
    while (num) {
      if (num % 10 === 0) return true; // 当前位为0，返回true
      num = Math.floor(num / 10); // 去掉最低位，继续判断
    }
    return false; // 所有位都不是0，返回false
  }
};
/*
解题思路详解：

1. 问题本质：
  - 将正整数n拆分为两个正整数a和b，要求a、b的十进制表示都不含0（无零整数），且a+b=n。
  - 题目保证至少有一组解，允许返回任意一组。

2. 算法分析：
  - 时间复杂度：O(n * log n)（最坏情况下需遍历O(n)对，每次判断O(log n)）
  - 空间复杂度：O(1)（只用常数空间）
  - 算法类型：枚举 + 数位判断

3. 实现要点：
  - 关键数据结构：无特殊结构，直接用整数变量
  - 核心算法步骤：
    a) 枚举a从1到n-1，b=n-a
    b) 检查a和b是否都不含0
    c) 找到后直接返回
  - 边界情况处理：n=2时返回[1,1]，n最大为10^4

4. 优化思路：
  - 只需找到一组解即可，无需全部枚举
  - 可以从两端向中间靠拢，减少遍历次数
  - 数位判断可用字符串或取模法实现

5. 示例分析：
  - n=2：1+1=2，1和1都无0 → [1,1]
  - n=11：2+9=11，2和9都无0 → [2,9]
  - n=10000：1+9999=10000，1和9999都无0 → [1,9999]

6. 算法优势：
  - 逻辑简单，易于实现
  - 只需找到一组解，效率高
  - 代码可读性强

7. 常见错误：
  - 忘记判断a或b是否为无零整数
  - 判断数位时只判断了a或b，没有都判断
  - 边界处理不当（如n=2）

8. 扩展思考：
  - 如何高效找到所有无零整数对？
  - 如果要求a、b都尽量大或尽量小，如何调整？
  - 如果允许有多个0，如何修改算法？
*/
