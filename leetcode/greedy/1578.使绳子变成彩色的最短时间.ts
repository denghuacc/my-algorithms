/*
 * @lc app=leetcode.cn id=1578 lang=typescript
 *
 * [1578] 使绳子变成彩色的最短时间
 *
 * https://leetcode.cn/problems/minimum-time-to-make-rope-colorful/description/
 *
 * algorithms
 * Medium (61.42%)
 * Likes:    119
 * Dislikes: 0
 * Total Accepted:    25K
 * Total Submissions: 39.2K
 * Testcase Example:  '"abaac"\n[1,2,3,4,5]'
 *
 * Alice 把 n 个气球排列在一根绳子上。给你一个下标从 0 开始的字符串 colors ，其中 colors[i] 是第 i 个气球的颜色。
 *
 * Alice 想要把绳子装扮成 五颜六色的 ，且她不希望两个连续的气球涂着相同的颜色，所以她喊来 Bob 帮忙。Bob 可以从绳子上移除一些气球使绳子变成
 * 彩色 。给你一个 下标从 0 开始 的整数数组 neededTime ，其中 neededTime[i] 是 Bob 从绳子上移除第 i
 * 个气球需要的时间（以秒为单位）。
 *
 * 返回 Bob 使绳子变成 彩色 需要的 最少时间 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：colors = "abaac", neededTime = [1,2,3,4,5]
 * 输出：3
 * 解释：在上图中，'a' 是蓝色，'b' 是红色且 'c' 是绿色。
 * Bob 可以移除下标 2 的蓝色气球。这将花费 3 秒。
 * 移除后，不存在两个连续的气球涂着相同的颜色。总时间 = 3 。
 *
 * 示例 2：
 *
 *
 * 输入：colors = "abc", neededTime = [1,2,3]
 * 输出：0
 * 解释：绳子已经是彩色的，Bob 不需要从绳子上移除任何气球。
 *
 *
 * 示例 3：
 *
 *
 * 输入：colors = "aabaa", neededTime = [1,2,3,4,1]
 * 输出：2
 * 解释：Bob 会移除下标 0 和下标 4 处的气球。这两个气球各需要 1 秒来移除。
 * 移除后，不存在两个连续的气球涂着相同的颜色。总时间 = 1 + 1 = 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == colors.length == neededTime.length
 * 1 <= n <= 10^5
 * 1 <= neededTime[i] <= 10^4
 * colors 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 计算使绳子变成彩色所需的最短时间
 *
 * @param colors - 气球颜色字符串
 * @param neededTime - 移除每个气球所需的时间数组
 * @returns 最少时间
 */
function minCost(colors: string, neededTime: number[]): number {
  const n = colors.length;
  let idx = 0;
  let res = 0;

  // 遍历所有气球
  while (idx < n) {
    let sum = 0; // 当前连续相同颜色气球的时间总和
    let maxTime = 0; // 当前连续相同颜色气球中的最大时间
    const color = colors[idx];

    // 处理连续相同颜色的气球
    while (idx < n && colors[idx] === color) {
      sum += neededTime[idx]; // 累加总时间
      maxTime = Math.max(maxTime, neededTime[idx]); // 记录最大时间
      idx++;
    }

    // 保留时间最大的气球，移除其他气球
    // 移除成本 = 总时间 - 最大时间
    res += sum - maxTime;
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 题目要求移除连续相同颜色的气球，使得最终没有两个连续的气球颜色相同
   - 目标是使移除气球花费的时间最少
   - 关键洞察：对于一组连续相同颜色的气球，我们应该保留移除时间最大的那个，移除其他的

2. 算法分析：
   - 时间复杂度：O(n) - 只需遍历一次数组
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：贪心算法

3. 核心思路：
   - 贪心策略：对于每组连续相同颜色的气球，保留移除时间最大的一个
   - 为什么这样是最优的？因为在一组连续相同颜色的气球中，只能保留一个，
     保留移除时间最大的那个，可以最小化移除其他气球的总时间
   - 移除成本 = 该组总时间 - 该组最大时间

4. 算法步骤：
   第1步：初始化指针 idx 从 0 开始，结果 res 为 0
   第2步：使用外层循环遍历整个数组
   第3步：对于每个位置，记录当前颜色，使用内层循环找到所有连续相同颜色的气球
   第4步：在内层循环中，累加这些气球的时间总和，并记录最大时间
   第5步：将（总和 - 最大时间）加到结果中
   第6步：继续处理下一组颜色

5. 示例分析：

   示例 1: colors = "abaac", neededTime = [1,2,3,4,5]
   
   步骤追踪：
   - idx=0: 颜色='a'
     * 连续相同: colors[0]='a', neededTime[0]=1
     * sum=1, maxTime=1, idx移到1
     * res += 1-1 = 0
   
   - idx=1: 颜色='b'
     * 连续相同: colors[1]='b', neededTime[1]=2
     * sum=2, maxTime=2, idx移到2
     * res += 2-2 = 0
   
   - idx=2: 颜色='a'
     * 连续相同: colors[2]='a', neededTime[2]=3
     *           colors[3]='a', neededTime[3]=4
     * sum=3+4=7, maxTime=4, idx移到4
     * res += 7-4 = 3
   
   - idx=4: 颜色='c'
     * 连续相同: colors[4]='c', neededTime[4]=5
     * sum=5, maxTime=5, idx移到5
     * res += 5-5 = 0
   
   最终结果：res = 3

   示例 2: colors = "aabaa", neededTime = [1,2,3,4,1]
   
   - idx=0: 颜色='a', 连续2个: [1,2]
     * sum=3, maxTime=2, res += 3-2 = 1
   
   - idx=2: 颜色='b', 连续1个: [3]
     * sum=3, maxTime=3, res += 0
   
   - idx=3: 颜色='a', 连续2个: [4,1]
     * sum=5, maxTime=4, res += 5-4 = 1
   
   最终结果：res = 2

6. 实现要点：
   - 使用双层循环：外层遍历所有气球，内层处理每组连续相同颜色
   - 关键变量：
     * sum: 记录当前组的时间总和
     * maxTime: 记录当前组的最大时间
     * color: 记录当前组的颜色
   - 边界处理：内层循环会自动处理到数组末尾

7. 优化要点：
   - 该算法已经是最优解，每个元素只访问一次
   - 空间复杂度为 O(1)，没有使用额外的数据结构
   - 时间效率：虽然有两层循环，但每个元素只被访问一次，总时间复杂度仍是 O(n)

8. 类似问题：
   - LeetCode 1647. 字符频次唯一的最小删除次数
   - LeetCode 2216. 美化数组的最少删除数
   - 所有涉及"移除连续相同元素"的贪心问题

9. 常见错误：
   - 错误1：试图只保留第一个或最后一个气球
     * 正确做法：保留移除时间最大的气球
   
   - 错误2：没有正确处理连续相同颜色的边界
     * 正确做法：使用内层循环完整处理每组连续相同颜色
   
   - 错误3：忘记累加总时间
     * 正确做法：sum 记录所有气球时间，然后减去最大值

10. 扩展思考：
    - 如果要求返回具体移除哪些气球，可以在处理时记录索引
    - 如果气球不是线性排列，而是在二维平面上，需要考虑更复杂的图论算法
    - 这个问题本质上是分组贪心，可以推广到其他类似场景
*/
