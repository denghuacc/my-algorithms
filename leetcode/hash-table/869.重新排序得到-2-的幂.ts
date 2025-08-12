/*
 * @lc app=leetcode.cn id=869 lang=typescript
 *
 * [869] 重新排序得到 2 的幂
 *
 * https://leetcode-cn.com/problems/reordered-power-of-2/description/
 *
 * algorithms
 * Medium (61.39%)
 * Likes:    70
 * Dislikes: 0
 * Total Accepted:    10.9K
 * Total Submissions: 17.9K
 * Testcase Example:  '1'
 *
 * 给定正整数 N ，我们按任何顺序（包括原始顺序）将数字重新排序，注意其前导数字不能为零。
 *
 * 如果我们可以通过上述方式得到 2 的幂，返回 true；否则，返回 false。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：1
 * 输出：true
 *
 *
 * 示例 2：
 *
 * 输入：10
 * 输出：false
 *
 *
 * 示例 3：
 *
 * 输入：16
 * 输出：true
 *
 *
 * 示例 4：
 *
 * 输入：24
 * 输出：false
 *
 *
 * 示例 5：
 *
 * 输入：46
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= N <= 10^9
 *
 *
 */

// @lc code=start
/**
 * 判断数字重新排序后是否能得到2的幂
 *
 * 核心思路：比较数字频次
 * 1. 生成所有2的幂的数字频次模式
 * 2. 计算输入数字的频次模式
 * 3. 检查是否存在匹配的频次模式
 */
function reorderedPowerOf2(n: number): boolean {
  // 预计算所有2的幂的数字频次模式
  const powerOf2Digits: Set<string> = new Set();

  // 生成所有不超过1e9的2的幂
  for (let i = 1; i <= 1e9; i <<= 1) {
    powerOf2Digits.add(countDigits(i));
  }

  // 检查输入数字的频次模式是否在2的幂的频次模式集合中
  return powerOf2Digits.has(countDigits(n));

  /**
   * 计算数字的频次模式
   * 将数字转换为0-9每个数字出现次数的字符串表示
   * 例如：123 -> "0111000000" (1个1, 1个2, 1个3)
   *
   * @param n - 要分析的数字
   * @returns 频次模式字符串
   */
  function countDigits(n: number): string {
    const cnt: number[] = new Array(10).fill(0);

    // 逐位统计每个数字的出现次数
    while (n) {
      cnt[n % 10]++;
      n = Math.floor(n / 10);
    }

    // 将频次数组转换为字符串，便于比较
    return cnt.join("");
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断一个数字重新排列后是否能得到2的幂
   - 核心是数字的排列组合问题，但不需要实际生成所有排列

2. 算法分析：
   - 时间复杂度：O(log N * log N) = O((log N)²)
     * 生成2的幂：O(log N) 个数字
     * 每个数字的位数：O(log N)
   - 空间复杂度：O(log N)
     * 存储所有2的幂的频次模式
   - 算法类型：哈希表 + 数学

3. 实现要点：
   - 关键洞察：重新排列只改变数字顺序，不改变数字频次
   - 使用频次模式作为哈希键，避免生成所有排列
   - 预计算所有可能的2的幂的频次模式
   - 使用字符串表示频次数组，便于哈希表查找

4. 优化思路：
   - 预计算策略：一次性生成所有2的幂的频次模式
   - 频次表示：使用字符串而非数组，提高哈希表查找效率
   - 位运算：使用 i <<= 1 生成2的幂，比乘法更高效

5. 示例分析：
   输入：46
   - 46的频次模式：[0,0,0,0,1,0,1,0,0,0] -> "0000101000"
   - 64的频次模式：[0,0,0,0,1,0,1,0,0,0] -> "0000101000"
   - 匹配成功，返回true

6. 边界情况：
   - 单个数字：直接检查是否为2的幂
   - 前导零：重新排列时不能有前导零，但频次模式自动处理
   - 大数字：使用位运算避免溢出

7. 类似问题：
   - 重新排列得到回文数
   - 数字重排得到特定模式
   - 字符串重排匹配问题
*/
