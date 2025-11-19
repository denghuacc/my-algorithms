/*
 * @lc app=leetcode.cn id=2154 lang=typescript
 *
 * [2154] 将找到的值乘以 2
 *
 * https://leetcode.cn/problems/keep-multiplying-found-values-by-two/description/
 *
 * algorithms
 * Easy (73.48%)
 * Likes:    37
 * Dislikes: 0
 * Total Accepted:    34.1K
 * Total Submissions: 45.6K
 * Testcase Example:  '[5,3,6,1,12]\n3'
 *
 * 给你一个整数数组 nums ，另给你一个整数 original ，这是需要在 nums 中搜索的第一个数字。
 *
 * 接下来，你需要按下述步骤操作：
 *
 *
 * 如果在 nums 中找到 original ，将 original 乘以 2 ，得到新 original（即，令 original = 2 *
 * original）。
 * 否则，停止这一过程。
 * 只要能在数组中找到新 original ，就对新 original 继续 重复 这一过程。
 *
 *
 * 返回 original 的 最终 值。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,3,6,1,12], original = 3
 * 输出：24
 * 解释：
 * - 3 能在 nums 中找到。3 * 2 = 6 。
 * - 6 能在 nums 中找到。6 * 2 = 12 。
 * - 12 能在 nums 中找到。12 * 2 = 24 。
 * - 24 不能在 nums 中找到。因此，返回 24 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,7,9], original = 4
 * 输出：4
 * 解释：
 * - 4 不能在 nums 中找到。因此，返回 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * 1 <= nums[i], original <= 1000
 *
 *
 */

// @lc code=start
/**
 * 方法一：排序法
 *
 * @description 先对数组进行排序，然后遍历数组查找目标值
 * @timeComplexity O(N log N) - 排序需要 O(N log N) 时间
 * @spaceComplexity O(log N) - 排序需要 O(log N) 的栈空间
 */
var findFinalValue = function (nums: number[], original: number): number {
  // 先对数组进行升序排序
  nums.sort((a, b) => a - b);

  let res = original;
  // 遍历排序后的数组
  for (const num of nums) {
    // 如果找到了当前需要查找的数字
    if (res === num) {
      // 将目标值乘以 2，继续查找下一个
      res *= 2;
    }
  }
  return res;
};

/**
 * 方法二：哈希表法
 *
 * @description 使用哈希表存储数组元素，实现 O(1) 的查找
 * @timeComplexity O(N) - 构建哈希表需要 O(N)，查找过程最多执行 N 次（实际上受限于数据
 *                        范围）
 * @spaceComplexity O(N) - 需要存储 N 个元素的哈希表
 */
var findFinalValue = function (nums: number[], original: number): number {
  // 将数组转换为 Set，提高查找效率
  const numSet = new Set(nums);

  let res = original;
  // 只要当前值存在于集合中，就持续乘以 2
  while (numSet.has(res)) {
    res *= 2;
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个查找与迭代更新的问题。
   - 核心在于快速判断一个数值是否存在于数组中，如果存在则更新该值并继续查找。

2. 算法分析：
   - 方法一（排序）：
     - 时间复杂度：O(N log N)，主要消耗在排序上。
     - 空间复杂度：O(log N)，排序的栈空间。
     - 适合场景：对空间要求较高，或者数组已经有序的情况。

   - 方法二（哈希表）：
     - 时间复杂度：O(N)，构建 Set 需要 O(N)，后续查找每次 O(1)。
     - 空间复杂度：O(N)，需要额外的空间存储 Set。
     - 适合场景：追求时间效率，空间允许的情况。

3. 解题思路：
   - 初始目标值为 original。
   - 我们需要不断检查 original 是否在 nums 中。
   - 如果在，original = original * 2，重复检查。
   - 如果不在，停止并返回 original。

   为了高效查找，我们可以：
   1.  **排序法**：先排序，然后从小到大遍历。因为 original 是不断变大的，所以只需要遍历一次
       数组即可。
   2.  **哈希表法**：将 nums 存入 Set，利用 Set 的 O(1) 查找特性，直接循环判断。

4. 实现要点：
   - 排序法中，注意 original 可能会在数组中出现多次，但我们只需要找到一次即可触发翻倍。
     由于数组已排序且 original 单调递增，简单的线性遍历即可满足需求。
   - 哈希表法中，使用 Set 而不是 Object 或 Map，代码更简洁。

5. 示例分析：
   输入：nums = [5,3,6,1,12], original = 3

   哈希表法流程：
   - 构建 Set: {5, 3, 6, 1, 12}
   - 检查 3: 存在 -> original 变为 6
   - 检查 6: 存在 -> original 变为 12
   - 检查 12: 存在 -> original 变为 24
   - 检查 24: 不存在 -> 循环结束
   - 返回 24

6. 常见错误：
   - 排序法忘记处理 original 更新后的值可能比当前遍历到的值小的情况（但在本题逻辑中，
     original 只增不减，且我们是遍历排序后的数组，所以不会漏掉）。
   - 忽略了 nums 中可能包含重复元素，不过 Set 会自动去重，排序法也不受影响。

7. 扩展思考：
   - 如果 nums 非常大，无法一次性加载到内存，可以使用布隆过滤器（Bloom Filter）进行预判，
     或者分块处理。
   - 如果 original 可能会溢出整数范围，需要考虑大数处理（本题提示中说明了范围较小，
     无需担心）。
*/
