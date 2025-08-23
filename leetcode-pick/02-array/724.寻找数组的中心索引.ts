/*
 * @lc app=leetcode.cn id=724 lang=typescript
 *
 * [724] 寻找数组的中心索引
 *
 * https://leetcode-cn.com/problems/find-pivot-index/description/
 *
 * algorithms
 * Easy (39.63%)
 * Likes:    258
 * Dislikes: 0
 * Total Accepted:    80K
 * Total Submissions: 198K
 * Testcase Example:  '[1,7,3,6,5,6]'
 *
 * 给定一个整数类型的数组 nums，请编写一个能够返回数组 “中心索引” 的方法。
 *
 * 我们是这样定义数组 中心索引 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。
 *
 * 如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * nums = [1, 7, 3, 6, 5, 6]
 * 输出：3
 * 解释：
 * 索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。
 * 同时, 3 也是第一个符合要求的中心索引。
 *
 *
 * 示例 2：
 *
 * 输入：
 * nums = [1, 2, 3]
 * 输出：-1
 * 解释：
 * 数组中不存在满足此条件的中心索引。
 *
 *
 *
 * 说明：
 *
 *
 * nums 的长度范围为 [0, 10000]。
 * 任何一个 nums[i] 将会是一个范围在 [-1000, 1000]的整数。
 *
 *
 */

// @lc code=start
/**
 * 前缀和解法
 * 利用数学关系：leftSum = rightSum 等价于 2*leftSum + nums[i] = total
 */
var pivotIndex = function (nums: number[]): number {
  // 计算数组总和
  const total = nums.reduce((sum, num) => sum + num, 0);

  let leftSum = 0; // 当前索引左边所有元素的和

  // 遍历数组，检查每个位置是否为中心索引
  for (let i = 0; i < nums.length; i++) {
    // 检查当前位置是否满足中心索引条件
    // 左边和 = 右边和 等价于 leftSum = total - nums[i] - leftSum
    // 即：2 * leftSum + nums[i] = total
    if (2 * leftSum + nums[i] === total) {
      return i;
    }

    // 更新左边和，为下一次迭代做准备
    leftSum += nums[i];
  }

  // 没有找到中心索引
  return -1;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找到数组的中心索引，使得左边所有元素和等于右边所有元素和
   - 如果存在多个中心索引，返回最左边的那个
   - 如果不存在中心索引，返回-1

2. 算法分析：
   - 时间复杂度：O(n) - 一次遍历计算总和，一次遍历查找中心索引
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：前缀和 + 数学关系

3. 实现要点：
   - 数学转换：leftSum = rightSum 转化为 2*leftSum + nums[i] = total
   - 推导过程：
     * leftSum = rightSum
     * leftSum = total - nums[i] - leftSum  (rightSum的定义)
     * 2*leftSum = total - nums[i]
     * 2*leftSum + nums[i] = total
   - 一次遍历：边遍历边检查，找到第一个满足条件的索引

4. 优化思路：
   - 数学优化：避免每次计算rightSum，通过数学关系简化
   - 早期返回：找到第一个满足条件的索引就立即返回
   - 空间优化：不需要额外的前缀和数组，只用一个变量记录当前leftSum
   - 边界处理：正确处理空数组和单元素数组的情况

例子分析：nums = [1, 7, 3, 6, 5, 6], total = 28
- i=0: leftSum=0, 2*0+1=1≠28, leftSum=1
- i=1: leftSum=1, 2*1+7=9≠28, leftSum=8  
- i=2: leftSum=8, 2*8+3=19≠28, leftSum=11
- i=3: leftSum=11, 2*11+6=28=28 ✓, 返回3
索引3处：左边和=1+7+3=11，右边和=5+6=11，满足条件
*/
