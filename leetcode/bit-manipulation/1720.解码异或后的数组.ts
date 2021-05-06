/*
 * @lc app=leetcode.cn id=1720 lang=typescript
 *
 * [1720] 解码异或后的数组
 *
 * https://leetcode-cn.com/problems/decode-xored-array/description/
 *
 * algorithms
 * Easy (87.00%)
 * Likes:    29
 * Dislikes: 0
 * Total Accepted:    17.2K
 * Total Submissions: 19.7K
 * Testcase Example:  '[1,2,3]\n1'
 *
 * 未知 整数数组 arr 由 n 个非负整数组成。
 *
 * 经编码后变为长度为 n - 1 的另一个整数数组 encoded ，其中 encoded[i] = arr[i] XOR arr[i + 1]
 * 。例如，arr = [1,0,2,1] 经编码后得到 encoded = [1,2,3] 。
 *
 * 给你编码后的数组 encoded 和原数组 arr 的第一个元素 first（arr[0]）。
 *
 * 请解码返回原数组 arr 。可以证明答案存在并且是唯一的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：encoded = [1,2,3], first = 1
 * 输出：[1,0,2,1]
 * 解释：若 arr = [1,0,2,1] ，那么 first = 1 且 encoded = [1 XOR 0, 0 XOR 2, 2 XOR 1] =
 * [1,2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：encoded = [6,2,7,3], first = 4
 * 输出：[4,2,0,7,4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * encoded.length == n - 1
 * 0
 * 0
 *
 *
 */

// @lc code=start
// bit manipulation
function decode(encoded: number[], first: number): number[] {
  const ret: number[] = [first];
  const n = encoded.length + 1;
  for (let i = 1; i < n; i++) {
    const num = ret[i - 1] ^ encoded[i - 1];
    ret.push(num);
  }
  return ret;
}
// @lc code=end
