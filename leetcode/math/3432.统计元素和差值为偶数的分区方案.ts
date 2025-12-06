/*
 * @lc app=leetcode.cn id=3432 lang=typescript
 *
 * [3432] 统计元素和差值为偶数的分区方案
 *
 * https://leetcode.cn/problems/count-partitions-with-even-sum-difference/description/
 *
 * algorithms
 * Easy (76.82%)
 * Likes:    120
 * Dislikes: 4
 * Total Accepted:    61.2K
 * Total Submissions: 79.9K
 * Testcase Example:  '[10,10,3,7,6]'
 *
 * 给你一个长度为 n 的整数数组 nums。
 *
 * 分割点定义为满足 0 <= i < n - 1 的下标 i，把数组拆成两个非空子数组：
 *
 *
 * 左子数组包含下标 [0, i]。
 * 右子数组包含下标 [i + 1, n - 1]。
 *
 *
 * 请你返回使得左右子数组元素和的差值为偶数的分割点数量。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,10,3,7,6]
 *
 * 输出：4
 *
 * 解释：
 *
 * 共有 4 个满足条件的分割点：
 *
 *
 * [10], [10, 3, 7, 6]，差值 10 - 26 = -16（偶数）。
 * [10, 10], [3, 7, 6]，差值 20 - 16 = 4（偶数）。
 * [10, 10, 3], [7, 6]，差值 23 - 13 = 10（偶数）。
 * [10, 10, 3, 7], [6]，差值 30 - 6 = 24（偶数）。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,2]
 *
 * 输出：0
 *
 * 解释：
 *
 * 没有任何分割点能得到偶数差值。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [2,4,6,8]
 *
 * 输出：3
 *
 * 解释：
 *
 * 所有分割点都能得到偶数差值。
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n == nums.length <= 100
 * 1 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
/**
 * 方法一：前缀和枚举分割点，直接判断差值奇偶性。
 *
 * @param nums - 输入数组
 * @returns 满足偶数差值的分割点数量
 */
var countPartitions = function (nums: number[]): number {
  const n = nums.length;
  let sum = 0;
  const prefixSum: number[] = new Array(n).fill(0);

  // 计算总和和前缀和
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    prefixSum[i] = sum;
  }

  let cnt = 0;
  // 枚举所有可能的分割点
  for (let i = 0; i < n - 1; i++) {
    const leftSum = prefixSum[i];
    const rightSum = sum - leftSum;
    // 差值为偶数等价于左右和同奇偶
    if ((leftSum - rightSum) % 2 === 0) {
      cnt++;
    }
  }

  return cnt;
};

/**
 * 方法二：数学。总和为偶，所有分割点都满足；总和为奇，全部不满足。
 *
 * @param nums - 输入数组
 * @returns 满足偶数差值的分割点数量
 */
var countPartitions = function (nums: number[]): number {
  const sum = nums.reduce((acc, cur) => acc + cur, 0); // 数组总和
  // 总和为偶：任意分割点左右和同奇偶性，全部满足；否则均不满足
  return sum % 2 === 0 ? nums.length - 1 : 0;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 需要统计左右子数组和差值为偶数的分割点，等价于左右和奇偶性
     相同。
   - 左右和的奇偶性由总和决定：total = left + right。

2. 关键观察：
   - 若 total 为偶数，则 right 与 left 奇偶性相同（偶减偶或奇减奇），所有
     分割点都满足条件。
   - 若 total 为奇数，则 right 与 left 奇偶性相反（奇减偶或偶减奇），任意
     分割点都不满足。

3. 双解法：
   - 方法一（前缀和枚举）：求前缀和，枚举每个分割点，判断 (left - right)
     的奇偶性。时间 O(n)，空间 O(n)。
   - 方法二（数学）：利用总和奇偶性一刀切。总和为偶，则答案为 n - 1；
     为奇，则答案为 0。时间 O(n)，空间 O(1)。

4. 复杂度分析：
   - 方法一：时间 O(n)，空间 O(n)。
   - 方法二：时间 O(n)，空间 O(1)。

5. 示例验证：
   - [10,10,3,7,6] 总和 36 为偶，分割点 4 个，方法二直接给出 4。
   - [1,2,2] 总和 5 为奇，返回 0。
   - [2,4,6,8] 总和 20 为偶，分割点 3 个。

6. 常见错误：
   - 逐一枚举分割点导致多余的 O(n^2) 计算。
   - 忽略总和奇偶性的决定作用，未及时剪枝。
*/
