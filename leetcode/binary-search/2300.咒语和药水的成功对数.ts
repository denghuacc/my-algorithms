/*
 * @lc app=leetcode.cn id=2300 lang=typescript
 *
 * [2300] 咒语和药水的成功对数
 *
 * https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/description/
 *
 * algorithms
 * Medium (40.41%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    19K
 * Total Submissions: 43.9K
 * Testcase Example:  '[5,1,3]\n[1,2,3,4,5]\n7'
 *
 * 给你两个正整数数组 spells 和 potions ，长度分别为 n 和 m ，其中 spells[i] 表示第 i
 * 个咒语的能量强度，potions[j] 表示第 j 瓶药水的能量强度。
 *
 * 同时给你一个整数 success 。一个咒语和药水的能量强度 相乘 如果 大于等于 success ，那么它们视为一对 成功 的组合。
 *
 * 请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的 药水 数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
 * 输出：[4,0,3]
 * 解释：
 * - 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
 * - 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
 * - 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
 * 所以返回 [4,0,3] 。
 *
 *
 * 示例 2：
 *
 * 输入：spells = [3,1,2], potions = [8,5,8], success = 16
 * 输出：[2,0,2]
 * 解释：
 * - 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。总共 2 个成功组合。
 * - 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
 * - 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。总共 2 个成功组合。
 * 所以返回 [2,0,2] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == spells.length
 * m == potions.length
 * 1 <= n, m <= 10^5
 * 1 <= spells[i], potions[i] <= 10^5
 * 1 <= success <= 10^10
 *
 *
 */

// @lc code=start

/**
 * 咒语和药水的成功对数 - 排序 + 二分搜索
 *
 * 核心思想：
 * 1. 对药水数组排序，利用有序性进行二分搜索
 * 2. 对每个咒语，找到第一个能与其成功组合的药水位置
 * 3. 该位置及之后的所有药水都能与当前咒语成功组合
 */
function successfulPairs(
  spells: number[],
  potions: number[],
  success: number
): number[] {
  const n = spells.length;
  const m = potions.length;
  const res = new Array(n).fill(0);

  // 对药水数组排序，为二分搜索做准备
  // 排序后：较小的药水在前，较大的药水在后
  potions.sort((a, b) => a - b);

  // 对每个咒语，找到能与其成功组合的药水数量
  for (let i = 0; i < n; i++) {
    const spell = spells[i];

    // 二分搜索：找到第一个满足 potions[j] * spell >= success 的位置
    let left = 0;
    let right = m - 1;

    // 使用"寻找左边界"的二分搜索模板
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      // 检查当前药水与咒语的组合是否成功
      if (potions[mid] * spell >= success) {
        // 当前位置满足条件，但可能不是第一个，继续在左半部分寻找
        right = mid;
      } else {
        // 当前位置不满足条件，答案在右半部分
        left = mid + 1;
      }
    }

    // 检查最终位置是否满足条件
    if (potions[right] * spell >= success) {
      // 从right位置开始到数组末尾的所有药水都能成功组合
      res[i] = m - right;
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定两个数组：咒语spells和药水potions
   - 每个咒语需要找到能与其成功组合的药水数量
   - 成功条件：spell[i] * potion[j] >= success

2. 朴素解法分析：
   - 暴力解法：对每个咒语遍历所有药水 - O(n*m)
   - 当n和m都达到10^5时，时间复杂度过高

3. 核心优化思路：
   - 观察：如果药水按升序排列，那么对于固定咒语
   - 存在一个分界点：左边的药水组合失败，右边的药水组合成功
   - 利用这个单调性，可以用二分搜索快速找到分界点

4. 算法分析：
   时间复杂度：O(m*log(m) + n*log(m))
   - 排序药水数组：O(m*log(m))
   - 对每个咒语进行二分搜索：O(n*log(m))
   空间复杂度：O(1) - 除了结果数组外，只使用常数额外空间

5. 算法步骤详解：
   a) 排序准备：
      - 对potions数组升序排序
      - 排序后具备单调性，为二分搜索创造条件
   
   b) 逐个处理咒语：
      - 对每个spell，寻找第一个满足条件的potion位置
      - 该位置及其右侧所有potion都能成功组合
   
   c) 二分搜索细节：
      - 寻找左边界：第一个使 potion * spell >= success 的位置
      - 使用标准的"寻找左边界"模板

6. 示例分析 - spells=[5,1,3], potions=[1,2,3,4,5], success=7：
   
   排序后：potions = [1,2,3,4,5]
   
   咒语5：
   - 需要找第一个potion使得 potion * 5 >= 7
   - 即 potion >= 7/5 = 1.4
   - 二分搜索找到位置1（potion=2），2*5=10>=7 ✓
   - 从位置1到末尾有4个元素：[2,3,4,5]
   - 结果：4
   
   咒语1：
   - 需要找第一个potion使得 potion * 1 >= 7
   - 即 potion >= 7
   - 所有potion都小于7，没有成功组合
   - 结果：0
   
   咒语3：
   - 需要找第一个potion使得 potion * 3 >= 7
   - 即 potion >= 7/3 ≈ 2.33
   - 二分搜索找到位置2（potion=3），3*3=9>=7 ✓
   - 从位置2到末尾有3个元素：[3,4,5]
   - 结果：3
   
   最终答案：[4,0,3]

7. 二分搜索模板解析：
   - 目标：寻找第一个满足条件的位置（左边界）
   - 条件：potions[mid] * spell >= success
   - 当条件满足时：right = mid（可能是答案，但继续寻找更左的位置）
   - 当条件不满足时：left = mid + 1（答案在右半部分）

8. 边界情况处理：
   - 所有药水都不满足条件：最终left=right指向末尾，检查后返回0
   - 所有药水都满足条件：找到位置0，返回m-0=m
   - 空数组：题目保证了数组非空

9. 关键优化点：
   - 排序一次，多次查询：避免重复排序
   - 二分搜索：将线性查找优化为对数查找
   - 位置计算：找到分界点后，直接计算数量而非逐个计数

10. 常见错误：
    - 忘记排序或排序方向错误
    - 二分搜索边界条件处理不当
    - 计算成功组合数量时出错
    - 整数溢出：spell*potion可能超出int范围

11. 扩展思考：
    - 如果需要频繁查询不同的success值，可以预处理
    - 可以考虑双指针法，但二分搜索更通用
    - 类似问题：两数之和的变种、数组中的配对问题

12. 实际应用：
    - 推荐系统中的匹配问题
    - 供需匹配算法
    - 阈值过滤与计数问题
*/
