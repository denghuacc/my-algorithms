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
// counting sort
var relativeSortArray = function (arr1: number[], arr2: number[]): number[] {
  const counts = new Array(1001).fill(0);
  for (const num of arr1) {
    counts[num]++;
  }
  let idx = 0;
  for (const num of arr2) {
    while (counts[num] > 0) {
      arr1[idx++] = num;
      counts[num]--;
    }
  }
  for (let i = 0; i < counts.length; i++) {
    while (counts[i] > 0) {
      arr1[idx++] = i;
      counts[i]--;
    }
  }
  return arr1;
};
// @lc code=end
