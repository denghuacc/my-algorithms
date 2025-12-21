/*
 * @lc app=leetcode.cn id=3652 lang=typescript
 *
 * [3652] 按策略买卖股票的最佳时机
 *
 * https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-using-strategy/description/
 *
 * algorithms
 * Medium (47.68%)
 * Likes:    158
 * Dislikes: 25
 * Total Accepted:    57.6K
 * Total Submissions: 108K
 * Testcase Example:  '[4,2,8]\n[-1,0,1]\n2'
 *
 * 给你两个整数数组 prices 和 strategy：
 *
 *
 * prices[i] 表示第 i 天的股价。
 * strategy[i] 表示第 i 天的操作：-1 买入、0 持有、1 卖出。
 *
 *
 * 另给定一个偶数 k，允许至多一次修改 strategy：
 *
 *
 * 选择恰好 k 个连续元素。
 * 将前 k / 2 个元素全部改为 0（持有）。
 * 将后 k / 2 个元素全部改为 1（卖出）。
 *
 *
 * 利润定义为 sum(strategy[i] * prices[i])。
 *
 * 返回最大可能利润。无需考虑资金或持仓限制，可随时买卖。
 *
 *
 * 示例 1：
 *
 *
 * 输入：prices = [4,2,8], strategy = [-1,0,1], k = 2
 * 输出：10
 * 解释：修改区间 [0,1] 后策略为 [0,1,1]，利润 0×4+1×2+1×8=10。
 *
 *
 * 示例 2：
 *
 *
 * 输入：prices = [5,4,3], strategy = [1,1,0], k = 2
 * 输出：9
 * 解释：不修改即得 5+4=9，为最优答案。
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= prices.length == strategy.length <= 10^5
 * 1 <= prices[i] <= 10^5
 * -1 <= strategy[i] <= 1
 * 2 <= k <= prices.length
 * k 为偶数
 *
 *
 */

// @lc code=start
/**
 * 计算在允许一次区间修改策略后可获得的最大利润。
 * 区间修改会把前半段设为 0（清空贡献）、后半段设为 1（赚取股价）。
 *
 * @param prices - 第 i 天的股价。
 * @param strategy - 第 i 天的原始操作：-1/0/1。
 * @param k - 被修改的区间长度，固定为偶数。
 * @returns 最大总利润。
 */
function maxProfit(prices: number[], strategy: number[], k: number): number {
  const n = prices.length;
  const profitPrefix = new Array(n + 1).fill(0); // 原始策略收益前缀和
  const pricePrefix = new Array(n + 1).fill(0); // 纯股价前缀和（用于计算卖出收益）

  for (let i = 0; i < n; i++) {
    profitPrefix[i + 1] = profitPrefix[i] + strategy[i] * prices[i];
    pricePrefix[i + 1] = pricePrefix[i] + prices[i];
  }

  const baseProfit = profitPrefix[n];
  let best = baseProfit;
  const half = k / 2;

  for (let end = k - 1; end < n; end++) {
    const start = end - k + 1;
    const left = profitPrefix[start]; // 区间左侧保持原样
    const right = baseProfit - profitPrefix[end + 1]; // 区间右侧保持原样
    const sellGain = pricePrefix[end + 1] - pricePrefix[start + half]; // 后半段全部设为卖出
    const candidate = left + sellGain + right; // 前半段收益被置零，无需相加
    best = Math.max(best, candidate);
  }
  return best;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在原策略收益的基础上，找到一次连续区间替换带来的最大
     增益。
   - 关键特点：区间长度固定为 k，前半段清零，后半段全卖；无需考虑
     持仓限制。
   - 目标：最大化 sum(strategy[i] * prices[i])。

2. 算法分析：
   - 时间复杂度：O(n)，通过前缀和在 O(1) 时间内计算任意区间收益。
   - 空间复杂度：O(n)，存两个长度 n+1 的前缀和数组。
   - 算法类型：滑动枚举 + 前缀和优化区间和。

3. 解题思路：
   - 核心思想：原收益减去被替换区间的贡献，再加上修改后的收益。
   - 推导过程：
     * 左右两侧收益可由前缀和直接得到。
     * 修改后区间的收益等于“后半段股价之和”，因为前半段被清零。
   - 算法步骤：
     1) 计算 profitPrefix（strategy×price 的前缀和）与 pricePrefix。
     2) 遍历所有长度为 k 的区间，记录 start、end。
     3) 借助前缀和求出左/右侧收益以及后半段股价和，更新答案。

4. 实现要点：
   - 索引细节：profitPrefix[i] 表示前 i 个元素的收益，注意区间边界。
   - 卖出收益：pricePrefix[end+1] - pricePrefix[start+half]。
   - 前半段收益被置零，无需显式计算。

5. 算法优势
   - 单次遍历即可完成所有区间评估，远优于 O(nk) 的暴力做法。
   - 逻辑清晰：先移除旧贡献，再加入新贡献。

6. 核心步骤（摘要）
   - 建立两个前缀和。
   - 枚举区间结束位置 end，得到 start=end-k+1。
   - 计算 candidate = profitPrefix[start] + sellGain +
     (baseProfit - profitPrefix[end+1])。

7. 示例分析
   - 示例一：prices=[4,2,8],strategy=[-1,0,1],k=2。
     * baseProfit=4；枚举区间 [0,1] 获得 sellGain=2，答案提升到 10。
   - 示例二：prices=[5,4,3],strategy=[1,1,0],k=2。
     * 任意修改都不优于 baseProfit=9，因此保持原策略。

8. 常见错误
   - 忘记从 baseProfit 中扣除被替换区间的原收益，导致重复计算。
   - 前缀和索引 off-by-one，start 或 end 位置错误。
   - 将前半段收益误认为也要累加（实际应置零）。

10. 扩展思考
   - 若后半段需要改为“买入”（-1），只需调整 sellGain 的计算方式。
   - 可拓展到多次修改：类似最大子数组问题，可用 DP/滑动窗口。
   - 适用于任意“部分区间替换贡献”场景：用前缀和快速复原替换
     前后差值。
*/
