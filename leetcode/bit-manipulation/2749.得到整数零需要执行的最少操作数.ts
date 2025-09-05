/*
 * @lc app=leetcode.cn id=2749 lang=typescript
 *
 * [2749] 得到整数零需要执行的最少操作数
 *
 * https://leetcode.cn/problems/minimum-operations-to-make-the-integer-zero/description/
 *
 * algorithms
 * Medium (36.02%)
 * Likes:    48
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 20.4K
 * Testcase Example:  '3\n-2'
 *
 * 给你两个整数：num1 和 num2 。
 *
 * 在一步操作中，你需要从范围 [0, 60] 中选出一个整数 i ，并从 num1 减去 2^i + num2 。
 *
 * 请你计算，要想使 num1 等于 0 需要执行的最少操作数，并以整数形式返回。
 *
 * 如果无法使 num1 等于 0 ，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num1 = 3, num2 = -2
 * 输出：3
 * 解释：可以执行下述步骤使 3 等于 0 ：
 * - 选择 i = 2 ，并从 3 减去 2^2 + (-2) ，num1 = 3 - (4 + (-2)) = 1 。
 * - 选择 i = 2 ，并从 1 减去 2^2 + (-2) ，num1 = 1 - (4 + (-2)) = -1 。
 * - 选择 i = 0 ，并从 -1 减去 2^0 + (-2) ，num1 = (-1) - (1 + (-2)) = 0 。
 * 可以证明 3 是需要执行的最少操作数。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num1 = 5, num2 = 7
 * 输出：-1
 * 解释：可以证明，执行操作无法使 5 等于 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num1 <= 10^9
 * -10^9 <= num2 <= 10^9
 *
 *
 */

// @lc code=start
function makeTheIntegerZero(num1: number, num2: number): number {
  let k = 1; // 操作次数，从1开始尝试

  while (true) {
    // 计算执行k次操作后，num1剩余的值
    // 每次操作减去 (2^i + num2)，所以k次操作总共减去 k * num2 + 一些2的幂次
    // 剩余值 x = num1 - k * num2，这个值需要能够用k个2的幂次表示
    const x = BigInt(num1) - BigInt(k) * BigInt(num2);

    // 如果剩余值小于k，说明无法用k个2的幂次表示（每个2的幂次至少为1）
    if (x < BigInt(k)) {
      return -1;
    }

    // 检查剩余值x的二进制表示中1的个数是否不超过k
    // 如果x的二进制中1的个数 <= k，说明可以用k个2的幂次表示x
    if (k >= bitCount(x)) {
      return k;
    }

    k++; // 尝试更多操作次数
  }

  // 计算一个数的二进制表示中1的个数
  function bitCount(num: bigint): number {
    let cnt = 0;
    while (num !== 0n) {
      cnt++;
      // 使用位运算技巧：num & (num - 1) 会移除最右边的1
      num &= num - 1n;
    }
    return cnt;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 每次操作可以选择一个i (0 ≤ i ≤ 60)，从num1减去 (2^i + num2)
   - 目标是用最少的操作次数使num1变为0
   - 核心问题：如何判断用k次操作能否使num1变为0

2. 算法分析：
   - 时间复杂度：O(log(num1))，最多尝试log(num1)次操作
   - 空间复杂度：O(1)，只使用常数额外空间
   - 算法类型：数学 + 位运算

3. 核心思路：
   - 设执行k次操作后，num1剩余值为 x = num1 - k * num2
   - 这个剩余值x必须能够用k个2的幂次的和来表示
   - 关键观察：x的二进制表示中1的个数就是最少需要的2的幂次个数
   - 如果x的二进制中1的个数 ≤ k，则可以用k次操作完成

4. 实现要点：
   - 使用BigInt处理大数运算，避免溢出
   - 用位运算技巧快速计算二进制中1的个数
   - 从k=1开始逐步尝试，直到找到解或确定无解

5. 边界情况处理：
   - 当x < k时，无法用k个2的幂次表示（每个幂次至少为1）
   - 当x的二进制1的个数 > k时，需要更多操作次数
   - 使用位运算 num & (num-1) 高效移除最右边的1

6. 算法正确性：
   - 每次操作减去 (2^i + num2)，k次操作总共减去 k*num2 + 一些2的幂次
   - 剩余值x = num1 - k*num2 必须能用k个2的幂次表示
   - x的二进制中1的个数就是最少需要的2的幂次个数
   - 如果这个个数 ≤ k，则可行；否则需要更多操作

7. 优化思路：
   - 使用位运算技巧提高计算效率
   - 使用BigInt避免整数溢出
   - 早期终止：当x < k时立即返回-1
*/

export {};
