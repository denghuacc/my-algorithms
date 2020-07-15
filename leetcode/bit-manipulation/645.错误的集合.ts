/*
 * @lc app=leetcode.cn id=645 lang=typescript
 *
 * [645] 错误的集合
 *
 * https://leetcode-cn.com/problems/set-mismatch/description/
 *
 * algorithms
 * Easy (33.69%)
 * Likes:    86
 * Dislikes: 0
 * Total Accepted:    12.8K
 * Total Submissions: 30.6K
 * Testcase Example:  '[1,2,2,4]'
 *
 * 集合 S 包含从1到 n
 * 的整数。不幸的是，因为数据错误，导致集合里面某一个元素复制了成了集合里面的另外一个元素的值，导致集合丢失了一个整数并且有一个元素重复。
 *
 * 给定一个数组 nums 代表了集合 S 发生错误后的结果。你的任务是首先寻找到重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,2,4]
 * 输出: [2,3]
 *
 *
 * 注意:
 *
 *
 * 给定数组的长度范围是 [2, 10000]。
 * 给定的数组是无序的。
 *
 *
 */

// @lc code=start
var findErrorNums = function (nums: number[]): number[] {
  let [dup, missing] = [-1, -1];
  for (let i = 0; i <= nums.length; i++) {
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === i) {
        count++;
      }
    }
    if (count === 2) {
      dup = i;
    } else if (count === 0) {
      missing = i;
    }

    // optimization
    if (dup > 0 && missing > 0) break;
  }
  return [dup, missing];
};

// sorted
var findErrorNums = function (nums: number[]): number[] {
  nums.sort((a, b) => a - b);
  let [dup, missing] = [-1, 1]; // missing = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      dup = nums[i];
    } else if (nums[i] > nums[i - 1] + 1) {
      missing = nums[i - 1] + 1;
    }
  }

  return [dup, nums[nums.length - 1] !== nums.length ? nums.length : missing];
};

// map
var findErrorNums = function (nums: number[]): number[] {
  const map = new Map<number, number>();
  let [dup, missing] = [-1, -1];

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (let i = 1; i <= nums.length; i++) {
    if (map.has(i)) {
      if (map.get(i) === 2) {
        dup = i;
      }
    } else {
      missing = i;
    }
  }

  return [dup, missing];
};

// array
var findErrorNums = function (nums: number[]): number[] {
  const arr = new Array<number>(nums.length + 1).fill(0);
  let [dup, missing] = [-1, -1];
  for (const num of nums) {
    arr[num] += 1;
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === 0) {
      missing = i;
    } else if (arr[i] === 2) {
      dup = i;
    }
  }

  return [dup, missing];
};

var findErrorNums = function (nums: number[]): number[] {
  let [dup, missing] = [-1, 1]; // missing = 1
  for (const num of nums) {
    if (nums[Math.abs(num) - 1] < 0) {
      dup = Math.abs(num);
    } else {
      nums[Math.abs(num) - 1] *= -1;
    }
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > 0) {
      missing = i + 1;
    }
  }

  return [dup, missing];
};

// bit manipulation
var findErrorNums = function (nums: number[]): number[] {
  let [xor, xor0, xor1] = [0, 0, 0];

  for (const num of nums) {
    xor ^= num;
  }

  for (let i = 1; i <= nums.length; i++) {
    xor ^= i;
  }

  let rightMostBit = xor & ~(xor - 1);
  for (const num of nums) {
    if ((num & rightMostBit) !== 0) {
      xor1 ^= num;
    } else {
      xor0 ^= num;
    }
  }

  for (let i = 1; i <= nums.length; i++) {
    if ((i & rightMostBit) !== 0) {
      xor1 ^= i;
    } else {
      xor0 ^= i;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === xor0) {
      return [xor0, xor1];
    }
  }

  return [xor1, xor0];
};
// @lc code=end
