/*
 * @lc app=leetcode.cn id=540 lang=typescript
 *
 * [540] 有序数组中的单一元素
 *
 * https://leetcode-cn.com/problems/single-element-in-a-sorted-array/description/
 *
 * algorithms
 * Medium (59.88%)
 * Likes:    364
 * Dislikes: 0
 * Total Accepted:    54.7K
 * Total Submissions: 91.3K
 * Testcase Example:  '[1,1,2,3,3,4,4,8,8]'
 *
 * 给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。
 *
 * 请你找出并返回只出现一次的那个数。
 *
 * 你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,1,2,3,3,4,4,8,8]
 * 输出: 2
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums =  [3,3,7,7,10,11,11]
 * 输出: 10
 *
 *
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 10^5
 * 0 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * 有序数组中的单一元素
 *
 * 核心思想：
 * 1. 利用数组的有序性和配对规律
 * 2. 在单一元素出现之前，配对元素的索引规律是：偶数索引的元素等于后一个元素
 * 3. 在单一元素出现之后，配对元素的索引规律被破坏
 * 4. 通过二分查找找到规律被破坏的临界点
 */

/**
 * 方法一：标准二分查找
 * 通过检查mid与相邻元素的关系判断单一元素的位置
 */
function singleNonDuplicateStandard(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);

    // 确保mid是偶数索引，这样便于配对检查
    if (mid % 2 === 1) {
      mid--;
    }

    // 检查mid和mid+1是否配对
    if (nums[mid] === nums[mid + 1]) {
      // 配对正常，单一元素在右半部分
      left = mid + 2;
    } else {
      // 配对被破坏，单一元素在左半部分（包括mid）
      right = mid;
    }
  }

  return nums[left];
}

/**
 * 方法二：位运算优化版本
 * 使用异或运算巧妙地处理奇偶索引配对问题
 *
 * 技巧解释：
 * - 对于偶数i，i^1 = i+1（偶数的配对元素在右边）
 * - 对于奇数i，i^1 = i-1（奇数的配对元素在左边）
 * - 这样nums[mid] === nums[mid^1]就能判断mid是否与其配对元素相等
 */
function singleNonDuplicate(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    // 使用异或判断mid是否与其配对元素相等
    if (nums[mid] === nums[mid ^ 1]) {
      // mid与其配对元素相等，说明配对正常，单一元素在右半部分
      left = mid + 1;
    } else {
      // mid与其配对元素不等，说明配对被破坏，单一元素在左半部分
      right = mid;
    }
  }

  return nums[left];
}

/**
 * 方法三：直观的二分查找
 * 明确地检查左右相邻元素来判断单一元素位置
 */
function singleNonDuplicateIntuitive(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    // 检查mid是否为单一元素
    let isSingle = true;
    if (mid > 0 && nums[mid] === nums[mid - 1]) {
      isSingle = false;
    }
    if (mid < nums.length - 1 && nums[mid] === nums[mid + 1]) {
      isSingle = false;
    }

    if (isSingle) {
      return nums[mid];
    }

    // 判断单一元素在左半部分还是右半部分
    let leftPairs = mid;
    if (mid > 0 && nums[mid] === nums[mid - 1]) {
      leftPairs = mid - 1;
    }

    if (leftPairs % 2 === 0) {
      // 左半部分有偶数个元素，单一元素在右半部分
      left = mid + 1;
    } else {
      // 左半部分有奇数个元素，单一元素在左半部分
      right = mid - 1;
    }
  }

  return nums[left];
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在有序数组中找到唯一不重复的元素
   - 其他元素都出现两次，只有一个元素出现一次
   - 要求O(log n)时间复杂度和O(1)空间复杂度

2. 算法分析：
   - 时间复杂度：O(log n) - 二分查找
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：二分查找 + 数学规律

3. 关键观察：
   - 在单一元素出现之前，数组有特定的配对规律
   - 在单一元素出现之后，配对规律被破坏
   - 可以通过二分查找定位规律被破坏的位置

4. 配对规律分析：
   
   正常情况下的索引规律：
   - 偶数索引元素 = 下一个元素（nums[0] = nums[1], nums[2] = nums[3]...）
   - 奇数索引元素 = 前一个元素（nums[1] = nums[0], nums[3] = nums[2]...）
   
   单一元素出现后规律被破坏：
   - 在单一元素左侧：规律正常
   - 在单一元素右侧：规律偏移（原本的偶数索引变成奇数索引）

5. 三种解法对比：
   
   方法一：标准二分查找
   - 思路：将mid调整为偶数索引，检查与下一个元素的配对
   - 优点：逻辑清晰，易于理解
   - 缺点：需要额外的索引调整
   
   方法二：位运算优化
   - 思路：使用异或运算 i^1 获取配对元素索引
   - 优点：代码简洁，运算高效
   - 技巧：偶数^1=偶数+1，奇数^1=奇数-1
   
   方法三：直观检查
   - 思路：直接检查相邻元素判断单一元素位置
   - 优点：逻辑直观，易于调试
   - 缺点：代码较复杂

6. 位运算技巧详解：
   
   异或运算的配对特性：
   - 0^1=1, 1^1=0 → 偶数索引找到下一个索引
   - 2^1=3, 3^1=2 → 奇数索引找到前一个索引
   - 4^1=5, 5^1=4 → 以此类推...
   
   这样nums[mid] === nums[mid^1]就能判断配对关系

7. 示例分析：
   nums = [1,1,2,3,3,4,4,8,8]
   
   初始：left=0, right=8
   第一次：mid=4, nums[4]=3, nums[4^1]=nums[5]=4, 3≠4，单一元素在左半部分，right=4
   第二次：left=0, right=4, mid=2, nums[2]=2, nums[2^1]=nums[3]=3, 2≠3，单一元素在左半部分，right=2
   第三次：left=0, right=2, mid=1, nums[1]=1, nums[1^1]=nums[0]=1, 1=1，单一元素在右半部分，left=2
   第四次：left=2, right=2，循环结束，返回nums[2]=2

8. 边界情况：
   - 单一元素在数组开头：[2,1,1,3,3]
   - 单一元素在数组结尾：[1,1,3,3,2]
   - 单一元素在数组中间：[1,1,2,3,3]
   - 数组只有一个元素：[1]

9. 算法不变量：
   - 单一元素始终在[left, right]区间内
   - 当nums[mid] === nums[mid^1]时，配对正常，单一元素在右半部分
   - 当nums[mid] !== nums[mid^1]时，配对异常，单一元素在左半部分

10. 扩展思考：
    - 如果有多个单一元素怎么办？
    - 如果元素出现次数不是2次而是3次怎么办？
    - 能否推广到更一般的情况？
    
    答案：这些情况需要修改算法逻辑，但核心的二分查找思想依然适用。
*/
