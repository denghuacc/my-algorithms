/*
 * @lc app=leetcode.cn id=135 lang=typescript
 *
 * [135] 分发糖果
 *
 * https://leetcode-cn.com/problems/candy/description/
 *
 * algorithms
 * Hard (36.10%)
 * Likes:    231
 * Dislikes: 0
 * Total Accepted:    24.1K
 * Total Submissions: 54.9K
 * Testcase Example:  '[1,0,2]'
 *
 * 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
 *
 * 你需要按照以下要求，帮助老师给这些孩子分发糖果：
 *
 *
 * 每个孩子至少分配到 1 个糖果。
 * 相邻的孩子中，评分高的孩子必须获得更多的糖果。
 *
 *
 * 那么这样下来，老师至少需要准备多少颗糖果呢？
 *
 * 示例 1:
 *
 * 输入: [1,0,2]
 * 输出: 5
 * 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
 *
 *
 * 示例 2:
 *
 * 输入: [1,2,2]
 * 输出: 4
 * 解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
 * ⁠    第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
 *
 */

// @lc code=start
/**
 * 解法一：贪心算法 - 两个数组版本
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  let sum = 0;
  // left2right[i] 表示只考虑左边约束时位置i的糖果数
  const left2right: number[] = new Array(n).fill(1);
  // right2left[i] 表示只考虑右边约束时位置i的糖果数
  const right2left: number[] = new Array(n).fill(1);

  // 从左到右遍历，处理递增序列
  // 如果当前孩子评分比左边高，糖果数就是左边孩子糖果数+1
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left2right[i] = left2right[i - 1] + 1;
    }
  }

  // 从右到左遍历，处理递减序列
  // 如果当前孩子评分比右边高，糖果数就是右边孩子糖果数+1
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right2left[i] = right2left[i + 1] + 1;
    }
  }

  // 取两个约束的最大值，确保同时满足左右两边的约束
  for (let i = 0; i < n; i++) {
    sum += Math.max(left2right[i], right2left[i]);
  }

  return sum;
};

/**
 * 解法二：贪心算法 - 一个数组版本（优化空间）
 * 时间复杂度：O(n)，空间复杂度：O(n)
 */
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  const candies: number[] = new Array(n).fill(1);

  // 第一次遍历：从左到右，处理递增趋势
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // 从最后一个元素开始累加总和
  let sum = candies[n - 1];

  // 第二次遍历：从右到左，处理递减趋势
  // 同时更新糖果数组并累加总和
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      // 取当前值和右边孩子糖果数+1的最大值
      // 这样既满足右边约束，又不破坏之前满足的左边约束
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
    sum += candies[i];
  }
  return sum;
};

/**
 * 解法三：贪心算法 - 一次遍历版本（最优空间）
 * 时间复杂度：O(n)，空间复杂度：O(1)
 *
 * 核心思想：将评分序列分解为上升段、下降段和平坦段
 * - 上升段：糖果数递增 1, 2, 3, ...
 * - 下降段：糖果数递减 ..., 3, 2, 1
 * - 平坦段：糖果数为 1
 */
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  if (n <= 1) return n;

  let candies = 0; // 总糖果数
  let up = 0; // 当前上升段长度
  let down = 0; // 当前下降段长度
  let oldScope = 0; // 前一个位置的趋势（1：上升，-1：下降，0：平坦）

  for (let i = 1; i < n; i++) {
    // 计算当前位置相对于前一个位置的趋势
    const newScope =
      ratings[i] > ratings[i - 1] ? 1 : ratings[i] < ratings[i - 1] ? -1 : 0;

    // 当趋势发生变化时，计算并累加当前段的糖果数
    if ((oldScope > 0 && newScope === 0) || (oldScope < 0 && newScope >= 0)) {
      // 上升段糖果数：1+2+...+up = up*(up+1)/2
      // 下降段糖果数：1+2+...+down = down*(down+1)/2
      // 峰值糖果数：取上升段和下降段长度的最大值
      candies += count(up) + count(down) + Math.max(up, down);
      up = 0;
      down = 0;
    }

    // 更新当前段的长度
    if (newScope > 0) up++; // 上升趋势
    if (newScope < 0) down++; // 下降趋势
    if (newScope === 0) candies++; // 平坦段，直接加1个糖果

    oldScope = newScope;
  }

  // 处理最后一段和第一个孩子的糖果
  candies += count(up) + count(down) + Math.max(up, down) + 1;
  return candies;

  // 计算连续段的糖果总数：1+2+...+n = n*(n+1)/2
  function count(n: number): number {
    return Math.floor((n * (n + 1)) / 2);
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在满足约束条件下，使总糖果数最少的分配问题
   - 关键约束：每个孩子至少1个糖果，相邻孩子中评分高的必须获得更多糖果
   - 这是一个典型的贪心算法问题

2. 算法分析：
   - 解法一时间复杂度：O(n)，空间复杂度：O(n) - 两个数组
   - 解法二时间复杂度：O(n)，空间复杂度：O(n) - 一个数组
   - 解法三时间复杂度：O(n)，空间复杂度：O(1) - 一次遍历
   - 算法类型：贪心算法

3. 核心思想：
   - **左右分离原则**：将约束分解为"左边约束"和"右边约束"分别处理
   - **贪心策略**：在满足约束的前提下，总是分配最少的糖果
   - **趋势分析**：将评分序列看作上升段、下降段和平坦段的组合

4. 三种解法对比：

   **解法一（两个数组）**：
   - 最直观易懂的方法
   - 分别计算左约束和右约束下的最少糖果数
   - 最终取两者的最大值

   **解法二（一个数组）**：
   - 空间优化版本，复用数组
   - 先处理左约束，再处理右约束时同时计算总和
   - 通过 Math.max 确保不破坏已有约束

   **解法三（一次遍历）**：
   - 最优解，空间复杂度 O(1)
   - 关键洞察：评分序列可分解为连续的上升段和下降段
   - 利用数学公式直接计算每段的糖果数

5. 实现要点：
   - **边界处理**：第一个和最后一个孩子的特殊情况
   - **趋势判断**：正确识别上升、下降、平坦三种趋势
   - **峰值处理**：上升段和下降段交界处的峰值需要取较大值
   - **累加时机**：合理安排糖果数的累加时点

6. 优化策略：
   - 从两数组到一数组：减少空间使用
   - 从两次遍历到一次遍历：利用趋势分析
   - 数学公式优化：用求和公式代替循环累加
   - 实时计算：避免存储中间结果

7. 算法核心洞察：
   - **局部最优导致全局最优**：贪心算法的本质
   - **约束分解**：复杂约束可分解为简单约束分别处理
   - **趋势利用**：评分的局部趋势决定了糖果分配的模式
   - **数学抽象**：连续段的糖果数可用数学公式直接计算

8. 类似问题：
   - 接雨水问题：同样需要考虑左右两个方向的约束
   - 单调栈问题：处理序列的局部极值
   - 贪心算法的其他应用：跳跃游戏、加油站等

这个问题展示了算法优化的完整过程：从直观解法到空间优化，再到时间和空间的双重优化，
体现了贪心算法、数学抽象和编程技巧的完美结合。
*/
