/*
 * @lc app=leetcode.cn id=1442 lang=typescript
 *
 * [1442] 形成两个异或相等数组的三元组数目
 *
 * https://leetcode-cn.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/description/
 *
 * algorithms
 * Medium (78.84%)
 * Likes:    141
 * Dislikes: 0
 * Total Accepted:    27.8K
 * Total Submissions: 35.3K
 * Testcase Example:  '[2,3,1,6,7]'
 *
 * 给你一个整数数组 arr 。
 *
 * 现需要从数组中取三个下标 i、j 和 k ，其中 (0 <= i < j <= k < arr.length) 。
 *
 * a 和 b 定义如下：
 *
 *
 * a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
 * b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
 *
 *
 * 注意：^ 表示 按位异或 操作。
 *
 * 请返回能够令 a == b 成立的三元组 (i, j , k) 的数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [2,3,1,6,7]
 * 输出：4
 * 解释：满足题意的三元组分别是 (0,1,2), (0,2,2), (2,3,4) 以及 (2,4,4)
 *
 *
 * 示例 2：
 *
 * 输入：arr = [1,1,1,1,1]
 * 输出：10
 *
 *
 * 示例 3：
 *
 * 输入：arr = [2,3]
 * 输出：0
 *
 *
 * 示例 4：
 *
 * 输入：arr = [1,3,5,7,9]
 * 输出：3
 *
 *
 * 示例 5：
 *
 * 输入：arr = [7,11,12,9,5,2,7,17,22]
 * 输出：8
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 300
 * 1 <= arr[i] <= 10^8
 *
 *
 */

// @lc code=start
// three traverse
var countTriplets = function (arr: number[]): number {
  const n = arr.length;

  const sum: number[] = [0];
  for (const num of arr) {
    sum.push(sum[sum.length - 1] ^ num);
  }

  let ret = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j; k < n; k++) {
        if (sum[i] === sum[k + 1]) {
          ret++;
        }
      }
    }
  }

  return ret;
};

// two traverse
var countTriplets = function (arr: number[]): number {
  const n = arr.length;
  let ret = 0;

  for (let i = 0; i < n - 1; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum ^= arr[j];
      if (sum === 0 && j > i) {
        ret += j - i;
      }
    }
  }

  return ret;
};

// one traverse
var countTriplets = function (arr: number[]): number {
  let ret = 0;
  let s = 0;
  const cnt: Map<number, number> = new Map();
  const total: Map<number, number> = new Map();

  for (const [k, val] of arr.entries()) {
    const t = s ^ val;
    if (cnt.has(t)) {
      ret += cnt.get(t)! * k - total.get(t)!;
    }
    cnt.set(s, (cnt.get(s) ?? 0) + 1);
    total.set(s, (total.get(s) ?? 0) + k);
    s = t;
  }

  return ret;
};
// @lc code=end
