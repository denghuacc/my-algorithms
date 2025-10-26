/*
 * @lc app=leetcode.cn id=3346 lang=typescript
 *
 * [3346] 执行操作后元素的最高频率 I
 *
 * https://leetcode.cn/problems/maximum-frequency-of-an-element-after-performing-operations-i/description/
 *
 * algorithms
 * Medium (25.96%)
 * Likes:    17
 * Dislikes: 0
 * Total Accepted:    5.7K
 * Total Submissions: 14.9K
 * Testcase Example:  '[1,4,5]\n1\n2'
 *
 * 给你一个整数数组 nums 和两个整数 k 和 numOperations 。
 *
 * 你必须对 nums 执行 操作  numOperations 次。每次操作中，你可以：
 *
 *
 * 选择一个下标 i ，它在之前的操作中 没有 被选择过。
 * 将 nums[i] 增加范围 [-k, k] 中的一个整数。
 *
 *
 * 在执行完所有操作以后，请你返回 nums 中出现 频率最高 元素的出现次数。
 *
 * 一个元素 x 的 频率 指的是它在数组中出现的次数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,4,5], k = 1, numOperations = 2
 *
 * 输出：2
 *
 * 解释：
 *
 * 通过以下操作得到最高频率 2 ：
 *
 *
 * 将 nums[1] 增加 0 ，nums 变为 [1, 4, 5] 。
 * 将 nums[2] 增加 -1 ，nums 变为 [1, 4, 4] 。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,11,20,20], k = 5, numOperations = 1
 *
 * 输出：2
 *
 * 解释：
 *
 * 通过以下操作得到最高频率 2 ：
 *
 *
 * 将 nums[1] 增加 0 。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 * 0 <= k <= 10^5
 * 0 <= numOperations <= nums.length
 *
 *
 */

// @lc code=start
function maxFrequency(
  nums: number[],
  k: number,
  numOperations: number
): number {
  // 第一步：对数组排序，方便后续使用二分查找和统计相同元素
  nums.sort((a, b) => a - b);

  // 初始化结果变量，记录最大频率
  let res = 0;

  // 使用哈希表记录每个数字的原始出现次数
  const numCnt = new Map<number, number>();

  // 第二步：统计原始数组中每个数字的出现次数
  let lastNumIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    // 当遇到新的数字时，记录前一个数字的出现次数
    if (nums[i] !== nums[lastNumIndex]) {
      numCnt.set(nums[lastNumIndex], i - lastNumIndex);
      res = Math.max(res, i - lastNumIndex);
      lastNumIndex = i;
    }
  }
  // 记录最后一个数字的出现次数
  numCnt.set(nums[lastNumIndex], nums.length - lastNumIndex);
  res = Math.max(res, nums.length - lastNumIndex);

  // 第三步：枚举目标值，计算能够转换成该目标值的最大元素数量
  // 遍历从最小值到最大值的所有可能目标值
  for (let i = nums[0]; i <= nums[nums.length - 1]; i++) {
    // 使用二分查找找到可以通过操作变成目标值 i 的元素范围
    // 范围是 [i-k, i+k]，因为每个元素可以增加或减少 k
    const left = leftBound(i - k); // 找到第一个 >= i-k 的元素位置
    const right = rightBound(i + k); // 找到最后一个 <= i+k 的元素位置

    let totalCnt = 0;

    // 如果目标值 i 在原数组中已经存在
    if (numCnt.has(i)) {
      // 总数 = 原有的 i 的数量 + 最多 numOperations 次操作能转换的数量
      // 但不能超过可转换范围内的元素总数
      totalCnt = Math.min(right - left + 1, numCnt.get(i)! + numOperations);
    } else {
      // 如果目标值 i 不存在，则需要通过操作来创建
      // 最多可以转换 numOperations 个元素，但不能超过范围内的元素总数
      totalCnt = Math.min(right - left + 1, numOperations);
    }

    // 更新最大频率
    res = Math.max(res, totalCnt);
  }

  return res;

  /**
   * 二分查找：找到第一个 >= target 的元素索引（左边界）
   * @param target - 目标值
   * @returns 第一个大于等于 target 的元素索引
   */
  function leftBound(target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  /**
   * 二分查找：找到最后一个 <= target 的元素索引（右边界）
   * @param target - 目标值
   * @returns 最后一个小于等于 target 的元素索引
   */
  function rightBound(target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }
    return left;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定一个数组和操作次数限制，每次操作可以对一个元素加减 k 范围内的值
   - 目标是找到执行操作后，数组中出现频率最高的元素的出现次数
   - 核心思想：枚举所有可能的目标值，计算能够通过操作转换成该目标值的元素数量

2. 算法分析：
   - 时间复杂度：O(n log n + m*log n)，其中 n 是数组长度，m 是数组最大值与最小值的差
     * 排序需要 O(n log n)
     * 统计原始频率需要 O(n)
     * 枚举目标值需要 O(m)，每次枚举需要两次二分查找 O(log n)
   - 空间复杂度：O(n)，哈希表存储每个数字的出现次数
   - 算法类型：枚举 + 二分查找 + 贪心

3. 解题思路：

   核心思想：
   - 对于任意目标值 target，如果一个元素 x 在 [target-k, target+k] 范围内，
     则可以通过一次操作将 x 转换为 target
   - 枚举所有可能的目标值，找到能够转换成该目标值的最大元素数量

   算法步骤：
   
   步骤1：排序数组
   - 对数组排序，便于后续使用二分查找找到可转换范围
   
   步骤2：统计原始频率
   - 使用哈希表记录每个数字在原数组中的出现次数
   - 如果不做任何操作，原始最大频率也是一个候选答案
   
   步骤3：枚举目标值
   - 遍历从 nums[0] 到 nums[n-1] 之间的所有整数作为目标值
   - 对于每个目标值 target：
     * 使用二分查找找到范围 [target-k, target+k] 内的所有元素
     * 如果 target 在原数组中存在，频率 = min(范围内元素数, 原有数量 + 操作次数)
     * 如果 target 不存在，频率 = min(范围内元素数, 操作次数)
   
   步骤4：返回最大频率

4. 实现要点：

   数据结构选择：
   - 哈希表：记录每个数字的原始出现次数，O(1) 查询
   - 排序数组：支持二分查找，快速定位可转换范围
   
   边界条件处理：
   - 空数组：题目保证 nums.length >= 1
   - numOperations = 0：只能使用原始频率
   - k = 0：元素无法改变，只能统计原始频率
   
   优化技巧：
   - 使用二分查找快速定位可转换范围，避免暴力遍历
   - 只枚举 [nums[0], nums[n-1]] 范围内的目标值，因为超出这个范围的目标值不可能获得更好的结果

5. 示例分析：

   示例1：nums = [1,4,5], k = 1, numOperations = 2
   
   排序后：[1,4,5]
   原始频率：{1: 1, 4: 1, 5: 1}，最大频率 = 1
   
   枚举目标值：
   - target = 1: 范围 [0,2]，包含 [1]，totalCnt = min(1, 1+2) = 1
   - target = 2: 范围 [1,3]，包含 [1]，totalCnt = min(1, 2) = 1（2不存在原数组）
   - target = 3: 范围 [2,4]，包含 [4]，totalCnt = min(1, 2) = 1
   - target = 4: 范围 [3,5]，包含 [4,5]，totalCnt = min(2, 1+2) = 2 ✓
   - target = 5: 范围 [4,6]，包含 [4,5]，totalCnt = min(2, 1+2) = 2 ✓
   
   最大频率 = 2
   
   实际操作：选择 target = 4
   - 保持 nums[1] = 4 不变（或 +0）
   - 将 nums[2] = 5 减 1 变成 4
   - 结果：[1, 4, 4]

   示例2：nums = [5,11,20,20], k = 5, numOperations = 1
   
   排序后：[5,11,20,20]
   原始频率：{5: 1, 11: 1, 20: 2}，最大频率 = 2
   
   枚举关键目标值：
   - target = 20: 范围 [15,25]，包含 [20,20]，totalCnt = min(2, 2+1) = 2
   - target = 11: 范围 [6,16]，包含 [5,11]，totalCnt = min(2, 1+1) = 2
   
   最大频率 = 2

6. 算法要点总结：

   核心技巧：
   - 枚举目标值 + 二分查找：有效计算可转换元素范围
   - 贪心策略：对于每个目标值，优先使用原有的数量，再使用操作次数
   
   优化要点：
   - 排序后使用二分查找，时间复杂度从 O(n) 降到 O(log n)
   - 只枚举数组范围内的目标值，减少不必要的计算
   
   类似问题：
   - LeetCode 1838: 最高频元素的频数（类似的频率优化问题）
   - LeetCode 2563: 统计公平数对的数目（二分查找统计范围）

7. 常见错误：

   错误1：没有考虑原始频率
   - 如果不操作，原始的最大频率也可能是答案
   
   错误2：枚举范围过大
   - 只需要枚举 [nums[0], nums[n-1]] 范围，超出范围不会获得更好的结果
   
   错误3：二分查找边界错误
   - leftBound 找第一个 >= target，rightBound 找最后一个 <= target
   - 需要注意 mid 的计算方式和边界更新逻辑

8. 扩展思考：

   变种问题：
   - 如果 k 可以对不同元素取不同值？需要更复杂的动态规划
   - 如果要求最小操作次数达到某个频率？可以使用二分答案
   
   优化空间：
   - 如果 m（最大值-最小值）很大，可以只枚举数组中实际出现的值及其相邻值
   - 使用离散化技术减少枚举范围
*/
