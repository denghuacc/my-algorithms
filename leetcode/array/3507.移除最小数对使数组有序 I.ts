/*
 * @lc app=leetcode.cn id=3507 lang=typescript
 *
 * [3507] 移除最小数对使数组有序 I
 *
 * https://leetcode.cn/problems/minimum-pair-removal-to-sort-array-i/description/
 *
 * algorithms
 * Easy (55.56%)
 * Likes:    209
 * Dislikes: 45
 * Total Accepted:    59.3K
 * Total Submissions: 99.8K
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个数组 nums，你可以执行任意次以下操作：
 *
 * 选择相邻元素和最小的一对；若有多对，选择最左边的一对；
 * 将这一对替换为它们的和。
 *
 * 返回将数组变为非递减所需的最少操作次数。
 *
 * 非递减数组指每个元素都不小于其前一个元素。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,3,1]
 * 输出：2
 * 解释：
 * (3,1) 的和最小为 4，替换后 nums = [5,2,4]；
 * (2,4) 的和最小为 6，替换后 nums = [5,6]；
 * 数组在两次操作后变为非递减。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,2]
 * 输出：0
 * 解释：数组已是非递减。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 50
 * -1000 <= nums[i] <= 1000
 *
 *
 */

// @lc code=start
/**
 * 按规则合并最小相邻对，直到数组非递减。
 *
 * @param nums - 原始整数数组
 * @returns 变为非递减所需的最少操作次数
 */
function minimumPairRemoval(nums: number[]): number {
  let operations = 0;
  while (nums.length > 1) {
    let isAscending = true;
    let minSum = Infinity;
    let targetIndex = -1;
    for (let i = 0; i < nums.length - 1; i++) {
      // 检查是否仍保持非递减
      if (nums[i] > nums[i + 1]) {
        isAscending = false;
      }
      const sum = nums[i] + nums[i + 1];
      // 只在严格更小时更新，保证最左侧最小和
      if (sum < minSum) {
        minSum = sum;
        targetIndex = i;
      }
    }
    if (isAscending) {
      break;
    }
    // 用最小相邻对的和替换，并删除后一个元素
    nums[targetIndex] = minSum;
    nums.splice(targetIndex + 1, 1);
    operations++;
  }
  return operations;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：重复合并“相邻最小和”对，直到数组非递减。
   - 关键特点：每次合并位置由规则固定（最小和，若并列取最左）。
   - 目标：统计执行该规则直到非递减的最少操作次数。

2. 解题思路
   核心思想
   - 题目规则唯一确定每次操作，因此按规则模拟即可。
   - 每轮扫描同时判断是否已非递减，并找到最小相邻和的位置。

   算法步骤
   1) 若数组长度 <= 1，直接返回 0。
   2) 在每轮中扫描数组：
      - 判断是否非递减；
      - 找到相邻元素和最小的最左位置。
   3) 若已非递减，结束；否则合并该相邻对。
   4) 统计操作次数并继续。

3. 代码实现
   实现步骤
   - 用 minSum 与 targetIndex 记录本轮最小相邻和与位置。
   - 只在 sum 更小时更新，保证最左侧优先。
   - 合并后用 splice 删除后一个元素。

   关键函数说明
   - minimumPairRemoval：主函数，执行循环模拟并计数。

4. 复杂度分析
   - 时间复杂度：O(k * n)，k 为操作次数，n 为初始长度，n<=50。
   - 空间复杂度：O(1)，原地修改数组。
   - 关键观察：规则已固定，无需搜索其他合并方案。

5. 示例分析
   示例一：nums = [5,2,3,1]
   - 第 1 轮：最小和为 4（3+1），合并得 [5,2,4]。
   - 第 2 轮：最小和为 6（2+4），合并得 [5,6]。
   - 已非递减，答案为 2。

   示例二：nums = [1,2,2]
   - 初始即非递减，答案为 0。

   示例三：nums = [3,2,1]
   - 第 1 轮：最小和为 3（2+1），合并得 [3,3]。
   - 已非递减，答案为 1。

   边界情况
   - 长度为 1：无需操作。
   - 多个最小和并列：必须取最左对。

6. 算法要点总结
   核心技巧
   - 严格遵循“最小和 + 最左”的规则做模拟。
   - 一次扫描同时完成“是否有序”与“最小和位置”判断。

   优化要点
   - 规模较小，直接模拟最清晰可靠。
   - 通过严格小于保证最左并列处理。

   类似问题
   - 规则唯一的模拟类问题。
   - 需要反复合并并保持顺序性质的题目。

7. 常见错误
   - 并列最小和时使用 <=，导致选择非最左位置。
   - 合并后未正确删除元素，数组结构出错。
   - 只判断是否有序却忘记继续合并计数。
*/
