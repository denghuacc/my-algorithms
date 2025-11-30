/*
 * @lc app=leetcode.cn id=1590 lang=typescript
 *
 * [1590] 使数组和能被 P 整除
 *
 * https://leetcode.cn/problems/make-sum-divisible-by-p/description/
 *
 * algorithms
 * Medium (29.29%)
 * Likes:    112
 * Dislikes: 0
 * Total Accepted:    10.4K
 * Total Submissions: 31.8K
 * Testcase Example:  '[3,1,4,2]\n6'
 *
 * 给你一个正整数数组 nums，请你移除 最短 子数组（可以为 空），使得剩余元素的 和 能被 p 整除。 不允许 将整个数组都移除。
 *
 * 请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。
 *
 * 子数组 定义为原数组中连续的一组元素。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [3,1,4,2], p = 6
 * 输出：1
 * 解释：nums 中元素和为 10，不能被 p 整除。我们可以移除子数组 [4] ，剩余元素的和为 6 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [6,3,5,2], p = 9
 * 输出：2
 * 解释：我们无法移除任何一个元素使得和被 9 整除，最优方案是移除子数组 [5,2] ，剩余元素为 [6,3]，和为 9 。
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1,2,3], p = 3
 * 输出：0
 * 解释：和恰好为 6 ，已经能被 3 整除了。所以我们不需要移除任何元素。
 *
 *
 * 示例  4：
 *
 * 输入：nums = [1,2,3], p = 7
 * 输出：-1
 * 解释：没有任何方案使得移除子数组后剩余元素的和被 7 整除。
 *
 *
 * 示例 5：
 *
 * 输入：nums = [1000000000,1000000000,1000000000], p = 3
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^9
 * 1 <= p <= 10^9
 *
 *
 */

// @lc code=start
/**
 * 查找需要移除的最短子数组，使剩余元素和可被 p 整除。
 *
 * @param nums - 正整数数组，长度范围 [1, 1e5]
 * @param p - 取模值，范围 [1, 1e9]
 * @returns 需要移除的最短子数组长度；无法满足时返回 -1
 */
function minSubarray(nums: number[], p: number): number {
  // 计算总和的模值 remainder，若本身能整除直接返回 0。
  let remainder = 0;
  for (const num of nums) {
    remainder = (remainder + num) % p;
  }
  if (remainder === 0) {
    return 0;
  }

  // 使用前缀和取模与哈希表定位：如果子数组和 % p = remainder，
  // 则 prefix[j] - prefix[i] 与 remainder 同余，等价于
  // prefix[i] % p = (prefix[j] - remainder + p) % p。
  const lastIndex: Map<number, number> = new Map();
  let prefix = 0;
  let shortest = nums.length;
  for (let i = 0; i < nums.length; i++) {
    // 先记录当前位置之前的前缀模值，保证区间长度计算正确。
    lastIndex.set(prefix, i);

    // 更新当前前缀模值。
    prefix = (prefix + nums[i]) % p;

    // 需要找到的前缀模值，使得移除 [storedIndex, i] 后余下和可整除。
    const need = (prefix - remainder + p) % p;
    if (lastIndex.has(need)) {
      shortest = Math.min(shortest, i - lastIndex.get(need)! + 1);
    }
  }

  // 未找到合法区间则返回 -1。
  return shortest === nums.length ? -1 : shortest;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 目标是删除最短的连续子数组，使剩余元素和能被 p 整除。
   - 等价于找到一个子数组，其和与总和在模 p 意义下相等（和 % p = remainder）。
   - 不能移除整段数组，否则无解。

2. 算法分析：
   - 时间复杂度：O(n)，单次遍历配合哈希表查询需要的前缀模值。
   - 空间复杂度：O(n)，记录前缀模值到最近下标的映射。
   - 算法类型：前缀和 + 同余性质 + 哈希表。

3. 解题思路：
   - 核心思想：若 prefix[j] - prefix[i] 与 remainder 同余，则移除区间 [i, j] 即可。
     转化为寻找 prefix[i] % p = (prefix[j] - remainder + p) % p 的最短区间。
   - 推导过程：同余的减法仍保持模关系，先减 remainder 后加 p 再取模避免负数。
   - 主要步骤：
     1）计算总和模值 remainder，若为 0 直接返回 0。
     2）遍历数组，维护当前前缀模值 prefix。
     3）查询 need = (prefix - remainder + p) % p 是否出现，更新最短长度。

4. 实现要点：
   - 哈希表存最近的前缀下标，保证得到最短可移除区间。
   - 先存旧前缀再更新当前前缀，避免长度计算偏移。
   - 通过 (x + p) % p 处理可能的负数取模，TypeScript 取模结果可能为负。
   - 若未更新答案则返回 -1，防止移除整段或无解的情况。

5. 示例分析：
   - [3,1,4,2], p=6：remainder=4，在 i=2 找到 need=2，对应子数组 [4] 长度 1。
   - [6,3,5,2], p=9：remainder=7，在 i=3 找到 need=5，移除 [5,2] 长度 2。
   - [1,2,3], p=7：remainder=6，遍历无匹配，返回 -1。

6. 常见错误：
   - 负模处理遗漏：计算 need 时不加 p 直接取模会得到负值，导致哈希表查询失败。
   - 插入顺序错误：若先更新前缀再存入，会使区间长度少 1。
   - 忽略 remainder 为 0 的早退出，导致本可返回 0 却继续计算。

7. 核心算法步骤：
   - 求总和模值 remainder。
   - 遍历维护前缀模值 prefix，查询 need 更新最短长度。
   - 找到则返回最短长度，否则返回 -1。
 */
