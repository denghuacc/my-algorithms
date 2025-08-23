/*
 * @lc app=leetcode.cn id=1122 lang=typescript
 *
 * [1122] 数组的相对排序
 *
 * https://leetcode-cn.com/problems/relative-sort-array/description/
 *
 * algorithms
 * Easy (67.08%)
 * Likes:    100
 * Dislikes: 0
 * Total Accepted:    30.2K
 * Total Submissions: 44.2K
 * Testcase Example:  '[2,3,1,3,2,4,6,7,9,2,19]\n[2,1,4,3,9,6]'
 *
 * 给你两个数组，arr1 和 arr2，
 *
 *
 * arr2 中的元素各不相同
 * arr2 中的每个元素都出现在 arr1 中
 *
 *
 * 对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1
 * 的末尾。
 *
 *
 *
 * 示例：
 *
 * 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
 * 输出：[2,2,2,1,4,3,3,9,6,7,19]
 *
 *
 *
 *
 * 提示：
 *
 *
 * arr1.length, arr2.length <= 1000
 * 0 <= arr1[i], arr2[i] <= 1000
 * arr2 中的元素 arr2[i] 各不相同
 * arr2 中的每个元素 arr2[i] 都出现在 arr1 中
 *
 *
 */

// @lc code=start
/**
 * 数组的相对排序 - 计数排序实现
 * 核心思想：使用计数数组统计元素出现次数，按指定顺序重新填充
 * 时间复杂度：O(n + m + k)，空间复杂度：O(k)，其中k是数值范围
 */
var relativeSortArray = function (arr1: number[], arr2: number[]): number[] {
  // 创建计数数组，统计arr1中每个数字的出现次数
  const counts = new Array(1001).fill(0);
  for (const num of arr1) {
    counts[num]++;
  }

  let idx = 0; // 用于重新填充arr1的索引

  // 按照arr2的顺序重新填充arr1
  for (const num of arr2) {
    while (counts[num] > 0) {
      arr1[idx++] = num;
      counts[num]--;
    }
  }

  // 将arr2中未出现的数字按升序添加到arr1末尾
  for (let i = 0; i < counts.length; i++) {
    while (counts[i] > 0) {
      arr1[idx++] = i;
      counts[i]--;
    }
  }

  return arr1;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 核心问题：按照arr2的顺序对arr1进行排序，arr2中未出现的元素按升序排列
   - 关键特点：需要保持arr2中元素的相对顺序，同时处理arr2中未出现的元素
   - 目标：返回按照指定规则排序后的数组

2. 算法分析：
   - 时间复杂度：O(n + m + k) - 其中n是arr1长度，m是arr2长度，k是数值范围
   - 空间复杂度：O(k) - 计数数组的空间，k是数值范围（1001）
   - 算法类型：计数排序（Counting Sort）

3. 实现要点：
   - 关键数据结构：计数数组记录每个数字在arr1中的出现次数
   - 核心算法步骤：
     1. 统计arr1中每个数字的出现次数
     2. 按照arr2的顺序重新填充arr1
     3. 将arr2中未出现的数字按升序添加到末尾
   - 边界情况处理：空数组、重复元素、arr2中未出现的元素

4. 优化思路：
   - 使用计数排序避免比较排序的O(n log n)复杂度
   - 原地修改arr1数组，减少额外空间使用
   - 利用数值范围限制（0-1000）使用固定大小的计数数组
   - 按顺序处理arr2中的元素，确保相对顺序正确

5. 核心技巧：
   - 计数排序：适用于数值范围有限的情况，时间复杂度O(n + k)
   - 相对排序：先处理arr2中出现的元素，再处理未出现的元素
   - 原地修改：直接修改输入数组，减少内存使用
   - 顺序保证：严格按照arr2的顺序填充，然后按升序填充剩余元素

6. 类似问题：
   - 计数排序：基础版本，直接按数值大小排序
   - 自定义排序：使用比较函数进行排序
   - 桶排序：将元素分配到不同的桶中进行排序

7. 算法变体：
   - 哈希表：使用Map记录arr2中元素的顺序，适用于数值范围较大的情况
   - 比较排序：使用自定义比较函数，时间复杂度O(n log n)
   - 双指针：先排序arr1，然后按照arr2的顺序重新排列

8. 性能对比：
   - 计数排序：O(n + k)，适用于数值范围有限的情况
   - 哈希表：O(n log n)，适用于数值范围较大的情况
   - 比较排序：O(n log n)，通用但效率较低
   - 双指针：O(n log n)，需要先排序再重排

9. 应用场景：
   - 数据预处理：按照特定规则对数据进行预排序
   - 外部排序：当数据量很大时的排序策略
   - 数据库查询：按照指定字段顺序返回结果
*/
