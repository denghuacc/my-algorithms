/*
 * @lc app=leetcode.cn id=852 lang=typescript
 *
 * [852] 山脉数组的峰顶索引
 *
 * https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/description/
 *
 * algorithms
 * Easy (70.53%)
 * Likes:    121
 * Dislikes: 0
 * Total Accepted:    32.1K
 * Total Submissions: 45.5K
 * Testcase Example:  '[0,1,0]'
 *
 * 我们把符合下列属性的数组 A 称作山脉：
 *
 *
 * A.length >= 3
 * 存在 0 < i < A.length - 1 使得A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... >
 * A[A.length - 1]
 *
 *
 * 给定一个确定为山脉的数组，返回任何满足 A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... >
 * A[A.length - 1] 的 i 的值。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[0,1,0]
 * 输出：1
 *
 *
 * 示例 2：
 *
 * 输入：[0,2,1,0]
 * 输出：1
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= A.length <= 10000
 * 0 <= A[i] <= 10^6
 * A 是如上定义的山脉
 *
 *
 *
 *
 */

// @lc code=start
/**
 * 山脉数组的峰顶索引
 *
 * 核心思想：
 * 1. 山脉数组有唯一的峰顶，峰顶左侧严格递增，右侧严格递减
 * 2. 可以通过比较相邻元素的大小关系来判断峰顶位置
 * 3. 使用二分查找可以在O(log n)时间内找到峰顶
 */

/**
 * 方法一：线性遍历（简单直接）
 * 从左到右遍历，找到第一个下降的位置
 * 时间复杂度：O(n)，空间复杂度：O(1)
 */
function peakIndexInMountainArrayLinear(arr: number[]): number {
  let i = 0;
  // 只要当前元素小于下一个元素，就继续向右移动
  while (arr[i] < arr[i + 1]) {
    i++;
  }
  // 当arr[i] >= arr[i+1]时，i就是峰顶索引
  return i;
}

/**
 * 方法二：二分查找（推荐）
 * 利用山脉数组的单调性特征进行二分查找
 * 时间复杂度：O(log n)，空间复杂度：O(1)
 *
 * 核心判断逻辑：
 * - 如果arr[mid] < arr[mid+1]，说明在上升阶段，峰顶在右侧
 * - 如果arr[mid] > arr[mid+1]，说明在下降阶段，峰顶在左侧（包括mid）
 */
function peakIndexInMountainArray(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] < arr[mid + 1]) {
      // 当前在上升阶段，峰顶在右半部分
      left = mid + 1;
    } else {
      // 当前在下降阶段，峰顶在左半部分（包括mid位置）
      right = mid;
    }
  }

  // 循环结束时，left === right，指向峰顶位置
  return left;
}

/**
 * 方法三：三分查找（理论最优）
 * 专门用于单峰函数的查找算法
 * 每次可以排除1/3的搜索空间，理论上比二分查找更优
 */
function peakIndexInMountainArrayTernary(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;

  while (right - left > 2) {
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);

    if (arr[mid1] < arr[mid2]) {
      // 峰顶在右2/3部分
      left = mid1;
    } else {
      // 峰顶在左2/3部分
      right = mid2;
    }
  }

  // 在剩余的小范围内线性查找峰顶
  let maxIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }

  return maxIndex;
}

/**
 * 方法四：黄金分割查找
 * 使用黄金分割比例进行查找，适合连续函数
 * 实际应用中很少使用，主要用于理论研究
 */
function peakIndexInMountainArrayGolden(arr: number[]): number {
  const phi = (1 + Math.sqrt(5)) / 2; // 黄金分割比例
  let left = 0;
  let right = arr.length - 1;

  while (right - left > 2) {
    const mid1 = Math.floor(left + (right - left) / phi);
    const mid2 = Math.floor(right - (right - left) / phi);

    if (arr[mid1] < arr[mid2]) {
      left = mid1;
    } else {
      right = mid2;
    }
  }

  // 在剩余范围内找最大值
  let maxIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }

  return maxIndex;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在单峰数组中找到峰顶元素的索引
   - 山脉数组的特点：先严格递增后严格递减，有且仅有一个峰顶
   - 要求找到满足arr[i-1] < arr[i] > arr[i+1]的索引i

2. 算法分析：
   - 时间复杂度：O(log n) - 二分查找
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：二分查找、单峰函数优化

3. 山脉数组的数学特性：
   - 单调性：存在唯一的峰顶，左侧严格递增，右侧严格递减
   - 连续性：相邻元素的大小关系能指示峰顶方向
   - 唯一性：峰顶是全局最大值，且位置唯一

4. 四种解法深度对比：
   
   方法一：线性遍历 O(n)
   - 适用场景：数组较小，或者峰顶位置靠前
   - 优点：代码简单，无需复杂逻辑
   - 缺点：时间复杂度高，未充分利用单调性
   
   方法二：二分查找 O(log n) ⭐️推荐
   - 适用场景：标准解法，适用于所有情况
   - 原理：通过arr[mid]与arr[mid+1]的比较确定搜索方向
   - 不变量：峰顶始终在[left, right]区间内
   
   方法三：三分查找 O(log₃ n)
   - 适用场景：理论研究，单峰函数的经典算法
   - 原理：每次排除1/3搜索空间，收敛更快
   - 实际效果：常数因子较大，实际性能不一定更好
   
   方法四：黄金分割查找 O(log_φ n)
   - 适用场景：连续函数优化，实际应用较少
   - 特点：使用黄金分割比例φ=(1+√5)/2≈1.618
   - 理论意义：最优搜索策略之一

5. 二分查找核心思想：
   
   判断逻辑：
   - arr[mid] < arr[mid+1] → 在上升阶段 → 峰顶在右侧
   - arr[mid] > arr[mid+1] → 在下降阶段 → 峰顶在左侧
   
   搜索空间缩减：
   - 每次排除一半不可能包含峰顶的区域
   - 维护不变量：[left, right]区间始终包含峰顶
   
   循环终止条件：
   - left < right：确保至少有两个元素可比较
   - 最终left === right时，指向峰顶位置

6. 示例分析：
   arr = [0,2,1,0]
   
   初始：left=0, right=3
   第一次：mid=1, arr[1]=2 > arr[2]=1，在下降阶段，right=1
   第二次：left=0, right=1, mid=0, arr[0]=0 < arr[1]=2，在上升阶段，left=1
   第三次：left=1, right=1，循环结束，返回1

7. 边界情况分析：
   - 最小山脉：[0,1,0] → 峰顶在索引1
   - 峰顶在左：[2,1,0] → 峰顶在索引0（但这不是标准山脉）
   - 峰顶在右：[0,1,2] → 峰顶在索引2（但这不是标准山脉）
   - 长山脉：峰顶可能在任意位置

8. 算法优化要点：
   - 中点计算：使用left + (right-left)/2避免溢出
   - 比较策略：只需比较arr[mid]和arr[mid+1]即可确定方向
   - 边界处理：确保mid+1不会越界（由于山脉特性，这通常不是问题）

9. 错误案例分析：
   
   常见错误一：使用arr[mid-1], arr[mid], arr[mid+1]三点比较
   - 问题：增加了边界检查复杂度，且不必要
   - 正确：只需arr[mid]和arr[mid+1]即可判断
   
   常见错误二：使用left <= right作为循环条件
   - 问题：可能导致无限循环或错误结果
   - 正确：使用left < right确保正确终止

10. 扩展应用：
    - 峰值检测：信号处理中的峰值识别
    - 优化算法：单峰函数的全局最优解
    - 数据分析：时间序列中的极值点检测
    - 图像处理：边缘检测和特征点提取

11. 相关问题：
    - 寻找峰值元素（可能有多个峰值）
    - 山脉数组的最长子序列
    - 旋转排序数组的最小值
    - 寻找两个正序数组的中位数

这个问题很好地展示了如何将数学特性（单调性）与算法技巧（二分查找）结合，
是理解单峰函数优化算法的绝佳例题。
*/
