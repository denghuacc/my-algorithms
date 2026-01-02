/*
 * @lc app=leetcode.cn id=3074 lang=typescript
 *
 * [3074] 重新分装苹果
 *
 * https://leetcode.cn/problems/apple-redistribution-into-boxes/description/
 *
 * algorithms
 * Easy (68.83%)
 * Likes:    296
 * Dislikes: 15
 * Total Accepted:    112.9K
 * Total Submissions: 148.4K
 * Testcase Example:  '[1,3,2]\n[4,3,1,5,2]'
 *
 * 给你一个长度为 n 的数组 apple 和一个长度为 m 的数组 capacity。
 *
 * 有 n 个苹果包，第 i 个包有 apple[i] 个苹果；有 m 个盒子，第 i 个盒子的
 * 容量为 capacity[i]。
 *
 * 请你选择最少数量的盒子，使得可以把所有苹果重新分配到这些盒子中。
 *
 * 注意：同一个包里的苹果可以分配到不同盒子。
 *
 *
 * 示例 1：
 *
 *
 * 输入：apple = [1,3,2], capacity = [4,3,1,5,2]
 * 输出：2
 * 解释：选择容量为 4 和 5 的盒子即可。
 * 总容量不小于苹果总数，所以可以完成分配。
 *
 *
 * 示例 2：
 *
 *
 * 输入：apple = [5,5,5], capacity = [2,4,2,7]
 * 输出：4
 * 解释：需要使用所有盒子才能装下全部苹果。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n == apple.length <= 50
 * 1 <= m == capacity.length <= 50
 * 1 <= apple[i], capacity[i] <= 50
 * 输入保证一定可以将所有苹果分配到盒子中。
 *
 *
 */

// @lc code=start
/**
 * 选择最少数量的盒子，使总容量覆盖全部苹果数量。
 *
 * @param apple - 每个苹果包里的苹果数量
 * @param capacity - 每个盒子的容量
 * @returns 需要选择的最少盒子数量
 */
function minimumBoxes(apple: number[], capacity: number[]): number {
  // 统计总苹果数，只需保证选中的盒子容量和不小于该值
  let totalApples = apple.reduce((sum, count) => sum + count, 0);
  // 优先选择容量大的盒子，能用更少数量满足需求
  capacity.sort((a, b) => b - a);
  let usedBoxes = 0;
  while (totalApples > 0) {
    // 依次使用当前剩余容量最大的盒子
    totalApples -= capacity[usedBoxes];
    usedBoxes++;
  }
  return usedBoxes;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：只关心苹果总数和选中盒子的容量总和。
   - 关键特点：苹果包可拆分，分配方式不影响最终可行性。
   - 目标：用最少盒子使容量和覆盖全部苹果数量。

2. 解题思路
   核心思想
   - 贪心：优先选择容量最大的盒子，尽快覆盖需求总量。
   - 因为盒子容量可累加，选择大容量盒子不会降低最优性。

   算法步骤
   1) 统计总苹果数 totalApples。
   2) 将 capacity 按降序排序。
   3) 从大到小累加容量，直到覆盖 totalApples。
   4) 返回使用的盒子数量。

3. 代码实现
   实现步骤
   1) 用 reduce 求总苹果数。
   2) 对容量数组降序排序。
   3) 用 while 循环累减 totalApples，并记录使用盒子数。
   4) 返回使用盒子数。

   关键函数说明
   - minimumBoxes：主函数，执行贪心选择与统计。

4. 复杂度分析
   - 时间复杂度：O(m log m)，排序主导。
   - 空间复杂度：O(1)，除排序外只用常数变量。
   - 关键观察：只需容量总和，不需要具体分配方案。

5. 示例分析
   示例一：apple = [1,3,2], capacity = [4,3,1,5,2]
   - 总苹果数 6，容量降序为 [5,4,3,2,1]
   - 选 5 后还差 1，继续选 4，使用 2 个盒子。

   示例二：apple = [5,5,5], capacity = [2,4,2,7]
   - 总苹果数 15，容量降序为 [7,4,2,2]
   - 7 + 4 + 2 + 2 = 15，使用 4 个盒子。

   边界情况
   - 单个盒子容量已覆盖全部苹果，答案为 1。
   - 所有盒子都需要使用，答案为 m。

6. 算法要点总结
   核心技巧
   - 只关注总量，不关心具体分配到哪个盒子。
   - 选择最大容量盒子能最小化盒子数量。

   优化要点
   - 排序后线性扫描即可，无需更复杂结构。
   - 数据规模小，常数空间足够。

   类似问题
   - 以最少个数覆盖总和的贪心选择类题目。
   - “最少容器数装下总量”问题。

7. 常见错误
   - 逐个包分配，误以为需要模拟装箱过程。
   - 忘记按容量降序，导致使用盒子数偏多。
   - 忽略题目保证可分配，增加不必要的可行性判断。
*/
