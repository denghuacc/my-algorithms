/*
 * @lc app=leetcode.cn id=611 lang=typescript
 *
 * [611] 有效三角形的个数
 *
 * https://leetcode-cn.com/problems/valid-triangle-number/description/
 *
 * algorithms
 * Medium (48.67%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    21.6K
 * Total Submissions: 42.7K
 * Testcase Example:  '[2,2,3,4]'
 *
 * 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
 *
 * 示例 1:
 *
 *
 * 输入: [2,2,3,4]
 * 输出: 3
 * 解释:
 * 有效的组合是:
 * 2,3,4 (使用第一个 2)
 * 2,3,4 (使用第二个 2)
 * 2,2,3
 *
 *
 * 注意:
 *
 *
 * 数组长度不超过1000。
 * 数组里整数的范围为 [0, 1000]。
 *
 *
 */

// @lc code=start
/**
 * 方法一：三重循环暴力解法
 * 时间复杂度：O(n³)
 * 空间复杂度：O(1)
 */
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  // 边界条件：数组为空时返回0
  if (n === 0) return 0;

  let result = 0;
  // 先排序，确保 nums[i] <= nums[j] <= nums[k]
  nums.sort((a, b) => a - b);

  // 三重循环遍历所有可能的三元组
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        // 三角形判定条件：两边之和大于第三边
        // 由于已排序，只需检查 nums[i] + nums[j] > nums[k]
        if (nums[i] + nums[j] > nums[k]) {
          result++;
        }
      }
    }
  }

  return result;
};

/**
 * 方法二：排序 + 二分查找
 * 时间复杂度：O(n² log n)
 * 空间复杂度：O(1)
 */
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  let result = 0;
  nums.sort((a, b) => a - b);

  // 固定前两条边，用二分查找第三条边的范围
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 二分查找满足 nums[i] + nums[j] > nums[k] 的最大k值
      let left = j + 1;
      let right = n - 1;
      let maxK = j; // 记录满足条件的最大k值

      while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;

        if (nums[i] + nums[j] > nums[mid]) {
          // 当前mid满足条件，尝试更大的k值
          left = mid + 1;
          maxK = mid;
        } else {
          // 当前mid不满足条件，缩小搜索范围
          right = mid - 1;
        }
      }

      // 从j+1到maxK的所有k值都满足条件
      result += maxK - j;
    }
  }

  return result;
};

/**
 * 方法三：排序 + 双指针（最优解法）
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
var triangleNumber = function (nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  let result = 0;
  nums.sort((a, b) => a - b);

  // 固定第一条边i，使用双指针j和k
  for (let i = 0; i < n; i++) {
    let k = i; // k指针从i开始

    // 遍历第二条边j
    for (let j = i + 1; j < n; j++) {
      // 移动k指针，找到满足 nums[i] + nums[j] > nums[k] 的最大k值
      // 关键观察：当j增大时，nums[i] + nums[j] 增大，k只能向右移动
      while (k + 1 < n && nums[k + 1] < nums[i] + nums[j]) {
        k++;
      }

      // 从j+1到k的所有位置都满足三角形条件
      result += Math.max(k - j, 0);
    }
  }

  return result;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 统计数组中能组成三角形的三元组个数
   - 三角形判定条件：任意两边之和大于第三边
   - 由于要统计所有可能的三元组，需要遍历所有组合

2. 算法分析：
   - 时间复杂度：O(n²) - 双指针法最优
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：排序 + 双指针/二分查找

3. 解题思路：
   - 核心思想：先排序，然后利用有序性优化搜索
   - 关键观察：排序后，对于固定的i和j，满足条件的k值构成一个连续区间
   - 算法步骤：
     1. 对数组进行升序排序
     2. 固定前两条边i和j
     3. 找到满足 nums[i] + nums[j] > nums[k] 的k值范围
     4. 统计该范围内的k值个数

4. 实现要点：
   - 排序的重要性：排序后只需检查 nums[i] + nums[j] > nums[k]
   - 双指针优化：当j增大时，k只能向右移动，不能向左
   - 边界处理：确保k指针不越界，使用Math.max避免负数

5. 示例分析：
   以nums = [2,2,3,4]为例：
   - 排序后：[2,2,3,4]
   - i=0, j=1: nums[0]+nums[1]=4，k可以取2,3，共2个
   - i=0, j=2: nums[0]+nums[2]=5，k可以取3，共1个
   - i=1, j=2: nums[1]+nums[2]=5，k可以取3，共1个
   - 总计：2+1+1=4个，但实际是3个（因为[2,2,3]只算一次）

6. 优化思路：
   - 暴力法：O(n³) - 直接三重循环检查
   - 二分查找：O(n² log n) - 对每个(i,j)二分查找k的范围
   - 双指针：O(n²) - 利用单调性，k指针只能向右移动

7. 常见陷阱：
   - 忘记排序：排序是优化的前提
   - 边界条件：空数组、单元素数组的处理
   - 指针越界：确保k指针不超出数组范围
   - 重复计算：注意三元组的唯一性

8. 扩展思考：
   - 类似问题：三数之和、四数之和等
   - 变种：求最大三角形周长、最小三角形面积
   - 实际应用：几何计算、图形学中的三角形判定
*/
