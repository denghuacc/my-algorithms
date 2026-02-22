/*
 * @lc app=leetcode.cn id=762 lang=typescript
 *
 * [762] 二进制表示中质数个计算置位
 *
 * https://leetcode-cn.com/problems/prime-number-of-set-bits-in-binary-representation/description/
 *
 * algorithms
 * Easy (70.69%)
 * Likes:    93
 * Dislikes: 0
 * Total Accepted:    28.2K
 * Total Submissions: 38.4K
 * Testcase Example:  '6\n10'
 *
 * 给你两个整数 left 和 right ，在闭区间 [left, right] 范围内，统计并返回 计算置位位数为质数 的整数个数。
 *
 * 计算置位位数 就是二进制表示中 1 的个数。
 *
 *
 * 例如， 21 的二进制表示 10101 有 3 个计算置位。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：left = 6, right = 10
 * 输出：4
 * 解释：
 * 6 -> 110 (2 个计算置位，2 是质数)
 * 7 -> 111 (3 个计算置位，3 是质数)
 * 9 -> 1001 (2 个计算置位，2 是质数)
 * 10-> 1010 (2 个计算置位，2 是质数)
 * 共计 4 个计算置位为质数的数字。
 *
 *
 * 示例 2：
 *
 *
 * 输入：left = 10, right = 15
 * 输出：5
 * 解释：
 * 10 -> 1010 (2 个计算置位, 2 是质数)
 * 11 -> 1011 (3 个计算置位, 3 是质数)
 * 12 -> 1100 (2 个计算置位, 2 是质数)
 * 13 -> 1101 (3 个计算置位, 3 是质数)
 * 14 -> 1110 (3 个计算置位, 3 是质数)
 * 15 -> 1111 (4 个计算置位, 4 不是质数)
 * 共计 5 个计算置位为质数的数字。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= left <= right <= 10^6
 * 0 <= right - left <= 10^4
 *
 *
 */

// @lc code=start
/**
 * 解法一：逐个统计置位数，再判断是否为质数。
 *
 * @param left - 区间左端点
 * @param right - 区间右端点
 * @returns 置位数为质数的整数个数
 */
var countPrimeSetBits = function (left: number, right: number): number {
  let result = 0;
  for (let i = left; i <= right; i++) {
    // 当前数字的置位数是质数，则计入答案
    if (isPrime(bitCount(i))) {
      result++;
    }
  }
  return result;

  function isPrime(num: number): boolean {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  function bitCount(num: number): number {
    // Brian Kernighan 算法：每次去掉最低位 1
    let count = 0;
    while (num > 0) {
      num &= num - 1;
      count++;
    }
    return count;
  }
};

/**
 * 解法二：位掩码预存“质数置位数”并做 O(1) 判断。
 *
 * @param left - 区间左端点
 * @param right - 区间右端点
 * @returns 置位数为质数的整数个数
 */
var countPrimeSetBits = function (left: number, right: number): number {
  // 665772 的二进制在质数位（2,3,5,7,11,13,17,19）上为 1
  const PRIME_MASK = 665772;
  let result = 0;
  for (let i = left; i <= right; i++) {
    const ones = bitCount(i);
    // 若 PRIME_MASK 的第 ones 位为 1，则 ones 是质数
    if (((1 << ones) & PRIME_MASK) !== 0) {
      result++;
    }
  }
  return result;

  function bitCount(num: number): number {
    let count = 0;
    while (num > 0) {
      num &= num - 1;
      count++;
    }
    return count;
  }
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：统计区间内“二进制 1 的个数是质数”的整数数量。
   - 关键特点：关注的是置位数（popcount），不是数本身是否质数。
   - 目标：返回 [left, right] 中满足条件的个数。

2. 解题思路
   核心思想
   - 对区间内每个数计算置位数。
   - 置位数若为质数，则答案加一。
   - 可用两种判定策略：
     1) 直接质数判断；
     2) 预计算质数位掩码常量做 O(1) 判定。

   算法步骤（解法一）
   1) 枚举 i 从 left 到 right。
   2) 计算 ones = bitCount(i)。
   3) 调用 isPrime(ones) 判定，若真则计数。

   算法步骤（解法二）
   1) 同样枚举区间并计算 ones。
   2) 用位掩码 PRIME_MASK 判断 ones 是否为质数：
      - 若 `((1 << ones) & PRIME_MASK) != 0`，则是质数。
   3) 满足则计数。

3. 代码实现
   实现步骤
   - 两个解法都采用位运算版 bitCount（Kernighan）替代字符串统计。
   - 解法二通过常量掩码省去质数循环判断。

   关键函数说明
   - countPrimeSetBits（解法一）：bitCount + isPrime 直接判定。
   - countPrimeSetBits（解法二）：bitCount + 掩码快速判定。
   - bitCount：统计二进制 1 的个数。

4. 复杂度分析
   - 设区间长度为 m = right - left + 1。
   - 解法一时间复杂度：O(m * logV)，V 为数字大小（用于 bitCount 与质数判定）。
   - 解法二时间复杂度：O(m * logV)，但常数更小。
   - 两种解法空间复杂度：O(1)。

5. 示例分析
   示例一：left=6, right=10
   - 6(110)->2，7(111)->3，8(1000)->1，9(1001)->2，10(1010)->2。
   - 其中置位数为质数的有 6,7,9,10，共 4 个。

   示例二：left=10, right=15
   - 10->2, 11->3, 12->2, 13->3, 14->3, 15->4。
   - 只有 15 的置位数 4 非质数，其余满足，共 5 个。

   边界情况
   - left = right：只需判断单个数字。
   - 数字较大时，bitCount 仍是按置位数迭代，效率稳定。

6. 算法要点总结
   核心技巧
   - 关注置位数而非原数。
   - Kernighan 计数法高效、实现简洁。

   优化要点
   - 用质数位掩码替代逐个试除判质数，减少常数开销。
   - 在本题约束下两种方案都可通过，掩码方案更“位运算化”。

   类似问题
   - 汉明重量统计类问题。
   - 用掩码表示集合并快速判定成员的问题。

7. 常见错误
   - 把“数字本身是质数”误当作判定条件。
   - bitCount 用字符串处理，虽然可过但可读性和性能较弱。
   - 掩码位偏移写错，导致质数判定错误。
*/
