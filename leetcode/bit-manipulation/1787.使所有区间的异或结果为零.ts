/*
 * @lc app=leetcode.cn id=1787 lang=typescript
 *
 * [1787] 使所有区间的异或结果为零
 *
 * https://leetcode-cn.com/problems/make-the-xor-of-all-segments-equal-to-zero/description/
 *
 * algorithms
 * Hard (58.06%)
 * Likes:    54
 * Dislikes: 0
 * Total Accepted:    3.2K
 * Total Submissions: 5.5K
 * Testcase Example:  '[1,2,0,3,0]\n1'
 *
 * 给你一个整数数组 nums​​​ 和一个整数 k​​​​​ 。区间 [left, right]（left ）的 异或结果 是对下标位于 left 和
 * right（包括 left 和 right ）之间所有元素进行 XOR 运算的结果：nums[left] XOR nums[left+1] XOR
 * ... XOR nums[right] 。
 *
 * 返回数组中 要更改的最小元素数 ，以使所有长度为 k 的区间异或结果等于零。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0,3,0], k = 1
 * 输出：3
 * 解释：将数组 [1,2,0,3,0] 修改为 [0,0,0,0,0]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,5,2,1,7,3,4,7], k = 3
 * 输出：3
 * 解释：将数组 [3,4,5,2,1,7,3,4,7] 修改为 [3,4,7,3,4,7,3,4,7]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,4,1,2,5,1,2,6], k = 3
 * 输出：3
 * 解释：将数组[1,2,4,1,2,5,1,2,6] 修改为 [1,2,3,1,2,3,1,2,3]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * ​​​​​​0
 *
 *
 */

// @lc code=start
// dp
function minChanges(nums: number[], k: number): number {
  // x 的范围为 [0, 2^10)
  const MAX_LENGTH = 2 ** 10;

  const n = nums.length;
  const f: number[] = new Array(MAX_LENGTH).fill(Number.MAX_VALUE);
  f[0] = 0;

  for (let i = 0; i < k; i++) {
    // 第 i 个组的哈希映射
    const count: Map<number, number> = new Map();
    let size = 0;
    for (let j = i; j < n; j += k) {
      count.has(nums[j])
        ? count.set(nums[j], count.get(nums[j])! + 1)
        : count.set(nums[j], 1);
      size++;
    }

    // 求出 t2
    const t2min = Math.min(...f);

    const g: number[] = new Array(MAX_LENGTH).fill(t2min);
    for (let mask = 0; mask < MAX_LENGTH; mask++) {
      // t1 则需要枚举 x 才能求出
      for (const [x, countX] of count.entries()) {
        g[mask] = Math.min(g[mask], f[mask ^ x] - countX);
      }
    }

    // 别忘了加上 size
    for (const [index, val] of g.entries()) {
      f[index] = val + size;
    }
  }

  return f[0];
}
// @lc code=end
