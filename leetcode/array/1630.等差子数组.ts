/*
 * @lc app=leetcode.cn id=1630 lang=typescript
 *
 * [1630] 等差子数组
 *
 * https://leetcode.cn/problems/arithmetic-subarrays/description/
 *
 * algorithms
 * Medium (76.06%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    20.3K
 * Total Submissions: 26.1K
 * Testcase Example:  '[4,6,5,9,3,7]\n[0,0,2]\n[2,3,5]'
 *
 * 如果一个数列由至少两个元素组成，且每两个连续元素之间的差值都相同，那么这个序列就是 等差数列 。更正式地，数列 s
 * 是等差数列，只需要满足：对于每个有效的 i ， s[i+1] - s[i] == s[1] - s[0] 都成立。
 *
 * 例如，下面这些都是 等差数列 ：
 *
 * 1, 3, 5, 7, 9
 * 7, 7, 7, 7
 * 3, -1, -5, -9
 *
 * 下面的数列 不是等差数列 ：
 *
 * 1, 1, 2, 5, 7
 *
 * 给你一个由 n 个整数组成的数组 nums，和两个由 n 个整数组成的数组 l 和 r，后两个数组表示 n 组范围查询，其中第 i 个查询对应范围
 * [l[i], r[i]] 。所有数组的下标都是 从 0 开始 的。
 *
 * 返回 boolean 元素构成的答案列表 answer 。如果子数组 nums[l[i]], nums[l[i]+1], ... ,
 * nums[r[i]] 可以 重新排列 形成 等差数列 ，answer[i] 的值就是 true；否则answer[i] 的值就是 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [4,6,5,9,3,7], l = [0,0,2], r = [2,3,5]
 * 输出：[true,false,true]
 * 解释：
 * 第 0 个查询，对应子数组 [4,6,5] 。可以重新排列为等差数列 [6,5,4] 。
 * 第 1 个查询，对应子数组 [4,6,5,9] 。无法重新排列形成等差数列。
 * 第 2 个查询，对应子数组 [5,9,3,7] 。可以重新排列为等差数列 [3,5,7,9] 。
 *
 * 示例 2：
 *
 * 输入：nums = [-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], l = [0,1,6,4,8,7], r =
 * [4,4,9,7,9,10]
 * 输出：[false,true,false,false,true,true]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * n == l.length
 * n == r.length
 * 2 <= n <= 500
 * 1 <= n <= 500
 * 0 <= l[i] < r[i] < n
 * -10^5 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
// brute force
var checkArithmeticSubarrays = function (
  nums: number[],
  l: number[],
  r: number[]
): boolean[] {
  const n = l.length;
  const res: boolean[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const curNums = nums.slice(l[i], r[i] + 1);
    const b = isArithmeticSubarray(curNums);
    res[i] = b;
  }
  return res;

  function isArithmeticSubarray(nums: number[]) {
    const n = nums.length;
    if (n <= 2) {
      return true;
    }
    nums.sort((a, b) => a - b);
    const d = nums[1] - nums[0];
    for (let i = 1; i < n - 1; i++) {
      if (nums[i + 1] - nums[i] !== d) {
        return false;
      }
    }
    return true;
  }
};

var checkArithmeticSubarrays = function (
  nums: number[],
  l: number[],
  r: number[]
): boolean[] {
  const n = l.length;
  const res: boolean[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const left = l[i];
    const right = r[i];
    let minNum = nums[left];
    let maxNum = nums[left];
    for (let j = left + 1; j <= right; j++) {
      minNum = Math.min(minNum, nums[j]);
      maxNum = Math.max(maxNum, nums[j]);
    }
    if (minNum == maxNum) {
      res[i] = true;
      continue;
    }
    if ((maxNum - minNum) % (right - left) !== 0) {
      res[i] = false;
      continue;
    }
    const d = (maxNum - minNum) / (right - left);
    let flag = true;
    const seem = new Array(right - left + 1).fill(false);
    for (let j = left; j <= right; j++) {
      if ((nums[j] - minNum) % d !== 0) {
        flag = false;
        break;
      }
      const t = Math.floor((nums[j] - minNum) / d);
      if (seem[t]) {
        flag = false;
        break;
      }
      seem[t] = true;
    }
    res[i] = flag;
  }
  return res;
};
// @lc code=end
