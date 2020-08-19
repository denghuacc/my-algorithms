/*
 * @lc app=leetcode.cn id=410 lang=typescript
 *
 * [410] 分割数组的最大值
 *
 * https://leetcode-cn.com/problems/split-array-largest-sums/description/
 *
 * algorithms
 * Hard (34.79%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    8.9K
 * Total Submissions: 19.7K
 * Testcase Example:  '[7,2,5,10,8]\n2'
 *
 * 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。
 *
 * 注意:
 * 数组长度 n 满足以下条件:
 *
 *
 * 1 ≤ n ≤ 1000
 * 1 ≤ m ≤ min(50, n)
 *
 *
 * 示例:
 *
 *
 * 输入:
 * nums = [7,2,5,10,8]
 * m = 2
 *
 * 输出:
 * 18
 *
 * 解释:
 * 一共有四种方法将nums分割为2个子数组。
 * 其中最好的方式是将其分为[7,2,5] 和 [10,8]，
 * 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
 *
 *
 */

// @lc code=start
// dp
var splitArray = function (nums: number[], m: number): number {
  const n = nums.length;

  // dp[i][j] -> nums 的前 i 个数分割为 j 段所能得到的最大连续子数组和的最小值
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(m + 1).fill(Infinity)
  );

  // 前置和
  const sums: number[] = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }

  dp[0][0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(i, m); j++) {
      for (let k = 0; k < i; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          Math.max(dp[k][j - 1], sums[i] - sums[k])
        );
      }
    }
  }

  return dp[n][m];
};

// binary search + greedy
var splitArray = function (nums: number[], m: number): number {
  let left = 0;
  let right = 0;
  for (let i = 0; i < nums.length; i++) {
    right += nums[i];
    if (left < nums[i]) {
      left = nums[i];
    }
  }
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (check(nums, mid, m)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;

  function check(nums: number[], mid: number, m: number) {
    let sum = 0; // 当前分割子数组的和
    let cnt = 1; // 分割出的子数组的数量
    for (let i = 0; i < nums.length; i++) {
      if (sum + nums[i] > mid) {
        cnt++;
        sum = nums[i];
      } else {
        sum += nums[i];
      }
    }
    return cnt <= m;
  }
};
// @lc code=end
