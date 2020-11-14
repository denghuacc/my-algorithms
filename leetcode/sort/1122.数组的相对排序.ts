/*
 * @lc app=leetcode.cn id=1122 lang=typescript
 *
 * [1122] 数组的相对排序
 *
 * https://leetcode-cn.com/problems/relative-sort-array/description/
 *
 * algorithms
 * Easy (67.08%)
 * Likes:    100
 * Dislikes: 0
 * Total Accepted:    30.2K
 * Total Submissions: 44.2K
 * Testcase Example:  '[2,3,1,3,2,4,6,7,9,2,19]\n[2,1,4,3,9,6]'
 *
 * 给你两个数组，arr1 和 arr2，
 *
 *
 * arr2 中的元素各不相同
 * arr2 中的每个元素都出现在 arr1 中
 *
 *
 * 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1
 * 的末尾。
 *
 *
 *
 * 示例：
 *
 * 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
 * 输出：[2,2,2,1,4,3,3,9,6,7,19]
 *
 *
 *
 *
 * 提示：
 *
 *
 * arr1.length, arr2.length <= 1000
 * 0 <= arr1[i], arr2[i] <= 1000
 * arr2 中的元素 arr2[i] 各不相同
 * arr2 中的每个元素 arr2[i] 都出现在 arr1 中
 *
 *
 */

// @lc code=start
// custom sort
var relativeSortArray = function (arr1: number[], arr2: number[]): number[] {
  const ret: number[] = arr2.slice();
  const set: Set<number> = new Set(arr2);
  let i = 0;
  const tails: number[] = [];

  for (let i = 0; i < arr1.length; i++) {
    const num = arr1[i];
    if (ret.includes(num)) {
      const index = ret.indexOf(num);
      if (set.has(num)) {
        ret.splice(index, 1, num); // replace
        set.delete(num);
      } else {
        ret.splice(index, 0, num); // insert
      }
    } else {
      tails.push(num);
    }
  }

  return ret.concat(tails.sort((a, b) => a - b));
};

// custom sort 2
var relativeSortArray = function (arr1: number[], arr2: number[]): number[] {
  return arr1.sort((a, b) => {
    let ia = arr2.indexOf(a);
    let ib = arr2.indexOf(b);
    if (ia === -1 && ib === -1) {
      return a - b;
    } else if (ia === -1) {
      return 1; // do nothing
    } else if (ib === -1) {
      return -1; // swap
    } else {
      return ia - ib;
    }
  });
};

// counting sort
var relativeSortArray = function (arr1: number[], arr2: number[]): number[] {
  let upper = 0;
  for (const x of arr1) {
    upper = Math.max(upper, x);
  }
  let frequency: number[] = new Array(upper + 1).fill(0);
  for (const x of arr1) {
    ++frequency[x];
  }
  const ret: number[] = new Array(arr1.length);
  let index = 0;
  for (const x of arr2) {
    for (let i = 0; i < frequency[x]; i++) {
      ret[index++] = x;
    }
    frequency[x] = 0;
  }
  for (let i = 0; i <= upper; i++) {
    for (let j = 0; j < frequency[i]; j++) {
      ret[index++] = i;
    }
  }
  return ret;
};
// @lc code=end
