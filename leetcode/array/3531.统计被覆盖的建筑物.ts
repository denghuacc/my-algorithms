/*
 * @lc app=leetcode.cn id=3531 lang=typescript
 *
 * [3531] 统计被覆盖的建筑物
 *
 * https://leetcode.cn/problems/count-covered-buildings/description/
 *
 * algorithms
 * Medium (38.37%)
 * Likes:    127
 * Dislikes: 13
 * Total Accepted:    29.1K
 * Total Submissions: 66K
 * Testcase Example:  '3\n[[1,2],[2,2],[3,2],[2,1],[2,3]]'
 *
 * 给你一个正整数 n，表示城市是 n x n 的网格；还给出一个二维数组 buildings，
 * 其中 buildings[i] = [x, y] 表示网格坐标 [x, y] 处有一栋唯一的建筑。
 *
 * 如果某栋建筑在上下左右四个方向上各至少有一栋建筑，则称其被覆盖。
 *
 * 返回被覆盖的建筑数量。
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]
 *
 * 输出：1
 *
 * 解释：
 *
 *
 * 只有 [2,2] 被覆盖，它的上下左右都有建筑：
 *
 *
 * 上 ([1,2])
 * 下 ([3,2])
 * 左 ([2,1])
 * 右 ([2,3])
 *
 *
 * 因此被覆盖的建筑数量是 1。
 *
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]
 *
 * 输出：0
 *
 * 解释：
 *
 *
 * 没有建筑在四个方向都有至少一栋建筑。
 *
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]
 *
 * 输出：1
 *
 * 解释：
 *
 *
 * 只有 [3,3] 被覆盖，四向都有建筑：
 *
 *
 * 上 ([1,3])
 * 下 ([5,3])
 * 左 ([3,2])
 * 右 ([3,5])
 *
 *
 * 因此被覆盖的建筑数量是 1。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 10^5
 * 1 <= buildings.length <= 10^5
 * buildings[i] = [x, y]
 * 1 <= x, y <= n
 * 所有建筑坐标互不相同。
 *
 *
 */

// @lc code=start
/**
 * 预处理每行/列的最小与最大坐标，O(m) 判定覆盖性。
 * 建筑 (x,y) 被覆盖 ⇔ minRow[x] < y < maxRow[x] 且 minCol[y] < x < maxCol[y]。
 *
 * @param n - 城市网格大小
 * @param buildings - 建筑坐标列表
 * @returns 被覆盖的建筑数量
 */
function countCoveredBuildings(n: number, buildings: number[][]): number {
  const maxRow: number[] = new Array(n + 1).fill(0); // 每行最右 y
  const minRow: number[] = new Array(n + 1).fill(n + 1); // 每行最左 y
  const maxCol: number[] = new Array(n + 1).fill(0); // 每列最下 x
  const minCol: number[] = new Array(n + 1).fill(n + 1); // 每列最上 x

  for (const [x, y] of buildings) {
    maxRow[x] = Math.max(maxRow[x], y); // 记录行 x 的最右端
    minRow[x] = Math.min(minRow[x], y); // 记录行 x 的最左端
    maxCol[y] = Math.max(maxCol[y], x); // 记录列 y 的最下端
    minCol[y] = Math.min(minCol[y], x); // 记录列 y 的最上端
  }

  let coveredCount = 0;
  for (const [x, y] of buildings) {
    // 四个方向都需有建筑：行的左右、列的上下都必须超出当前坐标
    if (minRow[x] < y && maxRow[x] > y && minCol[y] < x && maxCol[y] > x) {
      coveredCount++;
    }
  }

  return coveredCount;
}
// @lc code=end

/*
解题思路详解：

1. 覆盖判定转化：
   - 对于建筑 (x,y) ，需同行存在左侧和右侧建筑，同行最小 y < y < 最大 y；
     同列存在上、下建筑，列最小 x < x < 最大 x。
   - 因此只要记录每行/列的最小、最大坐标即可 O(1) 判定。

2. 算法流程：
   - 初始化行/列边界：min 设为 n+1，max 设为 0。
   - 首次遍历 buildings，更新对应行/列的 min/max。
   - 二次遍历 buildings，套用条件
     minRow[x] < y < maxRow[x] 且 minCol[y] < x < maxCol[y]，满足则计数。

3. 复杂度分析：
   - 时间 O(m)，m 为 buildings.length。
   - 空间 O(n)，存每行/列的边界（坐标范围 1..n，开 n+1 便于直接索引）。

4. 边界与正确性：
   - 若某行或列只有一栋建筑，则 min==max，不会计入覆盖。
   - 坐标唯一，min/max 统计不会冲突；初始化为极值保证未出现行列不会误判。

5. 示例验证：
   - 示例 1：行 2 的 min/max 为 1/3，列 2 的 min/max 为 1/3，(2,2) 满足四向。
   - 示例 2：任一建筑至少缺少一个方向，不满足条件，计数为 0。
   - 示例 3：仅 (3,3) 同行同列均有两侧建筑，计数为 1。
*/
