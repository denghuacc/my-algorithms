/*
 * @lc app=leetcode.cn id=137 lang=typescript
 *
 * [137] 只出现一次的数字 II
 *
 * https://leetcode-cn.com/problems/single-number-ii/description/
 *
 * algorithms
 * Medium (62.16%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    27.1K
 * Total Submissions: 40.8K
 * Testcase Example:  '[2,2,3,2]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
 *
 * 说明：
 *
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 *
 * 示例 1:
 *
 * 输入: [2,2,3,2]
 * 输出: 3
 *
 *
 * 示例 2:
 *
 * 输入: [0,1,0,1,0,1,99]
 * 输出: 99
 *
 */

// @lc code=start
/**
 * 解法一：哈希表 - 统计频率
 *
 * 核心思想：
 * 使用Map统计每个数字出现的次数
 * 遍历数组找到只出现一次的数字
 *
 * 算法步骤：
 * 1. 遍历数组，统计每个数字的出现次数
 * 2. 再次遍历数组，找到出现次数为1的数字
 * 3. 返回该数字
 *
 * 时间复杂度：O(n)，需要遍历数组两次
 * 空间复杂度：O(n)，需要存储每个数字的频率
 *
 * 优点：思路简单，容易理解
 * 缺点：需要额外空间，不符合进阶要求
 */
var singleNumber = function (nums: number[]): number {
  const map: Map<number, number> = new Map();

  // 统计每个数字的出现次数
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 找到只出现一次的数字
  for (const num of nums) {
    if (map.get(num) === 1) {
      return num;
    }
  }
  return 0;
};

/**
 * 解法二：数学方法 - 集合运算
 *
 * 核心思想：
 * 利用数学公式：3 * (a + b) - (a + a + a + b) = 2b
 * 其中a是出现三次的数字，b是出现一次的数字
 *
 * 算法步骤：
 * 1. 计算所有数字的和 sumOfNums
 * 2. 计算去重后数字的和 sumOfSet
 * 3. 使用公式计算只出现一次的数字
 *
 * 时间复杂度：O(n)，需要遍历数组
 * 空间复杂度：O(n)，需要Set存储去重后的数字
 *
 * 优点：数学思路巧妙
 * 缺点：需要额外空间，可能溢出
 */
var singleNumber = function (nums: number[]): number {
  let sumOfSet = 0;
  let sumOfNums = 0;
  const set: Set<number> = new Set();

  for (const num of nums) {
    if (!set.has(num)) {
      set.add(num);
      sumOfSet += num;
    }
    sumOfNums += num;
  }

  // 公式：3 * sumOfSet - sumOfNums = 2 * singleNumber
  return (3 * sumOfSet - sumOfNums) / 2;
};

/**
 * 解法三：位运算 - 状态机
 *
 * 核心思想：
 * 使用两个变量seenOnce和seenTwice来跟踪每个位的状态
 * 对于每个位，有三种状态：0次、1次、2次、3次
 * 3次等价于0次，所以可以用两个位来表示状态
 *
 * 算法步骤：
 * 1. 初始化seenOnce = 0, seenTwice = 0
 * 2. 对于每个数字，更新状态：
 *    - seenOnce = ~seenTwice & (seenOnce ^ num)
 *    - seenTwice = ~seenOnce & (seenTwice ^ num)
 * 3. 返回seenOnce
 *
 * 时间复杂度：O(n)，只需要遍历一次
 * 空间复杂度：O(1)，只使用常数空间
 *
 * 优点：满足所有要求，最优解
 * 缺点：位运算逻辑复杂，难以理解
 */
var singleNumber = function (nums: number[]): number {
  let seenOnce = 0;
  let seenTwice = 0;

  for (const num of nums) {
    // 更新seenOnce：如果seenTwice为0，则seenOnce与num异或
    seenOnce = ~seenTwice & (seenOnce ^ num);
    // 更新seenTwice：如果seenOnce为0，则seenTwice与num异或
    seenTwice = ~seenOnce & (seenTwice ^ num);
  }

  return seenOnce;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在数组中找出只出现一次的数字，其他数字都出现三次
   - 需要线性时间复杂度和常数空间复杂度
   - 这是"只出现一次的数字"问题的扩展版本

2. 算法分析：
   - 解法一（哈希表）：O(n) 时间，O(n) 空间
   - 解法二（数学方法）：O(n) 时间，O(n) 空间
   - 解法三（位运算）：O(n) 时间，O(1) 空间

3. 实现要点：
   - 哈希表：简单直接，但需要额外空间
   - 数学方法：利用集合运算，但可能溢出
   - 位运算：使用状态机，每个位独立处理

4. 位运算状态机详解：
   - 对于每个位，状态转换如下：
     * 00 -> 01 -> 10 -> 00 (0次 -> 1次 -> 2次 -> 0次)
   - seenOnce表示该位出现1次的数字
   - seenTwice表示该位出现2次的数字
   - 当数字出现3次时，状态回到00

5. 示例分析：
   - 输入：[2,2,3,2]
   - 二进制：10, 10, 11, 10
   - 位运算过程：
     * 处理2(10)：seenOnce=10, seenTwice=00
     * 处理2(10)：seenOnce=00, seenTwice=10
     * 处理3(11)：seenOnce=11, seenTwice=00
     * 处理2(10)：seenOnce=11, seenTwice=00
   - 结果：11(3)

6. 边界情况：
   - 数组为空（题目保证非空）
   - 只有一个元素
   - 所有元素都出现三次
   - 负数处理（位运算自动处理）

7. 类似问题：
   - 只出现一次的数字I（其他数字出现两次）
   - 只出现一次的数字III（两个数字只出现一次）
   - 可以使用相同思路解决其他频率统计问题

8. 位运算技巧总结：
   - 异或运算：a ^ a = 0, a ^ 0 = a
   - 与运算：用于掩码操作
   - 非运算：用于状态转换
   - 组合使用可以实现复杂的状态管理

9. 扩展思考：
   - 如果其他数字出现k次，可以扩展状态机
   - 对于任意k，都可以用log(k)个变量表示状态
   - 位运算在数字处理问题中非常有用
*/
