/*
 * @lc app=leetcode.cn id=954 lang=typescript
 *
 * [954] 二倍数对数组
 *
 * https://leetcode-cn.com/problems/array-of-doubled-pairs/description/
 *
 * algorithms
 * Medium (30.95%)
 * Likes:    111
 * Dislikes: 0
 * Total Accepted:    18K
 * Total Submissions: 49.8K
 * Testcase Example:  '[3,1,3,6]'
 *
 * 给定一个长度为偶数的整数数组 arr，只有对 arr 进行重组后可以满足 “对于每个 0 <= i < len(arr) / 2，都有 arr[2 *
 * i + 1] = 2 * arr[2 * i]” 时，返回 true；否则，返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [3,1,3,6]
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr = [2,1,2,6]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr = [4,-2,2,-4]
 * 输出：true
 * 解释：可以用 [-2,-4] 和 [2,4] 这两组组成 [-2,-4,2,4] 或是 [2,4,-2,-4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= arr.length <= 3 * 10^4
 * arr.length 是偶数
 * -10^5 <= arr[i] <= 10^5
 *
 *
 */

// @lc code=start
// hash table
function canReorderDoubled(arr: number[]): boolean {
  const cnt = new Map<number, number>();
  for (const x of arr) {
    cnt.set(x, (cnt.get(x) ?? 0) + 1);
  }
  if ((cnt.get(0) ?? 0) % 2 !== 0) {
    return false;
  }
  const values: number[] = [];
  for (const x of cnt.keys()) {
    values.push(x);
  }
  values.sort((a, b) => Math.abs(a) - Math.abs(b));
  for (const x of values) {
    if ((cnt.get(2 * x) ?? 0) < cnt.get(x)!) {
      return false;
    }
    cnt.set(2 * x, (cnt.get(2 * x) ?? 0) - cnt.get(x)!);
  }
  return true;
}
// @lc code=end
