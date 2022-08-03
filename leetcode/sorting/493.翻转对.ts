/*
 * @lc app=leetcode.cn id=493 lang=typescript
 *
 * [493] 翻转对
 *
 * https://leetcode-cn.com/problems/reverse-pairs/description/
 *
 * algorithms
 * Hard (29.58%)
 * Likes:    214
 * Dislikes: 0
 * Total Accepted:    16.5K
 * Total Submissions: 52.6K
 * Testcase Example:  '[1,3,2,3,1]'
 *
 * 给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。
 *
 * 你需要返回给定数组中的重要翻转对的数量。
 *
 * 示例 1:
 *
 *
 * 输入: [1,3,2,3,1]
 * 输出: 2
 *
 *
 * 示例 2:
 *
 *
 * 输入: [2,4,3,5,1]
 * 输出: 3
 *
 *
 * 注意:
 *
 *
 * 给定数组的长度不会超过50000。
 * 输入数组中的所有数字都在32位整数的表示范围内。
 *
 *
 */

// @lc code=start
// merge sort
var reversePairs = function (nums: number[]): number {
  if (nums.length === 0) return 0;
  return reverse(nums, 0, nums.length - 1);

  function reverse(nums: number[], left: number, right: number): number {
    if (left === right) {
      return 0;
    } else {
      const mid = Math.floor((left + right) / 2);
      const n1 = reverse(nums, left, mid);
      const n2 = reverse(nums, mid + 1, right);
      let ret = n1 + n2;

      let i = left;
      let j = mid + 1;
      while (i <= mid) {
        while (j <= right && nums[i] > 2 * nums[j]) {
          j++;
        }
        ret += j - mid - 1;
        i++;
      }

      const sorted: number[] = new Array(right - left + 1);
      let p1 = left;
      let p2 = mid + 1;
      let p = 0;
      while (p1 <= mid || p2 <= right) {
        if (p1 > mid) {
          sorted[p++] = nums[p2++];
        } else if (p2 > right) {
          sorted[p++] = nums[p1++];
        } else {
          if (nums[p1] < nums[p2]) {
            sorted[p++] = nums[p1++];
          } else {
            sorted[p++] = nums[p2++];
          }
        }
      }
      for (let k = 0; k < sorted.length; k++) {
        nums[left + k] = sorted[k];
      }
      return ret;
    }
  }
};

// bit tree
class BIT {
  n: number;
  tree: number[];

  constructor(n: number) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }

  lowBit(x: number) {
    return x & -x;
  }

  update(x: number, d: number) {
    while (x <= this.n) {
      this.tree[x] += d;
      x += this.lowBit(x);
    }
  }

  query(x: number) {
    let ret = 0;
    while (x > 0) {
      ret += this.tree[x];
      x -= this.lowBit(x);
    }
    return ret;
  }
}

var reversePairs = function (nums: number[]): number {
  const allNumbers: number[] = Array.from(
    new Set([...nums, ...nums.map((x) => 2 * x)].sort((a, b) => a - b))
  );

  const values = new Map();
  let idx = 0;
  allNumbers.forEach((x) => values.set(x, ++idx));

  let ret = 0;
  const bit = new BIT(values.size);
  for (let i = 0; i < nums.length; i++) {
    const left = values.get(nums[i] * 2);
    const right = values.size;
    ret += bit.query(right) - bit.query(left);
    bit.update(values.get(nums[i]), 1);
  }
  return ret;
};
// @lc code=end
