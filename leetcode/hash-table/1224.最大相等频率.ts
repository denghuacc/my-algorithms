/*
 * @lc app=leetcode.cn id=1224 lang=typescript
 *
 * [1224] 最大相等频率
 *
 * https://leetcode.cn/problems/maximum-equal-frequency/description/
 *
 * algorithms
 * Hard (33.47%)
 * Likes:    94
 * Dislikes: 0
 * Total Accepted:    9.3K
 * Total Submissions: 23.7K
 * Testcase Example:  '[2,2,1,1,5,3,3,5]'
 *
 * 给你一个正整数数组 nums，请你帮忙从该数组中找出能满足下面要求的 最长 前缀，并返回该前缀的长度：
 *
 *
 * 从前缀中 恰好删除一个 元素后，剩下每个数字的出现次数都相同。
 *
 *
 * 如果删除这个元素后没有剩余元素存在，仍可认为每个数字都具有相同的出现次数（也就是 0 次）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,2,1,1,5,3,3,5]
 * 输出：7
 * 解释：对于长度为 7 的子数组 [2,2,1,1,5,3,3]，如果我们从中删去 nums[4] = 5，就可以得到
 * [2,2,1,1,3,3]，里面每个数字都出现了两次。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
 * 输出：13
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
// hash-table cv
function maxEqualFreq(nums: number[]): number {
  const n = nums.length;
  const freq: Map<number, number> = new Map();
  const count: Map<number, number> = new Map();
  let res = 0;
  let maxFreq = 0;

  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (count.has(num)) {
      freq.set(count.get(num)!, (freq.get(count.get(num)!) ?? 0) - 1);
    }
    count.set(num, (count.get(num) ?? 0) + 1);
    maxFreq = Math.max(maxFreq, count.get(num)!);
    freq.set(count.get(num)!, (freq.get(count.get(num)!) ?? 0) + 1);

    // 1. 最大出现次数 maxFreq 为 1，那么所有数的出现次数都是一次，随意删除一个数既可符合要求。
    // 2. 所有数的出现次数都是 maxFreq 或者 maxFreq−1，并且最大出现次数的数只有一个：
    // 删除一个最大出现次数的数，那么所有数的出现次数都是 maxFreq−1。
    // 3. 除开一个数，其他所有数的出现次数都是 maxFreq，并且该数的出现次数为 1：
    // 直接删除出现次数为 1 的数，那么所有数的出现次数都是 maxFreq。
    const ok =
      // condition1
      maxFreq === 1 ||
      // condition2
      (freq.get(maxFreq)! * maxFreq + freq.get(maxFreq - 1)! * (maxFreq - 1) ===
        i + 1 &&
        freq.get(maxFreq) === 1) ||
      // condition3
      (freq.get(maxFreq)! * maxFreq + 1 === i + 1 && freq.get(1) === 1);

    if (ok) {
      res = Math.max(res, i + 1);
    }
  }

  return res;
}
// @lc code=end
