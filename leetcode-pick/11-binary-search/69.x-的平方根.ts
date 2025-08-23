/*
 * @lc app=leetcode.cn id=69 lang=typescript
 *
 * [69] x 的平方根
 *
 * https://leetcode-cn.com/problems/sqrtx/description/
 *
 * algorithms
 * Easy (34.22%)
 * Likes:    343
 * Dislikes: 0
 * Total Accepted:    112.8K
 * Total Submissions: 299.9K
 * Testcase Example:  '4'
 *
 * 实现 int sqrt(int x) 函数。
 *
 * 计算并返回 x 的平方根，其中 x 是非负整数。
 *
 * 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 *
 * 示例 1:
 *
 * 输入: 4
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: 8
 * 输出: 2
 * 说明: 8 的平方根是 2.82842...,
 * 由于返回类型是整数，小数部分将被舍去。
 *
 *
 */

// @lc code=start
/**
 * 方法一：线性查找（暴力解法）
 * 从0开始逐个尝试，直到找到合适的平方根
 * 时间复杂度：O(√x)，空间复杂度：O(1)
 */
function mySqrtLinear(x: number): number {
  let right = 0;
  // 寻找满足条件的最大整数：right² ≤ x < (right+1)²
  while (!(right * right <= x && (right + 1) * (right + 1) > x)) {
    right++;
  }
  return right;
}

/**
 * 方法二：二分查找（推荐）
 * 在[0, x]范围内使用二分查找寻找平方根
 *
 * 核心思想：
 * 1. 对于任意正整数x，其平方根必在[0, x]范围内
 * 2. 实际上可以优化到[0, x/2]，因为当x≥4时，√x ≤ x/2
 * 3. 寻找最大的整数mid，使得mid² ≤ x
 */
function mySqrt(x: number): number {
  // 处理特殊情况
  if (x === 0 || x === 1) return x;

  let left = 0;
  let right = Math.floor(x / 2); // 优化搜索范围
  let result = 0;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    const square = mid * mid;

    if (square === x) {
      // 完全平方数，直接返回
      return mid;
    } else if (square < x) {
      // mid可能是答案，记录下来，继续在右半部分查找更大的值
      result = mid;
      left = mid + 1;
    } else {
      // mid太大，在左半部分查找
      right = mid - 1;
    }
  }

  return result;
}

/**
 * 方法三：优化的二分查找（除法版本）
 * 使用除法避免大数相乘的溢出问题
 */
function mySqrtDivision(x: number): number {
  if (x === 0 || x === 1) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const quotient = Math.floor(x / mid);

    if (mid === quotient) {
      return mid;
    } else if (mid < quotient) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 寻找最大的整数k，使得k² ≤ x
   - 这是一个在有序空间中寻找临界值的问题
   - 可以转化为二分查找问题

2. 算法分析：
   - 时间复杂度：O(log x) - 二分查找的标准复杂度
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：二分查找、数值计算

3. 实现要点：
   - 搜索范围优化：对于x≥4，√x ≤ x/2
   - 避免溢出：可以使用除法替代乘法
   - 边界条件：特别处理x=0和x=1的情况
   - 寻找上界：要找的是满足条件的最大值

4. 三种解法对比：
   
   方法一：线性查找
   - 优点：思路简单，易理解
   - 缺点：时间复杂度高O(√x)
   - 适用：x较小的情况
   
   方法二：标准二分查找
   - 优点：时间复杂度低O(log x)
   - 缺点：需要处理mid*mid可能的溢出
   - 适用：大多数情况的最优解
   
   方法三：除法优化二分
   - 优点：避免大数乘法溢出
   - 缺点：除法操作相对较慢
   - 适用：处理极大数值

5. 关键观察：
   - 平方根函数在定义域上单调递增
   - 如果mid² < x，则答案可能是mid或比mid更大的数
   - 如果mid² > x，则答案一定比mid小
   - 需要记录每次满足条件的mid值

6. 示例分析：
   x = 8
   - 初始：left=0, right=4
   - 第一次：mid=2, 2²=4 < 8, result=2, left=3
   - 第二次：mid=3, 3²=9 > 8, right=2
   - 循环结束：返回result=2

7. 边界情况：
   - x=0：直接返回0
   - x=1：直接返回1
   - 完全平方数：mid²=x时直接返回mid
   - 大数溢出：使用除法版本避免mid*mid溢出

8. 数学原理：
   - 二分查找的单调性：f(x) = x²在[0,+∞)上单调递增
   - 搜索空间缩减：每次排除一半不可能的解
   - 不变量维护：答案始终在[left,right]区间内
*/
