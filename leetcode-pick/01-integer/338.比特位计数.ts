/*
 * @lc app=leetcode.cn id=338 lang=typescript
 *
 * [338] 比特位计数
 *
 * https://leetcode-cn.com/problems/counting-bits/description/
 *
 * algorithms
 * Medium (78.89%)
 * Likes:    628
 * Dislikes: 0
 * Total Accepted:    107K
 * Total Submissions: 135.7K
 * Testcase Example:  '2'
 *
 * 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。
 *
 * 示例 1:
 *
 * 输入: 2
 * 输出: [0,1,1]
 *
 * 示例 2:
 *
 * 输入: 5
 * 输出: [0,1,1,2,1,2]
 *
 * 进阶:
 *
 *
 * 给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
 * 要求算法的空间复杂度为O(n)。
 * 你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。
 *
 *
 */

// @lc code=start
/**
 * 解法一：位运算 - Brian Kernighan算法
 *
 * 核心思想：
 * 使用 n & (n-1) 可以消除n的二进制表示中最右边的1
 * 重复此操作直到n变为0，操作次数即为1的个数
 *
 * 算法步骤：
 * 1. 遍历0到num的每个数字
 * 2. 对每个数字使用Brian Kernighan算法计算1的个数
 * 3. 将结果存入数组
 *
 * 时间复杂度：O(n * log n)，每个数字最多需要log n次操作
 * 空间复杂度：O(1)，不考虑输出数组
 */
var countBits = function (num: number): number[] {
  const counts: number[] = new Array(num + 1).fill(0);
  for (let i = 0; i <= num; i++) {
    counts[i] = getOneCounts(i);
  }
  return counts;

  /**
   * Brian Kernighan算法：计算数字中1的个数
   * @param num 要计算的数字
   * @returns 1的个数
   */
  function getOneCounts(num: number): number {
    let count = 0;
    while (num !== 0) {
      // n & (n-1) 消除最右边的1
      num &= num - 1;
      count++;
    }
    return count;
  }
};

/**
 * 解法二：数学方法 - 除2取余
 *
 * 核心思想：
 * 通过不断除以2并记录余数来计算二进制中1的个数
 * 余数为1表示该位为1，余数为0表示该位为0
 *
 * 算法步骤：
 * 1. 遍历0到num的每个数字
 * 2. 对每个数字不断除以2，记录余数
 * 3. 统计余数为1的次数
 *
 * 时间复杂度：O(n * log n)，每个数字最多需要log n次除法
 * 空间复杂度：O(1)，不考虑输出数组
 */
var countBits = function (num: number): number[] {
  const counts: number[] = [];
  for (let i = 0; i <= num; i++) {
    const count = getOneCounts(i);
    counts.push(count);
  }
  return counts;

  /**
   * 通过除2取余计算1的个数
   * @param num 要计算的数字
   * @returns 1的个数
   */
  function getOneCounts(num: number): number {
    let count = 0;
    while (num > 0) {
      const remainder = num % 2;
      if (remainder === 1) {
        count++;
      }
      num = Math.floor(num / 2);
    }
    return count;
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 计算0到num范围内每个数字的二进制表示中1的个数
   - 需要高效的算法来处理大量数字

2. 算法分析：
   - 解法一（Brian Kernighan）：O(n * log n) 时间，O(1) 空间
   - 解法二（除2取余）：O(n * log n) 时间，O(1) 空间
   - 最优解法（动态规划）：O(n) 时间，O(1) 空间

3. 实现要点：
   - Brian Kernighan算法：n & (n-1) 消除最右边的1
   - 除2取余：通过数学运算逐位检查
   - 动态规划：利用已知结果计算新结果

4. 优化思路：
   - 动态规划：count[i] = count[i >> 1] + (i & 1)
   - 利用位运算的奇偶性：偶数右移1位，奇数右移1位再加1
   - 可以进一步优化为O(n)时间复杂度

5. 示例分析：
   - 0: 0 -> 0个1
   - 1: 1 -> 1个1  
   - 2: 10 -> 1个1
   - 3: 11 -> 2个1
   - 4: 100 -> 1个1
   - 5: 101 -> 2个1

6. 边界情况：
   - num = 0 时返回 [0]
   - 大数字时注意性能优化

7. 类似问题：
   - 可以使用相同思路解决其他位计数问题
   - Brian Kernighan算法是位运算的经典技巧
   - 动态规划在序列问题中很常见

8. 进阶解法（动态规划）：
   ```typescript
   function countBits(num: number): number[] {
     const counts = new Array(num + 1).fill(0);
     for (let i = 1; i <= num; i++) {
       counts[i] = counts[i >> 1] + (i & 1);
     }
     return counts;
   }
   ```
*/
