/*
 * @lc app=leetcode.cn id=744 lang=typescript
 *
 * [744] 寻找比目标字母大的最小字母
 *
 * https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/description/
 *
 * algorithms
 * Easy (45.73%)
 * Likes:    171
 * Dislikes: 0
 * Total Accepted:    58.5K
 * Total Submissions: 123.2K
 * Testcase Example:  '["c","f","j"]\n"a"'
 *
 * 给你一个排序后的字符列表 letters ，列表中只包含小写英文字母。另给出一个目标字母
 * target，请你寻找在这一有序列表里比目标字母大的最小字母。
 *
 * 在比较时，字母是依序循环出现的。举个例子：
 *
 *
 * 如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: letters = ["c", "f", "j"]，target = "a"
 * 输出: "c"
 *
 *
 * 示例 2:
 *
 *
 * 输入: letters = ["c","f","j"], target = "c"
 * 输出: "f"
 *
 *
 * 示例 3:
 *
 *
 * 输入: letters = ["c","f","j"], target = "d"
 * 输出: "f"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= letters.length <= 10^4
 * letters[i] 是一个小写字母
 * letters 按非递减顺序排序
 * letters 最少包含两个不同的字母
 * target 是一个小写字母
 *
 *
 */

// @lc code=start
// binary search
/**
 * 在有序字符数组中查找比目标字母大的最小字母（循环比较）。
 *
 * @param letters - 升序字符数组
 * @param target - 目标字母
 * @returns 比目标字母大的最小字母
 */
var nextGreatestLetter = function (letters: string[], target: string): string {
  let left = 0;
  let right = letters.length - 1;
  // 二分查找第一个严格大于 target 的位置
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (letters[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  // 若越界或未找到，则按循环规则返回首字母
  return left < letters.length ? letters[left] : letters[0];
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在有序数组中找“第一个大于 target 的字母”，不存在则循环到首字母。
   - 关键特点：数组有序，且字母比较具有循环特性（超过 'z' 回到 'a'）。
   - 目标：返回最小的严格大于 target 的字母。

2. 解题思路
   核心思想
   - 二分查找第一个严格大于 target 的位置。
   - 若该位置越界，说明所有字母都不大于 target，返回首字母。

   算法步骤
   1) 初始化 left=0, right=n-1。
   2) 二分查找：
      - 若 letters[mid] > target，向左收缩；
      - 否则向右收缩。
   3) 循环结束后 left 指向第一个大于 target 的位置。
   4) 若 left 在范围内返回 letters[left]，否则返回 letters[0]。

3. 代码实现
   实现步骤
   - 使用标准二分模板寻找“第一个大于”。
   - 循环结束后根据 left 是否越界选择返回值。

   关键函数说明
   - nextGreatestLetter：主函数，二分定位并处理循环边界。

4. 复杂度分析
   - 时间复杂度：O(log n)，二分查找。
   - 空间复杂度：O(1)，常数额外空间。
   - 关键观察：排序性质允许用二分快速定位。

5. 示例分析
   示例一：letters = ["c","f","j"], target = "a"
   - 第一个大于 "a" 的字母是 "c"。

   示例二：letters = ["c","f","j"], target = "c"
   - 第一个大于 "c" 的字母是 "f"。

   示例三：letters = ["c","f","j"], target = "j"
   - 不存在更大字母，按循环返回 "c"。

   边界情况
   - target 小于所有字母：返回首个字母。
   - target 大于等于所有字母：返回首个字母。

6. 算法要点总结
   核心技巧
   - 用二分查找第一个大于目标的元素。
   - 越界时按循环规则返回首元素。

   优化要点
   - 只需一次二分，避免线性扫描。
   - 返回逻辑简洁明确。

   类似问题
   - 在有序数组中查找第一个大于/大于等于的元素。
   - 循环有序数组的二分定位问题。

7. 常见错误
   - 把“严格大于”写成“大于等于”，导致答案错误。
   - 循环时未处理越界，访问数组非法下标。
   - 二分结束条件写错，导致死循环或错位。
*/
