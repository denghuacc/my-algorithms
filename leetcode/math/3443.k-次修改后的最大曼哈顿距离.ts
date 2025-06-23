/*
 * @lc app=leetcode.cn id=3443 lang=typescript
 *
 * [3443] K 次修改后的最大曼哈顿距离
 *
 * https://leetcode.cn/problems/maximum-manhattan-distance-after-k-changes/description/
 *
 * algorithms
 * Medium (47.87%)
 * Likes:    24
 * Dislikes: 0
 * Total Accepted:    8.9K
 * Total Submissions: 14.9K
 * Testcase Example:  '"NWSE"\n1'
 *
 * 给你一个由字符 'N'、'S'、'E' 和 'W' 组成的字符串 s，其中 s[i] 表示在无限网格中的移动操作：
 *
 *
 * 'N'：向北移动 1 个单位。
 * 'S'：向南移动 1 个单位。
 * 'E'：向东移动 1 个单位。
 * 'W'：向西移动 1 个单位。
 *
 *
 * 初始时，你位于原点 (0, 0)。你 最多 可以修改 k 个字符为任意四个方向之一。
 *
 * 请找出在 按顺序 执行所有移动操作过程中的 任意时刻 ，所能达到的离原点的 最大曼哈顿距离 。
 *
 * 曼哈顿距离 定义为两个坐标点 (xi, yi) 和 (xj, yj) 的横向距离绝对值与纵向距离绝对值之和，即 |xi - xj| + |yi -
 * yj|。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "NWSE", k = 1
 *
 * 输出：3
 *
 * 解释：
 *
 * 将 s[2] 从 'S' 改为 'N' ，字符串 s 变为 "NWNE" 。
 *
 *
 *
 *
 * 移动操作
 * 位置 (x, y)
 * 曼哈顿距离
 * 最大值
 *
 *
 *
 *
 * s[0] == 'N'
 * (0, 1)
 * 0 + 1 = 1
 * 1
 *
 *
 * s[1] == 'W'
 * (-1, 1)
 * 1 + 1 = 2
 * 2
 *
 *
 * s[2] == 'N'
 * (-1, 2)
 * 1 + 2 = 3
 * 3
 *
 *
 * s[3] == 'E'
 * (0, 2)
 * 0 + 2 = 2
 * 3
 *
 *
 *
 *
 * 执行移动操作过程中，距离原点的最大曼哈顿距离是 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "NSWWEW", k = 3
 *
 * 输出：6
 *
 * 解释：
 *
 * 将 s[1] 从 'S' 改为 'N' ，将 s[4] 从 'E' 改为 'W' 。字符串 s 变为 "NNWWWW" 。
 *
 * 执行移动操作过程中，距离原点的最大曼哈顿距离是 6 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * 0 <= k <= s.length
 * s 仅由 'N'、'S'、'E' 和 'W' 。
 *
 *
 */

// @lc code=start
/**
 * 方法一：方向计数 + 贪心优化
 * 核心思想：统计各方向移动次数，通过消除相反移动和利用修改次数最大化距离
 */
function maxDistance1(s: string, k: number): number {
  let res = 0;
  let north = 0; // 向北移动的次数
  let south = 0; // 向南移动的次数
  let east = 0; // 向东移动的次数
  let west = 0; // 向西移动的次数

  // 遍历每个移动操作，逐步计算最大距离
  for (const c of s) {
    // 根据当前方向更新对应计数
    switch (c) {
      case "N":
        north++;
        break;
      case "S":
        south++;
        break;
      case "E":
        east++;
        break;
      case "W":
        west++;
        break;
    }

    // 贪心策略：优先消除南北方向的相反移动
    // time1: 用于消除南北相反移动的修改次数
    const time1 = Math.min(north, south, k);
    // time2: 剩余修改次数用于消除东西相反移动
    const time2 = Math.min(east, west, k - time1);

    // 计算当前状态下的最大曼哈顿距离
    res = Math.max(
      res,
      getCount(north, south, time1) + getCount(east, west, time2)
    );
  }

  return res;

  /**
   * 计算某个维度上的最大距离贡献
   * @param dir1 正方向移动次数
   * @param dir2 负方向移动次数
   * @param time 可用的修改次数
   * @returns 该维度的最大距离贡献
   */
  function getCount(dir1: number, dir2: number, time: number): number {
    // |dir1 - dir2|: 消除相反移动后的净距离
    // time * 2: 每次修改可以增加2的距离（消除一个相反移动 = +2距离）
    return Math.abs(dir1 - dir2) + time * 2;
  }
}

/**
 * 方法二：坐标追踪 + 理论最大值
 * 核心思想：直接计算当前坐标，考虑k次修改的理论最大增益
 */
function maxDistance2(s: string, k: number): number {
  let res = 0;
  let latitude = 0; // 纬度坐标（南北方向，北为正）
  let longitude = 0; // 经度坐标（东西方向，东为正）

  // 遍历每个移动操作
  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // 根据移动方向更新坐标
    switch (c) {
      case "N":
        latitude++;
        break;
      case "S":
        latitude--;
        break;
      case "E":
        longitude++;
        break;
      case "W":
        longitude--;
        break;
    }

    // 计算当前位置的最大可能距离
    // Math.abs(latitude) + Math.abs(longitude): 当前曼哈顿距离
    // k * 2: k次修改的理论最大增益（每次修改最多增加2距离）
    // i + 1: 总步数限制（距离不能超过总步数）
    res = Math.max(
      res,
      Math.min(Math.abs(latitude) + Math.abs(longitude) + k * 2, i + 1)
    );
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在移动过程中寻找离原点最远的曼哈顿距离
   - 可以修改最多k个移动方向来优化路径
   - 曼哈顿距离 = |x| + |y|

2. 算法分析：
   - 时间复杂度：O(n)，其中n为字符串长度
   - 空间复杂度：O(1)，只使用常数额外空间
   - 算法类型：贪心算法 + 数学优化

3. 核心洞察：
   - 方法一：通过消除相反方向的移动来最大化距离
     * 相反移动（如N和S）会相互抵消，浪费距离
     * 每消除一对相反移动，可以增加2的曼哈顿距离
     * 贪心策略：优先消除数量少的相反移动对
   
   - 方法二：理论最大值计算
     * 当前曼哈顿距离 + k次修改的最大收益
     * 每次修改最多增加2距离（变相反方向为同方向）
     * 受总步数限制（距离不能超过已走步数）

4. 实现要点：
   - 方法一需要维护四个方向的计数器
   - 贪心分配修改次数：先优化一个维度，再优化另一个维度
   - 方法二直接跟踪坐标变化，计算理论最优解
   - 两种方法都需要在每一步更新全局最大值

5. 优化思路：
   - 方法一更直观，体现了问题的本质（消除相反移动）
   - 方法二更简洁，但需要理解k次修改的最大收益计算
   - 在实际场景中，方法一的思路更容易扩展和调试
   - 可以结合两种思路：用方法二快速估算，用方法一精确计算

6. 边界情况：
   - k = 0：无法修改，按原路径计算
   - k >= 字符串长度：可以任意修改，理论最大距离为字符串长度
   - 单一方向移动：修改无法增加距离
   - 完全相反的移动：修改可以显著增加距离
*/
