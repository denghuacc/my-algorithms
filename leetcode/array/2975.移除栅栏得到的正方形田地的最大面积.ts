/*
 * @lc app=leetcode.cn id=2975 lang=typescript
 *
 * [2975] 移除栅栏得到的正方形田地的最大面积
 *
 * https://leetcode.cn/problems/maximum-square-area-by-removing-fences-from-a-field/description/
 *
 * algorithms
 * Medium (24.86%)
 * Likes:    172
 * Dislikes: 125
 * Total Accepted:    22.5K
 * Total Submissions: 79K
 * Testcase Example:  '4\n3\n[2,3]\n[2]'
 *
 * 有一块从 (1, 1) 到 (m, n) 的矩形场地（大小为 (m-1) x (n-1)），
 * 其中存在一些水平栅栏与垂直栅栏，分别由数组 hFences 和 vFences 给出。
 *
 * 水平栅栏从 (hFences[i], 1) 到 (hFences[i], n)，
 * 垂直栅栏从 (1, vFences[i]) 到 (m, vFences[i])。
 *
 * 你可以移除部分栅栏（也可以不移除），返回可形成的最大正方形面积；
 * 若无法形成正方形，返回 -1。
 *
 * 由于结果可能很大，返回对 10^9 + 7 取模后的值。
 *
 * 注意：场地边界上的四条栅栏不可移除：
 * - 水平边界：y=1 与 y=n
 * - 垂直边界：x=1 与 x=m
 *
 *
 * 示例 1：
 *
 *
 * 输入：m = 4, n = 3, hFences = [2,3], vFences = [2]
 * 输出：4
 * 解释：移除水平栅栏 2 与垂直栅栏 2，可形成面积为 4 的正方形。
 *
 *
 * 示例 2：
 *
 *
 * 输入：m = 6, n = 7, hFences = [2], vFences = [4]
 * 输出：-1
 * 解释：无法通过移除栅栏形成正方形。
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= m, n <= 10^9
 * 1 <= hFences.length, vFences.length <= 600
 * 1 < hFences[i] < m
 * 1 < vFences[i] < n
 * hFences 和 vFences 中的值互不相同
 *
 *
 */

// @lc code=start
function maximizeSquareArea(
  m: number,
  n: number,
  hFences: number[],
  vFences: number[]
): number {
  const MOD = 1e9 + 7;
  // 获取所有水平/垂直方向可能形成的边长
  const horizontalEdges = getEdges(hFences, m);
  const verticalEdges = getEdges(vFences, n);
  let maxSquareLength = 0;

  // 边长必须在水平与垂直两方向同时可达
  for (const length of horizontalEdges) {
    if (verticalEdges.has(length)) {
      maxSquareLength = Math.max(maxSquareLength, length);
    }
  }

  if (maxSquareLength === 0) {
    return -1;
  }

  return Number(
    (BigInt(maxSquareLength) * BigInt(maxSquareLength)) % BigInt(MOD)
  );

  function getEdges(fences: number[], border: number): Set<number> {
    const edges = new Set<number>();
    const list = [...fences];
    // 加入不可移除的边界栅栏
    list.push(1, border);
    list.sort((a, b) => a - b);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        // 任意两条栅栏之间的距离都可能成为边长
        edges.add(list[j] - list[i]);
      }
    }
    return edges;
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：通过移除部分栅栏，选择两条水平栅栏与两条垂直栅栏形成正方形。
   - 关键特点：边界栅栏不可移除，且边长必须在水平与垂直方向都可实现。
   - 目标：最大化正方形边长的平方，无法形成则返回 -1。

2. 解题思路
   核心思想
   - 正方形边长来自两条水平栅栏的距离，同时也来自两条垂直栅栏的距离。
   - 只要某个长度在“水平距离集合”和“垂直距离集合”中都存在，就可形成正方形。

   算法步骤
   1) 将边界栅栏 1 与 m（或 n）加入栅栏列表。
   2) 计算所有两两栅栏的距离，形成可选边长集合。
   3) 取水平集合与垂直集合的交集，找最大边长。
   4) 若最大边长为 0，返回 -1；否则返回边长平方取模。

3. 代码实现
   实现步骤
   - getEdges：计算所有两两距离。
   - 用 Set 保存边长，便于 O(1) 判断交集。
   - 遍历水平边长，检查是否也存在于垂直集合中。

   关键函数说明
   - maximizeSquareArea：主函数，构建边长集合并取最大值。
   - getEdges：返回包含所有可形成边长的集合。

4. 复杂度分析
   - 时间复杂度：O(h^2 + v^2)，h 和 v 为栅栏数量。
   - 空间复杂度：O(h^2 + v^2)，用于保存所有距离。
   - 关键观察：栅栏数量最多 600，两两组合可接受。

5. 示例分析
   示例一：m=4,n=3,hFences=[2,3],vFences=[2]
   - 水平距离集合含 2，垂直距离集合含 2。
   - 最大边长 2，面积 4。

   示例二：m=6,n=7,hFences=[2],vFences=[4]
   - 水平距离集合与垂直距离集合无交集。
   - 返回 -1。

   边界情况
   - 只有边界栅栏有效：边长为 m-1 或 n-1，但需两方向同时存在。
   - 交集为空，直接返回 -1。

6. 算法要点总结
   核心技巧
   - 正方形边长需要水平与垂直距离同时具备。
   - 用集合求交集最大值即可。

   优化要点
   - 先算集合再求交集，避免三重循环。
   - 使用 BigInt 处理乘积后再取模。

   类似问题
   - 选择两条线段形成最大正方形/矩形的问题。
   - 通过距离集合求交集的几何类问题。

7. 常见错误
   - 忘记加入边界栅栏，导致边长集合不完整。
   - 只比较最大水平长度与最大垂直长度，忽略交集条件。
   - 先取模再比较大小，导致最大值判断错误。
*/
