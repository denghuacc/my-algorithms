/*
 * @lc app=leetcode.cn id=2211 lang=typescript
 *
 * [2211] 统计道路上的碰撞次数
 *
 * https://leetcode.cn/problems/count-collisions-on-a-road/description/
 *
 * algorithms
 * Medium (46.13%)
 * Likes:    850
 * Dislikes: 253
 * Total Accepted:    59.3K
 * Total Submissions: 115.8K
 * Testcase Example:  '"RLRSLL"'
 *
 * 有 n 辆车在一条无限长的路上，从左到右编号为 0 到 n - 1，且每辆车占据不同的位置。
 *
 * 给你一个长度为 n 的下标从 0 开始的字符串 directions。directions[i] 取 'L'、'R' 或
 * 'S'，分别表示第 i 辆车向左移动、向右移动或保持不动。所有正在移动的车辆速度相同。
 *
 * 碰撞次数计算规则如下：
 *
 * - 当两辆相向而行的车相撞时，碰撞次数加 2。
 * - 当一辆移动中的车与一辆静止的车相撞时，碰撞次数加 1。
 *
 * 发生碰撞后，相关车辆将停止并停留在碰撞位置。除此之外，车辆不会改变状态或行驶方向。
 *
 * 请你返回这条路上将会发生的碰撞总次数。
 *
 *
 * 示例 1：
 *
 *
 * 输入：directions = "RLRSLL"
 * 输出：5
 * 解释：
 * 道路上的碰撞如下：
 * - 车辆 0 和 1 相向而行相撞，碰撞次数为 0 + 2 = 2。
 * - 车辆 2 和 3 相撞。车辆 3 静止，碰撞次数为 2 + 1 = 3。
 * - 车辆 3 和 4 相撞。车辆 3 静止，碰撞次数为 3 + 1 = 4。
 * - 车辆 4 和 5 相撞。车辆 4 与 3 相撞后停下，被 5 撞上，碰撞次数为 4 + 1 = 5。
 * 因此总碰撞次数为 5。
 *
 *
 * 示例 2：
 *
 *
 * 输入：directions = "LLRR"
 * 输出：0
 * 解释：
 * 没有车辆会发生碰撞，总碰撞次数为 0。
 *
 *
 * 提示：
 *
 *
 * 1 <= directions.length <= 10^5
 * directions[i] 取 'L'、'R' 或 'S'。
 *
 *
 */

// @lc code=start
/**
 * 剔除永不碰撞的最左端 L 与最右端 R，剩余区间中所有非 S 车都会发生
 * 一次碰撞。
 *
 * @param directions - 每辆车的初始行驶方向
 * @returns 最终发生的碰撞总次数
 */
function countCollisions(directions: string): number {
  const n = directions.length;
  let left = 0;
  let right = n - 1;

  // 跳过最左侧连续的 'L'，它们一直向左不会碰撞
  while (left < n && directions[left] === "L") {
    left++;
  }

  // 跳过最右侧连续的 'R'，它们一直向右不会碰撞
  while (right >= 0 && directions[right] === "R") {
    right--;
  }

  let collisions = 0;
  // 中间区间的移动车辆都会在某处被挡下，
  // 每辆非 S 车辆贡献 1 次碰撞
  for (let i = left; i <= right; i++) {
    if (directions[i] !== "S") {
      collisions++;
    }
  }

  return collisions;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 只要车辆最终停下的区间确定，碰撞次数取决于其中非静止车辆的
     数量。
   - 左端的连续 L 与右端的连续 R 永远不会遇到任何车，可直接忽略。

2. 算法分析：
   - 时间复杂度：O(n)，单次遍历字符串。
   - 空间复杂度：O(1)，只用常数变量。
   - 算法类型：双指针 + 计数。

3. 解题思路：
   - 核心思想：剔除不会碰撞的边界车辆，剩余区间中每辆非 S 车辆一定会
     参与一次碰撞（与向右的车或静止车相撞后停下）。
   - 步骤：
     1) 从左往右跳过前导 L。
     2) 从右往左跳过末尾 R。
     3) 统计剩余区间内非 S 的数量即为碰撞总数。

4. 实现要点：
   - 用两个指针确定中间有效区间。
   - 遍历区间时只需判断是否为 'S'。
   - 字符串长度可达 1e5，线性算法满足要求。

5. 示例分析：
   - "RLRSLL"：有效区间为全串，非 S 共有 5 个，碰撞次数 5。
   - "LLRR"：前导 L 和末尾 R 被剔除后区间为空，碰撞次数 0。

6. 常见错误：
   - 忘记剔除边界连续 L 或 R，导致多计碰撞。
   - 认为所有相向车需模拟过程，增加不必要复杂度。

7. 扩展思考：
   - 若需要输出每次碰撞位置，可在统计前模拟，但复杂度会上升。
*/
