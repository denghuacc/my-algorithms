/*
 * @lc app=leetcode.cn id=220 lang=typescript
 *
 * [220] 存在重复元素 III
 *
 * https://leetcode-cn.com/problems/contains-duplicate-iii/description/
 *
 * algorithms
 * Medium (26.47%)
 * Likes:    272
 * Dislikes: 0
 * Total Accepted:    27.3K
 * Total Submissions: 103.2K
 * Testcase Example:  '[1,2,3,1]\n3\n0'
 *
 * 在整数数组 nums 中，是否存在两个下标 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值小于等于 t ，且满足 i 和 j
 * 的差的绝对值也小于等于 ķ 。
 *
 * 如果存在则返回 true，不存在返回 false。
 *
 *
 *
 * 示例 1:
 *
 * 输入: nums = [1,2,3,1], k = 3, t = 0
 * 输出: true
 *
 * 示例 2:
 *
 * 输入: nums = [1,0,1,1], k = 1, t = 2
 * 输出: true
 *
 * 示例 3:
 *
 * 输入: nums = [1,5,9,1,5,9], k = 2, t = 3
 * 输出: false
 *
 */

// @lc code=start

/**
 * 方法一：暴力搜索
 *
 * 算法思路：
 * 1. 双重循环遍历所有可能的数对
 * 2. 检查每对数字是否同时满足索引距离和数值差距的条件
 * 3. 一旦找到满足条件的数对就返回true
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
var containsNearbyAlmostDuplicate = function (
  nums: number[],
  k: number,
  t: number
): boolean {
  const n = nums.length;

  // 遍历所有可能的数对
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 检查数值差距和索引距离是否都满足条件
      if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k) {
        return true;
      }
    }
  }
  return false;
};

/**
 * 方法二：桶排序优化
 *
 * 算法思路：
 * 1. 将数值范围划分为大小为(t+1)的桶
 * 2. 如果两个数在同一个桶中，它们的差值必定≤t
 * 3. 如果两个数在相邻桶中，需要检查它们的差值是否≤t
 * 4. 使用滑动窗口维护大小为k的窗口
 *
 * 核心洞察：
 * - 桶大小设为w=t+1，确保同一桶内任意两数差值≤t
 * - 只需检查当前桶和相邻桶的情况
 * - 维护一个最多包含k+1个元素的哈希表
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(min(n,k))
 */
var containsNearbyAlmostDuplicate = function (
  nums: number[],
  k: number,
  t: number
): boolean {
  const n = nums.length;
  if (t < 0) return false; // 数值差距不能为负数

  const bucketMap: Map<number, number> = new Map(); // 桶ID -> 桶中的数值
  const bucketSize = t + 1; // 桶的大小

  for (let i = 0; i < n; i++) {
    const bucketId = getBucketId(nums[i], bucketSize);

    // 情况1：当前桶已有元素，说明存在差值≤t的数对
    if (bucketMap.has(bucketId)) {
      return true;
    }

    // 情况2：检查相邻桶是否有差值≤t的元素
    // 检查左相邻桶
    if (
      bucketMap.has(bucketId - 1) &&
      Math.abs(nums[i] - bucketMap.get(bucketId - 1)!) <= t
    ) {
      return true;
    }

    // 检查右相邻桶
    if (
      bucketMap.has(bucketId + 1) &&
      Math.abs(nums[i] - bucketMap.get(bucketId + 1)!) <= t
    ) {
      return true;
    }

    // 将当前元素加入对应的桶
    bucketMap.set(bucketId, nums[i]);

    // 维护滑动窗口：移除超出窗口k范围的元素
    if (i >= k) {
      const oldBucketId = getBucketId(nums[i - k], bucketSize);
      bucketMap.delete(oldBucketId);
    }
  }

  return false;

  /**
   * 计算数值x对应的桶ID
   * @param x 数值
   * @param bucketSize 桶的大小
   * @returns 桶ID
   */
  function getBucketId(x: number, bucketSize: number): number {
    // 处理负数的桶ID计算
    // 负数：需要向下调整避免桶ID冲突
    // 非负数：直接整除
    return x < 0
      ? Math.floor((x + 1) / bucketSize) - 1
      : Math.floor(x / bucketSize);
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断数组中是否存在满足条件的数对(i,j)
   - 条件1：|nums[i] - nums[j]| ≤ t (数值差距)
   - 条件2：|i - j| ≤ k (索引距离)

2. 算法分析：
   - 暴力方法：O(n²)时间，O(1)空间
   - 桶排序优化：O(n)时间，O(min(n,k))空间
   - 算法类型：滑动窗口 + 哈希表 + 桶排序思想

3. 桶排序核心思想：
   - 桶大小w = t + 1
   - 同一桶内任意两数差值必定≤t
   - 相邻桶之间可能存在差值≤t的数对
   - 非相邻桶之间数值差必定>t

4. 桶ID计算的关键点：
   - 正数：bucketId = floor(x / w)
   - 负数：bucketId = floor((x+1) / w) - 1
   - 负数特殊处理是为了避免-1和0被分到同一桶

5. 滑动窗口维护：
   - 保持窗口大小不超过k
   - 当i >= k时，移除nums[i-k]对应的桶
   - 确保任意时刻哈希表中的元素索引差都≤k

6. 算法优势：
   - 时间复杂度从O(n²)优化到O(n)
   - 空间复杂度最多O(k)，通常远小于n
   - 巧妙利用桶排序思想避免了复杂的范围查询

7. 边界情况：
   - t < 0：不可能存在满足条件的数对
   - k = 0：只能比较相同位置，必定false
   - 数组长度≤1：不存在两个不同的元素

8. 相关问题：
   - 存在重复元素 I：判断是否有重复
   - 存在重复元素 II：判断重复元素索引距离≤k
   - 存在重复元素 III：当前问题（数值距离≤t且索引距离≤k）
*/
