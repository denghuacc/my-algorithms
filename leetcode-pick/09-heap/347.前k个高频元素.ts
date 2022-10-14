/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前K个高频元素
 *
 * https://leetcode-cn.com/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (53.30%)
 * Total Accepted:    9.7K
 * Total Submissions: 17.7K
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 *
 * 示例 1:
 *
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 *
 *
 * 示例 2:
 *
 * 输入: nums = [1], k = 1
 * 输出: [1]
 *
 * 说明：
 *
 *
 * 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
 * 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
 *
 *
 */

// @lc code=start
// hash table
var topKFrequent = function (nums: number[], k: number): number[] {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  const sortMap = new Map([...map].sort((a, b) => b[1] - a[1]));
  const keyArr = Array.from(sortMap.keys());
  const ret = keyArr.slice(0, k);
  return ret;
};
// @lc code=end
