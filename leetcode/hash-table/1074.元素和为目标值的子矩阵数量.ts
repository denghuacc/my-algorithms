/*
 * @lc app=leetcode.cn id=1074 lang=typescript
 *
 * [1074] 元素和为目标值的子矩阵数量
 *
 * https://leetcode-cn.com/problems/number-of-submatrices-that-sum-to-target/description/
 *
 * algorithms
 * Hard (50.41%)
 * Likes:    108
 * Dislikes: 0
 * Total Accepted:    6.3K
 * Total Submissions: 10.8K
 * Testcase Example:  '[[0,1,0],[1,1,1],[0,1,0]]\n0'
 *
 * 给出矩阵 matrix 和目标值 target，返回元素总和等于目标值的非空子矩阵的数量。
 *
 * 子矩阵 x1, y1, x2, y2 是满足 x1  且 y1  的所有单元 matrix[x][y] 的集合。
 *
 * 如果 (x1, y1, x2, y2) 和 (x1', y1', x2', y2') 两个子矩阵中部分坐标不同（如：x1 !=
 * x1'），那么这两个子矩阵也不同。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
 * 输出：4
 * 解释：四个只含 0 的 1x1 子矩阵。
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,-1],[-1,1]], target = 0
 * 输出：5
 * 解释：两个 1x2 子矩阵，加上两个 2x1 子矩阵，再加上一个 2x2 子矩阵。
 *
 *
 * 示例 3：
 *
 *
 * 输入：matrix = [[904]], target = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * -1000
 * -10^8
 *
 *
 */

// @lc code=start
function numSubmatrixSumTarget(matrix: number[][], target: number): number {
  let ret = 0;
  const m = matrix.length;
  const n = matrix[0].length;
  for (let i = 0; i < m; i++) {
    const sum: number[] = new Array(n).fill(0);
    for (let j = i; j < m; j++) {
      for (let k = 0; k < n; k++) {
        sum[k] += matrix[j][k];
      }
      ret += subarraySum(sum, target);
    }
  }

  return ret;

  function subarraySum(nums: number[], target: number): number {
    const map: Map<number, number> = new Map();
    map.set(0, 1);
    let count = 0;
    let pre = 0;
    for (const num of nums) {
      pre += num;
      if (map.has(pre - target)) {
        count += map.get(pre - target)!;
      }
      map.set(pre, (map.get(pre) ?? 0) + 1);
    }

    return count;
  }
}
// @lc code=end
