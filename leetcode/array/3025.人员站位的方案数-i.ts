/*
 * @lc app=leetcode.cn id=3025 lang=typescript
 *
 * [3025] 人员站位的方案数 I
 *
 * https://leetcode.cn/problems/find-the-number-of-ways-to-place-people-i/description/
 *
 * algorithms
 * Medium (46.88%)
 * Likes:    23
 * Dislikes: 0
 * Total Accepted:    11.8K
 * Total Submissions: 20.5K
 * Testcase Example:  '[[1,1],[2,2],[3,3]]'
 *
 * 给你一个  n x 2 的二维数组 points ，它表示二维平面上的一些点坐标，其中 points[i] = [xi, yi] 。
 *
 *
 *
 * 计算点对 (A, B) 的数量，其中
 *
 *
 * A 在 B 的左上角，并且
 * 它们形成的长方形中（或直线上）没有其它点（包括边界）。
 *
 *
 * 返回数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 *
 * 输出：0
 *
 * 解释：
 *
 *
 *
 * 没有办法选择 A 和 B，使得 A 在 B 的左上角。
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[6,2],[4,4],[2,6]]
 *
 * 输出：2
 *
 * 解释：
 *
 *
 *
 *
 * 左边的是点对 (points[1], points[0])，其中 points[1] 在 points[0]
 * 的左上角，并且形成的长方形内部是空的。
 * 中间的是点对 (points[2], points[1])，和左边的一样是合法的点对。
 * 右边的是点对 (points[2], points[0])，其中 points[2] 在 points[0] 的左上角，但 points[1]
 * 在长方形内部，所以不是一个合法的点对。
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：points = [[3,1],[1,3],[1,1]]
 *
 * 输出：2
 *
 * 解释：
 *
 *
 *
 *
 * 左边的是点对 (points[2], points[0])，其中 points[2] 在 points[0]
 * 的左上角并且在它们形成的直线上没有其它点。注意两个点形成一条线的情况是合法的。
 * 中间的是点对 (points[1], points[2])，和左边一样也是合法的点对。
 * 右边的是点对 (points[1], points[0])，它不是合法的点对，因为 points[2] 在长方形的边上。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 50
 * points[i].length == 2
 * 0 <= points[i][0], points[i][1] <= 50
 * points[i] 点对两两不同。
 *
 *
 */

export {};

// @lc code=start
function numberOfPairs(points: number[][]): number {
  let res = 0; // 记录合法点对的数量
  const n = points.length; // 点的总数

  // 遍历所有可能的点对组合
  for (let i = 0; i < n; i++) {
    const pointA = points[i]; // 候选点A

    for (let j = 0; j < n; j++) {
      const pointB = points[j]; // 候选点B

      // 跳过相同点和不符合位置关系的点对
      // A必须在B的左上角：A的x坐标 <= B的x坐标 且 A的y坐标 >= B的y坐标
      if (i === j || !(pointA[0] <= pointB[0] && pointA[1] >= pointB[1])) {
        continue;
      }

      // 特殊情况：当只有2个点时，它们必然形成合法点对
      if (n === 2) {
        res++;
        continue;
      }

      // 检查点对A-B形成的长方形内部是否包含其他点
      let illegal = false; // 标记当前点对是否非法

      for (const pointTmp of points) {
        // 跳过点A和点B本身
        if (pointA === pointTmp || pointB === pointTmp) {
          continue;
        }

        // 检查临时点是否在长方形内部
        // 点的x坐标必须在A和B的x坐标之间（包含边界）
        const isXContained =
          pointTmp[0] >= pointA[0] && pointTmp[0] <= pointB[0];
        // 点的y坐标必须在B和A的y坐标之间（包含边界）
        const isYContained =
          pointTmp[1] <= pointA[1] && pointTmp[1] >= pointB[1];

        // 如果点在长方形内部，则当前点对非法
        illegal = isXContained && isYContained;
        if (illegal) {
          break; // 找到一个非法点就可以提前退出
        }
      }

      // 如果当前点对合法，计数加1
      if (!illegal) {
        res++;
      }
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 计算二维平面上满足特定位置关系的点对数量
   - 要求点A在点B的左上角，且它们形成的长方形内部不包含其他点

2. 算法分析：
   - 时间复杂度：O(n³)，其中n是点的数量
     * 外层双重循环：O(n²)
     * 内层检查其他点：O(n)
   - 空间复杂度：O(1)，只使用了常数个变量
   - 算法类型：暴力枚举 + 几何判断

3. 实现要点：
   - 位置关系判断：A在B的左上角等价于 A.x ≤ B.x 且 A.y ≥ B.y
   - 长方形内部判断：点P在长方形内部等价于
     * P.x 在 [A.x, B.x] 范围内
     * P.y 在 [B.y, A.y] 范围内
   - 边界情况处理：当n=2时，两个点必然形成合法点对
   - 优化技巧：一旦发现长方形内部有非法点，立即跳出内层循环

4. 优化思路：
   - 可以预先按x坐标排序，减少不必要的比较
   - 可以使用线段树或扫描线算法优化到O(n² log n)
   - 对于大数据集，可以考虑分治或几何数据结构优化

5. 关键技巧：
   - 几何问题的坐标判断：注意x和y坐标的包含关系
   - 边界处理：包含边界的情况需要仔细处理等号
   - 提前退出：发现非法情况时立即跳出循环

6. 类似问题：
   - 矩形面积并集问题
   - 点集凸包问题
   - 几何覆盖问题
   - 扫描线算法相关题目

7. 常见错误：
   - 混淆x和y坐标的比较关系
   - 忘记处理边界情况（n=2）
   - 没有正确理解"左上角"的定义
   - 边界包含判断错误
*/
