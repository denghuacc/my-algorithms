/*
 * @lc app=leetcode.cn id=3201 lang=typescript
 *
 * [3201] 找出有效子序列的最大长度 I
 *
 * https://leetcode.cn/problems/find-the-maximum-length-of-valid-subsequence-i/description/
 *
 * algorithms
 * Medium (38.70%)
 * Likes:    16
 * Dislikes: 0
 * Total Accepted:    8.1K
 * Total Submissions: 17.4K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个整数数组 nums。
 *
 * nums 的子序列 sub 的长度为 x ，如果其满足以下条件，则称其为 有效子序列：
 *
 *
 * (sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x
 * - 1]) % 2
 *
 *
 * 返回 nums 的 最长的有效子序列 的长度。
 *
 * 一个 子序列 指的是从原数组中删除一些元素（也可以不删除任何元素），剩余元素保持原来顺序组成的新数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： nums = [1,2,3,4]
 *
 * 输出： 4
 *
 * 解释：
 *
 * 最长的有效子序列是 [1, 2, 3, 4]。
 *
 *
 * 示例 2：
 *
 *
 * 输入： nums = [1,2,1,1,2,1,2]
 *
 * 输出： 6
 *
 * 解释：
 *
 * 最长的有效子序列是 [1, 2, 1, 2, 1, 2]。
 *
 *
 * 示例 3：
 *
 *
 * 输入： nums = [1,3]
 *
 * 输出： 2
 *
 * 解释：
 *
 * 最长的有效子序列是 [1, 3]。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 2 * 10^5
 * 1 <= nums[i] <= 10^7
 *
 *
 */

// @lc code=start
function maximumLength(nums: number[]): number {
  let res = 0;

  // 定义四种有效的奇偶性模式：
  // [0, 0]: 全偶数序列 (偶+偶=偶，奇偶性一致)
  // [0, 1]: 偶数开头的交替序列 (偶+奇=奇，奇+偶=奇，奇偶性一致)
  // [1, 0]: 奇数开头的交替序列 (奇+偶=奇，偶+奇=奇，奇偶性一致)
  // [1, 1]: 全奇数序列 (奇+奇=偶，奇偶性一致)
  const patterns = [
    [0, 0], // 全偶数模式
    [0, 1], // 偶奇交替模式
    [1, 0], // 奇偶交替模式
    [1, 1], // 全奇数模式
  ];

  // 对每种模式分别计算最长有效子序列长度
  for (const pattern of patterns) {
    let cnt = 0; // 当前模式下的子序列长度

    // 遍历原数组，贪心地构建当前模式的子序列
    for (const num of nums) {
      // 检查当前数字的奇偶性是否符合当前位置的期望
      // cnt % 2 表示当前子序列中下一个位置的索引（0或1）
      // pattern[cnt % 2] 表示该位置期望的奇偶性（0表示偶数，1表示奇数）
      if (num % 2 === pattern[cnt % 2]) {
        cnt++; // 符合期望，将该数字加入子序列
      }
    }

    // 更新全局最大长度
    res = Math.max(res, cnt);
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 有效子序列要求相邻元素和的奇偶性保持一致
   - 通过分析奇偶性运算规律，发现只有四种可能的有效模式

2. 算法分析：
   - 时间复杂度：O(n) - 对每种模式遍历一次数组，共4次遍历
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：贪心算法 + 模式匹配

3. 实现要点：

   a) 奇偶性分析：
      - 偶数 + 偶数 = 偶数
      - 奇数 + 奇数 = 偶数  
      - 偶数 + 奇数 = 奇数
      - 奇数 + 偶数 = 奇数
   
   b) 四种有效模式：
      - 全偶数序列：[0,0] 表示所有位置都要求偶数
      - 全奇数序列：[1,1] 表示所有位置都要求奇数
      - 偶奇交替：[0,1] 表示偶数位置要求偶数，奇数位置要求奇数
      - 奇偶交替：[1,0] 表示偶数位置要求奇数，奇数位置要求偶数
   
   c) 贪心策略：
      - 对每种模式，从左到右扫描数组
      - 遇到符合当前位置期望奇偶性的数字就选择它
      - 这样能保证得到该模式下的最长子序列

   d) 模式编码技巧：
      - 使用 cnt % 2 来确定当前应该检查模式数组的哪个位置
      - pattern[cnt % 2] 给出了当前位置期望的奇偶性
      - 通过 num % 2 === pattern[cnt % 2] 来判断是否匹配

4. 优化思路：
   - 一次遍历计算所有模式：虽然代码看起来是4次遍历，但这是算法的本质需求
   - 贪心选择：在每种模式下都采用贪心策略，保证局部最优
   - 空间优化：不需要存储实际的子序列，只需要维护长度计数

5. 算法正确性证明：
   - 对于任意有效子序列，其奇偶性模式必然是这四种之一
   - 贪心策略保证在每种模式下都能找到最长的子序列
   - 取四种模式的最大值即为全局最优解

6. 示例验证：
   - nums = [1,2,3,4]
     * 全偶数: [2,4] → 长度2
     * 全奇数: [1,3] → 长度2  
     * 偶奇交替: [2,3] → 长度2
     * 奇偶交替: [1,2,3,4] → 长度4 ✓
   
   - nums = [1,2,1,1,2,1,2]  
     * 全偶数: [2,2,2] → 长度3
     * 全奇数: [1,1,1,1] → 长度4
     * 偶奇交替: [2,1,2,1,2] → 长度5
     * 奇偶交替: [1,2,1,2,1,2] → 长度6 ✓
*/
