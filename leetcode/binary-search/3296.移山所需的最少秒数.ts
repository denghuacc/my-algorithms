/*
 * @lc app=leetcode.cn id=3296 lang=typescript
 *
 * [3296] 移山所需的最少秒数
 *
 * https://leetcode.cn/problems/minimum-number-of-seconds-to-make-mountain-height-zero/description/
 *
 * algorithms
 * Medium (45.59%)
 * Likes:    52
 * Dislikes: 0
 * Total Accepted:    14.2K
 * Total Submissions: 29.5K
 * Testcase Example:  '4\n[2,1,1]'
 *
 * 给你一个整数 mountainHeight 表示山的高度。
 *
 * 同时给你一个整数数组 workerTimes，表示工人们的工作时间（单位：秒）。
 *
 * 工人们需要 同时 进行工作以 降低 山的高度。对于工人 i :
 *
 *
 * 山的高度降低 x，需要花费 workerTimes[i] + workerTimes[i] * 2 + ... + workerTimes[i] * x
 * 秒。例如：
 *
 *
 * 山的高度降低 1，需要 workerTimes[i] 秒。
 * 山的高度降低 2，需要 workerTimes[i] + workerTimes[i] * 2 秒，依此类推。
 *
 *
 *
 *
 * 返回一个整数，表示工人们使山的高度降低到 0 所需的 最少 秒数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： mountainHeight = 4, workerTimes = [2,1,1]
 *
 * 输出： 3
 *
 * 解释：
 *
 * 将山的高度降低到 0 的一种方式是：
 *
 *
 * 工人 0 将高度降低 1，花费 workerTimes[0] = 2 秒。
 * 工人 1 将高度降低 2，花费 workerTimes[1] + workerTimes[1] * 2 = 3 秒。
 * 工人 2 将高度降低 1，花费 workerTimes[2] = 1 秒。
 *
 *
 * 因为工人同时工作，所需的最少时间为 max(2, 3, 1) = 3 秒。
 *
 *
 * 示例 2：
 *
 *
 * 输入： mountainHeight = 10, workerTimes = [3,2,2,4]
 *
 * 输出： 12
 *
 * 解释：
 *
 *
 * 工人 0 将高度降低 2，花费 workerTimes[0] + workerTimes[0] * 2 = 9 秒。
 * 工人 1 将高度降低 3，花费 workerTimes[1] + workerTimes[1] * 2 + workerTimes[1] * 3 =
 * 12 秒。
 * 工人 2 将高度降低 3，花费 workerTimes[2] + workerTimes[2] * 2 + workerTimes[2] * 3 =
 * 12 秒。
 * 工人 3 将高度降低 2，花费 workerTimes[3] + workerTimes[3] * 2 = 12 秒。
 *
 *
 * 所需的最少时间为 max(9, 12, 12, 12) = 12 秒。
 *
 *
 * 示例 3：
 *
 *
 * 输入： mountainHeight = 5, workerTimes = [1]
 *
 * 输出： 15
 *
 * 解释：
 *
 * 这个示例中只有一个工人，所以答案是 workerTimes[0] + workerTimes[0] * 2 + workerTimes[0] * 3 +
 * workerTimes[0] * 4 + workerTimes[0] * 5 = 15 秒。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= mountainHeight <= 10^5
 * 1 <= workerTimes.length <= 10^4
 * 1 <= workerTimes[i] <= 10^6
 *
 *
 */

// @lc code=start
/**
 * 移山所需的最少秒数
 *
 * 核心思路：二分答案 + 数学反解
 * - 对于给定时间 t，判断所有工人最多能降低多少高度。
 * - 若总高度 >= mountainHeight，说明 t 可行；否则不可行。
 * - 可行性关于 t 单调（时间越多，可完成高度不减），
 *   因此可以二分最小可行时间。
 *
 * @param mountainHeight - 山的初始高度
 * @param workerTimes - 每个工人的基础耗时系数
 * @returns 把山高降到 0 的最少秒数
 *
 * 时间复杂度：O(n * log U)
 * n = workerTimes.length，U = 答案上界
 * 空间复杂度：O(1)
 */
function minNumberOfSeconds(
  mountainHeight: number,
  workerTimes: number[]
): number {
  // 上界：让最慢工人单独完成全部 mountainHeight（一定可行）。
  // 其耗时为 w * (1 + 2 + ... + H) = w * H * (H + 1) / 2。
  const EPS = 1e-7;
  const maxWorkerTime = Math.max(...workerTimes);
  let left = 0;
  let right = (maxWorkerTime * mountainHeight * (mountainHeight + 1)) / 2;

  // 判定函数：给定 timeLimit，能否把山至少降低 mountainHeight。
  function canFinishIn(timeLimit: number): boolean {
    let totalHeight = 0;

    for (const workerTime of workerTimes) {
      // workerTime * (1 + 2 + ... + k) <= timeLimit
      // 即 k(k+1)/2 <= floor(timeLimit / workerTime) = quota
      const quota = Math.floor(timeLimit / workerTime);
      const k = Math.floor((-1 + Math.sqrt(1 + 8 * quota)) / 2 + EPS);
      totalHeight += k;

      // 早停：已达到目标高度，无需继续累加。
      if (totalHeight >= mountainHeight) {
        return true;
      }
    }

    return false;
  }

  // 二分最小可行时间（左闭右闭区间写法）
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (canFinishIn(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // 循环结束后 left 是最小可行时间。
  return left;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 每个工人 i 若降低高度 x，耗时是：
     workerTimes[i] * (1 + 2 + ... + x)
     = workerTimes[i] * x * (x + 1) / 2
   - 工人并行工作，总耗时由“最慢完成者”决定。
   - 我们要最小化这个总耗时。

2. 关键观察：答案具有单调性
   - 设时间限制为 t。
   - 若在 t 秒内可以把山降为 0，那么在 t+1 秒内也一定可以。
   - 因此“t 是否可行”是一个单调布尔函数，可二分最小可行 t。

3. 判定函数如何计算
   - 固定一个时间上限 t，计算每个工人在这段时间内最多能做多少层高度。
   - 对工人 i，需满足：
     workerTimes[i] * k * (k + 1) / 2 <= t
   - 等价于：
     k * (k + 1) / 2 <= floor(t / workerTimes[i]) = quota
   - 解这个不等式可得：
     k = floor((sqrt(1 + 8 * quota) - 1) / 2)
   - 把所有工人的 k 相加，若总和 >= mountainHeight，则 t 可行。

4. 二分边界
   - 左边界 left = 0。
   - 右边界 right 取一个必可行值：
     让一个工人单独完成全部高度。
     取最慢工人（maxWorkerTime）可保证上界一定覆盖答案：
     maxWorkerTime * H * (H + 1) / 2。

5. 复杂度分析
   - 判定一次需要遍历所有工人：O(n)。
   - 二分次数约 O(log U)，U 是时间上界。
   - 总时间复杂度：O(n * log U)。
   - 空间复杂度：O(1)。

6. 示例简析
   - mountainHeight = 4, workerTimes = [2,1,1]
   - 当 t = 3：
     1) worker=2：最多做 1 层（2*1=2）
     2) worker=1：最多做 2 层（1+2=3）
     3) worker=1：最多做 2 层
     总计 >= 4，可行。
   - 再检查 t = 2 不可行，故最小可行时间是 3。

7. 常见错误
   - 把并行问题当成串行，把各工人耗时相加。
   - 判定时直接枚举每个工人的层数 k，导致超时。
   - 二分边界设置过小，导致漏解。
   - 浮点开方后不做取整保护，出现边界误差（本实现使用 EPS 缓冲）。
*/
