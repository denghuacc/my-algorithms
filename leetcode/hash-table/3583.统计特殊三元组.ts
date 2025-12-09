/*
 * @lc app=leetcode.cn id=3583 lang=typescript
 *
 * [3583] 统计特殊三元组
 *
 * https://leetcode.cn/problems/count-special-triplets/description/
 *
 * algorithms
 * Medium (37.28%)
 * Likes:    132
 * Dislikes: 6
 * Total Accepted:    33K
 * Total Submissions: 82.8K
 * Testcase Example:  '[6,3,6]'
 *
 * 给你一个整数数组 nums。
 *
 * 特殊三元组定义为下标三元组 (i, j, k)，满足：
 *
 *
 * 0 <= i < j < k < n，n = nums.length
 * nums[i] == nums[j] * 2
 * nums[k] == nums[j] * 2
 *
 *
 * 返回数组中的特殊三元组总数。答案可能很大，请对 10^9 + 7 取模。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [6,3,6]
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一的特殊三元组为 (i, j, k) = (0, 1, 2)，其中：
 *
 *
 * nums[0] = 6, nums[1] = 3, nums[2] = 6
 * nums[0] = nums[1] * 2 = 3 * 2 = 6
 * nums[2] = nums[1] * 2 = 3 * 2 = 6
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,0,0]
 *
 * 输出：1
 *
 * 解释：
 *
 * 唯一的特殊三元组为 (i, j, k) = (0, 2, 3)，其中：
 *
 *
 * nums[0] = 0, nums[2] = 0, nums[3] = 0
 * nums[0] = nums[2] * 2 = 0 * 2 = 0
 * nums[3] = nums[2] * 2 = 0 * 2 = 0
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [8,4,2,8,4]
 *
 * 输出：2
 *
 * 解释：
 *
 * 恰好有两个特殊三元组：
 *
 *
 * (i, j, k) = (0, 1, 3)
 *
 *
 * nums[0] = 8, nums[1] = 4, nums[3] = 8
 * nums[0] = nums[1] * 2 = 4 * 2 = 8
 * nums[3] = nums[1] * 2 = 4 * 2 = 8
 *
 *
 * (i, j, k) = (1, 2, 4)
 *
 * nums[1] = 4, nums[2] = 2, nums[4] = 4
 * nums[1] = nums[2] * 2 = 2 * 2 = 4
 * nums[4] = nums[2] * 2 = 2 * 2 = 4
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= n == nums.length <= 10^5
 * 0 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * 枚举 j，统计左侧和右侧的 target = 2 * nums[j] 个数，贡献 left * right。
 * 使用两张表：总频次 numCnt 与左侧频次 numLeftCnt，边遍历边更新。
 *
 * @param nums - 输入数组
 * @returns 特殊三元组数量（取模 1e9+7）
 */
function specialTriplets(nums: number[]): number {
  const MOD = 1e9 + 7;
  const numCnt = new Map<number, number>(); // 全局频次
  const numLeftCnt = new Map<number, number>(); // 已经过 j 的左侧频次
  let cnt = 0;

  // 统计每个数字出现的次数
  for (const num of nums) {
    numCnt.set(num, (numCnt.get(num) ?? 0) + 1);
  }

  for (const num of nums) {
    const target = num * 2;
    const leftCnt = numLeftCnt.get(target) ?? 0; // 左侧符合 target 的数量

    // 当前元素归入左侧，再计算右侧剩余 target 数量，避免重复计当前 j
    numLeftCnt.set(num, (numLeftCnt.get(num) ?? 0) + 1);
    const rightCnt = (numCnt.get(target) ?? 0) - (numLeftCnt.get(target) ?? 0);

    cnt = (cnt + (leftCnt * rightCnt) % MOD) % MOD;
  }

  return cnt;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 对每个 j 找左侧等于 2*nums[j] 的个数与右侧等于 2*nums[j] 的个数。
     每对组合形成一个特殊三元组，贡献 leftCnt * rightCnt。

2. 核心思想：
   - 先用全局频次表 numCnt 统计所有数字出现次数。
   - 遍历 j 时，先读取左侧 target 计数，再把 nums[j] 加入左侧，随后用
     全局频次减去左侧频次得到右侧 target 数量。

3. 关键细节：
   - 更新顺序不能放到末尾，尤其当 nums[j] == target（仅 num=0）时，
     必须先把当前元素归入左侧，才能从右侧扣除，避免把 j 误算进右侧。
   - 模运算在每次累加后取，防止溢出。

4. 复杂度分析：
   - 时间：O(n)，两次线性遍历。
   - 空间：O(n) 在最坏情况下 Map 需要存所有不同元素。

5. 示例验证：
   - [6,3,6]：j=3 时左 1 右 1 贡献 1，答案 1。
   - [0,1,0,0]：只有 j=2 时左 1 右 1，答案 1。
   - [8,4,2,8,4]：对 j=1，左 1 右 1 贡献 1；j=2，左 1 右 1 再贡献
     1，总计 2。

6. 边界与正确性说明：
   - 若 target 未出现过，leftCnt 或 rightCnt 为 0，不会贡献值。
   - 当前 j 不应被计入右侧：先写入 numLeftCnt，再计算 rightCnt，保证
     右侧只包含位置大于 j 的元素；特别是 nums[j]=0 时避免自计入。
   - 所有数为 0 的情况：target 也为 0，流程依旧成立，左侧累加后右侧
     会正确扣掉当前元素。

7. 另一种思路对比（不实现）：
   - 可先排序并用值到下标列表的二分搜索找左、右数量，但需要排序破坏
     原顺序并增加 O(n log n)；当前方案 O(n) 更优且不需额外结构。

8. 常见错误补充：
   - 在更新 numLeftCnt 前先计算 rightCnt，会把当前 j 计入右侧导致多算。
   - 未对答案取模或只在循环末尾取模，可能溢出；每次累加后取模安全。
*/
