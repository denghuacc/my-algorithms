/*
 * @lc app=leetcode.cn id=528 lang=typescript
 *
 * [528] 按权重随机选择
 *
 * https://leetcode-cn.com/problems/random-pick-with-weight/description/
 *
 * algorithms
 * Medium (48.61%)
 * Likes:    137
 * Dislikes: 0
 * Total Accepted:    14.3K
 * Total Submissions: 29.3K
 * Testcase Example:  '["Solution","pickIndex"]\r\n[[[1]],[]]\r'
 *
 * 给定一个正整数数组 w ，其中 w[i] 代表下标 i 的权重（下标从 0 开始），请写一个函数 pickIndex ，它可以随机地获取下标
 * i，选取下标 i 的概率与 w[i] 成正比。
 *
 *
 *
 *
 * 例如，对于 w = [1, 3]，挑选下标 0 的概率为 1 / (1 + 3) = 0.25 （即，25%），而选取下标 1 的概率为 3 / (1
 * + 3) = 0.75（即，75%）。
 *
 * 也就是说，选取下标 i 的概率为 w[i] / sum(w) 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * ["Solution","pickIndex"]
 * [[[1]],[]]
 * 输出：
 * [null,0]
 * 解释：
 * Solution solution = new Solution([1]);
 * solution.pickIndex(); // 返回 0，因为数组中只有一个元素，所以唯一的选择是返回下标 0。
 *
 * 示例 2：
 *
 * 输入：
 * ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
 * [[[1,3]],[],[],[],[],[]]
 * 输出：
 * [null,1,1,1,1,0]
 * 解释：
 * Solution solution = new Solution([1, 3]);
 * solution.pickIndex(); // 返回 1，返回下标 1，返回该下标概率为 3/4 。
 * solution.pickIndex(); // 返回 1
 * solution.pickIndex(); // 返回 1
 * solution.pickIndex(); // 返回 1
 * solution.pickIndex(); // 返回 0，返回下标 0，返回该下标概率为 1/4 。
 *
 * 由于这是一个随机问题，允许多个答案，因此下列输出都可以被认为是正确的:
 * [null,1,1,1,1,0]
 * [null,1,1,1,1,1]
 * [null,1,1,1,0,0]
 * [null,1,1,1,0,1]
 * [null,1,0,1,0,0]
 * ......
 * 诸若此类。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= w.length <= 10000
 * 1 <= w[i] <= 10^5
 * pickIndex 将被调用不超过 10000 次
 *
 *
 */

export {};

// @lc code=start
/**
 * 按权重随机选择解决方案
 *
 * 核心思想：
 * 1. 构建前缀和数组，将权重转换为累积概率区间
 * 2. 生成随机数，在前缀和数组中二分查找对应的索引
 * 3. 权重越大的元素对应的区间越大，被选中的概率越高
 *
 * 算法步骤：
 * 1. 预处理：计算前缀和数组
 * 2. 随机选择：生成[1, total]范围内的随机数
 * 3. 二分查找：找到第一个大于等于随机数的前缀和位置
 */
class Solution {
  private prefixSums: number[]; // 前缀和数组
  private totalSum: number; // 总权重

  constructor(w: number[]) {
    this.prefixSums = [];
    let sum = 0;

    // 构建前缀和数组
    // prefixSums[i] 表示从索引0到i的权重总和
    for (const weight of w) {
      sum += weight;
      this.prefixSums.push(sum);
    }

    this.totalSum = sum;
  }

  /**
   * 根据权重随机选择一个索引
   *
   * 思路：
   * 1. 生成[1, totalSum]范围内的随机数
   * 2. 在前缀和数组中查找第一个大于等于该随机数的位置
   * 3. 该位置就是要返回的索引
   */
  pickIndex(): number {
    // 生成[1, totalSum]范围内的随机整数
    const target = Math.floor(Math.random() * this.totalSum) + 1;

    // 在前缀和数组中二分查找
    return this.binarySearchFirstGE(target);
  }

  /**
   * 二分查找：寻找第一个大于等于target的元素位置
   *
   * @param target 目标值
   * @returns 第一个大于等于target的元素的索引
   */
  private binarySearchFirstGE(target: number): number {
    let left = 0;
    let right = this.prefixSums.length - 1;

    // 寻找第一个大于等于target的位置
    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);

      if (this.prefixSums[mid] < target) {
        // 中点值太小，在右半部分继续查找
        left = mid + 1;
      } else {
        // 中点值大于等于target，可能是答案，在左半部分继续查找
        right = mid;
      }
    }

    return left;
  }
}

/**
 * 使用示例：
 * const solution = new Solution([1, 3]);
 * solution.pickIndex(); // 返回0的概率是1/4，返回1的概率是3/4
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 根据权重进行加权随机选择
   - 权重越大的元素被选中的概率越高
   - 需要在O(log n)时间内完成单次选择

2. 算法分析：
   - 时间复杂度：构造O(n)，单次查询O(log n)
   - 空间复杂度：O(n) - 存储前缀和数组
   - 算法类型：前缀和 + 二分查找

3. 核心思想：
   - 将离散的权重问题转换为连续的区间问题
   - 使用前缀和将权重映射到累积区间
   - 通过随机数生成 + 二分查找实现按权重选择

4. 算法步骤详解：
   
   步骤1：构建前缀和数组
   - weights = [1, 3, 2] → prefixSums = [1, 4, 6]
   - 每个元素对应一个区间：
     - 索引0：[1, 1]，长度1，概率1/6
     - 索引1：[2, 4]，长度3，概率3/6
     - 索引2：[5, 6]，长度2，概率2/6
   
   步骤2：生成随机数
   - 在[1, totalSum]范围内生成随机整数
   - 随机数落在哪个区间，就选择对应的索引
   
   步骤3：二分查找
   - 寻找第一个大于等于随机数的前缀和位置
   - 该位置对应的索引就是答案

5. 实现要点：
   - 随机数范围是[1, totalSum]，不是[0, totalSum-1]
   - 二分查找寻找"第一个大于等于"的位置
   - 前缀和数组天然有序，适合二分查找
   - 使用left < right的循环条件确保找到第一个符合条件的位置

6. 示例分析：
   weights = [1, 3]
   prefixSums = [1, 4], totalSum = 4
   
   随机数生成与选择：
   - 随机数1 → 第一个≥1的位置是0 → 返回索引0
   - 随机数2 → 第一个≥2的位置是1 → 返回索引1  
   - 随机数3 → 第一个≥3的位置是1 → 返回索引1
   - 随机数4 → 第一个≥4的位置是1 → 返回索引1
   
   概率分析：
   - 索引0被选中：随机数为1时，概率1/4
   - 索引1被选中：随机数为2,3,4时，概率3/4

7. 边界情况：
   - 单个元素：权重数组只有一个元素，直接返回0
   - 权重为1：所有元素权重相同，等概率选择
   - 大权重差异：确保权重大的元素有更高的选中概率

8. 优化要点：
   - 前缀和预计算：避免每次查询时重复计算
   - 二分查找：保证查询的对数时间复杂度
   - 内存布局：紧凑的数组存储提高缓存效率

9. 扩展应用：
   - 概率分布采样
   - 负载均衡算法
   - 游戏中的随机事件系统
   - 推荐系统中的加权随机推荐

10. 数学原理：
    - 累积分布函数(CDF)的离散化应用
    - 反函数采样方法的实现
    - 区间映射：将权重空间映射到概率空间
*/
