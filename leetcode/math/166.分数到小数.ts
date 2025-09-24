/*
 * @lc app=leetcode.cn id=166 lang=typescript
 *
 * [166] 分数到小数
 *
 * https://leetcode-cn.com/problems/fraction-to-recurring-decimal/description/
 *
 * algorithms
 * Medium (29.90%)
 * Likes:    278
 * Dislikes: 0
 * Total Accepted:    30.3K
 * Total Submissions: 98.1K
 * Testcase Example:  '1\n2'
 *
 * 给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。
 *
 * 如果小数部分为循环小数，则将循环的部分括在括号内。
 *
 * 如果存在多个答案，只需返回 任意一个 。
 *
 * 对于所有给定的输入，保证 答案字符串的长度小于 10^4 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：numerator = 1, denominator = 2
 * 输出："0.5"
 *
 *
 * 示例 2：
 *
 *
 * 输入：numerator = 2, denominator = 1
 * 输出："2"
 *
 *
 * 示例 3：
 *
 *
 * 输入：numerator = 2, denominator = 3
 * 输出："0.(6)"
 *
 *
 * 示例 4：
 *
 *
 * 输入：numerator = 4, denominator = 333
 * 输出："0.(012)"
 *
 *
 * 示例 5：
 *
 *
 * 输入：numerator = 1, denominator = 5
 * 输出："0.2"
 *
 *
 *
 *
 * 提示：
 *
 *
 * -2^31
 * denominator != 0
 *
 *
 */

// @lc code=start
/**
 * 分数转小数算法
 * 核心思想：模拟长除法过程，使用哈希表检测循环节
 */
function fractionToDecimal(numerator: number, denominator: number): string {
  // 1. 特殊情况：能整除的情况，直接返回整数结果
  if (numerator % denominator === 0) {
    return String(Math.floor(numerator / denominator));
  }

  // 2. 构建结果字符串的数组
  const result: (string | number)[] = [];

  // 3. 处理符号：如果分子分母异号，结果为负数
  if (numerator < 0 !== denominator < 0) {
    result.push("-");
  }

  // 4. 转换为正数进行计算，避免负数取模的复杂性
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);

  // 5. 计算并添加整数部分
  const integerPart = Math.floor(numerator / denominator);
  result.push(integerPart);
  result.push(".");

  // 6. 处理小数部分
  const fractionDigits: (string | number)[] = []; // 存储小数位的数字
  const remainderMap = new Map<number, number>(); // 记录余数及其首次出现的位置
  let remainder = numerator % denominator; // 当前余数
  let digitIndex = 0; // 当前小数位的索引

  // 7. 长除法模拟：当余数不为0且未出现循环时继续
  while (remainder !== 0 && !remainderMap.has(remainder)) {
    // 记录当前余数及其位置，用于检测循环
    remainderMap.set(remainder, digitIndex);

    // 长除法步骤：余数乘以10，然后除以分母
    remainder *= 10;
    const digit = Math.floor(remainder / denominator);
    fractionDigits.push(digit);

    // 更新余数
    remainder %= denominator;
    digitIndex++;
  }

  // 8. 处理循环小数
  if (remainder !== 0) {
    // 发现循环：在循环开始位置插入左括号
    const cycleStartIndex = remainderMap.get(remainder)!;
    fractionDigits.splice(cycleStartIndex, 0, "(");
    fractionDigits.push(")"); // 在末尾添加右括号
  }

  // 9. 将小数部分添加到结果中
  result.push(fractionDigits.join(""));

  return result.join("");
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将分数转换为小数表示，需要处理有限小数和无限循环小数
   - 循环小数需要用括号标记循环节
   - 需要正确处理符号和边界情况

2. 算法分析：
   - 时间复杂度：O(denominator) - 最坏情况下需要遍历所有可能的余数
   - 空间复杂度：O(denominator) - 哈希表最多存储 denominator 个不同的余数
   - 算法类型：数学模拟、哈希表

3. 解题思路：
   - 核心思想：模拟长除法过程，使用哈希表检测循环节
   - 关键观察：当余数重复出现时，说明进入了循环
   - 算法步骤：
     a) 处理符号和整数部分
     b) 模拟长除法计算小数部分
     c) 使用哈希表检测循环节
     d) 格式化输出结果

4. 实现要点：
   - 数据结构选择：
     * 使用数组存储结果字符串的各个部分
     * 使用 Map 记录余数及其首次出现的位置
   - 边界条件处理：
     * 能整除的情况直接返回整数
     * 符号处理：异号结果为负
     * 转换为正数避免负数取模问题
   - 循环检测技巧：
     * 记录每个余数首次出现的位置
     * 当余数重复时，从首次位置到当前位置为循环节

5. 示例分析：
   示例1：numerator = 1, denominator = 2
   - 1 ÷ 2 = 0 余 1
   - 10 ÷ 2 = 5 余 0 (能整除)
   - 结果："0.5"

   示例2：numerator = 2, denominator = 3
   - 2 ÷ 3 = 0 余 2
   - 20 ÷ 3 = 6 余 2 (余数重复，开始循环)
   - 结果："0.(6)"

   示例3：numerator = 4, denominator = 333
   - 4 ÷ 333 = 0 余 4
   - 40 ÷ 333 = 0 余 40
   - 400 ÷ 333 = 1 余 67
   - 670 ÷ 333 = 2 余 4 (余数重复)
   - 结果："0.(012)"

6. 数学原理：
   - 长除法：通过不断将余数乘以10来获取下一位小数
   - 循环节检测：根据鸽笼原理，余数最多有 denominator 种可能
   - 循环长度：循环节的长度最多为 denominator - 1

7. 常见陷阱：
   - 符号处理：不要忘记处理负数情况
   - 整数结果：能整除时不要添加小数点
   - 余数重复：要正确识别循环开始的位置
   - 边界情况：分子为0、分母为1等特殊情况

8. 扩展思考：
   - 类似问题：小数转分数、循环小数检测
   - 算法变种：支持更复杂的分数格式
   - 实际应用：计算器、数学软件、精度控制
   - 优化方向：减少内存使用、提高大数处理能力

9. 性能优化：
   - 使用 Map 而不是 Object 来存储余数映射
   - 预先计算整数部分，避免重复计算
   - 及时检测循环，避免不必要的计算
   - 使用数组拼接而不是字符串拼接提高性能
*/
