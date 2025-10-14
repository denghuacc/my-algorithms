/*
 * @lc app=leetcode.cn id=3349 lang=typescript
 *
 * [3349] 检测相邻递增子数组 I
 *
 * https://leetcode.cn/problems/adjacent-increasing-subarrays-detection-i/description/
 *
 * algorithms
 * Easy (40.71%)
 * Likes:    13
 * Dislikes: 0
 * Total Accepted:    12.8K
 * Total Submissions: 27.7K
 * Testcase Example:  '[2,5,7,8,9,2,3,4,3,1]\n3'
 *
 * 给你一个由 n 个整数组成的数组 nums 和一个整数 k，请你确定是否存在 两个 相邻 且长度为 k 的 严格递增
 * 子数组。具体来说，需要检查是否存在从下标 a 和 b (a < b) 开始的 两个 子数组，并满足下述全部条件：
 *
 *
 * 这两个子数组 nums[a..a + k - 1] 和 nums[b..b + k - 1] 都是 严格递增 的。
 * 这两个子数组必须是 相邻的，即 b = a + k。
 *
 *
 * 如果可以找到这样的 两个 子数组，请返回 true；否则返回 false。
 *
 * 子数组 是数组中的一个连续 非空 的元素序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,5,7,8,9,2,3,4,3,1], k = 3
 *
 * 输出：true
 *
 * 解释：
 *
 *
 * 从下标 2 开始的子数组为 [7, 8, 9]，它是严格递增的。
 * 从下标 5 开始的子数组为 [2, 3, 4]，它也是严格递增的。
 * 两个子数组是相邻的，因此结果为 true。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,4,4,4,4,5,6,7], k = 5
 *
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 100
 * 1 <= 2 * k <= nums.length
 * -1000 <= nums[i] <= 1000
 *
 *
 */

// @lc code=start
function hasIncreasingSubarrays(nums: number[], k: number): boolean {
  const n = nums.length;

  // res 记录找到的最大合法 k 值
  let res = 0;

  // cnt 记录当前连续递增子数组的长度
  let cnt = 1;

  // preCnt 记录上一个连续递增子数组的长度
  // 用于判断两个相邻递增子数组的情况
  let preCnt = 0;

  // 从第二个元素开始遍历数组
  for (let i = 1; i < n; i++) {
    // 如果当前元素大于前一个元素，递增序列继续
    if (nums[i] > nums[i - 1]) {
      cnt++; // 当前递增子数组长度加 1
    } else {
      // 递增序列中断，保存当前递增子数组的长度
      preCnt = cnt;
      cnt = 1; // 重新开始计数
    }

    // 情况 1：两个相邻的递增子数组（长度分别为 preCnt 和 cnt）
    // 取两者的最小值，因为两个子数组长度必须相等
    res = Math.max(res, Math.min(cnt, preCnt));

    // 情况 2：一个长递增子数组可以拆分为两个相邻的递增子数组
    // 长度为 cnt 的递增子数组可以拆成两个长度为 cnt/2 的子数组
    res = Math.max(res, Math.floor(cnt / 2));
  }

  // 判断找到的最大 k 值是否满足要求
  return res >= k;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 寻找两个相邻且长度均为 k 的严格递增子数组
   - "相邻"意味着第二个子数组紧接着第一个子数组（b = a + k）
   - "严格递增"意味着每个元素都严格大于前一个元素
   - 目标：判断是否存在这样的两个子数组

2. 算法分析：
   - 时间复杂度：O(n) - 只需遍历数组一次
   - 空间复杂度：O(1) - 只使用常数个变量
   - 算法类型：一次遍历 + 贪心

3. 解题思路：

   核心思想：
   - 一次遍历记录所有连续递增子数组的长度
   - 对于每个位置，考虑两种情况：
     1. 当前递增段和前一个递增段形成两个相邻子数组
     2. 当前递增段本身可以拆分为两个相邻子数组

   关键观察：
   - 不需要枚举所有可能的起始位置
   - 只需要追踪当前递增段长度和前一个递增段长度
   - 两个相邻递增段：取 min(preCnt, cnt) 作为可行的 k
   - 一个长递增段拆分：取 floor(cnt / 2) 作为可行的 k

   算法步骤：
   1. 初始化变量：
      - cnt = 1：当前递增子数组长度
      - preCnt = 0：前一个递增子数组长度
      - res = 0：记录找到的最大可行 k 值
   2. 从第二个元素开始遍历：
      a. 如果递增继续：cnt++
      b. 如果递增中断：保存 cnt 到 preCnt，重置 cnt = 1
      c. 更新 res：
         - 两个相邻递增段：Math.min(cnt, preCnt)
         - 一个长递增段拆分：Math.floor(cnt / 2)
   3. 返回 res >= k

4. 实现要点：

   数据结构选择：
   - 使用三个变量追踪状态：cnt, preCnt, res
   - 不需要额外数组存储所有递增段

   关键技巧：
   - **滑动窗口思想**：动态维护当前和前一个递增段
   - **两种情况合并**：同时考虑分段和拆分两种模式
   - **贪心策略**：每次都尝试更新最大可行 k

   边界条件处理：
   - 数组长度为 2：只能有一个长度为 1 的相邻对
   - k = 1：任意两个递增元素都满足
   - 全递增数组：可以拆分为两半

5. 示例分析：

   示例 1：nums = [2,5,7,8,9,2,3,4,3,1], k = 3
   
   初始状态：cnt = 1, preCnt = 0, res = 0
   
   遍历过程（从 i=1 开始）：
   
   i=1: nums[1]=5 > nums[0]=2 ✅
   - cnt = 2
   - res = max(0, min(2,0)) = 0
   - res = max(0, floor(2/2)) = 1
   
   i=2: nums[2]=7 > nums[1]=5 ✅
   - cnt = 3
   - res = max(1, min(3,0)) = 1
   - res = max(1, floor(3/2)) = 1
   
   i=3: nums[3]=8 > nums[2]=7 ✅
   - cnt = 4
   - res = max(1, min(4,0)) = 1
   - res = max(1, floor(4/2)) = 2
   
   i=4: nums[4]=9 > nums[3]=8 ✅
   - cnt = 5
   - res = max(2, min(5,0)) = 2
   - res = max(2, floor(5/2)) = 2
   
   i=5: nums[5]=2 < nums[4]=9 ❌ 递增中断
   - preCnt = 5 (保存前一个递增段长度)
   - cnt = 1 (重新开始)
   - res = max(2, min(1,5)) = 2
   - res = max(2, floor(1/2)) = 2
   
   i=6: nums[6]=3 > nums[5]=2 ✅
   - cnt = 2
   - res = max(2, min(2,5)) = 2
   - res = max(2, floor(2/2)) = 2
   
   i=7: nums[7]=4 > nums[6]=3 ✅
   - cnt = 3
   - res = max(2, min(3,5)) = 3 ⭐ 找到了！
   - res = max(3, floor(3/2)) = 3
   
   i=8: nums[8]=3 < nums[7]=4 ❌ 递增中断
   - preCnt = 3
   - cnt = 1
   - res = max(3, min(1,3)) = 3
   - res = max(3, floor(1/2)) = 3
   
   i=9: nums[9]=1 < nums[8]=3 ❌ 递增中断
   - preCnt = 1
   - cnt = 1
   - res = max(3, min(1,1)) = 3
   - res = max(3, floor(1/2)) = 3
   
   最终：res = 3 >= k = 3，返回 true
   
   图解分析：
   ```
   数组：[2, 5, 7, 8, 9, 2, 3, 4, 3, 1]
   索引： 0  1  2  3  4  5  6  7  8  9
   
   递增段1：[2, 5, 7, 8, 9] 长度=5
             └─────────┘
   
   递增段2：[2, 3, 4] 长度=3
                └────┘
   
   两个相邻递增子数组：
   - 子数组1：[7, 8, 9] (索引 2-4，长度 3)
   - 子数组2：[2, 3, 4] (索引 5-7，长度 3)
   - 相邻：5 = 2 + 3 ✅
   ```

   示例 2：nums = [1,2,3,4,4,4,4,5,6,7], k = 5
   
   递增段分析：
   - 段1：[1,2,3,4] 长度=4（在索引4处中断）
   - 段2：[4] 长度=1（立即中断）
   - 段3：[4] 长度=1（立即中断）
   - 段4：[4] 长度=1（立即中断）
   - 段5：[4,5,6,7] 长度=4
   
   最大可行 k：
   - 相邻段：min(4,1)=1, min(1,1)=1, min(1,1)=1, min(1,4)=1
   - 拆分段：floor(4/2)=2, floor(4/2)=2
   - res = 2 < k = 5，返回 false

6. 算法要点总结：

   核心技巧：
   - **一次遍历**：不需要嵌套循环或回溯
   - **状态追踪**：用 cnt 和 preCnt 记录关键信息
   - **两种模式**：同时考虑分段和拆分
   - **贪心更新**：每步都更新最大可行 k

   优化要点：
   - 时间最优：O(n) 一次遍历
   - 空间最优：O(1) 常数空间
   - 无需预处理或后处理

   类似问题：
   - LeetCode 674: 最长连续递增序列
   - LeetCode 300: 最长递增子序列
   - LeetCode 978: 最长湍流子数组

7. 常见错误：

   易错点 1：只考虑相邻两段，忘记拆分情况
   - 错误：只计算 Math.min(cnt, preCnt)
   - 正确：同时考虑 Math.floor(cnt / 2)
   - 例如：[1,2,3,4,5,6] k=3，可以拆分为 [1,2,3] 和 [4,5,6]

   易错点 2：preCnt 初始化或更新错误
   - 错误：在递增继续时也更新 preCnt
   - 正确：只在递增中断时更新 preCnt

   易错点 3：忘记 Math.floor
   - 错误：res = Math.max(res, cnt / 2)
   - 正确：res = Math.max(res, Math.floor(cnt / 2))
   - 例如：cnt=5 时，只能拆成长度为 2 的相邻对，不是 2.5

   易错点 4：边界条件处理
   - 错误：从 i=0 开始遍历
   - 正确：从 i=1 开始，因为需要比较 nums[i] 和 nums[i-1]

8. 扩展思考：

   变种问题：
   
   问题 1：找最大的 k 值
   ```typescript
   function maxIncreasingSubarrays(nums: number[]): number {
     // 返回 res 即可，不需要判断
     // 这就是当前代码 return res 的值
   }
   ```
   
   问题 2：找所有满足条件的 k 值
   ```typescript
   function allValidK(nums: number[]): number[] {
     const valid = new Set<number>();
     // 记录所有 min(cnt, preCnt) 和 floor(cnt/2)
     // 所有 <= res 的值都是有效的
   }
   ```
   
   问题 3：非严格递增（允许相等）
   ```typescript
   // 修改判断条件：nums[i] >= nums[i-1]
   if (nums[i] >= nums[i - 1]) {
     cnt++;
   }
   ```

   优化思路：
   - 当前解法已经是最优：O(n) 时间，O(1) 空间
   - 无法进一步优化时间复杂度（必须遍历所有元素）

   实际应用：
   - 股票价格分析：寻找连续上涨趋势
   - 数据流监控：检测持续增长模式
   - 游戏排行榜：发现连续进步的玩家
*/
