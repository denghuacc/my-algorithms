/*
 * @lc app=leetcode.cn id=930 lang=typescript
 *
 * [930] 和相同的二元子数组
 *
 * https://leetcode-cn.com/problems/binary-subarrays-with-sum/description/
 *
 * algorithms
 * Medium (41.35%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    11.4K
 * Total Submissions: 23.8K
 * Testcase Example:  '[1,0,1,0,1]\n2'
 *
 * 给你一个二元数组 nums ，和一个整数 goal ，请你统计并返回有多少个和为 goal 的 非空 子数组。
 *
 * 子数组 是数组的一段连续部分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,1,0,1], goal = 2
 * 输出：4
 * 解释：
 * 如下面黑体所示，有 4 个满足题目要求的子数组：
 * [1,0,1,0,1]
 * [1,0,1,0,1]
 * [1,0,1,0,1]
 * [1,0,1,0,1]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,0,0,0,0], goal = 0
 * 输出：15
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 * 0
 *
 *
 */

// @lc code=start
// hash table
var numSubarraysWithSum = function (nums: number[], goal: number): number {
  const cnt: Map<number, number> = new Map();
  let ret = 0;
  let sum = 0;
  for (const num of nums) {
    cnt.set(sum, (cnt.get(sum) ?? 0) + 1);
    sum += num;
    ret += cnt.get(sum - goal) ?? 0;
  }
  return ret;
};

// sliding window
var numSubarraysWithSum = function (nums: number[], goal: number): number {
  let left1 = 0;
  let left2 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let n = nums.length;
  let ret = 0;

  for (let right = 0; right < n; right++) {
    const num = nums[right];
    sum1 += num;
    while (left1 <= right && sum1 > goal) {
      sum1 -= nums[left1];
      left1++;
    }
    sum2 += num;
    while (left2 <= right && sum2 >= goal) {
      sum2 -= nums[left2];
      left2++;
    }
    ret += left2 - left1;
  }

  return ret;
};
// @lc code=end
