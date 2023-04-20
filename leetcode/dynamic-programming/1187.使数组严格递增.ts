/*
 * @lc app=leetcode.cn id=1187 lang=typescript
 *
 * [1187] 使数组严格递增
 *
 * https://leetcode.cn/problems/make-array-strictly-increasing/description/
 *
 * algorithms
 * Hard (48.27%)
 * Likes:    130
 * Dislikes: 0
 * Total Accepted:    5.3K
 * Total Submissions: 9.4K
 * Testcase Example:  '[1,5,3,6,7]\n[1,3,2,4]'
 *
 * 给你两个整数数组 arr1 和 arr2，返回使 arr1 严格递增所需要的最小「操作」数（可能为 0）。
 *
 * 每一步「操作」中，你可以分别从 arr1 和 arr2 中各选出一个索引，分别为 i 和 j，0 <= i < arr1.length 和 0 <= j
 * < arr2.length，然后进行赋值运算 arr1[i] = arr2[j]。
 *
 * 如果无法让 arr1 严格递增，请返回 -1。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
 * 输出：1
 * 解释：用 2 来替换 5，之后 arr1 = [1, 2, 3, 6, 7]。
 *
 *
 * 示例 2：
 *
 * 输入：arr1 = [1,5,3,6,7], arr2 = [4,3,1]
 * 输出：2
 * 解释：用 3 来替换 5，然后用 4 来替换 3，得到 arr1 = [1, 3, 4, 6, 7]。
 *
 *
 * 示例 3：
 *
 * 输入：arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
 * 输出：-1
 * 解释：无法使 arr1 严格递增。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr1.length, arr2.length <= 2000
 * 0 <= arr1[i], arr2[i] <= 10^9
 *
 *
 *
 *
 */

// @lc code=start
// dp cv
function makeArrayIncreasing(arr1: number[], arr2: number[]): number {
  const INF = 0x3f3f3f3f;
  arr2.sort((a, b) => a - b);
  const list: number[] = [];
  let prev = -1;
  for (const num of arr2) {
    if (num !== prev) {
      list.push(num);
      prev = num;
    }
  }
  const n = arr1.length;
  const m = list.length;
  // dp[i][j] 表示数组 arr1 中的前 i 个元素进行了 j 次替换后组成严格递增子数组末尾元素的最小值
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(Math.min(m, n) + 1).fill(INF)
  );
  dp[0][0] = -1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= Math.min(i, m); j++) {
      // 如果当前元素大于序列的最后一个元素
      if (arr1[i - 1] > dp[i - 1][j]) {
        dp[i][j] = arr1[i - 1];
      }
      if (j > 0 && dp[i - 1][j - 1] !== INF) {
        // 查找严格大于 dp[i - 1][j - 1] 的最小元素
        const idx = binarySearch(list, j - 1, dp[i - 1][j - 1]);
        if (idx !== list.length) {
          dp[i][j] = Math.min(dp[i][j], list[idx]);
        }
      }
      if (i === n && dp[i][j] !== INF) {
        return j;
      }
    }
  }
  return -1;

  function binarySearch(list: number[], low: number, target: number) {
    let high = list.length;
    while (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      if (list[mid] > target) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
}
// @lc code=end
