/**
 * 
给定一个数组，包含从 1 到 N 所有的整数，但其中缺了两个数字。
你能在 O(N) 时间内只用 O(1) 的空间找到它们吗？
以任意顺序返回这两个数字均可。

示例 1:

输入: [1]
输出: [2,3]

示例 2:
输入: [2,3]
输出: [1,4]

提示：
nums.length <= 30000

难度：困难

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/missing-two-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 *
 */

// math
function missingTwo(nums: number[]): number[] {
  const n = nums.length + 2;
  let sum = nums.reduce((a, b) => a + b);
  const sumTwo = (n * (n + 1)) / 2 - sum;
  const limits = Math.floor(sumTwo / 2);
  sum = 0;
  for (const num of nums) {
    if (num <= limits) {
      sum += num;
    }
  }
  const one = (limits * (limits + 1)) / 2 - sum;
  return [one, sumTwo - one];
}
