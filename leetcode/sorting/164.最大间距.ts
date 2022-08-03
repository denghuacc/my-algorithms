/*
 * @lc app=leetcode.cn id=164 lang=typescript
 *
 * [164] 最大间距
 *
 * https://leetcode-cn.com/problems/maximum-gap/description/
 *
 * algorithms
 * Hard (55.19%)
 * Likes:    234
 * Dislikes: 0
 * Total Accepted:    23.5K
 * Total Submissions: 41.2K
 * Testcase Example:  '[3,6,9,1]'
 *
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 *
 * 如果数组元素个数小于 2，则返回 0。
 *
 * 示例 1:
 *
 * 输入: [3,6,9,1]
 * 输出: 3
 * 解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
 *
 * 示例 2:
 *
 * 输入: [10]
 * 输出: 0
 * 解释: 数组元素个数小于 2，因此返回 0。
 *
 * 说明:
 *
 *
 * 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
 * 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
 *
 *
 */

// @lc code=start
// API quick sort
var maximumGap = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return 0;
  nums.sort((a, b) => a - b);
  let ret = 0;
  for (let i = 1; i < n; i++) {
    if (nums[i] === nums[i - 1]) {
      i++;
      continue;
    }
    ret = Math.max(ret, nums[i] - nums[i - 1]);
  }
  return ret;
};

// counting sort
var maximumGap = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return 0;
  let exp = 1;
  const buf: number[] = new Array(n).fill(0);
  const maxVal = Math.max(...nums);

  while (maxVal >= exp) {
    const cnt = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(nums[i] / exp) % 10;
      cnt[digit]++;
    }
    for (let i = 1; i < 10; i++) {
      cnt[i] += cnt[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(nums[i] / exp) % 10;
      buf[cnt[digit] - 1] = nums[i];
      cnt[digit]--;
    }
    nums.splice(0, n, ...buf);
    exp *= 10;
  }

  let ret = 0;
  for (let i = 1; i < n; i++) {
    ret = Math.max(ret, nums[i] - nums[i - 1]);
  }
  return ret;
};

// bucket sort
var maximumGap = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return 0;
  const minVal = Math.min(...nums);
  const maxVal = Math.max(...nums);
  const d = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
  const bucketSize = Math.floor((maxVal - minVal) / d) + 1;

  const bucket: number[][] = Array.from(new Array(bucketSize), () =>
    new Array(2).fill(0)
  );

  for (let i = 0; i < bucketSize; i++) {
    bucket[i].fill(-1);
  }
  for (let i = 0; i < n; i++) {
    const idx = Math.floor((nums[i] - minVal) / d);
    if (bucket[idx][0] === -1) {
      bucket[idx][0] = bucket[idx][1] = nums[i];
    } else {
      bucket[idx][0] = Math.min(bucket[idx][0], nums[i]);
      bucket[idx][1] = Math.max(bucket[idx][1], nums[i]);
    }
  }

  let ret = 0;
  let prev = -1;
  for (let i = 0; i < bucketSize; i++) {
    if (bucket[i][0] == -1) {
      continue;
    }
    if (prev != -1) {
      ret = Math.max(ret, bucket[i][0] - bucket[prev][1]);
    }
    prev = i;
  }
  return ret;
};
// @lc code=end
