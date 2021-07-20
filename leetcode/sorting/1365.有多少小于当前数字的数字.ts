/*
 * @lc app=leetcode.cn id=1365 lang=typescript
 *
 * [1365] 有多少小于当前数字的数字
 *
 * https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/
 *
 * algorithms
 * Easy (81.94%)
 * Likes:    81
 * Dislikes: 0
 * Total Accepted:    34.1K
 * Total Submissions: 41.3K
 * Testcase Example:  '[8,1,2,2,3]'
 *
 * 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。
 *
 * 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。
 *
 * 以数组形式返回答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [8,1,2,2,3]
 * 输出：[4,0,1,1,3]
 * 解释：
 * 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。
 * 对于 nums[1]=1 不存在比它小的数字。
 * 对于 nums[2]=2 存在一个比它小的数字：（1）。
 * 对于 nums[3]=2 存在一个比它小的数字：（1）。
 * 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [6,5,4,8]
 * 输出：[2,1,0,3]
 *
 *
 * 示例 3：
 *
 * 输入：nums = [7,7,7,7]
 * 输出：[0,0,0,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 500
 * 0 <= nums[i] <= 100
 *
 *
 */

// @lc code=start
// brute force
var smallerNumbersThanCurrent = function (nums: number[]): number[] {
  const ret: number[] = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (nums[i] > nums[j]) {
        count++;
      }
    }
    ret.push(count);
  }
  return ret;
};

// quick sort
var smallerNumbersThanCurrent = function (nums: number[]): number[] {
  const n = nums.length;
  const data = Array.from(new Array(n), () => new Array(2).fill(0));
  for (let i = 0; i < n; i++) {
    data[i][0] = nums[i];
    data[i][1] = i;
  }

  data.sort((a, b) => a[0] - b[0]); // sort

  const ret: number[] = new Array(n).fill(0);
  let prev = -1;
  for (let i = 0; i < n; i++) {
    if (prev == -1 || (i > 0 && data[i][0] !== data[i - 1][0])) {
      prev = i;
    }
    ret[data[i][1]] = prev;
  }

  return ret;
};

// counting sort
var smallerNumbersThanCurrent = function (nums: number[]): number[] {
  const count = new Array(101).fill(0);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    count[nums[i]] += 1;
  }
  for (let i = 1; i <= 100; i++) {
    count[i] += count[i - 1];
  }
  const ret: number[] = [];
  for (let i = 0; i < n; i++) {
    ret.push(nums[i] ? count[nums[i] - 1] : 0);
  }
  return ret;
};
// @lc code=end
