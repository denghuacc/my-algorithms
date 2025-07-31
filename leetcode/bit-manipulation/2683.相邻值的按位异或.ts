/*
 * @lc app=leetcode.cn id=2683 lang=typescript
 *
 * [2683] 相邻值的按位异或
 *
 * https://leetcode.cn/problems/neighboring-bitwise-xor/description/
 *
 * algorithms
 * Medium (73.86%)
 * Likes:    34
 * Dislikes: 0
 * Total Accepted:    14.4K
 * Total Submissions: 18.4K
 * Testcase Example:  '[1,1,0]'
 *
 * 下标从 0 开始、长度为 n 的数组 derived 是由同样长度为 n 的原始 二进制数组 original 通过计算相邻值的
 * 按位异或（⊕）派生而来。
 *
 * 特别地，对于范围 [0, n - 1] 内的每个下标 i ：
 *
 *
 * 如果 i = n - 1 ，那么 derived[i] = original[i] ⊕ original[0]
 * 否则 derived[i] = original[i] ⊕ original[i + 1]
 *
 *
 * 给你一个数组 derived ，请判断是否存在一个能够派生得到 derived 的 有效原始二进制数组 original 。
 *
 * 如果存在满足要求的原始二进制数组，返回 true ；否则，返回 false 。
 *
 *
 * 二进制数组是仅由 0 和 1 组成的数组。
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：derived = [1,1,0]
 * 输出：true
 * 解释：能够派生得到 [1,1,0] 的有效原始二进制数组是 [0,1,0] ：
 * derived[0] = original[0] ⊕ original[1] = 0 ⊕ 1 = 1
 * derived[1] = original[1] ⊕ original[2] = 1 ⊕ 0 = 1
 * derived[2] = original[2] ⊕ original[0] = 0 ⊕ 0 = 0
 *
 *
 * 示例 2：
 *
 * 输入：derived = [1,1]
 * 输出：true
 * 解释：能够派生得到 [1,1] 的有效原始二进制数组是 [0,1] ：
 * derived[0] = original[0] ⊕ original[1] = 1
 * derived[1] = original[1] ⊕ original[0] = 1
 *
 *
 * 示例 3：
 *
 * 输入：derived = [1,0]
 * 输出：false
 * 解释：不存在能够派生得到 [1,0] 的有效原始二进制数组。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == derived.length
 * 1 <= n <= 10^5
 * derived 中的值不是 0 就是 1 。
 *
 *
 */

export {};

// @lc code=start
/**
 * 判断是否存在有效的原始二进制数组
 *
 * 核心思路：利用异或运算的性质，所有derived数组元素的异或和必须为0
 *
 * @param derived - 派生数组
 * @returns 是否存在有效的原始数组
 */
function doesValidArrayExist(derived: number[]): boolean {
  // 计算所有derived数组元素的异或和
  let xorSum = 0;
  for (const num of derived) {
    xorSum ^= num;
  }

  // 如果异或和为0，说明存在有效的原始数组；否则不存在
  return xorSum === 0;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定一个派生数组derived，判断是否存在原始二进制数组original
   - derived[i] = original[i] ⊕ original[i+1] (i < n-1)
   - derived[n-1] = original[n-1] ⊕ original[0]
   - 需要判断这个方程组是否有解

2. 算法分析：
   - 时间复杂度：O(n)，其中n是derived数组的长度
   - 空间复杂度：O(1)，只使用了常数空间
   - 算法类型：数学推理 + 异或运算

3. 实现要点：
   - 利用异或运算的性质：a ⊕ a = 0，a ⊕ 0 = a
   - 所有derived元素的异或和必须为0
   - 这是一个充分必要条件

4. 优化思路：
   - 算法已经是最优的，无法进一步优化
   - 代码简洁明了，易于理解

证明过程：

**充分性证明**：如果derived数组的异或和为0，则存在有效的original数组

设derived = [d0, d1, d2, ..., dn-1]，我们需要证明：
d0 ⊕ d1 ⊕ d2 ⊕ ... ⊕ dn-1 = 0 是存在original数组的充分条件。

根据题目定义：
- d0 = o0 ⊕ o1
- d1 = o1 ⊕ o2  
- d2 = o2 ⊕ o3
- ...
- dn-2 = on-2 ⊕ on-1
- dn-1 = on-1 ⊕ o0

将所有这些等式进行异或：
d0 ⊕ d1 ⊕ d2 ⊕ ... ⊕ dn-1 = (o0 ⊕ o1) ⊕ (o1 ⊕ o2) ⊕ (o2 ⊕ o3) ⊕ ... ⊕ (on-2 ⊕ on-1) ⊕ (on-1 ⊕ o0)

利用异或的结合律和交换律：
= o0 ⊕ o1 ⊕ o1 ⊕ o2 ⊕ o2 ⊕ o3 ⊕ ... ⊕ on-2 ⊕ on-1 ⊕ on-1 ⊕ o0
= (o0 ⊕ o0) ⊕ (o1 ⊕ o1) ⊕ (o2 ⊕ o2) ⊕ ... ⊕ (on-1 ⊕ on-1)
= 0 ⊕ 0 ⊕ 0 ⊕ ... ⊕ 0 = 0

因此，如果存在有效的original数组，那么derived数组的异或和必须为0。

**必要性证明**：如果derived数组的异或和为0，则存在有效的original数组

当derived数组的异或和为0时，我们可以构造一个有效的original数组：

设original[0] = 0（可以任意设定，这里设为0），然后根据derived数组依次计算：
- original[1] = original[0] ⊕ derived[0] = 0 ⊕ d0 = d0
- original[2] = original[1] ⊕ derived[1] = d0 ⊕ d1  
- original[3] = original[2] ⊕ derived[2] = (d0 ⊕ d1) ⊕ d2 = d0 ⊕ d1 ⊕ d2
- ...
- original[n-1] = original[n-2] ⊕ derived[n-2] = d0 ⊕ d1 ⊕ ... ⊕ dn-2

现在验证最后一个等式是否成立：
derived[n-1] = original[n-1] ⊕ original[0] = (d0 ⊕ d1 ⊕ ... ⊕ dn-2) ⊕ 0 = d0 ⊕ d1 ⊕ ... ⊕ dn-2

由于derived数组的异或和为0，即：
d0 ⊕ d1 ⊕ d2 ⊕ ... ⊕ dn-1 = 0

所以：
d0 ⊕ d1 ⊕ ... ⊕ dn-2 = dn-1

这正是我们构造的original[n-1] ⊕ original[0]的结果，因此构造是有效的。

**结论**：derived数组的异或和为0是存在有效original数组的充分必要条件。
*/
