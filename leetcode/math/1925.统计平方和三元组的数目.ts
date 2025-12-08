/*
 * @lc app=leetcode.cn id=1925 lang=typescript
 *
 * [1925] 统计平方和三元组的数目
 *
 * https://leetcode.cn/problems/count-square-sum-triples/description/
 *
 * algorithms
 * Easy (69.66%)
 * Likes:    507
 * Dislikes: 48
 * Total Accepted:    80.4K
 * Total Submissions: 111.2K
 * Testcase Example:  '5'
 *
 * 平方和三元组 (a, b, c) 满足 a、b、c 为整数，且 a^2 + b^2 = c^2。
 *
 * 给你一个整数 n，返回满足 1 <= a, b, c <= n 的平方和三元组数目。
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5
 * 输出：2
 * 解释：平方和三元组为 (3,4,5) 和 (4,3,5)。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 10
 * 输出：4
 * 解释：平方和三元组为 (3,4,5)、(4,3,5)、(6,8,10) 和 (8,6,10)。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 250
 *
 *
 */

// @lc code=start
/**
 * 方法一：枚举 c 作为斜边，枚举 (a, b) 组合，利用三角性质对称性计数。
 *
 * @param n - 边长上限
 * @returns 满足条件的三元组数量
 */
var countTriples = function (n: number): number {
  let cnt = 0;
  for (let c = 1; c <= n; c++) {
    for (let a = 1; a < c; a++) {
      for (let b = 1; b < a; b++) {
        // 命中一次即可贡献 (a,b) 与 (b,a) 两种有序对
        if (c * c === a * a + b * b) {
          cnt += 2;
        }
      }
    }
  }
  return cnt;
};

/**
 * 方法二：直接枚举 a、b，检查 c 是否为整数且不超过 n。
 *
 * @param n - 边长上限
 * @returns 满足条件的三元组数量
 */
var countTriples = function (n: number): number {
  let cnt = 0;
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      const c = Math.sqrt(a * a + b * b);
      if (c <= n && Number.isInteger(c)) {
        cnt++;
      }
    }
  }
  return cnt;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 统计 1 <= a,b,c <= n 且 a^2 + b^2 = c^2 的有序三元组数量。

2. 方法一（枚举 c，双层遍历 a、b）：
   - 对称性：若命中 (a,b,c)，则 (b,a,c) 也合法，一次命中可加 2。
   - 时间复杂度：O(n^3) 最坏，但内层只到 c 及 a 之前，稍有剪枝。
   - 空间复杂度：O(1)。

3. 方法二（直接枚举 a、b）：
   - 计算 c = sqrt(a^2 + b^2)，若 c 为整数且不超过 n，则计数。
   - 时间复杂度：O(n^2)，比方法一更高效。
   - 空间复杂度：O(1)。

4. 示例验证：
   - n=5，可得 (3,4,5) 与 (4,3,5)，共 2。
   - n=10，再增加 (6,8,10) 与 (8,6,10)，共 4。

5. 常见错误：
   - 忘记计入 (a,b) 与 (b,a) 的有序性，导致少算一半。
   - c 未验证为整数或未检查上界 n。
*/
